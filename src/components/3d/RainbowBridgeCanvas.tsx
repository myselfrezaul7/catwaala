"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Sparkles, Flame } from "lucide-react";

interface LanternData {
    x: number;
    y: number;
    z: number;
    speed: number;
    swaySpeed: number;
    swayAmount: number;
    phase: number;
    rotSpeed: number;
    scale: number;
}

export function RainbowBridgeCanvas() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [recentLanternName, setRecentLanternName] = useState<string | null>(null);
    const [lanternCount, setLanternCount] = useState<number>(108);

    useEffect(() => {
        const container = containerRef.current;
        const canvas = canvasRef.current;
        if (!container || !canvas) return;

        // Check reduced motion
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        // Scene setup
        const scene = new THREE.Scene();

        // Camera setup
        const camera = new THREE.PerspectiveCamera(
            55,
            container.clientWidth / container.clientHeight,
            0.1,
            100
        );
        camera.position.set(0, 2, 14);

        // Renderer setup
        let renderer: THREE.WebGLRenderer;
        try {
            renderer = new THREE.WebGLRenderer({
                canvas,
                alpha: true,
                antialias: true,
                powerPreference: "low-power",
            });
        } catch (e) {
            console.warn("WebGL not supported for RainbowBridgeCanvas", e);
            return;
        }

        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.1;

        // Lighting
        const ambientLight = new THREE.AmbientLight(0x312e81, 1.2); // twilight indigo ambient
        scene.add(ambientLight);

        const moonLight = new THREE.DirectionalLight(0xc7d2fe, 1.0);
        moonLight.position.set(5, 12, 8);
        scene.add(moonLight);

        const warmHazeLight = new THREE.PointLight(0xffa040, 2.0, 25);
        warmHazeLight.position.set(0, 0, 4);
        scene.add(warmHazeLight);

        // --- Procedural Aurora / Rainbow Glow Ribbon ---
        const auroraGeo = new THREE.PlaneGeometry(36, 12, 32, 16);
        const auroraMat = new THREE.ShaderMaterial({
            transparent: true,
            depthWrite: false,
            side: THREE.DoubleSide,
            uniforms: {
                uTime: { value: 0 },
            },
            vertexShader: `
                uniform float uTime;
                varying vec2 vUv;
                varying float vElevation;
                void main() {
                    vUv = uv;
                    vec3 pos = position;
                    float wave1 = sin(pos.x * 0.25 + uTime * 0.4) * 1.5;
                    float wave2 = cos(pos.y * 0.35 + uTime * 0.3) * 1.2;
                    pos.z += wave1 + wave2;
                    vElevation = pos.z;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
                }
            `,
            fragmentShader: `
                varying vec2 vUv;
                varying float vElevation;
                void main() {
                    // Soft rainbow aurora gradient (teal -> violet -> rose -> amber)
                    vec3 col1 = vec3(0.15, 0.7, 0.7);   // soft cyan
                    vec3 col2 = vec3(0.55, 0.25, 0.85); // mystic violet
                    vec3 col3 = vec3(0.95, 0.45, 0.55); // twilight rose
                    vec3 col4 = vec3(1.0, 0.75, 0.3);   // golden amber

                    float t = vUv.x;
                    vec3 color = mix(col1, col2, smoothstep(0.0, 0.35, t));
                    color = mix(color, col3, smoothstep(0.35, 0.7, t));
                    color = mix(color, col4, smoothstep(0.7, 1.0, t));

                    // Fade at vertical edges
                    float edgeFade = sin(vUv.y * 3.14159);
                    float alpha = edgeFade * 0.28;
                    gl_FragColor = vec4(color, alpha);
                }
            `,
        });

        const auroraMesh = new THREE.Mesh(auroraGeo, auroraMat);
        auroraMesh.position.set(0, 5, -8);
        auroraMesh.rotation.x = 0.2;
        scene.add(auroraMesh);

        // --- Distant Stars Particles ---
        const starCount = 120;
        const starGeo = new THREE.BufferGeometry();
        const starPositions = new Float32Array(starCount * 3);
        for (let i = 0; i < starCount; i++) {
            starPositions[i * 3] = (Math.random() - 0.5) * 40;
            starPositions[i * 3 + 1] = Math.random() * 20 - 2;
            starPositions[i * 3 + 2] = -10 - Math.random() * 15;
        }
        starGeo.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
        const starMat = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.15,
            transparent: true,
            opacity: 0.7,
        });
        const stars = new THREE.Points(starGeo, starMat);
        scene.add(stars);

        // --- Instanced Lanterns ---
        const TOTAL_LANTERNS = 45;
        // Lantern body geometry: hexagonal cylinder
        const lanternGeo = new THREE.CylinderGeometry(0.28, 0.38, 0.8, 6);
        const lanternMat = new THREE.MeshStandardMaterial({
            color: 0xffddaa,
            emissive: 0xff7b22,
            emissiveIntensity: 1.4,
            roughness: 0.4,
            metalness: 0.1,
        });

        const instancedLanterns = new THREE.InstancedMesh(lanternGeo, lanternMat, TOTAL_LANTERNS);
        instancedLanterns.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
        scene.add(instancedLanterns);

        // Lantern Cap (Roof)
        const capGeo = new THREE.ConeGeometry(0.42, 0.22, 6);
        const capMat = new THREE.MeshStandardMaterial({
            color: 0x3e180d,
            roughness: 0.8,
        });
        const instancedCaps = new THREE.InstancedMesh(capGeo, capMat, TOTAL_LANTERNS);
        instancedCaps.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
        scene.add(instancedCaps);

        // Lantern Data
        const lanterns: LanternData[] = [];
        for (let i = 0; i < TOTAL_LANTERNS; i++) {
            lanterns.push({
                x: (Math.random() - 0.5) * 26,
                y: (Math.random() - 0.5) * 16,
                z: -6 + (Math.random() - 0.5) * 12,
                speed: 0.008 + Math.random() * 0.012,
                swaySpeed: 0.8 + Math.random() * 0.8,
                swayAmount: 0.15 + Math.random() * 0.25,
                phase: Math.random() * Math.PI * 2,
                rotSpeed: 0.004 + Math.random() * 0.006,
                scale: 0.7 + Math.random() * 0.6,
            });
        }

        // --- Dynamic Spawned Lanterns (User Ignited) ---
        interface DynamicLantern {
            obj: THREE.Group;
            speed: number;
            swayPhase: number;
            life: number;
        }
        const dynamicLanterns: DynamicLantern[] = [];

        function spawnDynamicLantern(name?: string) {
            const group = new THREE.Group();

            // Body
            const body = new THREE.Mesh(lanternGeo, lanternMat.clone());
            (body.material as THREE.MeshStandardMaterial).emissiveIntensity = 2.2;
            group.add(body);

            // Cap
            const cap = new THREE.Mesh(capGeo, capMat);
            cap.position.y = 0.45;
            group.add(cap);

            // PointLight attached to fresh lantern
            const pLight = new THREE.PointLight(0xffaa33, 2.5, 8);
            group.add(pLight);

            // Random starting location near bottom foreground
            const x = (Math.random() - 0.5) * 8;
            const y = -4.5;
            const z = 4 + (Math.random() - 0.5) * 3;
            group.position.set(x, y, z);
            group.scale.set(1.1, 1.1, 1.1);

            scene.add(group);
            dynamicLanterns.push({
                obj: group,
                speed: 0.022 + Math.random() * 0.01,
                swayPhase: Math.random() * Math.PI * 2,
                life: 0,
            });

            setLanternCount(prev => prev + 1);
            if (name) {
                setRecentLanternName(name);
                setTimeout(() => setRecentLanternName(null), 4000);
            }
        }

        // Window Event Listener for external candle lights
        const handleExternalCandle = (event: Event) => {
            const customEvent = event as CustomEvent<{ name?: string }>;
            spawnDynamicLantern(customEvent.detail?.name);
        };
        window.addEventListener("catwaala:light-candle", handleExternalCandle);
        window.addEventListener("light-candle", handleExternalCandle);

        // Performance Optimization: 30 FPS Cap & Pause when off-screen
        let isPaused = false;
        const observer = new IntersectionObserver(
            ([entry]) => {
                isPaused = !entry.isIntersecting;
            },
            { threshold: 0.05 }
        );
        observer.observe(container);

        // Resize handler
        const handleResize = () => {
            if (!container || !renderer) return;
            const width = container.clientWidth;
            const height = container.clientHeight;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
        };
        window.addEventListener("resize", handleResize);

        // Animation Loop
        let animId: number;
        const dummyMatrix = new THREE.Matrix4();
        const dummyPosition = new THREE.Vector3();
        const dummyQuaternion = new THREE.Quaternion();
        const dummyScale = new THREE.Vector3();
        const dummyEuler = new THREE.Euler();

        const fps = 30;
        const frameInterval = 1000 / fps;
        let lastFrameTime = performance.now();
        let totalElapsed = 0;

        const animate = (currentTime: number) => {
            animId = requestAnimationFrame(animate);

            if (isPaused) return;

            const delta = currentTime - lastFrameTime;
            if (delta < frameInterval) return;
            lastFrameTime = currentTime - (delta % frameInterval);

            const dt = prefersReducedMotion ? 0 : 0.033;
            totalElapsed += dt;

            // Animate Aurora
            auroraMat.uniforms.uTime.value = totalElapsed;

            // Animate Instanced Lanterns
            for (let i = 0; i < TOTAL_LANTERNS; i++) {
                const l = lanterns[i];
                if (!prefersReducedMotion) {
                    l.y += l.speed;
                    if (l.y > 11) {
                        l.y = -8;
                        l.x = (Math.random() - 0.5) * 26;
                        l.z = -6 + (Math.random() - 0.5) * 12;
                    }
                }

                const currentX = l.x + Math.sin(totalElapsed * l.swaySpeed + l.phase) * l.swayAmount;
                const rotY = totalElapsed * l.rotSpeed + l.phase;
                const rotZ = Math.sin(totalElapsed * l.swaySpeed + l.phase) * 0.08;

                dummyPosition.set(currentX, l.y, l.z);
                dummyEuler.set(0, rotY, rotZ);
                dummyQuaternion.setFromEuler(dummyEuler);
                dummyScale.set(l.scale, l.scale, l.scale);

                dummyMatrix.compose(dummyPosition, dummyQuaternion, dummyScale);
                instancedLanterns.setMatrixAt(i, dummyMatrix);

                // Roof follows body
                dummyPosition.y += 0.45 * l.scale;
                dummyMatrix.compose(dummyPosition, dummyQuaternion, dummyScale);
                instancedCaps.setMatrixAt(i, dummyMatrix);
            }

            instancedLanterns.instanceMatrix.needsUpdate = true;
            instancedCaps.instanceMatrix.needsUpdate = true;

            // Animate Dynamic User Lanterns
            for (let i = dynamicLanterns.length - 1; i >= 0; i--) {
                const dl = dynamicLanterns[i];
                dl.life += dt;
                dl.obj.position.y += dl.speed;
                dl.obj.position.x += Math.sin(totalElapsed * 1.5 + dl.swayPhase) * 0.015;
                dl.obj.rotation.y += 0.01;
                dl.obj.rotation.z = Math.sin(totalElapsed * 1.2 + dl.swayPhase) * 0.06;

                // Gentle drift into distance
                dl.obj.position.z -= 0.008;

                if (dl.obj.position.y > 14 || dl.life > 25) {
                    scene.remove(dl.obj);
                    dynamicLanterns.splice(i, 1);
                }
            }

            renderer.render(scene, camera);
        };

        animId = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animId);
            observer.disconnect();
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("catwaala:light-candle", handleExternalCandle);
            window.removeEventListener("light-candle", handleExternalCandle);

            // Clean up Three.js
            auroraGeo.dispose();
            auroraMat.dispose();
            starGeo.dispose();
            starMat.dispose();
            lanternGeo.dispose();
            lanternMat.dispose();
            capGeo.dispose();
            capMat.dispose();
            dynamicLanterns.forEach(dl => scene.remove(dl.obj));
            renderer.dispose();
        };
    }, []);

    const handleManualRelease = () => {
        if (typeof window !== "undefined") {
            window.dispatchEvent(
                new CustomEvent("catwaala:light-candle", {
                    detail: { name: "A Beloved Friend" },
                })
            );
        }
    };

    return (
        <div
            ref={containerRef}
            className="relative w-full h-[380px] sm:h-[440px] md:h-[480px] overflow-hidden bg-gradient-to-b from-[#0a0a18] via-[#121128] to-[#1c1836] select-none"
            role="region"
            aria-label="3D Rainbow Bridge Sky Sanctuary"
        >
            {/* Ambient vignette gradient */}
            <div className="absolute inset-0 bg-radial-vignette pointer-events-none opacity-60 z-10" />

            {/* Three.js Canvas */}
            <canvas
                ref={canvasRef}
                className="w-full h-full block"
                aria-hidden="true"
                role="presentation"
                tabIndex={-1}
            />

            {/* Overlay Sanctuary HUD */}
            <div className="absolute inset-x-0 bottom-6 z-20 flex flex-col items-center justify-center px-4 pointer-events-none">
                <div className="flex flex-wrap items-center justify-center gap-3 backdrop-blur-xl bg-black/40 border border-white/10 py-2.5 px-5 rounded-full shadow-2xl text-white pointer-events-auto">
                    <span className="flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wide text-rose-200">
                        <Flame className="w-4 h-4 text-amber-400 fill-amber-400 animate-pulse" />
                        <span>{lanternCount} Lanterns Floating to the Rainbow Bridge</span>
                    </span>

                    <button
                        onClick={handleManualRelease}
                        className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white text-xs font-bold shadow-md shadow-rose-500/20 hover:scale-105 active:scale-95 transition-all"
                        aria-label="Light a lantern into the sky"
                    >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Light a Sky Lantern</span>
                    </button>
                </div>

                {recentLanternName && (
                    <div className="mt-2 text-xs font-medium text-amber-200/90 animate-fade-in">
                        ✨ A warm lantern was just lit in honor of <strong className="text-white">{recentLanternName}</strong>
                    </div>
                )}
            </div>

            {/* Bottom transition blend */}
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#FFFDF8] dark:from-stone-950 to-transparent pointer-events-none z-15" />
        </div>
    );
}

export default RainbowBridgeCanvas;
