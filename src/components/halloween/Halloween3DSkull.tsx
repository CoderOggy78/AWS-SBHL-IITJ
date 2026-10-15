"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { horrorAudio } from "./HorrorSoundManager";

interface Halloween3DSkullProps {
  className?: string;
}

export const Halloween3DSkull: React.FC<Halloween3DSkullProps> = ({ className = "" }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 4.5);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    const skullGroup = new THREE.Group();
    scene.add(skullGroup);

    // 2. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0x1a0808, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffedd5, 1.4);
    keyLight.position.set(2, 4, 3);
    scene.add(keyLight);

    const crimsonRimLight = new THREE.DirectionalLight(0xdc2626, 3.2);
    crimsonRimLight.position.set(-3, -2, -2);
    scene.add(crimsonRimLight);

    const bottomFireLight = new THREE.PointLight(0xff4400, 3.5, 6);
    bottomFireLight.position.set(0, -2, 1);
    scene.add(bottomFireLight);

    // 3. Bone Material
    const boneMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4d0c7,
      roughness: 0.65,
      metalness: 0.12,
      flatShading: false,
    });

    const darkCavityMaterial = new THREE.MeshBasicMaterial({
      color: 0x050505,
    });

    // 4. Skull Anatomy Construction
    // Cranium (main rounded skull dome)
    const craniumGeo = new THREE.SphereGeometry(1.05, 32, 28);
    craniumGeo.scale(1.0, 1.15, 1.1);
    const cranium = new THREE.Mesh(craniumGeo, boneMaterial);
    cranium.position.set(0, 0.35, 0);
    skullGroup.add(cranium);

    // Brow ridge
    const browGeo = new THREE.CylinderGeometry(0.85, 0.9, 0.3, 24);
    browGeo.scale(1.1, 0.8, 1.1);
    const brow = new THREE.Mesh(browGeo, boneMaterial);
    brow.position.set(0, 0.35, 0.45);
    brow.rotation.x = Math.PI / 10;
    skullGroup.add(brow);

    // Cheekbones (Zygomatic arches)
    const cheekGeo = new THREE.BoxGeometry(0.35, 0.4, 0.5);
    const leftCheek = new THREE.Mesh(cheekGeo, boneMaterial);
    leftCheek.position.set(-0.75, -0.05, 0.45);
    leftCheek.rotation.y = 0.3;
    skullGroup.add(leftCheek);

    const rightCheek = new THREE.Mesh(cheekGeo, boneMaterial);
    rightCheek.position.set(0.75, -0.05, 0.45);
    rightCheek.rotation.y = -0.3;
    skullGroup.add(rightCheek);

    // Eye Sockets (Dark sunken cavities)
    const eyeSocketGeo = new THREE.SphereGeometry(0.28, 16, 16);
    eyeSocketGeo.scale(0.9, 1.2, 0.6);

    const leftSocket = new THREE.Mesh(eyeSocketGeo, darkCavityMaterial);
    leftSocket.position.set(-0.4, 0.2, 0.95);
    skullGroup.add(leftSocket);

    const rightSocket = new THREE.Mesh(eyeSocketGeo, darkCavityMaterial);
    rightSocket.position.set(0.4, 0.2, 0.95);
    skullGroup.add(rightSocket);

    // Glowing Demon Eyes inside sockets
    const eyeGlowMaterial = new THREE.MeshBasicMaterial({
      color: 0xff1100,
    });
    const eyeFlameGeo = new THREE.SphereGeometry(0.09, 12, 12);

    const leftEyeFlame = new THREE.Mesh(eyeFlameGeo, eyeGlowMaterial);
    leftEyeFlame.position.set(-0.4, 0.2, 0.97);
    skullGroup.add(leftEyeFlame);

    const rightEyeFlame = new THREE.Mesh(eyeFlameGeo, eyeGlowMaterial);
    rightEyeFlame.position.set(0.4, 0.2, 0.97);
    skullGroup.add(rightEyeFlame);

    const eyeLight = new THREE.PointLight(0xff2200, 2.5, 4);
    eyeLight.position.set(0, 0.25, 1.1);
    skullGroup.add(eyeLight);

    // Nasal Cavity (Inverted triangle)
    const noseGeo = new THREE.ConeGeometry(0.16, 0.35, 3);
    noseGeo.rotateX(Math.PI);
    const nose = new THREE.Mesh(noseGeo, darkCavityMaterial);
    nose.position.set(0, -0.1, 1.05);
    skullGroup.add(nose);

    // Upper Jaw (Maxilla)
    const maxillaGeo = new THREE.BoxGeometry(0.8, 0.4, 0.6);
    const maxilla = new THREE.Mesh(maxillaGeo, boneMaterial);
    maxilla.position.set(0, -0.35, 0.7);
    skullGroup.add(maxilla);

    // Upper Teeth
    const toothMaterial = new THREE.MeshStandardMaterial({
      color: 0xf5f3ea,
      roughness: 0.4,
    });
    const toothGeo = new THREE.BoxGeometry(0.09, 0.16, 0.09);

    for (let i = -3; i <= 3; i++) {
      if (i === 0) continue;
      const tooth = new THREE.Mesh(toothGeo, toothMaterial);
      tooth.position.set(i * 0.11, -0.55, 0.88 - Math.abs(i) * 0.03);
      skullGroup.add(tooth);
    }

    // Lower Jaw (Mandible) - can animate slightly!
    const mandibleGroup = new THREE.Group();
    mandibleGroup.position.set(0, -0.65, 0.5);

    const mandibleGeo = new THREE.BoxGeometry(0.72, 0.35, 0.55);
    const mandible = new THREE.Mesh(mandibleGeo, boneMaterial);
    mandible.position.set(0, -0.15, 0.1);
    mandibleGroup.add(mandible);

    // Lower Teeth
    for (let i = -3; i <= 3; i++) {
      if (i === 0) continue;
      const tooth = new THREE.Mesh(toothGeo, toothMaterial);
      tooth.position.set(i * 0.1, 0.05, 0.35 - Math.abs(i) * 0.03);
      mandibleGroup.add(tooth);
    }
    skullGroup.add(mandibleGroup);

    // 5. Floating Ghostly Blood Embers Particles
    const emberCount = 50;
    const emberGeo = new THREE.BufferGeometry();
    const emberPositions = new Float32Array(emberCount * 3);

    for (let i = 0; i < emberCount * 3; i += 3) {
      emberPositions[i] = (Math.random() - 0.5) * 4;
      emberPositions[i + 1] = (Math.random() - 0.5) * 4;
      emberPositions[i + 2] = (Math.random() - 0.5) * 3;
    }
    emberGeo.setAttribute("position", new THREE.BufferAttribute(emberPositions, 3));

    const emberMat = new THREE.PointsMaterial({
      color: 0xff3b30,
      size: 0.06,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    const embers = new THREE.Points(emberGeo, emberMat);
    scene.add(embers);

    // 6. Interaction & Animation Loop
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetX = x * 0.45;
      targetY = y * 0.35;
    };

    window.addEventListener("mousemove", onMouseMove);

    // Click skull interaction
    const onClick = () => {
      horrorAudio.playWhisperStinger();
      // Chattering jaw snap
      mandibleGroup.position.y = -0.85;
      setTimeout(() => {
        mandibleGroup.position.y = -0.65;
      }, 180);
    };
    container.addEventListener("click", onClick);

    let animationFrameId: number;
    let clock = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      clock += 0.02;

      // Smooth mouse follow
      mouseX += (targetX - mouseX) * 0.06;
      mouseY += (targetY - mouseY) * 0.06;

      skullGroup.rotation.y = mouseX + Math.sin(clock * 0.8) * 0.08;
      skullGroup.rotation.x = -mouseY + Math.cos(clock * 1.1) * 0.05;
      skullGroup.position.y = Math.sin(clock * 1.6) * 0.12;

      // Pulse eye flames
      const flicker = 1.8 + Math.sin(clock * 7) * 0.8 + Math.random() * 0.4;
      eyeLight.intensity = flicker;
      const eyeScale = 0.9 + Math.sin(clock * 5) * 0.15;
      leftEyeFlame.scale.set(eyeScale, eyeScale, eyeScale);
      rightEyeFlame.scale.set(eyeScale, eyeScale, eyeScale);

      // Rotate embers
      embers.rotation.y = clock * 0.15;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("click", onClick);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative cursor-pointer select-none ${className}`}
      title="3D Demonic Skull... move mouse to track • click to awaken"
    />
  );
};
