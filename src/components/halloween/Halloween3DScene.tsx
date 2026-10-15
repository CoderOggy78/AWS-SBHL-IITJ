"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { horrorAudio } from "./HorrorSoundManager";

interface Halloween3DSceneProps {
  interactive?: boolean;
  className?: string;
}

export const Halloween3DScene: React.FC<Halloween3DSceneProps> = ({
  interactive = true,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    // Move closer so the pumpkin is large, detailed, and imposing!
    camera.position.set(0, 0, 4.2);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0x1a0606, 1.4);
    scene.add(ambientLight);

    const keyMoonLight = new THREE.DirectionalLight(0xa5f3fc, 0.9);
    keyMoonLight.position.set(3, 5, 4);
    scene.add(keyMoonLight);

    const crimsonRimLight = new THREE.DirectionalLight(0xdc2626, 2.8);
    crimsonRimLight.position.set(-4, -1, -3);
    scene.add(crimsonRimLight);

    // Fire point light inside the Jack-O'-Lantern (flickering candle flame)
    const fireLight = new THREE.PointLight(0xff6a00, 5.5, 8, 1.2);
    fireLight.position.set(0, -0.05, 0.4);
    mainGroup.add(fireLight);

    const fireGlowLight = new THREE.PointLight(0xff2200, 3.0, 5);
    fireGlowLight.position.set(0, 0.2, 0.2);
    mainGroup.add(fireGlowLight);

    // 2. Realistic 3D Jack-o'-Lantern Model
    const pumpkinGroup = new THREE.Group();
    mainGroup.add(pumpkinGroup);

    // Organic Pumpkin Flesh Material (Deep Autumn Orange with rich roughness)
    const pumpkinMat = new THREE.MeshStandardMaterial({
      color: 0xd94b05,
      roughness: 0.55,
      metalness: 0.12,
    });

    // 12 Overlapping Vertical Ribs forming the classic squashed pumpkin shape
    const lobeCount = 12;
    for (let i = 0; i < lobeCount; i++) {
      const angle = (i / lobeCount) * Math.PI * 2;
      const lobeGeo = new THREE.SphereGeometry(1.05, 32, 32);
      // Squash vertically and elongate into natural organic lobe
      lobeGeo.scale(0.48, 0.82, 0.86);

      const lobe = new THREE.Mesh(lobeGeo, pumpkinMat);
      lobe.position.set(
        Math.cos(angle) * 0.44,
        -0.05,
        Math.sin(angle) * 0.44
      );
      lobe.rotation.y = -angle;
      pumpkinGroup.add(lobe);
    }

    // Stem: Twisted gnarled wooden stem on top
    const stemGeo = new THREE.CylinderGeometry(0.06, 0.14, 0.55, 12);
    const stemMat = new THREE.MeshStandardMaterial({
      color: 0x22180f,
      roughness: 0.95,
    });
    const stem = new THREE.Mesh(stemGeo, stemMat);
    stem.position.set(0, 0.82, -0.05);
    stem.rotation.z = 0.25;
    stem.rotation.x = -0.22;
    pumpkinGroup.add(stem);

    // 3. Menacing Fiery Carved Eyes and Grin (Facing DIRECTLY towards camera on +Z)
    const flameMat = new THREE.MeshBasicMaterial({
      color: 0xffcc00,
      transparent: true,
      opacity: 0.98,
    });

    const emberGlowMat = new THREE.MeshBasicMaterial({
      color: 0xff3700,
      transparent: true,
      opacity: 0.85,
    });

    // Left Triangular Menacing Eye
    const leftEyeShape = new THREE.Shape();
    leftEyeShape.moveTo(-0.1, -0.15);
    leftEyeShape.lineTo(0.18, -0.15);
    leftEyeShape.lineTo(0.04, 0.18);
    leftEyeShape.closePath();
    const leftEyeGeo = new THREE.ShapeGeometry(leftEyeShape);
    const leftEye = new THREE.Mesh(leftEyeGeo, flameMat);
    leftEye.position.set(-0.35, 0.16, 0.92);
    leftEye.rotation.z = -0.25;
    leftEye.rotation.x = -0.15;
    pumpkinGroup.add(leftEye);

    // Right Triangular Menacing Eye
    const rightEyeShape = new THREE.Shape();
    rightEyeShape.moveTo(-0.18, -0.15);
    rightEyeShape.lineTo(0.1, -0.15);
    rightEyeShape.lineTo(-0.04, 0.18);
    rightEyeShape.closePath();
    const rightEyeGeo = new THREE.ShapeGeometry(rightEyeShape);
    const rightEye = new THREE.Mesh(rightEyeGeo, flameMat);
    rightEye.position.set(0.35, 0.16, 0.92);
    rightEye.rotation.z = 0.25;
    rightEye.rotation.x = -0.15;
    pumpkinGroup.add(rightEye);

    // Carved Nose (Small inverted triangle)
    const noseShape = new THREE.Shape();
    noseShape.moveTo(-0.08, 0.08);
    noseShape.lineTo(0.08, 0.08);
    noseShape.lineTo(0, -0.08);
    noseShape.closePath();
    const noseGeo = new THREE.ShapeGeometry(noseShape);
    const nose = new THREE.Mesh(noseGeo, flameMat);
    nose.position.set(0, 0.02, 0.96);
    pumpkinGroup.add(nose);

    // Sinister Wide Jagged Grin with Carved Teeth
    const mouthShape = new THREE.Shape();
    // Arc smile with jagged tooth cutouts
    mouthShape.moveTo(-0.65, -0.05);
    mouthShape.lineTo(-0.45, -0.28);
    mouthShape.lineTo(-0.35, -0.18); // tooth
    mouthShape.lineTo(-0.25, -0.32);
    mouthShape.lineTo(-0.15, -0.19); // tooth
    mouthShape.lineTo(0, -0.35);
    mouthShape.lineTo(0.15, -0.19); // tooth
    mouthShape.lineTo(0.25, -0.32);
    mouthShape.lineTo(0.35, -0.18); // tooth
    mouthShape.lineTo(0.45, -0.28);
    mouthShape.lineTo(0.65, -0.05);
    mouthShape.lineTo(0.48, -0.12);
    mouthShape.lineTo(0.32, 0.01); // upper tooth
    mouthShape.lineTo(0.2, -0.14);
    mouthShape.lineTo(0, 0.03); // center upper tooth
    mouthShape.lineTo(-0.2, -0.14);
    mouthShape.lineTo(-0.32, 0.01); // upper tooth
    mouthShape.lineTo(-0.48, -0.12);
    mouthShape.closePath();

    const mouthGeo = new THREE.ShapeGeometry(mouthShape);
    const mouth = new THREE.Mesh(mouthGeo, flameMat);
    mouth.position.set(0, -0.22, 0.92);
    mouth.rotation.x = -0.1;
    pumpkinGroup.add(mouth);

    // Inner Glowing Fiery Core Sphere
    const coreGeo = new THREE.SphereGeometry(0.35, 16, 16);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0xffaa00,
      transparent: true,
      opacity: 0.75,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    core.position.set(0, -0.1, 0.35);
    pumpkinGroup.add(core);

    // 4. 3D Fiery Embers Swarm (Hundreds of ascending fire sparks)
    const emberCount = 350;
    const emberGeo = new THREE.BufferGeometry();
    const emberPositions = new Float32Array(emberCount * 3);
    const emberColors = new Float32Array(emberCount * 3);
    const emberVelocities: { x: number; y: number; z: number }[] = [];

    const colOrange = new THREE.Color(0xff6a00);
    const colYellow = new THREE.Color(0xffea00);
    const colRed = new THREE.Color(0xdc2626);

    for (let i = 0; i < emberCount; i++) {
      emberPositions[i * 3] = (Math.random() - 0.5) * 6;
      emberPositions[i * 3 + 1] = (Math.random() - 0.5) * 5 - 1;
      emberPositions[i * 3 + 2] = (Math.random() - 0.5) * 4;

      const pick = Math.random();
      const col = pick < 0.5 ? colOrange : pick < 0.8 ? colYellow : colRed;
      emberColors[i * 3] = col.r;
      emberColors[i * 3 + 1] = col.g;
      emberColors[i * 3 + 2] = col.b;

      emberVelocities.push({
        x: (Math.random() - 0.5) * 0.012,
        y: Math.random() * 0.022 + 0.008,
        z: (Math.random() - 0.5) * 0.012,
      });
    }

    emberGeo.setAttribute("position", new THREE.BufferAttribute(emberPositions, 3));
    emberGeo.setAttribute("color", new THREE.BufferAttribute(emberColors, 3));

    const emberMat = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
    });
    const emberPoints = new THREE.Points(emberGeo, emberMat);
    scene.add(emberPoints);

    // 5. 3D Flapping Bats circling the scene
    const bats: {
      group: THREE.Group;
      leftWing: THREE.Mesh;
      rightWing: THREE.Mesh;
      speed: number;
      radius: number;
      angle: number;
      y: number;
    }[] = [];

    const batMat = new THREE.MeshBasicMaterial({ color: 0x050508, side: THREE.DoubleSide });

    for (let b = 0; b < 6; b++) {
      const batGroup = new THREE.Group();

      const bBody = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.28, 6), batMat);
      bBody.rotation.x = Math.PI / 2;
      batGroup.add(bBody);

      const leftWingGeo = new THREE.PlaneGeometry(0.4, 0.22);
      leftWingGeo.translate(-0.2, 0, 0);
      const leftWing = new THREE.Mesh(leftWingGeo, batMat);
      batGroup.add(leftWing);

      const rightWingGeo = new THREE.PlaneGeometry(0.4, 0.22);
      rightWingGeo.translate(0.2, 0, 0);
      const rightWing = new THREE.Mesh(rightWingGeo, batMat);
      batGroup.add(rightWing);

      const radius = Math.random() * 2.2 + 2.4;
      const angle = Math.random() * Math.PI * 2;
      const y = Math.random() * 1.8 - 0.6;

      batGroup.scale.setScalar(Math.random() * 0.35 + 0.45);
      scene.add(batGroup);

      bats.push({
        group: batGroup,
        leftWing,
        rightWing,
        speed: Math.random() * 0.016 + 0.01,
        radius,
        angle,
        y,
      });
    }

    // Mouse Tracking (Smooth look-at & tilt)
    let targetRotX = 0;
    let targetRotY = 0;
    let currentRotX = 0;
    let currentRotY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      targetRotY = x * 0.75;
      targetRotX = -y * 0.5;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Click pumpkin triggers fire flare
    const handleClick = () => {
      fireLight.intensity = 16;
      fireGlowLight.intensity = 8;
      setTimeout(() => {
        fireLight.intensity = 5.5;
        fireGlowLight.intensity = 3.0;
      }, 400);
    };
    container.addEventListener("click", handleClick);

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // Animation Loop
    let clock = new THREE.Clock();
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Smooth tracking towards mouse cursor
      currentRotX += (targetRotX - currentRotX) * 0.06;
      currentRotY += (targetRotY - currentRotY) * 0.06;

      pumpkinGroup.rotation.x = currentRotX + Math.sin(time * 1.5) * 0.04;
      pumpkinGroup.rotation.y = currentRotY + Math.cos(time * 1.2) * 0.06;
      pumpkinGroup.position.y = Math.sin(time * 2.2) * 0.1;

      // Realistic candle fire flicker inside
      const flicker = Math.sin(time * 16) * 0.8 + Math.cos(time * 28) * 0.5;
      fireLight.intensity = 5.5 + flicker;
      flameMat.opacity = 0.92 + Math.sin(time * 14) * 0.08;
      core.scale.setScalar(1 + flicker * 0.05);

      // Animate embers rising
      const pos = emberGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < emberCount; i++) {
        pos[i * 3] += emberVelocities[i].x;
        pos[i * 3 + 1] += emberVelocities[i].y;
        pos[i * 3 + 2] += emberVelocities[i].z;

        if (pos[i * 3 + 1] > 3) {
          pos[i * 3 + 1] = -2.5;
          pos[i * 3] = (Math.random() - 0.5) * 6;
        }
      }
      emberGeo.attributes.position.needsUpdate = true;

      // Animate bats
      bats.forEach((bat, idx) => {
        bat.angle += bat.speed;
        bat.group.position.x = Math.cos(bat.angle) * bat.radius;
        bat.group.position.z = Math.sin(bat.angle) * bat.radius;
        bat.group.position.y = bat.y + Math.sin(time * 3 + idx) * 0.5;

        bat.group.rotation.y = -bat.angle + Math.PI / 2;

        const flap = Math.sin(time * 26 + idx * 2) * 0.75;
        bat.leftWing.rotation.y = flap;
        bat.rightWing.rotation.y = -flap;
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("click", handleClick);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [interactive]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full pointer-events-auto cursor-pointer ${className}`}
      title="Interactive 3D Jack-O'-Lantern: Move mouse to track"
    />
  );
};
