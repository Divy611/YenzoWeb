import React, { useEffect, useRef, useState } from 'react'

export const AudioRecorder = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [recordingError, setRecordingError] = useState(null);
    const [volume, setVolume] = useState(0);
    const mediaRecorderRef = useRef(null);
    const audioContextRef = useRef(null);
    const analyserRef = useRef(null);
    const audioChunksRef = useRef([]);
    const streamRef = useRef(null);

    useEffect(() => { return () => { stopMicrophone(); }; }, []);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            streamRef.current = stream;
            mediaRecorderRef.current = new MediaRecorder(stream);

            audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
            analyserRef.current = audioContextRef.current.createAnalyser();
            const source = audioContextRef.current.createMediaStreamSource(stream);
            source.connect(analyserRef.current);

            mediaRecorderRef.current.ondataavailable = (event) => {
                if (event.data.size > 0) { audioChunksRef.current.push(event.data); }
            };

            mediaRecorderRef.current.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
                const audioUrl = URL.createObjectURL(audioBlob);
                const audio = new Audio(audioUrl);
                audio.play();
            };

            mediaRecorderRef.current.start();
            setIsRecording(true);
            setRecordingError(null);
            updateVolume();
        } catch (err) { setRecordingError('Error accessing microphone. Please check your permissions.'); }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            stopMicrophone();
            setIsRecording(false);
            setVolume(0);
        }
    };

    const stopMicrophone = () => {
        if (streamRef.current) { streamRef.current.getTracks().forEach(track => track.stop()); }
        if (audioContextRef.current) { audioContextRef.current.close(); }
    };

    const updateVolume = () => {
        if (analyserRef.current && isRecording) {
            const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
            analyserRef.current.getByteFrequencyData(dataArray);
            const average = dataArray.reduce((acc, val) => acc + val, 0) / dataArray.length;
            setVolume(average);
            requestAnimationFrame(updateVolume);
        }
    };

    return (
        <div style={{ padding: '1rem' }}>
            <button className={`border-2 border-green-600`} onClick={isRecording ? stopRecording : startRecording} style={{ color: 'white', padding: '0.5rem 1rem', borderRadius: '0.25rem', cursor: 'pointer' }}></button>
            {recordingError && (
                <div style={{ backgroundColor: '#fecaca', color: '#dc2626', borderRadius: '0.25rem' }}>{recordingError}</div>
            )}
            {isRecording && (
                <div>
                    <div style={{ backgroundColor: '#e5e7eb', height: '1rem', borderRadius: '9999px', overflow: 'hidden' }}>
                        <div style={{ backgroundColor: '#22c55e', height: '100%', width: `${Math.min(100, volume)}%`, transition: 'width 100ms ease-in-out' }}></div>
                    </div>
                </div>
            )}
        </div>
    );
};