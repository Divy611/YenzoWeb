import { motion } from 'framer-motion'
import * as tf from '@tensorflow/tfjs'
import '@tensorflow/tfjs-backend-webgl'
import WaveformVisualizer from './waveform'
import NoTextLogo from '../assets/logo_no_title.png'
import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

const recordings = [];
const fillerWords = ['uh', 'um', 'like', 'you know', 'so', 'actually', 'basically'];

export const MotionDots = () => {
    return (
        <div className="pulsating-dots">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
        </div>
    );
};

export const RecorderScreen = () => {
    const streamRef = useRef(null);
    const sourceRef = useRef(null);
    const analyserRef = useRef(null);
    const animationRef = useRef(null);
    const audioContextRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const [model, setModel] = useState(null);
    const [metrics, setMetrics] = useState(null);
    const [loading, setLoading] = useState(false);//eslint-disable-next-line
    const [audioUrl, setAudioUrl] = useState(null);
    const [trainingData, setTrainingData] = useState([]);
    const [isRecording, setIsRecording] = useState(false);//eslint-disable-next-line
    const [fillerWordCount, setFillerWordCount] = useState(0);//eslint-disable-next-line
    const [recordingError, setRecordingError] = useState(null);
    useEffect(() => {
        return () => {
            stopRecording();
            if (audioContextRef.current) audioContextRef.current.close();
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        };//eslint-disable-next-line
    }, []);

    const startRecording = async () => {
        try {
            await tf.setBackend('webgl');
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            streamRef.current = stream;
            audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
            analyserRef.current = audioContextRef.current.createAnalyser();
            analyserRef.current.fftSize = 2048;
            sourceRef.current = audioContextRef.current.createMediaStreamSource(stream);
            sourceRef.current.connect(analyserRef.current);
            mediaRecorderRef.current = new MediaRecorder(stream);

            mediaRecorderRef.current.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    const audioBlob = new Blob([event.data], { type: 'audio/wav' });
                    const url = URL.createObjectURL(audioBlob);
                    setAudioUrl(url);
                    analyzeAudio(audioBlob);
                }
            };

            mediaRecorderRef.current.start();
            setIsRecording(true);
            setRecordingError(null);
            analyzeAudioLoop();
        } catch (err) {
            setRecordingError('Error accessing microphone.');
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            if (streamRef.current) streamRef.current.getTracks().forEach(track => track.stop());
            if (audioContextRef.current) audioContextRef.current.close();
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
            setIsRecording(false);
        }
    };
    const analyzeAudioLoop = () => {
        if (!analyserRef.current) return;

        const bufferLength = analyserRef.current.frequencyBinCount;
        const timeDomainArray = new Uint8Array(bufferLength);
        const frequencyArray = new Uint8Array(bufferLength);

        analyserRef.current.getByteTimeDomainData(timeDomainArray);
        analyserRef.current.getByteFrequencyData(frequencyArray);

        const volume = calculateRMS(timeDomainArray);
        const speechBand = frequencyArray.slice(0, Math.floor(bufferLength * 0.25));
        const noiseBand = frequencyArray.slice(Math.floor(bufferLength * 0.75));
        const speechEnergy = tf.mean(tf.tensor1d(speechBand));
        const noiseEnergy = tf.mean(tf.tensor1d(noiseBand));
        const snr = tf.clipByValue(speechEnergy.div(noiseEnergy.add(1e-6)), 0, 10);
        const clarity = snr;
        const estimatedPitch = detectPitchAutocorrelation(timeDomainArray);
        const confidenceValue = calculateConfidence(volume, clarity.dataSync()[0], estimatedPitch);

        setMetrics({
            volume: Number(volume.toFixed(2)),
            clarity: Number(clarity.dataSync()[0].toFixed(2)),
            pitch: Number(estimatedPitch.toFixed(2)),
            confidence: Number(confidenceValue.toFixed(2)),
        });
        tf.dispose([speechEnergy, noiseEnergy]);
        animationRef.current = requestAnimationFrame(analyzeAudioLoop);
    };

    const calculateRMS = (timeDomainArray) => {
        let sum = 0;
        for (let i = 0; i < timeDomainArray.length; i++) {
            const value = timeDomainArray[i] / 128 - 1;
            sum += value * value;
        }
        return Math.sqrt(sum / timeDomainArray.length) * 100;
    };

    const detectPitchAutocorrelation = (timeDomainArray) => {
        let bestOffset = -1;
        let bestCorrelation = 0;
        const size = timeDomainArray.length;
        const sampleRate = audioContextRef.current.sampleRate;
        const normalizedArray = timeDomainArray.map(value => value / 128 - 1);
        const correlations = new Array(size).fill(0);

        for (let offset = 0; offset < size / 2; offset++) {
            let correlation = 0;
            for (let i = 0; i < size / 2; i++) {
                correlation += normalizedArray[i] * normalizedArray[i + offset];
            }

            correlations[offset] = correlation;

            if (correlation > bestCorrelation) {
                bestCorrelation = correlation;
                bestOffset = offset;
            }
        }

        if (bestCorrelation > 0.01) {
            const frequency = sampleRate / bestOffset;
            return frequency;
        }
        return 0;
    };

    const calculateConfidence = (volume, clarity, pitch) => {
        const avgVolume = 0.5;
        const clarityConfidence = Math.min(clarity / 10, 1);
        const volumeConfidence = 1 - Math.min(Math.abs(volume - avgVolume) / avgVolume, 1);
        const pitchConfidence = pitch > 50 && pitch < 500 ? 1 : 0;
        const overallConfidence = (clarityConfidence * 0.5 + volumeConfidence * 0.3 + pitchConfidence * 0.2);
        return overallConfidence * 100;
    };

    const analyzeAudio = async (audioBlob) => {
        if (!analyserRef.current || !model) return;

        const bufferLength = analyserRef.current.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyserRef.current.getByteFrequencyData(dataArray);
        const tensorData = tf.tensor1d(dataArray);
        const inputTensor = tensorData.expandDims(0);
        setTrainingData(prev => [...prev, inputTensor]);

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            const recognition = new SpeechRecognition();
            recognition.lang = 'en-US';
            recognition.interimResults = false;
            recognition.maxAlternatives = 1;

            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                detectFillerWords(transcript);
            };
            recognition.onerror = () => { };
            recognition.start();
        } else { }

        const transcribedText = await transcribeAudio(audioBlob);
        const fillerCount = detectFillerWords(transcribedText);
        setFillerWordCount(fillerCount);

        tf.dispose([tensorData]);
    };

    const detectFillerWords = (transcript) => {
        const words = transcript.toLowerCase().split(' ');
        const fillerCount = words.filter(word => fillerWords.includes(word)).length;
        setFillerWordCount(fillerCount);
    };
    const transcribeAudio = async () => {
        return new Promise((resolve, reject) => {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (!SpeechRecognition) {
                reject('SpeechRecognition API is not supported in this browser.');
                return;
            }
            const recognition = new SpeechRecognition();
            recognition.lang = 'en-US';
            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                const fillerWordCount = fillerWords.reduce((count, word) => {
                    const wordRegex = new RegExp(`\\b${word}\\b`, 'gi');
                    return count + (transcript.match(wordRegex) || []).length;
                }, 0);
                setFillerWordCount(fillerWordCount);
                resolve(transcript);
            };
            recognition.onerror = (event) => {
                resolve('');
            };
            recognition.start();
        });
    };

    const handleClick = () => {
        if (isRecording) { stopRecording(); }
        else { startRecording(); }
        setLoading(!loading);
        setIsRecording(!isRecording);
    };
    const Counter = ({ targetNumber }) => {
        const [count, setCount] = useState(targetNumber - 10);
        useEffect(() => {
            if (count < targetNumber) {
                const interval = setInterval(() => { setCount(prevCount => Math.min(prevCount + 1, targetNumber)); }, 7);
                return () => clearInterval(interval);
            }
        }, [count, targetNumber]);
        return <h1 className="text-white text-2xl font-extrabold">{count}</h1>;
    };

    const MetricTile = ({ title, value, position }) => {
        return (
            <div className={`p-4 w-1/2 flex justify-between items-center border-${position} border-green-600`}>
                <h2 className="text-white text-sm">{title}</h2>
                <Counter targetNumber={value} />
            </div>
        )
    }
    const history = useHistory();
    const backToHome = () => {
        history.goBack();
        if (isRecording === true) { setIsRecording(!isRecording); }
    }
    const hasSpoken = useRef(false);
    const greetingText = `Hi, User!`;
    const [index, setIndex] = useState(0);
    const [typedText, setTypedText] = useState('');
    const [voicesLoaded, setVoicesLoaded] = useState(false);
    const fullText = `Ready to begin a new session? Click the button below to start talking!`;

    useEffect(() => {
        if (index < fullText.length) {
            const timeout = setTimeout(() => {
                setTypedText(prev => prev + fullText[index]);
                setIndex(index + 1);
            }, 20);
            return () => clearTimeout(timeout);
        }
    }, [index, fullText]);

    useEffect(() => {
        if (window.speechSynthesis.getVoices().length > 0) {
            setVoicesLoaded(true);
        } else {
            window.speechSynthesis.onvoiceschanged = () => {
                setVoicesLoaded(true);
            };
        }
    }, [greetingText, fullText]);

    useEffect(() => {
        if (voicesLoaded && !hasSpoken.current) {
            const speakText = () => {
                const utterance = new SpeechSynthesisUtterance(greetingText + fullText);
                utterance.lang = 'en-US';
                const voices = window.speechSynthesis.getVoices();
                const femaleVoice = voices.find(voice => voice.name === 'Google UK English Female');

                if (femaleVoice) {
                    utterance.voice = femaleVoice;
                }
                window.speechSynthesis.speak(utterance);
            };
            speakText();
            hasSpoken.current = true;
        }
    }, [voicesLoaded, greetingText, fullText]);
    return (
        <div className={`flex flex-col h-[100vh] justify-between items-center overflow-y-hidden bg-[#151418]`}>
            <header className='p-6 w-full'>
                <button className='flex text-white items-center' onClick={backToHome}>
                    <i className="fas fa-chevron-left text-xl"></i><h1 className='ml-2.5'>Back to Dashboard</h1>
                </button>
            </header>
            <div className="w-full flex flex-col justify-between items-center relative overflow-y-auto">
                {recordings.length === 0 && !metrics
                    ? isRecording
                        ? <WaveformVisualizer analyser={analyserRef.current} />
                        : <div className="w-1/3 bg-[#0E0D12] rounded-2xl border border-green-600 shadow-md shadow-green-600">
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="px-4 py-5 items-center text-center">
                                <h1 className="text-white text-md">{greetingText}</h1>
                                <p className="text-white py-1 text-sm">{typedText}</p>
                            </motion.div>
                        </div>
                    : null
                }
                {loading && (<WaveformVisualizer analyser={analyserRef.current} />)}
                {!loading && metrics && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="w-1/2 bg-[#0E0D12] rounded-2xl border border-green-600 shadow-md shadow-green-600 p-5 text-center">
                        <h1 className="pb-7 text-white text-lg">Analysis Results</h1>
                        <div className="flex">
                            <MetricTile title={"Pitch"} value={metrics.pitch || 'NA'} position={"r"} />
                            <MetricTile title={"Tone"} value={metrics.tone || 'NA'} position={"l"} />
                        </div>
                        <div className="flex border-t border-green-600">
                            <MetricTile title={"Clarity"} value={metrics.clarity || 'NA'} position={"r"} />
                            <MetricTile title={"Volume"} value={metrics.volume || 'NA'} position={"l"} />
                        </div>
                        <div className="flex border-t border-green-600">
                            <MetricTile title={"Confidence"} value={metrics.confidence || 'NA'} position={"r"} />
                            <MetricTile title={"Filler Words"} value={fillerWordCount || '0'} position={"l"} />
                        </div>
                        <div className="w-full">
                            <div className="px-5 py-3.5 flex justify-between items-center justify-between border-t border-green-600">
                                <h2 className="text-white text-start text-md">You were better <br />than</h2>
                                <div className="flex items-center">
                                    <h1 className="text-white text-2xl font-extrabold">{' '}%</h1>
                                    <p className='ml-2 text-white'>Of the users!</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
            <div className="w-full h-1/6">
                <div className="flex justify-center items-center px-10 py-4">
                    <div className="flex justify-center items-center relative">
                        <div className="w-full h-1/6 bg-[#151418]">
                            <button className={`border rounded-full border-green-600 w-16 h-16 flex items-center justify-center transition-transform duration-500 ease-in-out ${isRecording ? 'animate-pulse scale-110' : ''}`} onClick={handleClick} style={{ cursor: 'pointer', boxShadow: '0px 0px 15px rgba(0, 255, 0, 0.5)', position: 'relative' }}>
                                {isRecording ? (<MotionDots />) : (<img className="p-2.5" src={NoTextLogo} alt="" />)}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};