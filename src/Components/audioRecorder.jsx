import Meyda from 'meyda';
import { motion } from "framer-motion";
import * as PitchFinder from 'pitchfinder';
import NoTextLogo from "../assets/logo_no_title.png";
import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const recordings = [];
//const fillerWords = ['um', 'uh', 'er', 'ah', 'like', 'okay', 'right', 'you know', 'I mean'];

export const RecorderScreen = () => {
    const streamRef = useRef(null);
    const canvasRef = useRef(null);
    const analyserRef = useRef(null);
    const audioChunksRef = useRef([]);
    const animationRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const meydaAnalyzerRef = useRef(null);
    const [metrics, setMetrics] = useState(null);
    const [loading, setLoading] = useState(false);//eslint-disable-next-line
    const [audioUrl, setAudioUrl] = useState(null);
    const [isRecording, setIsRecording] = useState(false);//eslint-disable-next-line
    const [recordingError, setRecordingError] = useState(null);//eslint-disable-next-line
    useEffect(() => { return () => { stopRecording(); cancelAnimationFrame(animationRef.current); }; }, []);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            streamRef.current = stream;
            mediaRecorderRef.current = new MediaRecorder(stream);
            mediaRecorderRef.current.ondataavailable = (event) => {
                if (event.data.size > 0) { audioChunksRef.current.push(event.data); }
            };

            mediaRecorderRef.current.onstop = async () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
                const url = URL.createObjectURL(audioBlob);
                setAudioUrl(url);
                recordings.push(url);
                audioChunksRef.current = [];

                const analysisMetrics = await analyzeAudio(audioBlob);
                setMetrics(prevMetrics => ({ ...prevMetrics, ...analysisMetrics }));
            };
            mediaRecorderRef.current.start();
            setupVisualizer(stream);
            setupMeydaAnalyzer(stream);
            setIsRecording(true);
            setRecordingError(null);
            setMetrics(null);
        } catch (err) { setRecordingError('Error accessing microphone.'); }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            stopVisualizer();
            if (meydaAnalyzerRef.current) { meydaAnalyzerRef.current.stop(); }
            setIsRecording(false);
        }
    };

    const setupVisualizer = (stream) => {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        analyserRef.current = audioContext.createAnalyser();
        const source = audioContext.createMediaStreamSource(stream);
        source.connect(analyserRef.current);
        drawVisualizer();
    };

    const stopVisualizer = () => {
        if (streamRef.current) { streamRef.current.getTracks().forEach((track) => track.stop()); }
        cancelAnimationFrame(animationRef.current);
    };

    const drawVisualizer = () => {
        const canvas = canvasRef.current;
        const canvasCtx = canvas.getContext('2d');
        const analyser = analyserRef.current;

        const WIDTH = canvas.width;
        const HEIGHT = canvas.height;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const draw = () => {
            animationRef.current = requestAnimationFrame(draw);
            analyser.getByteFrequencyData(dataArray);
            canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

            const barWidth = (WIDTH / bufferLength) * 2.5;
            let barHeight;
            let x = 0;

            for (let i = 0; i < bufferLength; i++) {
                barHeight = dataArray[i] / 2;
                const r = barHeight + (25 * (i / bufferLength));
                const g = 250 * (i / bufferLength);
                const b = 50;

                canvasCtx.fillStyle = `rgb(${r},${g},${b})`;
                canvasCtx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);
                x += barWidth + 1;
            }
        };
        draw();
    };

    const analyzeAudio = async (audioBlob) => {
        const arrayBuffer = await audioBlob.arrayBuffer();
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

        const pitchDetector = PitchFinder.AMDF();
        const float32Array = audioBuffer.getChannelData(0);
        const chunkSize = 2048;
        const pitches = [];
        for (let i = 0; i < float32Array.length; i += chunkSize) {
            const chunk = float32Array.slice(i, i + chunkSize);
            const pitch = pitchDetector(chunk);
            if (pitch) pitches.push(pitch);
        }
        let averagePitch = null;
        let confidence = 0;
        if (pitches.length > 0) {
            averagePitch = pitches.reduce((sum, pitch) => sum + pitch, 0) / pitches.length;
            const pitchVariance = pitches.reduce((sum, pitch) => sum + Math.pow(pitch - averagePitch, 2), 0) / pitches.length;
            confidence = Math.max(0, Math.min(100, 100 - (pitchVariance / 10)));
        }
        averagePitch = averagePitch !== null ? Number(averagePitch.toFixed(2)) : null;
        confidence = Number(confidence.toFixed(2));
        return { pitch: averagePitch, confidence };
    };

    const setupMeydaAnalyzer = (stream) => {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const source = audioContext.createMediaStreamSource(stream);

        meydaAnalyzerRef.current = Meyda.createMeydaAnalyzer({
            audioContext: audioContext,
            source: source,
            bufferSize: 512,
            featureExtractors: ['rms', 'spectralFlatness'],
            callback: (features) => {
                setMetrics((prevMetrics) => ({
                    ...prevMetrics,
                    volume: features.rms !== undefined ? Number(features.rms.toFixed(2)) : prevMetrics?.volume ?? null,
                    clarity: features.spectralFlatness !== undefined ? Number(features.spectralFlatness.toFixed(2)) : prevMetrics?.clarity ?? null
                }));
            }
        });
        meydaAnalyzerRef.current.start();
    };

    const handleClick = () => {
        if (isRecording) { stopRecording(); }
        else { startRecording(); }
        setLoading(!loading);
        setIsRecording(!isRecording);
    };

    const MotionDots = () => {
        return (<div className="pulsating-dots"><div className="dot"></div><div className="dot"></div><div className="dot"></div><div className="dot"></div></div>);
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
    const fullText = `It's great to have you here. To kick off our session, I'd love to hear all about you. Tell me about your background, your interests, and anything else you'd like to share. Feel free to include your hobbies, preferences, and what drives you.`;
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (index < fullText.length) {
            const timeout = setTimeout(() => {
                setTypedText(prev => prev + fullText[index]);
                setIndex(index + 1);
            }, 20);
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
                        ? <canvas ref={canvasRef} className="w-1/2 bg-[#16151A] rounded-lg" />
                        : <div className="w-1/2 bg-[#0E0D12] rounded-2xl border border-green-600 shadow-md shadow-green-600">
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="px-4 py-5 items-center text-center">
                                <h1 className="text-white text-md">Hi, User!</h1>
                                <p className="text-white py-1 text-sm">{typedText}</p>
                            </motion.div>
                        </div>
                    : null
                }
                {loading && (<canvas ref={canvasRef} className="w-1/2 h-1/2 bg-[#16151A] rounded-lg" />)}
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