"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Terminal, Cloud, Sparkles } from "lucide-react";

export const CloudGuyAnimation: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check if WebGL is available before attempting Three.js initialization
    let renderer: THREE.WebGLRenderer | null = null;
    try {
      const testCanvas = document.createElement("canvas");
      const gl = testCanvas.getContext("webgl2") || testCanvas.getContext("webgl");
      if (!gl) {
        setUseFallback(true);
        return;
      }

      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "default",
      });
    } catch {
      setUseFallback(true);
      return;
    }

    if (!renderer) {
      setUseFallback(true);
      return;
    }

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0.75, 5.0);

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    const hoverGroup = new THREE.Group();
    worldGroup.add(hoverGroup);

    // 2. Lighting
    const ambientLight = new THREE.AmbientLight(0x0f172a, 1.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xe0f2fe, 1.6);
    keyLight.position.set(4, 6, 4);
    scene.add(keyLight);

    const cyanRim = new THREE.DirectionalLight(0x06b6d4, 2.8);
    cyanRim.position.set(-5, -2, -2);
    scene.add(cyanRim);

    const blueRim = new THREE.DirectionalLight(0x2563eb, 2.2);
    blueRim.position.set(5, -2, -3);
    scene.add(blueRim);

    // 3. Volumetric Cloud Platform
    const cloudGroup = new THREE.Group();
    hoverGroup.add(cloudGroup);

    const cloudMaterial = new THREE.MeshStandardMaterial({
      color: 0xf0fdfa,
      roughness: 0.35,
      metalness: 0.05,
      emissive: 0x0284c7,
      emissiveIntensity: 0.18,
    });

    const cloudPuffsData = [
      { x: 0, y: -0.25, z: 0, r: 0.95 },
      { x: 0.65, y: -0.32, z: 0.25, r: 0.72 },
      { x: -0.65, y: -0.3, z: 0.2, r: 0.7 },
      { x: 1.15, y: -0.4, z: -0.05, r: 0.58 },
      { x: -1.18, y: -0.38, z: -0.02, r: 0.58 },
      { x: 0.35, y: -0.2, z: -0.45, r: 0.65 },
      { x: -0.38, y: -0.22, z: -0.42, r: 0.62 },
      { x: 0.85, y: -0.35, z: -0.3, r: 0.52 },
      { x: -0.85, y: -0.35, z: -0.28, r: 0.52 },
      { x: 0, y: -0.55, z: 0.1, r: 0.78 },
      { x: 0.45, y: -0.15, z: 0.5, r: 0.48 },
      { x: -0.42, y: -0.18, z: 0.48, r: 0.46 },
    ];

    cloudPuffsData.forEach((p) => {
      const geo = new THREE.SphereGeometry(p.r, 20, 20);
      const mesh = new THREE.Mesh(geo, cloudMaterial);
      mesh.position.set(p.x, p.y, p.z);
      cloudGroup.add(mesh);
    });

    // 4. Stylized 3D Builder / Guy Sitting on the Cloud
    const guyGroup = new THREE.Group();
    hoverGroup.add(guyGroup);
    guyGroup.position.set(0, 0.22, 0.05);

    const hoodieMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.7,
      metalness: 0.1,
    });

    const cyanTrimMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      roughness: 0.3,
      emissive: 0x06b6d4,
      emissiveIntensity: 0.35,
    });

    const skinMat = new THREE.MeshStandardMaterial({
      color: 0xfbd5b5,
      roughness: 0.6,
    });

    const pantsMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.8,
    });

    const sneakerWhiteMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.3,
    });

    // Torso
    const torsoGeo = new THREE.CylinderGeometry(0.24, 0.28, 0.52, 16);
    const torso = new THREE.Mesh(torsoGeo, hoodieMat);
    torso.position.set(0, 0.42, 0);
    guyGroup.add(torso);

    // Cyan Builder emblem on hoodie chest
    const emblemGeo = new THREE.BoxGeometry(0.12, 0.12, 0.02);
    const emblem = new THREE.Mesh(emblemGeo, cyanTrimMat);
    emblem.position.set(0, 0.48, 0.27);
    guyGroup.add(emblem);

    // Head
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 0.82, 0.02);
    guyGroup.add(headGroup);

    const headGeo = new THREE.SphereGeometry(0.2, 20, 20);
    const head = new THREE.Mesh(headGeo, skinMat);
    headGroup.add(head);

    // Cyber visor / Glasses
    const visorGeo = new THREE.BoxGeometry(0.28, 0.08, 0.1);
    const visor = new THREE.Mesh(visorGeo, cyanTrimMat);
    visor.position.set(0, 0.03, 0.16);
    headGroup.add(visor);

    // Headphones
    const headphoneBandGeo = new THREE.TorusGeometry(0.21, 0.025, 8, 20, Math.PI);
    const headphoneBand = new THREE.Mesh(headphoneBandGeo, hoodieMat);
    headphoneBand.rotation.x = -Math.PI / 2;
    headphoneBand.position.set(0, 0.06, 0);
    headGroup.add(headphoneBand);

    const earCupGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.05, 12);
    const leftCup = new THREE.Mesh(earCupGeo, cyanTrimMat);
    leftCup.rotation.z = Math.PI / 2;
    leftCup.position.set(-0.21, 0.02, 0);
    headGroup.add(leftCup);

    const rightCup = new THREE.Mesh(earCupGeo, cyanTrimMat);
    rightCup.rotation.z = Math.PI / 2;
    rightCup.position.set(0.21, 0.02, 0);
    headGroup.add(rightCup);

    // Legs (Cross-legged on cloud)
    const legLeftGeo = new THREE.CylinderGeometry(0.09, 0.08, 0.42, 12);
    const legLeft = new THREE.Mesh(legLeftGeo, pantsMat);
    legLeft.rotation.x = Math.PI / 2.3;
    legLeft.rotation.z = -Math.PI / 4;
    legLeft.position.set(-0.22, 0.12, 0.24);
    guyGroup.add(legLeft);

    const legRight = new THREE.Mesh(legLeftGeo, pantsMat);
    legRight.rotation.x = Math.PI / 2.3;
    legRight.rotation.z = Math.PI / 4;
    legRight.position.set(0.22, 0.12, 0.24);
    guyGroup.add(legRight);

    // Shins & Sneakers
    const shinGeo = new THREE.CylinderGeometry(0.08, 0.07, 0.42, 12);
    const shinLeft = new THREE.Mesh(shinGeo, pantsMat);
    shinLeft.rotation.z = Math.PI / 2.2;
    shinLeft.position.set(-0.1, -0.02, 0.42);
    guyGroup.add(shinLeft);

    const shinRight = new THREE.Mesh(shinGeo, pantsMat);
    shinRight.rotation.z = -Math.PI / 2.2;
    shinRight.position.set(0.1, -0.02, 0.44);
    guyGroup.add(shinRight);

    const sneakerGeo = new THREE.BoxGeometry(0.11, 0.09, 0.18);
    const sneakerLeft = new THREE.Mesh(sneakerGeo, sneakerWhiteMat);
    sneakerLeft.position.set(-0.28, -0.02, 0.42);
    guyGroup.add(sneakerLeft);

    const sneakerRight = new THREE.Mesh(sneakerGeo, sneakerWhiteMat);
    sneakerRight.position.set(0.28, -0.02, 0.44);
    guyGroup.add(sneakerRight);

    // Arms
    const armGeo = new THREE.CylinderGeometry(0.065, 0.055, 0.38, 12);
    const armLeft = new THREE.Mesh(armGeo, hoodieMat);
    armLeft.rotation.x = Math.PI / 4;
    armLeft.rotation.z = -Math.PI / 7;
    armLeft.position.set(-0.28, 0.34, 0.15);
    guyGroup.add(armLeft);

    const armRight = new THREE.Mesh(armGeo, hoodieMat);
    armRight.rotation.x = Math.PI / 4;
    armRight.rotation.z = Math.PI / 7;
    armRight.position.set(0.28, 0.34, 0.15);
    guyGroup.add(armRight);

    // 5. Glowing Laptop
    const laptopGroup = new THREE.Group();
    laptopGroup.position.set(0, 0.25, 0.38);
    guyGroup.add(laptopGroup);

    const baseGeo = new THREE.BoxGeometry(0.38, 0.02, 0.26);
    const laptopBase = new THREE.Mesh(baseGeo, hoodieMat);
    laptopGroup.add(laptopBase);

    const kbGeo = new THREE.BoxGeometry(0.32, 0.005, 0.18);
    const kbMesh = new THREE.Mesh(kbGeo, cyanTrimMat);
    kbMesh.position.set(0, 0.012, 0);
    laptopGroup.add(kbMesh);

    const screenGroup = new THREE.Group();
    screenGroup.position.set(0, 0.01, -0.12);
    screenGroup.rotation.x = -Math.PI / 7;
    laptopGroup.add(screenGroup);

    const lidGeo = new THREE.BoxGeometry(0.38, 0.26, 0.02);
    const lidMesh = new THREE.Mesh(lidGeo, hoodieMat);
    lidMesh.position.set(0, 0.13, 0);
    screenGroup.add(lidMesh);

    const screenDisplayGeo = new THREE.PlaneGeometry(0.34, 0.22);
    const screenDisplayMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const screenDisplay = new THREE.Mesh(screenDisplayGeo, screenDisplayMat);
    screenDisplay.position.set(0, 0.13, 0.012);
    screenGroup.add(screenDisplay);

    const screenLight = new THREE.PointLight(0x38bdf8, 3.2, 2.5, 1.2);
    screenLight.position.set(0, 0.2, 0.15);
    laptopGroup.add(screenLight);

    // 6. Floating Cloud & Code Particles
    const particleCount = 35;
    const particleGeo = new THREE.SphereGeometry(0.035, 8, 8);
    const particleMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.75,
    });

    const particles: THREE.Mesh[] = [];
    const particleVelocities: { x: number; y: number; z: number; speed: number }[] = [];

    for (let i = 0; i < particleCount; i++) {
      const p = new THREE.Mesh(particleGeo, particleMat.clone());
      const theta = Math.random() * Math.PI * 2;
      const radius = 0.8 + Math.random() * 1.4;
      p.position.set(
        Math.cos(theta) * radius,
        -0.4 + Math.random() * 1.8,
        Math.sin(theta) * radius
      );
      hoverGroup.add(p);
      particles.push(p);

      particleVelocities.push({
        x: (Math.random() - 0.5) * 0.005,
        y: 0.004 + Math.random() * 0.008,
        z: (Math.random() - 0.5) * 0.005,
        speed: 0.8 + Math.random() * 1.2,
      });
    }

    // 7. Mouse Parallax
    let targetRotY = 0;
    let targetRotX = 0;

    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotY = nx * 0.45;
      targetRotX = -ny * 0.25;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });

    // 8. Animation Loop
    let clock = new THREE.Clock();
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Smooth hovering bob & roll
      hoverGroup.position.y = Math.sin(t * 1.5) * 0.12;
      hoverGroup.rotation.z = Math.cos(t * 1.1) * 0.025;

      // Guy breathing motion
      guyGroup.position.y = 0.22 + Math.sin(t * 2.5) * 0.015;

      // Head reading code tilt
      headGroup.rotation.x = Math.sin(t * 1.8) * 0.04;
      headGroup.rotation.y = Math.cos(t * 0.9) * 0.06;

      // Screen light subtle pulse
      screenLight.intensity = 2.8 + Math.sin(t * 5.0) * 0.5;

      // Particle drift
      particles.forEach((p, idx) => {
        const vel = particleVelocities[idx];
        p.position.y += vel.y;
        p.position.x += Math.sin(t * vel.speed + idx) * 0.002;
        p.position.z += Math.cos(t * vel.speed + idx) * 0.002;

        if (p.position.y > 1.8) {
          p.position.y = -0.5;
        }
      });

      worldGroup.rotation.y += (targetRotY - worldGroup.rotation.y) * 0.06;
      worldGroup.rotation.x += (targetRotX - worldGroup.rotation.x) * 0.06;

      renderer?.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container || !renderer) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", handleResize);
      if (renderer && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer?.dispose();
    };
  }, []);

  return (
    <section className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#030712] text-center overflow-hidden">
      {/* Subtle Cyan Glow (No horizontal border lines!) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center">
        {/* Animated 3D Guy Sitting on Cloud Canvas */}
        <div
          ref={mountRef}
          className="w-full max-w-2xl h-[360px] sm:h-[420px] md:h-[460px] relative select-none cursor-grab active:cursor-grabbing flex items-center justify-center"
          title="AWS SBG Builder floating in the cloud • Move cursor to look around"
        >
          {/* Fallback Animated SVG Illustration (used if WebGL is disabled or unavailable) */}
          {useFallback && (
            <div className="relative w-full h-full flex flex-col items-center justify-center animate-in fade-in duration-500">
              <div className="relative animate-bounce duration-[4000ms]">
                {/* Stylized Cloud SVG with Builder */}
                <svg
                  viewBox="0 0 500 350"
                  className="w-80 sm:w-96 drop-shadow-[0_0_35px_rgba(6,182,212,0.4)]"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Fluffy Cloud Base */}
                  <g filter="drop-shadow(0 0 20px rgba(6,182,212,0.3))">
                    <path
                      d="M120 260 C90 260 70 235 70 205 C70 175 95 155 125 155 C135 120 170 95 210 95 C250 95 285 118 298 150 C310 145 325 145 338 150 C365 150 390 170 390 200 C415 205 435 225 435 250 C435 275 410 295 385 295 L135 295 C105 295 85 275 120 260 Z"
                      fill="url(#cloudGrad)"
                    />
                  </g>

                  {/* Sitting Builder Guy */}
                  {/* Legs */}
                  <ellipse cx="230" cy="180" rx="45" ry="16" fill="#1e293b" />
                  <ellipse cx="270" cy="180" rx="45" ry="16" fill="#1e293b" />
                  {/* Sneakers */}
                  <rect x="175" y="172" width="22" height="14" rx="7" fill="#ffffff" />
                  <rect x="305" y="172" width="22" height="14" rx="7" fill="#ffffff" />

                  {/* Torso Hoodie */}
                  <path d="M215 175 L230 115 L270 115 L285 175 Z" fill="#0f172a" />
                  {/* Cyan Chip on Chest */}
                  <rect x="244" y="130" width="12" height="12" rx="2" fill="#06b6d4" />

                  {/* Head */}
                  <circle cx="250" cy="85" r="24" fill="#fbd5b5" />
                  {/* Cyber Visor */}
                  <rect x="236" y="80" width="28" height="10" rx="3" fill="#06b6d4" />
                  {/* Headphones */}
                  <path d="M226 85 C226 70 274 70 274 85" stroke="#0f172a" strokeWidth="4" fill="none" />
                  <rect x="222" y="80" width="8" height="14" rx="3" fill="#06b6d4" />
                  <rect x="270" y="80" width="8" height="14" rx="3" fill="#06b6d4" />

                  {/* Glowing Laptop */}
                  <rect x="225" y="150" width="50" height="6" rx="2" fill="#334155" />
                  <path d="M232 150 L238 120 L262 120 L268 150 Z" fill="#06b6d4" opacity="0.9" />

                  {/* Floating Code Particles */}
                  <circle cx="160" cy="90" r="4" fill="#38bdf8" opacity="0.7" className="animate-ping" />
                  <circle cx="340" cy="100" r="5" fill="#38bdf8" opacity="0.8" />
                  <circle cx="200" cy="60" r="3" fill="#38bdf8" opacity="0.6" />
                  <circle cx="300" cy="50" r="4" fill="#38bdf8" opacity="0.5" />

                  <defs>
                    <linearGradient id="cloudGrad" x1="70" y1="95" x2="435" y2="295" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#f8fafc" />
                      <stop offset="0.6" stopColor="#e2e8f0" />
                      <stop offset="1" stopColor="#0284c7" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          )}

          {/* Floating Pill Badge */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/60 backdrop-blur-md border border-cyan-500/30 text-[11px] font-mono text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.25)] pointer-events-none">
            <Cloud className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>AWS SBG Builder in the Cloud</span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          </div>
        </div>

        {/* Large Statement with Electric Cyan-Blue Cursor */}
        <div className="mt-4 max-w-4xl mx-auto text-center px-4">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-normal tracking-tight text-slate-100 leading-[1.25]">
            AWS Student Builder Group IITJ is our premier cloud innovation
            community, allowing anyone to build at IIT Jodhpur.
            <span className="blinking-cursor" aria-hidden="true" />
          </h2>

          <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm text-slate-400 font-mono">
            <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-cyan-300 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              $ aws sbg init --chapter iitj
            </span>
            <span className="hidden sm:inline text-slate-600">•</span>
            <span className="text-slate-300">Serverless</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-300">Microservices</span>
            <span className="text-slate-600">•</span>
            <span className="text-cyan-300 font-semibold">Amazon Bedrock AI</span>
          </div>
        </div>
      </div>
    </section>
  );
};
