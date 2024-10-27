import { motion } from 'framer-motion';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl';
import * as essentia from 'essentia.js';
import * as PitchFinder from 'pitchfinder';
import * as Meyda from 'meyda';
import { PolarityProcessor } from 'web-audio-api-polarity';
import Prism from 'prismjs';
import { AudioFeatures } from 'audio-features';
import React, { useEffect, useRef, useState } from 'react';

export const RecorderScreen = () => {
    // Refs and state setup
    const streamRef = useRef(null);
    const sourceRef = useRef(null);
    const analyserRef = useRef(null);
    const animationRef = useRef(null);
    const audioContextRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const essentiaRef = useRef(null);
    const meydaAnalyzerRef = useRef(null);
    
    const [metrics, setMetrics] = useState(null);
    const [audioData, setAudioData] = useState(null);
    const [isRecording, setIsRecording] = useState(false);
    const [fillerWordCount, setFillerWordCount] = useState(0);
    const [advancedMetrics, setAdvancedMetrics] = useState(null);

    // Initialize libraries
    useEffect(() => {
        const initializeLibraries = async () => {
            await tf.setBackend('webgl');
            essentiaRef.current = new essentia.EssentiaWASM();
            await essentiaRef.current.initialize();
        };

        initializeLibraries();

        return () => {
            stopRecording();
            if (audioContextRef.current) audioContextRef.current.close();
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
            if (essentiaRef.current) essentiaRef.current.delete();
        };
    }, []);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ 
                audio: { 
                    echoCancellation: true,
                    noiseSuppression: true,
                    autoGainControl: true,
                    channelCount: 1,
                    sampleRate: 44100
                } 
            });

            streamRef.current = stream;
            audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)({
                sampleRate: 44100,
                latencyHint: 'interactive'
            });

            // Setup analyzers
            analyserRef.current = audioContextRef.current.createAnalyser();
            analyserRef.current.fftSize = 2048;
            analyserRef.current.smoothingTimeConstant = 0.8;

            sourceRef.current = audioContextRef.current.createMediaStreamSource(stream);
            sourceRef.current.connect(analyserRef.current);

            // Setup Meyda
            meydaAnalyzerRef.current = Meyda.createMeydaAnalyzer({
                audioContext: audioContextRef.current,
                source: sourceRef.current,
                bufferSize: 512,
                numberOfMFCCCoefficients: 13,
                featureExtractors: [
                    "mfcc",
                    "spectralCentroid",
                    "spectralRolloff",
                    "spectralFlatness",
                    "perceptualSpread",
                    "spectralSkewness",
                    "zcr"
                ]
            });

            mediaRecorderRef.current = new MediaRecorder(stream);
            mediaRecorderRef.current.ondataavailable = handleDataAvailable;
            mediaRecorderRef.current.start(100); // Collect data every 100ms

            setIsRecording(true);
            analyzeAudioLoop();

        } catch (err) {
            console.error("Recording initialization error:", err);
        }
    };

    const handleDataAvailable = async (event) => {
        if (event.data.size > 0) {
            const audioBlob = new Blob([event.data], { type: 'audio/wav' });
            const arrayBuffer = await audioBlob.arrayBuffer();
            const audioData = await audioContextRef.current.decodeAudioData(arrayBuffer);
            setAudioData(audioData);
            performAdvancedAnalysis(audioData);
        }
    };

    const performAdvancedAnalysis = async (audioData) => {
        const buffer = audioData.getChannelData(0);
        
        // Essentia analysis
        const essentiaFeatures = await essentiaRef.current.computeAll(buffer);
        
        // PitchFinder analysis
        const detectPitch = PitchFinder.YIN({ sampleRate: audioContextRef.current.sampleRate });
        const pitchData = detectPitch(buffer);

        // Meyda features
        const meydaFeatures = meydaAnalyzerRef.current.get();

        // TensorFlow.js analysis
        const tensorAnalysis = await performTensorFlowAnalysis(buffer);

        // Combine all analyses
        const combinedAnalysis = {
            // Pitch Analysis
            pitch: {
                fundamental: pitchData,
                harmonicity: essentiaFeatures.harmonicity,
                inharmonicity: essentiaFeatures.inharmonicity
            },

            // Spectral Analysis
            spectral: {
                centroid: meydaFeatures.spectralCentroid,
                rolloff: meydaFeatures.spectralRolloff,
                flatness: meydaFeatures.spectralFlatness,
                spread: meydaFeatures.perceptualSpread,
                skewness: meydaFeatures.spectralSkewness,
                mfcc: meydaFeatures.mfcc
            },

            // Temporal Analysis
            temporal: {
                zcr: meydaFeatures.zcr,
                rms: essentiaFeatures.rms,
                loudness: essentiaFeatures.loudness
            },

            // Voice Quality
            voice: {
                clarity: calculateClarity(buffer),
                brightness: tensorAnalysis.brightness,
                warmth: tensorAnalysis.warmth
            },

            // Rhythm Analysis
            rhythm: {
                bpm: essentiaFeatures.bpm,
                beats: essentiaFeatures.beats,
                rhythm_strength: calculateRhythmStrength(buffer)
            }
        };

        setAdvancedMetrics(combinedAnalysis);
        updateDisplayMetrics(combinedAnalysis);
    };

    const performTensorFlowAnalysis = async (buffer) => {
        const tensor = tf.tensor1d(buffer);
        
        // Spectral analysis using TF.js
        const stft = tf.signal.stft(tensor, 1024, 256);
        const magnitudes = tf.abs(stft);
        
        // Calculate various spectral features
        const brightness = tf.mean(magnitudes.slice([0, magnitudes.shape[1]/2], [-1, -1]));
        const warmth = tf.mean(magnitudes.slice([0, 0], [-1, magnitudes.shape[1]/4]));
        
        const results = {
            brightness: await brightness.data(),
            warmth: await warmth.data()
        };
        
        // Cleanup
        tf.dispose([tensor, stft, magnitudes, brightness, warmth]);
        
        return results;
    };

    const calculateClarity = (buffer) => {
        // Implementation of signal-to-noise ratio and spectral flatness
        const windowSize = 2048;
        let clarity = 0;
        
        for (let i = 0; i < buffer.length - windowSize; i += windowSize) {
            const window = buffer.slice(i, i + windowSize);
            const spectrum = new Float32Array(windowSize);
            
            // Compute FFT
            const fft = new Float32Array(windowSize);
            for (let j = 0; j < windowSize; j++) {
                fft[j] = window[j];
            }
            
            // Calculate spectral flatness
            let geometricMean = 0;
            let arithmeticMean = 0;
            
            for (let j = 0; j < windowSize/2; j++) {
                const magnitude = Math.sqrt(fft[j] * fft[j]);
                geometricMean += Math.log(magnitude + 1e-6);
                arithmeticMean += magnitude;
            }
            
            geometricMean = Math.exp(geometricMean / (windowSize/2));
            arithmeticMean /= (windowSize/2);
            
            clarity += arithmeticMean / geometricMean;
        }
        
        return clarity / (buffer.length / windowSize);
    };

    const calculateRhythmStrength = (buffer) => {
        // Onset detection and rhythm strength calculation
        const windowSize = 1024;
        const hopSize = 512;
        let rhythmStrength = 0;
        
        for (let i = 0; i < buffer.length - windowSize; i += hopSize) {
            const window = buffer.slice(i, i + windowSize);
            let energy = 0;
            let energyDiff = 0;
            
            // Calculate energy and energy difference
            for (let j = 0; j < windowSize; j++) {
                energy += window[j] * window[j];
                if (j > 0) {
                    energyDiff += Math.abs(window[j] - window[j-1]);
                }
            }
            
            rhythmStrength += (energyDiff * energy);
        }
        
        return Math.log10(rhythmStrength + 1);
    };

    const updateDisplayMetrics = (analysis) => {
        setMetrics({
            pitch: Number(analysis.pitch.fundamental?.toFixed(2) || 0),
            clarity: Number(analysis.voice.clarity.toFixed(2)),
            volume: Number(analysis.temporal.loudness.toFixed(2)),
            tone: Number(((analysis.voice.warmth + analysis.voice.brightness) / 2).toFixed(2)),
            confidence: calculateConfidenceScore(analysis),
            fillerWords: fillerWordCount
        });
    };

    const calculateConfidenceScore = (analysis) => {
        // Weighted scoring of multiple factors
        const weights = {
            pitch: 0.2,
            clarity: 0.3,
            volume: 0.15,
            rhythm: 0.15,
            spectral: 0.2
        };

        const scores = {
            pitch: normalizePitch(analysis.pitch.fundamental) * (1 - analysis.pitch.inharmonicity),
            clarity: analysis.voice.clarity,
            volume: normalizeVolume(analysis.temporal.loudness),
            rhythm: normalizeRhythm(analysis.rhythm.rhythm_strength),
            spectral: normalizeSpectral(analysis.spectral.centroid)
        };

        return Object.entries(weights).reduce((score, [key, weight]) => {
            return score + (scores[key] * weight);
        }, 0) * 100;
    };

    // Normalization helper functions
    const normalizePitch = (pitch) => /* normalization logic */;
    const normalizeVolume = (volume) => /* normalization logic */;
    const normalizeRhythm = (rhythm) => /* normalization logic */;
    const normalizeSpectral = (centroid) => /* normalization logic */;

    // ... rest of your UI component code ...

    return (
        <div className="flex flex-col h-screen bg-gray-900">
            {/* Your existing UI code */}
        </div>
    );
};

export default RecorderScreen;
