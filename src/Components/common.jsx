import { useEffect, useState } from 'react'

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

export const Counter = ({ targetNumber }) => {
    const [count, setCount] = useState(targetNumber - 10);
    useEffect(() => {
        if (count < targetNumber) {
            const interval = setInterval(() => { setCount(prevCount => Math.min(prevCount + 1, targetNumber)); }, 7);
            return () => clearInterval(interval);
        }
    }, [count, targetNumber]);
    return <h1 className="text-white text-2xl font-extrabold">{count}</h1>;
};

export const MetricTile = ({ title, value, position }) => {
    return (
        <div className={`p-4 w-1/2 flex justify-between items-center border-${position} border-green-600`}>
            <h2 className="text-white text-sm">{title}</h2>
            <Counter targetNumber={value} />
        </div>
    )
}