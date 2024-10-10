import React, { useRef, useEffect, useState } from 'react';

export default function WaveformVisualizer({ analyser }) {
    const canvasRef = useRef(null);
    const animationRef = useRef(null);
    const [metrics, setMetrics] = useState({
        confidence: 0,
        pitch: 0,
        clarity: 0,
        volume: 0
    });

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

            setMetrics({
                confidence: (Math.max(...dataArray) / 255) * 100,
                pitch: (dataArray[10] / 255) * 100,
                clarity: (dataArray[20] / 255) * 100,
                volume: (dataArray.reduce((acc, val) => acc + val, 0) / (bufferLength * 255)) * 100
            });
        };
        draw();
        return () => { cancelAnimationFrame(animationRef.current); };
    }, [analyser]);

    return (
        <div className='h-screen w-screen flex flex-col justify-between items-center'>
            <div className='p-5 w-full flex items-center justify-between'>
                <div className='flex flex-col items-center'>
                    <div className='text-white'>Confidence</div>
                    <div className='bg-gray-700 w-32 h-2 rounded'>
                        <div className='bg-green-500 h-full rounded' style={{ width: `${metrics.confidence}%` }}></div>
                    </div>
                </div>
                <div className='flex flex-col items-center'>
                    <div className='text-white'>Pitch</div>
                    <div className='bg-gray-700 w-32 h-2 rounded'>
                        <div className='bg-blue-500 h-full rounded' style={{ width: `${metrics.pitch}%` }}></div>
                    </div>
                </div>
            </div>
            <canvas ref={canvasRef} width="800" height="200" style={{ background: 'transparent' }} />
            <div className='p-5 w-full flex items-center justify-between'>
                <div className='flex flex-col items-center'>
                    <div className='text-white'>Clarity</div>
                    <div className='bg-gray-700 w-32 h-2 rounded'>
                        <div className='bg-purple-500 h-full rounded' style={{ width: `${metrics.clarity}%` }}></div>
                    </div>
                </div>
                <div className='flex flex-col items-center'>
                    <div className='text-white'>Volume</div>
                    <div className='bg-gray-700 w-32 h-2 rounded'>
                        <div className='bg-red-500 h-full rounded' style={{ width: `${metrics.volume}%` }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}