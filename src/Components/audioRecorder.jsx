import * as Tone from 'tone';
import { motion } from "framer-motion";
import NoTextLogo from "../assets/logo_no_title.png";
import React, { useEffect, useRef, useState } from 'react'

const recordings = [];

export const HomeScreen = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [audioUrl, setAudioUrl] = useState(null);
    const [recordingError, setRecordingError] = useState(null);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);
    const analyserRef = useRef(null);
    const streamRef = useRef(null);
    const animationRef = useRef(null);
    const canvasRef = useRef(null);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            stopRecording();
            cancelAnimationFrame(animationRef.current);
        };
    }, []);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            streamRef.current = stream;
            mediaRecorderRef.current = new MediaRecorder(stream);

            mediaRecorderRef.current.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data);
                }
            };

            mediaRecorderRef.current.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
                const url = URL.createObjectURL(audioBlob);
                setAudioUrl(url);
                recordings.push(url);
                audioChunksRef.current = [];
            };
            mediaRecorderRef.current.start();
            setupVisualizer(stream);
            setIsRecording(true);
            setRecordingError(null);
        } catch (err) { setRecordingError('Error accessing microphone.'); }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            stopVisualizer();
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

    const handleClick = () => {
        setIsRecording(!isRecording);
        if (isRecording) { stopRecording(); }
        else { startRecording(); }
    };
    const MotionDots = () => {
        return (
            <div className="pulsating-dots">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
            </div>
        );
    };

    return (
        <div className={`container h-[84.5vh] 2xl:h-[91vh] flex flex-col justify-between items-center overflow-y-hidden`}>
            <div className=''></div>
            <div className="w-full flex flex-col justify-between items-center relative overflow-y-auto">
                <div className=''></div>
                {recordings.length === 0
                    ? isRecording
                        ? <canvas ref={canvasRef} className="w-1/2 h-1/2 bg-[#16151A] rounded-lg" />
                        : <div className="w-1/2 bg-[#0E0D12] rounded-2xl border border-green-600 shadow-md shadow-green-600">
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="px-4 py-5 items-center justify-center">
                                <h1 className="text-white text-md">Hi, User!</h1>
                                <p className="text-white py-1 text-sm">It's great to have you here. To kick off our session, I'd love to hear all about you. Tell me about your background, your interests, and anything else you'd like to share. Feel free to include your hobbies, preferences, and what drives you.</p>
                            </motion.div>
                        </div>
                    : <></>
                }

            </div>

            <div className="w-full h-1/6 bg-[#151418] border-t border-green-600">
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

// export const HomeScreen = () => {
//     const [isRecording, setIsRecording] = useState(false);
//     const [recordingError, setRecordingError] = useState(null);
//     const [audioUrl, setAudioUrl] = useState(null);
//     const mediaRecorderRef = useRef(null);
//     const audioContextRef = useRef(null);
//     const analyserRef = useRef(null);
//     const sourceRef = useRef(null);
//     const audioChunksRef = useRef([]);
//     const streamRef = useRef(null);
//     const canvasRef = useRef(null);
//     const animationRef = useRef(null);
//     const [isPlaying, setIsPlaying] = useState(false);
//     const [audio, setAudio] = useState(null);
//     const [audioContext, setAudioContext] = useState(null);

//     useEffect(() => { return () => { stopMicrophone(); cancelAnimationFrame(animationRef.current); }; }, []);

//     const startRecording = async () => {
//         try {
//             const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//             streamRef.current = stream;
//             mediaRecorderRef.current = new MediaRecorder(stream);

//             audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
//             analyserRef.current = audioContextRef.current.createAnalyser();
//             analyserRef.current.fftSize = 256;
//             sourceRef.current = audioContextRef.current.createMediaStreamSource(stream);
//             sourceRef.current.connect(analyserRef.current);

//             mediaRecorderRef.current.ondataavailable = (event) => {
//                 if (event.data.size > 0) { audioChunksRef.current.push(event.data); }
//             };

//             mediaRecorderRef.current.onstop = () => {
//                 const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
//                 const url = URL.createObjectURL(audioBlob);
//                 setAudioUrl(url);
//                 recordings.push(url);
//             };

//             mediaRecorderRef.current.start();
//             setIsRecording(true);
//             setRecordingError(null);
//             drawEqualizer();
//         } catch (err) { setRecordingError('Error accessing microphone.'); }
//     };

//     const stopRecording = () => {
//         if (mediaRecorderRef.current && isRecording) {
//             mediaRecorderRef.current.stop();
//             stopMicrophone();
//             setIsRecording(false);
//             cancelAnimationFrame(animationRef.current);
//         }
//     };

//     const stopMicrophone = () => {
//         if (streamRef.current) { streamRef.current.getTracks().forEach(track => track.stop()); }
//         if (sourceRef.current) { sourceRef.current.disconnect(); }
//     };

//     const drawEqualizer = () => {
//         const canvas = canvasRef.current;
//         const canvasCtx = canvas.getContext('2d');
//         const analyser = analyserRef.current;

//         const setCanvasSize = () => {
//             if (window.matchMedia('(max-width: 600px)').matches) {
//                 canvas.height = 200;
//                 canvas.width = window.innerWidth * 0.9;
//             } else if (window.matchMedia('(max-width: 1024px)').matches) {
//                 canvas.height = 300;
//                 canvas.width = window.innerWidth * 0.8;
//             } else {
//                 canvas.height = 400;
//                 canvas.width = window.innerWidth * 0.7;
//             }
//         };

//         setCanvasSize();
//         window.addEventListener('resize', setCanvasSize);
//         const WIDTH = canvas.width;
//         const HEIGHT = canvas.height;
//         const bufferLength = analyser.frequencyBinCount;
//         const dataArray = new Uint8Array(bufferLength);

//         const draw = () => {
//             canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
//             animationRef.current = requestAnimationFrame(draw);
//             analyser.getByteFrequencyData(dataArray);
//             const barWidth = (WIDTH / bufferLength) * 2.5;
//             let barHeight;
//             let x = 0;

//             for (let i = 0; i < bufferLength; i++) {
//                 barHeight = dataArray[i] / 2;
//                 const r = barHeight + (25 * (i / bufferLength));
//                 const g = 250 * (i / bufferLength);
//                 const b = 50;

//                 canvasCtx.fillStyle = `rgb(${r},${g},${b})`;
//                 canvasCtx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);
//                 x += barWidth + 1;
//             }
//         };
//         draw();
//     };

//     const handleClick = () => {
//         if (isRecording) { stopRecording(); }
//         else { startRecording(); }
//         setIsRecording(!isRecording);
//     };

//     const handlePlayPauseClick = () => {
//         if (!audio) {
//             const newAudio = new Audio(recordings[0]);
//             const newAudioContext = new (window.AudioContext || window.webkitAudioContext)();
//             const analyser = newAudioContext.createAnalyser();
//             const source = newAudioContext.createMediaElementSource(newAudio);

//             source.connect(analyser);
//             analyser.connect(newAudioContext.destination);
//             drawEqualizer(analyser);

//             newAudio.play();
//             setAudio(newAudio);
//             setAudioContext(newAudioContext);
//             setIsPlaying(true);
//         } else {
//             if (isPlaying) { audio.pause(); }
//             else { audio.play(); }
//             setIsPlaying(!isPlaying);
//         }
//     };

//     useEffect(() => {
//         return () => {
//             if (audio) {
//                 audio.pause();
//                 cancelAnimationFrame(animationRef.current);
//                 audioContext.close();
//             }
//         };
//     }, [audio, audioContext]);

//     const MotionDots = () => {
//         return (
//             <div className="pulsating-dots">
//                 <div className="dot"></div>
//                 <div className="dot"></div>
//                 <div className="dot"></div>
//                 <div className="dot"></div>
//             </div>
//         );
//     };

//     return (
//         <div className={`container h-[84.5vh] 2xl:h-[91vh] flex flex-col justify-between items-center overflow-y-hidden`}>
//             {recordings.length === 0 ? <div className=""></div> : <div className=""></div>}
//             {recordings.length === 0 ? (
//                 <div className="w-1/2 h-1/3 2xl:h-1/5 bg-[#0E0D12] rounded-2xl border border-green-600 shadow-md shadow-green-600">
//                     <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="px-4 py-5 items-center justify-center">
//                         <h1 className="text-white text-md">Hi, User!</h1>
//                         <p className="text-white py-1 text-sm">It's great to have you here. To kick off our session, I'd love to hear all about you. Tell me about your background, your interests, and anything else you'd like to share. Feel free to include your hobbies, preferences, and what drives you.</p>
//                     </motion.div>
//                 </div>
//             ) : (
//                 <div className="w-full h-1/2 2xl:h-2/3 flex flex-col justify-center items-center relative overflow-y-auto">
//                     <canvas ref={canvasRef} className="w-1/2 h-1/2 bg-[#16151A] rounded-lg" />
//                     <VoiceAnalysis />
//                 </div>
//             )}

//             <div className="w-full h-1/6 bg-[#151418] border-t border-green-600">
//                 <div className="flex justify-center items-center px-10 py-4">
//                     <div className="flex justify-center items-center relative">
//                         <button className={`border-2 rounded-full border-green-600 w-16 h-16 flex items-center justify-center transition-transform duration-500 ease-in-out ${isRecording ? 'animate-pulse scale-110' : ''}`} onClick={handleClick} style={{ cursor: 'pointer', boxShadow: '0px 0px 15px rgba(0, 255, 0, 0.5)', position: 'relative' }}>
//                             {isRecording ? (<MotionDots />) : (<img className="p-2.5" src={NoTextLogo} alt="" />)}
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// function VoiceAnalysis() {
//     const [pitch, setPitch] = useState('Calculating...');
//     const [volume, setVolume] = useState('Calculating...');
//     const [isListening, setIsListening] = useState(false);

//     const analyserRef = useRef(null);  // Ref for analyser
//     const volumeMeterRef = useRef(null);  // Ref for volumeMeter

//     useEffect(() => {
//         let mic;

//         const startAnalysis = async () => {
//             try {
//                 // Initialize microphone input
//                 mic = new Tone.UserMedia();
//                 await mic.open();

//                 // Create analyser and volume meter and connect them to the mic
//                 analyserRef.current = new Tone.Analyser('fft', 32);
//                 mic.connect(analyserRef.current);

//                 volumeMeterRef.current = new Tone.Meter();
//                 mic.connect(volumeMeterRef.current);

//                 // Schedule recurring analysis with Tone.js
//                 Tone.Transport.scheduleRepeat(() => {
//                     const fftValues = analyserRef.current.getValue();
//                     const currentPitch = getPitchFromFFT(fftValues);
//                     setPitch(currentPitch);

//                     const currentVolume = volumeMeterRef.current.getLevel();
//                     setVolume(currentVolume.toFixed(2));
//                 }, '0.1');

//                 Tone.Transport.start();
//                 setIsListening(true);
//             } catch (error) {
//                 console.error('Error accessing microphone: ', error);
//             }
//         };

//         const stopAnalysis = () => {
//             Tone.Transport.stop();
//             if (mic) mic.close();
//             setIsListening(false);
//         };

//         // Start analysis when component mounts
//         if (!isListening) startAnalysis();

//         // Cleanup when component unmounts
//         return () => stopAnalysis();
//     }, [isListening]);
//     const getPitchFromFFT = (fftValues) => {
//         if (!analyserRef.current) return 'Unknown';  // Ensure analyser exists
//         const maxValue = Math.max(...fftValues);
//         const index = fftValues.indexOf(maxValue);
//         const frequency = (index * Tone.context.sampleRate) / analyserRef.current.size; // Use analyserRef.current.size
//         return `${frequency.toFixed(2)} Hz`;
//     };

//     return (
//         <div>
//             <h1>Pitch: {pitch}</h1>
//             <h1>Volume: {volume}</h1>
//         </div>
//     );
// }
