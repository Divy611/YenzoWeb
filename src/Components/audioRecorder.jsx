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
    const [trainingLabels, setTrainingLabels] = useState([]);
    const [fillerWordCount, setFillerWordCount] = useState(0);//eslint-disable-next-line
    const [recordingError, setRecordingError] = useState(null);
    const modelUrl = 'https://raw.githubusercontent.com/Divy611/YenzoWeb/main/src/Models/model.json';
    useEffect(() => {
        const loadModel = async () => {
            try {
                const loadedModel = await tf.loadLayersModel(modelUrl);
                loadedModel.compile({ optimizer: 'adam', loss: 'meanSquaredError', metrics: ['accuracy'] });
                setModel(loadedModel);
                console.log('Model loaded successfully');
            } catch (err) {
                console.error('Error loading the model:', err);
            }
        };

        loadModel();

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
        if (!analyserRef.current || model) return;

        const bufferLength = analyserRef.current.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyserRef.current.getByteFrequencyData(dataArray);
        const tensorData = tf.tensor1d(dataArray);
        const inputTensor = tensorData.expandDims(0);  // Add batch dimension
        const prediction = model.predict(inputTensor);
        // const volume = tf.mean(tensorData);
        const predictedVolume = prediction[0].dataSync()[0];
        //const clarity = tf.exp(tf.mean(tf.log(tensorData.add(1e-6)))).div(tf.mean(tensorData.add(1e-6)));
        const predictedClarity = prediction[1].dataSync()[0];
        const maxIndex = tf.argMax(tensorData);
        //const estimatedPitch = maxIndex.mul(audioContextRef.current.sampleRate / analyserRef.current.fftSize);
        const predictedPitch = prediction[2].dataSync()[0];
        //const confidenceValue = calculateConfidence(volumeValue, clarityValue, pitchValue);
        const [volumeValue, clarityValue, pitchValue] = [
            predictedVolume,
            predictedClarity,
            predictedPitch,
        ].map((t) => t.dataSync()[0]);
        const confidenceValue = calculateConfidence(predictedVolume, predictedClarity, predictedPitch);

        setMetrics({
            volume: Number(volumeValue.toFixed(2)),
            clarity: Number(clarityValue.toFixed(2)),
            pitch: Number(pitchValue.toFixed(2)),
            confidence: Number(confidenceValue.toFixed(2)),
        });

        tf.dispose([tensorData, predictedVolume, predictedClarity, maxIndex, predictedPitch]);
        animationRef.current = requestAnimationFrame(analyzeAudioLoop);
    };

    const calculateConfidence = (volume, clarity, pitch) => {
        const avgVolume = 128;
        const pitchThreshold = 100;
        const clarityConfidence = Math.min(clarity / 1, 1);
        const volumeConfidence = Math.min(Math.abs(volume - avgVolume) / avgVolume, 1);
        const pitchConfidence = Math.min(Math.abs(pitch - pitchThreshold) / pitchThreshold, 1);
        const overallConfidence = (volumeConfidence + pitchConfidence + clarityConfidence) / 3;
        return overallConfidence * 100;
    };

    const analyzeAudio = async (audioBlob) => {
        const arrayBuffer = await audioBlob.arrayBuffer();//eslint-disable-next-line
        const audioBuffer = await audioContextRef.current.decodeAudioData(arrayBuffer);
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

            recognition.onerror = (event) => {
            };
            recognition.start();
        } else {
        }

        const transcribedText = await transcribeAudio(audioBlob);
        const fillerCount = detectFillerWords(transcribedText);
        setFillerWordCount(fillerCount);
        const targetValue = getTargetValueFromAudio(audioBlob);
        setTrainingLabels(prev => [...prev, targetValue]);

        tf.dispose([tensorData]);
    };

    const trainModel = async () => {
        if (!model || trainingData.length === 0 || trainingLabels.length === 0) {
            console.error('No data to train on or model not available');
            return;
        }

        const xs = tf.stack(trainingData);
        const ys = tf.tensor2d(trainingLabels);

        try {
            await model.fit(xs, ys, {
                epochs: 10,
                batchSize: 8,
                shuffle: true,
                callbacks: {
                    onEpochEnd: (epoch, logs) => {
                        console.log(`Epoch ${epoch}: loss = ${logs.loss}, accuracy = ${logs.acc}`);
                    }
                }
            });
        } catch (err) {
            console.error('Error:', err);
        } finally {
            tf.dispose([xs, ys]);
        }
    };

    const getTargetValueFromAudio = (audioBlob) => {
        return [0.5];
    };

    const detectFillerWords = (transcript) => {
        const words = transcript.toLowerCase().split(' ');
        const fillerCount = words.filter(word => fillerWords.includes(word)).length;

        console.log('Filler words detected:', fillerCount);
        setFillerWordCount(fillerCount);
    };
    const transcribeAudio = async (audioBlob) => {
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
                console.error('Speech recognition error:', event.error);
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
    const fullText = `Ready to begin a new session? Click the button below to start talking!`;

    useEffect(() => {
        if (index < fullText.length) {
            const timeout = setTimeout(() => { setTypedText(prev => prev + fullText[index]); setIndex(index + 1); }, 20);
            return () => clearTimeout(timeout);
        }
    }, [index, fullText]);
    useEffect(() => {
        if (!hasSpoken.current) {
            const speakText = () => {
                const utterance = new SpeechSynthesisUtterance(greetingText + fullText);
                utterance.lang = 'en-US';
                window.speechSynthesis.speak(utterance);
            };
            speakText();
            hasSpoken.current = true;
        }
    }, [greetingText, fullText]);
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
                                    <h1 className="text-white text-2xl font-extrabold">{'50' || 'NA'}%</h1>
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