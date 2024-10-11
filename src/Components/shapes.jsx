import * as THREE from "three"
import React, { useState, useEffect, useRef } from 'react'

export function Globe() {
    const mountRef = useRef(null);

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(57.5, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);

        const sphereRadius = 7.5;
        const geometry = new THREE.IcosahedronGeometry(sphereRadius, 5);
        const material = new THREE.MeshBasicMaterial({ color: 0x43A047, wireframe: true });
        const sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);
        const particlesCount = 1000;
        const positions = new Float32Array(particlesCount * 3);
        const speeds = new Float32Array(particlesCount);

        for (let i = 0; i < particlesCount; i++) {
            const i3 = i * 3;
            const angle1 = Math.random() * Math.PI * 2;
            const angle2 = Math.random() * Math.PI * 2;

            positions[i3] = Math.sin(angle1) * Math.cos(angle2) * sphereRadius;
            positions[i3 + 1] = Math.sin(angle1) * Math.sin(angle2) * sphereRadius;
            positions[i3 + 2] = Math.cos(angle1) * sphereRadius;
            speeds[i] = Math.random() * 0.02 + 0.02;
        }

        const particlesGeometry = new THREE.BufferGeometry();
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.05,
            color: 0xffffff,
            transparent: true,
            opacity: 0.8,
        });

        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);

        camera.position.z = 20;

        let mouseX = 0;
        let mouseY = 0;

        const onMouseMove = (event) => {
            mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        };

        window.addEventListener('mousemove', onMouseMove);

        let animationFrameId;

        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            sphere.rotation.x += mouseY * 0.05;
            sphere.rotation.y += mouseX * 0.05;
            const positions = particlesMesh.geometry.attributes.position.array;

            for (let i = 0; i < particlesCount; i++) {
                const i3 = i * 3;
                const x = positions[i3];
                const y = positions[i3 + 1];
                const z = positions[i3 + 2];
                const distance = Math.sqrt(x * x + y * y + z * z);

                if (distance < sphereRadius * 0.9 || distance > sphereRadius * 1.5) { speeds[i] *= -1; }

                positions[i3] += (x / distance) * speeds[i];
                positions[i3 + 1] += (y / distance) * speeds[i];
                positions[i3 + 2] += (z / distance) * speeds[i];
            }
            particlesMesh.geometry.attributes.position.needsUpdate = true;
            renderer.render(scene, camera);
        };

        animate();
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('resize', handleResize);

            geometry.dispose();
            particlesGeometry.dispose();

            material.dispose();
            particlesMaterial.dispose();

            scene.remove(sphere);
            scene.remove(particlesMesh);

            renderer.dispose();
            if (mountRef.current) { mountRef.current.removeChild(renderer.domElement); }
        };
    }, []);
    return <div ref={mountRef} />;
};

export const Laptop = ({ imageUrl }) => {
    const mountRef = useRef(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        let scene, camera, renderer, imageMesh;
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(50, 1, 0.5, 75);
        camera.position.set(0, 1.75, 4);
        camera.lookAt(0, 0, 0);
        renderer = new THREE.WebGLRenderer({ antialias: true });

        const baseGeometry = new THREE.BoxGeometry(3, 0.2, 2);
        const baseMaterial = new THREE.MeshPhongMaterial({ color: 0x808080 });
        const base = new THREE.Mesh(baseGeometry, baseMaterial);
        scene.add(base);

        const screenGeometry = new THREE.BoxGeometry(3, 1.8, 0.1);
        const screenMaterial = new THREE.MeshPhongMaterial({ color: 0x808080 });
        const screen = new THREE.Mesh(screenGeometry, screenMaterial);
        screen.position.y = 0.9;
        screen.position.z = -1;
        screen.rotation.x = -Math.PI / 6;
        scene.add(screen);

        const loader = new THREE.TextureLoader();
        loader.load(
            imageUrl,
            (texture) => {
                const imageGeometry = new THREE.PlaneGeometry(2.65, 1.3);
                const imageMaterial = new THREE.MeshBasicMaterial({ map: texture });
                imageMesh = new THREE.Mesh(imageGeometry, imageMaterial);
                imageMesh.position.y = 0.91;
                imageMesh.position.z = -0.8;
                imageMesh.rotation.x = -Math.PI / 7;
                scene.add(imageMesh);
            },
            undefined,
            () => { setError('Failed to load image'); }
        );

        const ambientLight = new THREE.AmbientLight(0x404040);
        scene.add(ambientLight);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight.position.set(1, 1, 1);
        scene.add(directionalLight);

        const animate = () => {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };

        const handleResize = () => {
            if (!mountRef.current) return;
            const width = mountRef.current.clientWidth;
            const height = mountRef.current.clientHeight;
            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        };

        if (mountRef.current) {
            mountRef.current.appendChild(renderer.domElement);
            handleResize();
            animate();
        }
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (mountRef.current && renderer.domElement) { mountRef.current.removeChild(renderer.domElement); }
        };
    }, [imageUrl]);
    return (
        <div style={{ height: '300px', width: '100%' }}>
            <div ref={mountRef} style={{ width: '100%', height: '100%' }} />
            {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
    );
};