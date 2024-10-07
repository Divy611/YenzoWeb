import Meyda from 'meyda';
import { motion } from 'framer-motion'
import * as tf from '@tensorflow/tfjs'
import '@tensorflow/tfjs-backend-webgl'
import WaveformVisualizer from './waveform'
//import * as PitchFinder from 'pitchfinder'
import NoTextLogo from '../assets/logo_no_title.png'
import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const recordings = [];

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
    const processorRef = useRef(null);
    const audioChunksRef = useRef([]);
    const audioContextRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const [metrics, setMetrics] = useState(null);
    const [loading, setLoading] = useState(false);//eslint-disable-next-line
    const [audioUrl, setAudioUrl] = useState(null);
    const [analyser, setAnalyser] = useState(null);
    const [isRecording, setIsRecording] = useState(false);//eslint-disable-next-line
    const [recordingError, setRecordingError] = useState(null);
    useEffect(() => {
        return () => {
            stopRecording();
            if (audioContextRef.current) {
                audioContextRef.current.close();
            }
        };
    }, []);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            streamRef.current = stream;
            audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();

            const analyserNode = audioContextRef.current.createAnalyser();
            analyserNode.fftSize = 2048;
            const source = audioContextRef.current.createMediaStreamSource(stream);
            source.connect(analyserNode);

            sourceRef.current = source;
            setAnalyser(analyserNode);
            mediaRecorderRef.current = new MediaRecorder(stream);
            mediaRecorderRef.current.start();
            setIsRecording(true);
        } catch (err) {
            console.error('Error accessing microphone:', err);
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            if (audioContextRef.current) { audioContextRef.current.close(); }
            setIsRecording(false);
        }
    };

    const setupTensorFlowAnalyzer = (stream) => {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        sourceRef.current = audioContextRef.current.createMediaStreamSource(stream);
        const bufferSize = 2048;
        processorRef.current = audioContextRef.current.createScriptProcessor(bufferSize, 1, 1);
        sourceRef.current.connect(processorRef.current);
        processorRef.current.connect(audioContextRef.current.destination);

        processorRef.current.onaudioprocess = async (e) => {
            const inputData = e.inputBuffer.getChannelData(0);
            const tensorInput = tf.tensor1d(inputData);
            const features = await extractFeatures(tensorInput);

            setMetrics(prevMetrics => ({ ...prevMetrics, ...features }));
            tensorInput.dispose();
        };
    };

    const extractFeatures = async (tensorInput) => {
        const rms = tf.sqrt(tf.mean(tf.square(tensorInput)));
        const spectralFlatness = tf.exp(tf.mean(tf.log(tensorInput.abs().add(1e-6)))).div(tf.mean(tensorInput.abs().add(1e-6)));

        const tensorLength = tensorInput.shape[0];
        const firstPart = tensorInput.slice([0], [tensorLength - 1]);
        const secondPart = tensorInput.slice([1], [tensorLength - 1]);
        const signChanges = secondPart.sub(firstPart).sign().abs();
        const zeroCrossings = tf.sum(signChanges).div(2);

        const estimatedPitch = tf.scalar(audioContextRef.current.sampleRate).div(zeroCrossings.mul(2));
        const [volumeValue, clarityValue, pitchValue] = await Promise.all([
            rms.data(),
            spectralFlatness.data(),
            estimatedPitch.data()
        ]);
        tf.dispose([rms, spectralFlatness, firstPart, secondPart, signChanges, zeroCrossings, estimatedPitch]);

        return {
            volume: Number(volumeValue[0].toFixed(2)),
            clarity: Number(clarityValue[0].toFixed(2)),
            pitch: Number(pitchValue[0].toFixed(2))
        };
    };

    const analyzeAudio = async (audioBlob) => {
        const arrayBuffer = await audioBlob.arrayBuffer();
        const audioBuffer = await audioContextRef.current.decodeAudioData(arrayBuffer);
        const tensorData = tf.tensor1d(audioBuffer.getChannelData(0));
        const features = await extractFeatures(tensorData);
        tensorData.dispose();

        return features;
    };
    const handleClick = () => {
        if (isRecording) { stopRecording(); }
        else { startRecording(); }
        setLoading(!loading);
        setIsRecording(!isRecording);
    };
    const Counter = ({ targetNumber }) => {
        const [count, setCount] = useState(0);
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
            <div className={`p-5 w-1/2 flex justify-between items-center border-${position} border-green-600`}>
                <h2 className="text-white text-sm">{title}</h2>
                <Counter targetNumber={value} />
            </div>
        )
    }
    const history = useHistory();
    const backToHome = () => { history.goBack(); }
    const [typedText, setTypedText] = useState('');
    const fullText = `Ready to begin a new session? Click the button below to start talking!`;
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (index < fullText.length) {
            const timeout = setTimeout(() => { setTypedText(prev => prev + fullText[index]); setIndex(index + 1); }, 20);
            return () => clearTimeout(timeout);
        }
    }, [index, fullText]);
    return (
        <div className={`flex flex-col h-[100vh] justify-between items-center overflow-y-hidden bg-[#151418]`}>
            <header className='p-6 w-full'>
                <button className='flex text-white items-center' onClick={backToHome}>
                    <i className="fas fa-chevron-left text-xl"></i><h1 className='ml-2.5'>Back to home</h1>
                </button>
            </header>
            <div className="w-full flex flex-col justify-between items-center relative overflow-y-auto">
                {recordings.length === 0 && !metrics
                    ? isRecording
                        ? <WaveformVisualizer analyser={audioContextRef.current} />
                        : <div className="w-1/3 bg-[#0E0D12] rounded-2xl border border-green-600 shadow-md shadow-green-600">
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="px-4 py-5 items-center text-center">
                                <h1 className="text-white text-md">Hi, User!</h1>
                                <p className="text-white py-1 text-sm">{typedText}</p>
                            </motion.div>
                        </div> : null
                }
                {loading && (<WaveformVisualizer analyser={audioContextRef.current} />)}
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
                        <div className="w-full">
                            <div className="px-5 py-3.5 flex justify-between items-center justify-between border-t border-green-600">
                                <h2 className="text-white text-sm">Confidence</h2>
                                <h1 className="text-white text-2xl font-extrabold">{metrics.confidence || 'NA'} %</h1>
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