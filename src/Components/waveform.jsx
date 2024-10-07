import React, { useRef, useEffect } from 'react';

export default function WaveformVisualizer({ analyser }) {
    const canvasRef = useRef(null);
    const animationRef = useRef(null);

    useEffect(() => {
        if (!analyser) {
            console.error('AnalyserNode is not provided!');
            return;
        }

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const WIDTH = canvas.width;
        const HEIGHT = canvas.height;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const draw = () => {
            animationRef.current = requestAnimationFrame(draw);
            //analyser.getByteFrequencyData(dataArray);
            ctx.clearRect(0, 0, WIDTH, HEIGHT);
            ctx.lineWidth = 2;
            ctx.strokeStyle = '#00ff00';
            ctx.beginPath();

            const sliceWidth = WIDTH * 1.0 / bufferLength;
            let x = 0;

            for (let i = 0; i < bufferLength; i++) {
                const v = dataArray[i] / 255.0;
                const y = HEIGHT - (HEIGHT * v);

                if (i === 0) { ctx.moveTo(x, y); }
                else { ctx.lineTo(x, y); }
                x += sliceWidth;
            }
            ctx.lineTo(canvas.width, canvas.height / 2);
            ctx.stroke();
        };
        draw();
        return () => { cancelAnimationFrame(animationRef.current); };
    }, [analyser]);
    return <canvas ref={canvasRef} width="800" height="200" style={{ background: 'transparent' }} />;
}
