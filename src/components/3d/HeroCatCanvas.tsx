"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Heart, Sparkles, Moon, Sun } from "lucide-react";

interface FloatingHeart {
    mesh: THREE.Mesh;
    vy: number;
    vx: number;
    vz: number;
    rotSpeed: number;
    opacity: number;
    life: number;
}

export function HeroCatCanvas() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [purring, setPurring] = useState(false);
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const container = containerRef.current;
        const canvas = canvasRef.current;
        if (!container || !canvas) return;

        // Check reduced motion
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        // Setup Scene & Camera
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            45,
            container.clientWidth / container.clientHeight,
            0.1,
            50
        );
        camera.position.set(0, 1.2, 5.8);

        // Renderer
        let renderer: THREE.WebGLRenderer;
        try {
            renderer = new THREE.WebGLRenderer({
                canvas,
                alpha: true,
                antialias: true,
                powerPreference: "high-performance",
            });
        } catch (e) {
            console.warn("WebGL not available for HeroCatCanvas", e);
            return;
        }

        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.2;

        // Lighting
        const keyLight = new THREE.DirectionalLight(0xfff3e0, 2.2);
        keyLight.position.set(4, 6, 5);
        scene.add(keyLight);

        const fillLight = new THREE.DirectionalLight(0xbae6fd, 1.2);
        fillLight.position.set(-4, 3, 2);
        scene.add(fillLight);

        const rimLight = new THREE.DirectionalLight(0xf43f5e, 1.0);
        rimLight.position.set(0, 5, -5);
        scene.add(rimLight);

        const ambientLight = new THREE.AmbientLight(0xffedd5, 1.1);
        scene.add(ambientLight);

        // --- Bilai 3D Cat Construction ---
        const catGroup = new THREE.Group();
        catGroup.position.set(0, -0.6, 0);
        scene.add(catGroup);

        // Materials
        const furGingerMat = new THREE.MeshStandardMaterial({
            color: 0xf59e0b, // Warm golden orange
            roughness: 0.6,
            metalness: 0.05,
            flatShading: true,
        });

        const furWhiteMat = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            roughness: 0.65,
            flatShading: true,
        });

        const innerEarMat = new THREE.MeshStandardMaterial({
            color: 0xfda4af,
            roughness: 0.5,
            flatShading: true,
        });

        const noseMat = new THREE.MeshStandardMaterial({
            color: 0xf43f5e,
            roughness: 0.3,
        });

        const eyeMat = new THREE.MeshStandardMaterial({
            color: 0x10b981, // Emerald green
            roughness: 0.1,
            metalness: 0.3,
        });

        const pupilMat = new THREE.MeshStandardMaterial({
            color: 0x09090b,
            roughness: 0.1,
        });

        const collarMat = new THREE.MeshStandardMaterial({
            color: 0xe11d48,
            roughness: 0.4,
        });

        const bellMat = new THREE.MeshStandardMaterial({
            color: 0xfacc15,
            roughness: 0.2,
            metalness: 0.8,
        });

        // 1. Body (Lower & Torso)
        const bodyGroup = new THREE.Group();
        catGroup.add(bodyGroup);

        const torsoGeo = new THREE.CylinderGeometry(0.72, 0.88, 1.35, 10);
        const torso = new THREE.Mesh(torsoGeo, furGingerMat);
        torso.position.y = 0.7;
        bodyGroup.add(torso);

        // White chest patch
        const chestGeo = new THREE.CylinderGeometry(0.5, 0.6, 0.9, 8, 1, false, -Math.PI / 4, Math.PI / 2);
        const chest = new THREE.Mesh(chestGeo, furWhiteMat);
        chest.position.set(0, 0.72, 0.3);
        chest.scale.set(1.05, 1, 1.05);
        bodyGroup.add(chest);

        // Paws
        const pawGeo = new THREE.SphereGeometry(0.24, 8, 8);
        pawGeo.scale(1, 0.7, 1.3);

        const leftFrontPaw = new THREE.Mesh(pawGeo, furWhiteMat);
        leftFrontPaw.position.set(-0.48, 0.15, 0.75);
        bodyGroup.add(leftFrontPaw);

        const rightFrontPaw = new THREE.Mesh(pawGeo, furWhiteMat);
        rightFrontPaw.position.set(0.48, 0.15, 0.75);
        bodyGroup.add(rightFrontPaw);

        const leftBackPaw = new THREE.Mesh(pawGeo, furGingerMat);
        leftBackPaw.position.set(-0.75, 0.18, 0.1);
        leftBackPaw.rotation.y = -0.3;
        bodyGroup.add(leftBackPaw);

        const rightBackPaw = new THREE.Mesh(pawGeo, furGingerMat);
        rightBackPaw.position.set(0.75, 0.18, 0.1);
        rightBackPaw.rotation.y = 0.3;
        bodyGroup.add(rightBackPaw);

        // 2. Collar & Bell
        const collarGeo = new THREE.TorusGeometry(0.7, 0.06, 8, 16);
        const collar = new THREE.Mesh(collarGeo, collarMat);
        collar.position.set(0, 1.35, 0.05);
        collar.rotation.x = Math.PI / 2.2;
        bodyGroup.add(collar);

        const bellGeo = new THREE.SphereGeometry(0.1, 8, 8);
        const bell = new THREE.Mesh(bellGeo, bellMat);
        bell.position.set(0, 1.25, 0.72);
        bodyGroup.add(bell);

        // 3. Tail (Jointed)
        const tailGroup = new THREE.Group();
        tailGroup.position.set(0, 0.35, -0.75);
        bodyGroup.add(tailGroup);

        const tailSegmentGeo = new THREE.CylinderGeometry(0.12, 0.14, 0.5, 7);
        const tailSegment1 = new THREE.Mesh(tailSegmentGeo, furGingerMat);
        tailSegment1.position.set(0, 0.22, -0.15);
        tailSegment1.rotation.x = -0.7;
        tailGroup.add(tailSegment1);

        const tailTipGeo = new THREE.ConeGeometry(0.11, 0.5, 7);
        const tailTip = new THREE.Mesh(tailTipGeo, furWhiteMat); // White tail tip!
        tailTip.position.set(0, 0.58, -0.35);
        tailTip.rotation.x = -0.35;
        tailGroup.add(tailTip);

        // 4. Head Group (Independent rotation for tracking)
        const headGroup = new THREE.Group();
        headGroup.position.set(0, 1.7, 0.15);
        catGroup.add(headGroup);

        // Head Base
        const headGeo = new THREE.SphereGeometry(0.8, 10, 8);
        headGeo.scale(1.15, 0.95, 1.05);
        const head = new THREE.Mesh(headGeo, furGingerMat);
        headGroup.add(head);

        // White Muzzle / Cheeks
        const muzzleGeo = new THREE.SphereGeometry(0.35, 8, 8);
        muzzleGeo.scale(1.3, 0.8, 0.9);
        const muzzle = new THREE.Mesh(muzzleGeo, furWhiteMat);
        muzzle.position.set(0, -0.2, 0.68);
        headGroup.add(muzzle);

        // Cute Pink Nose
        const noseGeo = new THREE.ConeGeometry(0.09, 0.08, 4);
        const nose = new THREE.Mesh(noseGeo, noseMat);
        nose.position.set(0, -0.1, 0.98);
        nose.rotation.z = Math.PI;
        nose.rotation.x = 0.3;
        headGroup.add(nose);

        // Ears
        const earGeo = new THREE.ConeGeometry(0.32, 0.55, 4);
        earGeo.scale(1, 1, 0.6);

        const leftEarGroup = new THREE.Group();
        leftEarGroup.position.set(-0.52, 0.72, 0.05);
        leftEarGroup.rotation.set(-0.15, 0.1, 0.4);
        const leftEarOuter = new THREE.Mesh(earGeo, furGingerMat);
        leftEarGroup.add(leftEarOuter);
        const leftEarInner = new THREE.Mesh(earGeo, innerEarMat);
        leftEarInner.scale.set(0.7, 0.7, 0.6);
        leftEarInner.position.set(0, -0.05, 0.06);
        leftEarGroup.add(leftEarInner);
        headGroup.add(leftEarGroup);

        const rightEarGroup = new THREE.Group();
        rightEarGroup.position.set(0.52, 0.72, 0.05);
        rightEarGroup.rotation.set(-0.15, -0.1, -0.4);
        const rightEarOuter = new THREE.Mesh(earGeo, furGingerMat);
        rightEarGroup.add(rightEarOuter);
        const rightEarInner = new THREE.Mesh(earGeo, innerEarMat);
        rightEarInner.scale.set(0.7, 0.7, 0.6);
        rightEarInner.position.set(0, -0.05, 0.06);
        rightEarGroup.add(rightEarInner);
        headGroup.add(rightEarGroup);

        // Eyes Group
        const eyesGroup = new THREE.Group();
        headGroup.add(eyesGroup);

        const eyeBallGeo = new THREE.SphereGeometry(0.16, 10, 10);
        const pupilGeo = new THREE.SphereGeometry(0.08, 8, 8);
        pupilGeo.scale(0.5, 1.2, 0.5);

        // Left Eye
        const leftEye = new THREE.Mesh(eyeBallGeo, eyeMat);
        leftEye.position.set(-0.35, 0.08, 0.75);
        const leftPupil = new THREE.Mesh(pupilGeo, pupilMat);
        leftPupil.position.set(-0.35, 0.08, 0.88);
        eyesGroup.add(leftEye);
        eyesGroup.add(leftPupil);

        // Right Eye
        const rightEye = new THREE.Mesh(eyeBallGeo, eyeMat);
        rightEye.position.set(0.35, 0.08, 0.75);
        const rightPupil = new THREE.Mesh(pupilGeo, pupilMat);
        rightPupil.position.set(0.35, 0.08, 0.88);
        eyesGroup.add(rightEye);
        eyesGroup.add(rightPupil);

        // Sleepy Eyelids for Dark Mode
        const eyelidGeo = new THREE.SphereGeometry(0.18, 8, 8, 0, Math.PI * 2, 0, Math.PI / 2);
        const leftEyelid = new THREE.Mesh(eyelidGeo, furGingerMat);
        leftEyelid.position.set(-0.35, 0.12, 0.76);
        leftEyelid.rotation.x = -Math.PI / 2;
        leftEyelid.visible = false;
        eyesGroup.add(leftEyelid);

        const rightEyelid = new THREE.Mesh(eyelidGeo, furGingerMat);
        rightEyelid.position.set(0.35, 0.12, 0.76);
        rightEyelid.rotation.x = -Math.PI / 2;
        rightEyelid.visible = false;
        eyesGroup.add(rightEyelid);

        // Whiskers
        const whiskerMat = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 2 });
        function createWhiskers(side: 1 | -1) {
            const whiskerGroup = new THREE.Group();
            [-0.1, 0, 0.1].forEach((angle, i) => {
                const points = [
                    new THREE.Vector3(0, 0, 0),
                    new THREE.Vector3(side * 0.45, angle * 0.4, 0.15),
                ];
                const geo = new THREE.BufferGeometry().setFromPoints(points);
                const line = new THREE.Line(geo, whiskerMat);
                line.position.set(side * 0.3, -0.15 + i * 0.05, 0.78);
                whiskerGroup.add(line);
            });
            return whiskerGroup;
        }
        headGroup.add(createWhiskers(1));
        headGroup.add(createWhiskers(-1));

        // --- Heart Particles Generator for Petting ---
        const heartShape = new THREE.Shape();
        heartShape.moveTo(0, 0.2);
        heartShape.bezierCurveTo(0, 0.4, 0.3, 0.6, 0.45, 0.4);
        heartShape.bezierCurveTo(0.6, 0.2, 0.5, -0.05, 0.25, -0.25);
        heartShape.bezierCurveTo(0.1, -0.4, 0, -0.55, 0, -0.55);
        heartShape.bezierCurveTo(0, -0.55, -0.1, -0.4, -0.25, -0.25);
        heartShape.bezierCurveTo(-0.5, -0.05, -0.6, 0.2, -0.45, 0.4);
        heartShape.bezierCurveTo(-0.3, 0.6, 0, 0.4, 0, 0.2);

        const heartGeo = new THREE.ShapeGeometry(heartShape);
        heartGeo.scale(0.35, 0.35, 0.35);

        const heartMat = new THREE.MeshStandardMaterial({
            color: 0xf43f5e,
            emissive: 0xf43f5e,
            emissiveIntensity: 0.8,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 1,
        });

        const activeHearts: FloatingHeart[] = [];

        function triggerHeartBurst() {
            for (let i = 0; i < 5; i++) {
                const mesh = new THREE.Mesh(heartGeo, heartMat.clone());
                mesh.position.set(
                    (Math.random() - 0.5) * 1.0,
                    1.4 + Math.random() * 0.6,
                    0.8 + (Math.random() - 0.5) * 0.6
                );
                mesh.scale.setScalar(0.7 + Math.random() * 0.5);
                scene.add(mesh);

                activeHearts.push({
                    mesh,
                    vy: 0.035 + Math.random() * 0.03,
                    vx: (Math.random() - 0.5) * 0.03,
                    vz: (Math.random() - 0.5) * 0.02,
                    rotSpeed: (Math.random() - 0.5) * 0.08,
                    opacity: 1,
                    life: 0,
                });
            }
        }

        // --- Dark Mode State Management ---
        const checkDarkMode = () => {
            const isDarkActive = document.documentElement.classList.contains("dark");
            setIsDark(isDarkActive);
            if (isDarkActive) {
                leftEyelid.visible = true;
                rightEyelid.visible = true;
                keyLight.intensity = 1.3;
                ambientLight.color.setHex(0x312e81);
                ambientLight.intensity = 1.0;
                rimLight.intensity = 1.8;
                rimLight.color.setHex(0xa855f7); // Violet rim in dark mode
            } else {
                leftEyelid.visible = false;
                rightEyelid.visible = false;
                keyLight.intensity = 2.2;
                ambientLight.color.setHex(0xffedd5);
                ambientLight.intensity = 1.1;
                rimLight.intensity = 1.0;
                rimLight.color.setHex(0xf43f5e);
            }
        };

        checkDarkMode();
        const themeObserver = new MutationObserver(checkDarkMode);
        themeObserver.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"],
        });

        // --- Mouse / Touch Tracking ---
        let targetRotX = 0;
        let targetRotY = 0;

        const handlePointerMove = (e: MouseEvent | TouchEvent) => {
            if (prefersReducedMotion) return;
            const rect = container.getBoundingClientRect();
            let clientX = 0;
            let clientY = 0;

            if ("touches" in e && e.touches.length > 0) {
                clientX = e.touches[0].clientX;
                clientY = e.touches[0].clientY;
            } else if ("clientX" in e) {
                clientX = e.clientX;
                clientY = e.clientY;
            }

            const x = ((clientX - rect.left) / rect.width) * 2 - 1;
            const y = -(((clientY - rect.top) / rect.height) * 2 - 1);

            // Clamp and scale head rotation
            targetRotY = THREE.MathUtils.clamp(x * 0.65, -0.7, 0.7);
            targetRotX = THREE.MathUtils.clamp(-y * 0.45, -0.4, 0.4);
        };

        const handlePointerLeave = () => {
            targetRotX = 0;
            targetRotY = 0;
        };

        // --- Petting / Click Bounce Interaction ---
        let bounceTime = 0;
        let isBouncing = false;

        const handlePet = () => {
            isBouncing = true;
            bounceTime = 0;
            triggerHeartBurst();
            setPurring(true);
            setTimeout(() => setPurring(false), 2400);

            // Ear twitch
            leftEarGroup.rotation.z = 0.7;
            rightEarGroup.rotation.z = -0.7;
        };

        container.addEventListener("mousemove", handlePointerMove);
        container.addEventListener("touchmove", handlePointerMove, { passive: true });
        container.addEventListener("mouseleave", handlePointerLeave);
        container.addEventListener("click", handlePet);

        // --- Intersection Observer for Performance ---
        let isPaused = false;
        const observer = new IntersectionObserver(
            ([entry]) => {
                isPaused = !entry.isIntersecting;
            },
            { threshold: 0.1 }
        );
        observer.observe(container);

        // --- Resize Handler ---
        const handleResize = () => {
            if (!container || !renderer) return;
            const w = container.clientWidth;
            const h = container.clientHeight;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
        };
        window.addEventListener("resize", handleResize);

        // --- Animation Loop ---
        let animId: number;
        let lastTime = performance.now();
        let totalTime = 0;

        const animate = (currentTime: number) => {
            animId = requestAnimationFrame(animate);

            if (isPaused) return;

            const delta = (currentTime - lastTime) / 1000;
            lastTime = currentTime;
            totalTime += delta;

            const isDarkActive = document.documentElement.classList.contains("dark");
            const breathSpeed = isDarkActive ? 1.5 : 2.5;

            // 1. Idle Breathing
            if (!prefersReducedMotion) {
                const breath = Math.sin(totalTime * breathSpeed) * 0.025;
                torso.scale.set(1 + breath * 0.5, 1 + breath, 1 + breath * 0.5);
                chest.scale.set(1.05 + breath * 0.5, 1 + breath, 1.05 + breath * 0.5);

                // Gentle body float
                bodyGroup.position.y = Math.sin(totalTime * breathSpeed) * 0.02;

                // Tail wag
                const tailWagSpeed = isDarkActive ? 1.2 : 3.2;
                const tailAngle = Math.sin(totalTime * tailWagSpeed) * (isDarkActive ? 0.15 : 0.4);
                tailGroup.rotation.y = tailAngle;
                tailGroup.rotation.z = Math.sin(totalTime * tailWagSpeed * 0.5) * 0.1;

                // Rest posture in dark mode
                if (isDarkActive) {
                    catGroup.position.y = -0.75; // Settle lower into cozy loaf
                    targetRotX = 0.1;
                } else {
                    catGroup.position.y = -0.6;
                }

                // Head tracking with smooth lerp
                headGroup.rotation.y += (targetRotY - headGroup.rotation.y) * 0.1;
                headGroup.rotation.x += (targetRotX - headGroup.rotation.x) * 0.1;

                // Ear twitch recovery
                leftEarGroup.rotation.z += (0.4 - leftEarGroup.rotation.z) * 0.1;
                rightEarGroup.rotation.z += (-0.4 - rightEarGroup.rotation.z) * 0.1;
            }

            // 2. Petting Bounce Animation
            if (isBouncing) {
                bounceTime += delta * 4;
                if (bounceTime < Math.PI) {
                    const jumpY = Math.sin(bounceTime) * 0.35;
                    catGroup.position.y += jumpY;
                    headGroup.rotation.z = Math.sin(bounceTime * 2) * 0.15;
                } else {
                    isBouncing = false;
                    headGroup.rotation.z = 0;
                }
            }

            // 3. Animate Floating Hearts
            for (let i = activeHearts.length - 1; i >= 0; i--) {
                const h = activeHearts[i];
                h.life += delta;
                h.mesh.position.y += h.vy;
                h.mesh.position.x += h.vx;
                h.mesh.position.z += h.vz;
                h.mesh.rotation.z += h.rotSpeed;

                h.opacity = Math.max(0, 1 - h.life / 1.8);
                (h.mesh.material as THREE.MeshStandardMaterial).opacity = h.opacity;

                if (h.life > 1.8 || h.opacity <= 0) {
                    scene.remove(h.mesh);
                    (h.mesh.material as THREE.Material).dispose();
                    activeHearts.splice(i, 1);
                }
            }

            renderer.render(scene, camera);
        };

        animId = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animId);
            observer.disconnect();
            themeObserver.disconnect();
            window.removeEventListener("resize", handleResize);
            container.removeEventListener("mousemove", handlePointerMove);
            container.removeEventListener("touchmove", handlePointerMove);
            container.removeEventListener("mouseleave", handlePointerLeave);
            container.removeEventListener("click", handlePet);

            // Cleanup Three.js
            torsoGeo.dispose();
            chestGeo.dispose();
            pawGeo.dispose();
            collarGeo.dispose();
            bellGeo.dispose();
            tailSegmentGeo.dispose();
            tailTipGeo.dispose();
            headGeo.dispose();
            muzzleGeo.dispose();
            noseGeo.dispose();
            earGeo.dispose();
            eyeBallGeo.dispose();
            pupilGeo.dispose();
            eyelidGeo.dispose();
            heartGeo.dispose();

            furGingerMat.dispose();
            furWhiteMat.dispose();
            innerEarMat.dispose();
            noseMat.dispose();
            eyeMat.dispose();
            pupilMat.dispose();
            collarMat.dispose();
            bellMat.dispose();
            whiskerMat.dispose();
            heartMat.dispose();

            activeHearts.forEach(h => {
                scene.remove(h.mesh);
                (h.mesh.material as THREE.Material).dispose();
            });

            renderer.dispose();
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative w-full h-full cursor-pointer select-none group flex items-center justify-center"
            title="Click or tap to pet Bilai! 🐾"
        >
            {/* Three.js Canvas */}
            <canvas
                ref={canvasRef}
                className="w-full h-full block"
                aria-hidden="true"
                role="presentation"
                tabIndex={-1}
            />

            {/* Interactive mascot pill overlay */}
            <div className="absolute top-4 left-4 z-20 pointer-events-none">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 dark:bg-stone-900/70 backdrop-blur-md border border-white/40 dark:border-stone-800 text-xs font-semibold text-stone-700 dark:text-stone-300 shadow-md">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Meet Bilai (3D)</span>
                    {isDark ? (
                        <Moon className="w-3 h-3 text-indigo-400 ml-0.5" />
                    ) : (
                        <Sun className="w-3 h-3 text-amber-500 ml-0.5" />
                    )}
                </div>
            </div>

            {/* Tap to pet hint overlay */}
            <div className="absolute bottom-4 inset-x-0 flex justify-center z-20 pointer-events-none transition-opacity duration-300 group-hover:opacity-100 opacity-80">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-500/90 text-white text-xs font-bold shadow-lg shadow-rose-500/30 backdrop-blur-sm">
                    <Heart className="w-3.5 h-3.5 fill-white animate-bounce" />
                    <span>{purring ? "Purrr... Bilai is happy! 🐾" : "Tap to pet Bilai 🐾"}</span>
                </div>
            </div>
        </div>
    );
}

export default HeroCatCanvas;
