import NoTextLogo from "../assets/logo_no_title.png";
import React, { useEffect, useRef, useState } from 'react'

export const AudioRecorder = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [recordingError, setRecordingError] = useState(null);
    const [audioUrl, setAudioUrl] = useState(null);
    const mediaRecorderRef = useRef(null);
    const audioContextRef = useRef(null);
    const analyserRef = useRef(null);
    const sourceRef = useRef(null);
    const audioChunksRef = useRef([]);
    const streamRef = useRef(null);
    const canvasRef = useRef(null);
    const animationRef = useRef(null);
    const audioRef = useRef(null);

    useEffect(() => {
        return () => { stopMicrophone(); cancelAnimationFrame(animationRef.current); };
    }, []);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            streamRef.current = stream;
            mediaRecorderRef.current = new MediaRecorder(stream);

            audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
            analyserRef.current = audioContextRef.current.createAnalyser();
            analyserRef.current.fftSize = 256;
            sourceRef.current = audioContextRef.current.createMediaStreamSource(stream);
            sourceRef.current.connect(analyserRef.current);

            mediaRecorderRef.current.ondataavailable = (event) => {
                if (event.data.size > 0) { audioChunksRef.current.push(event.data); }
            };

            mediaRecorderRef.current.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
                const url = URL.createObjectURL(audioBlob);
                setAudioUrl(url);
            };

            mediaRecorderRef.current.start();
            setIsRecording(true);
            setRecordingError(null);
            drawEqualizer();
        } catch (err) { setRecordingError('Error accessing microphone.'); }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            stopMicrophone();
            setIsRecording(false);
            cancelAnimationFrame(animationRef.current);
        }
    };

    const stopMicrophone = () => {
        if (streamRef.current) { streamRef.current.getTracks().forEach(track => track.stop()); }
        if (sourceRef.current) { sourceRef.current.disconnect(); }
    };

    // const playRecording = () => {
    //     if (audioUrl) {
    //         audioRef.current = new Audio(audioUrl);
    //         audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    //         analyserRef.current = audioContextRef.current.createAnalyser();
    //         analyserRef.current.fftSize = 256;
    //         sourceRef.current = audioContextRef.current.createMediaElementSource(audioRef.current);
    //         sourceRef.current.connect(analyserRef.current);
    //         analyserRef.current.connect(audioContextRef.current.destination);

    //         audioRef.current.onended = () => {
    //             setIsPlaying(false);
    //             cancelAnimationFrame(animationRef.current);
    //         };

    //         audioRef.current.play();
    //         setIsPlaying(true);
    //         drawEqualizer();
    //     }
    // };

    // const stopPlayback = () => {
    //     if (audioRef.current) {
    //         audioRef.current.pause();
    //         audioRef.current.currentTime = 0;
    //     }
    //     setIsPlaying(false);
    //     cancelAnimationFrame(animationRef.current);
    // };

    const drawEqualizer = () => {
        const canvas = canvasRef.current;
        const canvasCtx = canvas.getContext('2d');
        const analyser = analyserRef.current;

        const setCanvasSize = () => {
            if (window.matchMedia('(max-width: 600px)').matches) {
                canvas.height = 200;
                canvas.width = window.innerWidth * 0.9;
            } else if (window.matchMedia('(max-width: 1024px)').matches) {
                canvas.height = 300;
                canvas.width = window.innerWidth * 0.8;
            } else {
                canvas.height = 400;
                canvas.width = window.innerWidth * 0.7;
            }
        };

        setCanvasSize();
        window.addEventListener('resize', setCanvasSize);

        const WIDTH = canvas.width;
        const HEIGHT = canvas.height;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const draw = () => {
            canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
            animationRef.current = requestAnimationFrame(draw);
            analyser.getByteFrequencyData(dataArray);

            canvasCtx.fillStyle = 'rgb(0, 0, 0)';
            canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

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

    // const drawEqualizer = () => {
    //     const canvas = canvasRef.current;
    //     const canvasCtx = canvas.getContext('2d');
    //     const WIDTH = canvas.width;
    //     const HEIGHT = canvas.height;
    //     const bufferLength = analyserRef.current.frequencyBinCount;
    //     const dataArray = new Uint8Array(bufferLength);

    //     canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

    //     const draw = () => {
    //         animationRef.current = requestAnimationFrame(draw);
    //         analyserRef.current.getByteFrequencyData(dataArray);

    //         canvasCtx.fillStyle = 'rgb(0, 0, 0)';
    //         canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

    //         const barWidth = (WIDTH / bufferLength) * 2.5;
    //         let barHeight;
    //         let x = 0;

    //         for (let i = 0; i < bufferLength; i++) {
    //             barHeight = dataArray[i] / 2;

    //             const r = barHeight + (25 * (i / bufferLength));
    //             const g = 250 * (i / bufferLength);
    //             const b = 50;

    //             canvasCtx.fillStyle = `rgb(${r},${g},${b})`;
    //             canvasCtx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

    //             x += barWidth + 1;
    //         }
    //     };

    //     draw();
    // };


    return (
        <div className="flex justify-center items-center relative">
            <button className={`border-2 rounded-full border-green-600 w-16 h-16 flex items-center justify-center transition-transform duration-500 ease-in-out ${isRecording ? 'animate-pulse scale-110' : ''}`} onClick={isRecording ? stopRecording : startRecording} style={{ background: '#151418', color: 'white', cursor: 'pointer', boxShadow: '0px 0px 15px rgba(0, 255, 0, 0.5)', position: 'relative', }}>
                {isRecording ? (<MotionDots />) : (<img className="p-2.5" src={NoTextLogo} />)}
            </button>
        </div>
        // <div className="flex justify-center items-center">
        //     <button className={`border-2 rounded-full border-green-600 w-16 h-16 flex items-center justify-center transition-transform duration-500 ease-in-out ${isRecording ? 'animate-pulse scale-110' : ''}`} onClick={isRecording ? stopRecording : startRecording} style={{ background: '#151418', color: 'white', cursor: 'pointer', boxShadow: '0px 0px 15px rgba(0, 255, 0, 0.5)', }}>
        //         {isRecording ? (
        //             <i className="fa-solid fa-stop text-green-600"></i>
        //         ) : (
        //             <i className="fa-solid fa-microphone text-green-600"></i>
        //         )}
        //     </button>
        // </div>
        // <div className='p-2 flex overflow-y-hidden'>
        //     <button className={`border-2 rounded-lg border-green-600 w-12`} onClick={isRecording ? stopRecording : startRecording} style={{ color: 'white', cursor: 'pointer' }}>
        //         {isRecording ? <i class="fa-solid fa-stop text-green-600 py-3"></i> : <i class="fa-solid fa-microphone text-green-600 py-3"></i>}
        //     </button>
        //     {/* {audioUrl && !isRecording && (
        //         <button className='ml-2 rounded-lg h-full' onClick={isPlaying ? stopPlayback : playRecording} style={{ backgroundColor: isPlaying ? '#ef4444' : '#10b981', color: 'white', fontWeight: 'bold', padding: '0.5rem 1rem', border: 'none', cursor: 'pointer' }}>
        //             {isPlaying ? 'Stop Playback' : 'Play Recording'}
        //         </button>
        //     )}
        //     {recordingError && (<div className='p-1 ml-2 rounded-lg bg-pink-200'>{recordingError}</div>)} */}
        //     <canvas className='ml-2' style={{ display: (isRecording || isPlaying) ? 'block' : 'none' }} ref={canvasRef} />
        // </div>
    );
};

export const MotionDots = () => {
    return (
        <div className="pulsating-dots">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
        </div>
    )
}
