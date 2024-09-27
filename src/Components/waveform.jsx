import React, { useRef, useEffect } from 'react';

export default function WaveformVisualizer({ analyser }) {
    const canvasRef = useRef(null);
    const animationRef = useRef(null);

    useEffect(() => {
        if (!analyser) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const WIDTH = canvas.width;
        const HEIGHT = canvas.height;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        const gradient = ctx.createLinearGradient(0, HEIGHT / 2, WIDTH, HEIGHT / 2);

        gradient.addColorStop(0, '#00ffff');
        gradient.addColorStop(0.5, '#8A2BE2');
        gradient.addColorStop(1, '#ff69b4');

        const draw = () => {
            animationRef.current = requestAnimationFrame(draw);
            analyser.getByteFrequencyData(dataArray);
            ctx.clearRect(0, 0, WIDTH, HEIGHT);
            ctx.lineWidth = 2;
            ctx.strokeStyle = gradient;

            const drawHalf = (yOffset, direction) => {
                ctx.beginPath();
                let x = 0;
                for (let i = 0; i < bufferLength; i++) {
                    const percent = dataArray[i] / 255;
                    const height = (HEIGHT / 2) * percent * direction;
                    const y = yOffset + height;

                    if (i === 0) { ctx.moveTo(x, y); }
                    else { ctx.lineTo(x, y); }
                    x += WIDTH / bufferLength;
                }
                ctx.stroke();
            };

            drawHalf(HEIGHT / 2, -1);
            drawHalf(HEIGHT / 2, 1);
            ctx.save();
            ctx.filter = 'blur(4px)';
            ctx.globalCompositeOperation = 'screen';
            ctx.strokeStyle = 'rgba(0, 255, 255, 0.5)';
            drawHalf(HEIGHT / 2, -1);
            drawHalf(HEIGHT / 2, 1);
            ctx.restore();
        };
        draw();
        return () => { cancelAnimationFrame(animationRef.current); };
    }, [analyser]);

    return <canvas ref={canvasRef} width="800" height="200" style={{ background: 'transparent' }} />;
}