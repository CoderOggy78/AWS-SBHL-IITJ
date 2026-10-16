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
    // 3. Menacing Fiery Carved Eyes and Grin (Facing DIRECTLY towards camera on +Z)
    // Multi-layer horror materials: Charred burnt flesh backing + Blazing magma fire + Demon pupils
    const charredRimMat = new THREE.MeshBasicMaterial({
      color: 0x050000,
      side: THREE.DoubleSide,
    });

    const demonFlameMat = new THREE.MeshBasicMaterial({
      color: 0xff3300,
      transparent: true,
      opacity: 0.98,
      side: THREE.DoubleSide,
    });

    const demonCoreMat = new THREE.MeshBasicMaterial({
      color: 0xffcc00,
      transparent: true,
      opacity: 0.95,
      side: THREE.DoubleSide,
    });

    const demonPupilMat = new THREE.MeshBasicMaterial({
      color: 0x080101,
      side: THREE.DoubleSide,
    });

    // --- MASSIVE SCARY JAGGED DEMONIC EYES ---
    // Left Demon Eye (Huge, aggressively slanted inward with razor-sharp serrations & temple claw)
    const leftEyeShape = new THREE.Shape();
    leftEyeShape.moveTo(-0.28, 0.24); // top outer horn
    leftEyeShape.lineTo(-0.20, 0.12);
    leftEyeShape.lineTo(-0.14, 0.22); // brow fang
    leftEyeShape.lineTo(-0.04, 0.12);
    leftEyeShape.lineTo(0.06, 0.20);  // second brow fang
    leftEyeShape.lineTo(0.24, -0.06); // deep piercing inner tear duct
    leftEyeShape.lineTo(0.16, -0.16); // bottom jagged ledge
    leftEyeShape.lineTo(0.08, -0.06); // inner tooth
    leftEyeShape.lineTo(-0.02, -0.20);
    leftEyeShape.lineTo(-0.10, -0.10);
    leftEyeShape.lineTo(-0.22, -0.22); // bottom outer sharp barb
    leftEyeShape.lineTo(-0.25, -0.02);
    leftEyeShape.closePath();

    // Right Demon Eye (Mirrored horizontally for balanced terrifying menacing glare)
    const rightEyeShape = new THREE.Shape();
    rightEyeShape.moveTo(0.28, 0.24); // top outer horn
    rightEyeShape.lineTo(0.20, 0.12);
    rightEyeShape.lineTo(0.14, 0.22); // brow fang
    rightEyeShape.lineTo(0.04, 0.12);
    rightEyeShape.lineTo(-0.06, 0.20); // second brow fang
    rightEyeShape.lineTo(-0.24, -0.06); // deep piercing inner tear duct
    rightEyeShape.lineTo(-0.16, -0.16); // bottom jagged ledge
    rightEyeShape.lineTo(-0.08, -0.06); // inner tooth
    rightEyeShape.lineTo(0.02, -0.20);
    rightEyeShape.lineTo(0.10, -0.10);
    rightEyeShape.lineTo(0.22, -0.22); // bottom outer sharp barb
    rightEyeShape.lineTo(0.25, -0.02);
    rightEyeShape.closePath();

    // Left Eye Charred Outer Depth Rim
    const leftEyeRimGeo = new THREE.ShapeGeometry(leftEyeShape);
    const leftEyeRim = new THREE.Mesh(leftEyeRimGeo, charredRimMat);
    leftEyeRim.position.set(-0.35, 0.18, 0.91);
    leftEyeRim.scale.set(1.15, 1.15, 1.15);
    leftEyeRim.rotation.z = -0.15;
    leftEyeRim.rotation.x = -0.15;
    pumpkinGroup.add(leftEyeRim);

    // Left Eye Fiery Mesh
    const leftEyeGeo = new THREE.ShapeGeometry(leftEyeShape);
    const leftEye = new THREE.Mesh(leftEyeGeo, demonFlameMat);
    leftEye.position.set(-0.35, 0.18, 0.925);
    leftEye.rotation.z = -0.15;
    leftEye.rotation.x = -0.15;
    pumpkinGroup.add(leftEye);

    // Left Eye Blazing Inner Core
    const leftEyeCore = new THREE.Mesh(leftEyeGeo, demonCoreMat);
    leftEyeCore.position.set(-0.35, 0.18, 0.93);
    leftEyeCore.scale.set(0.68, 0.68, 0.68);
    leftEyeCore.rotation.z = -0.15;
    leftEyeCore.rotation.x = -0.15;
    pumpkinGroup.add(leftEyeCore);

    // Left Eye Demonic Slit Pupil
    const slitShape = new THREE.Shape();
    slitShape.moveTo(0, 0.13);
    slitShape.lineTo(0.026, 0);
    slitShape.lineTo(0, -0.13);
    slitShape.lineTo(-0.026, 0);
    slitShape.closePath();
    const slitGeo = new THREE.ShapeGeometry(slitShape);
    const leftPupil = new THREE.Mesh(slitGeo, demonPupilMat);
    leftPupil.position.set(-0.35, 0.18, 0.938);
    leftPupil.rotation.z = 0.05;
    leftPupil.rotation.x = -0.15;
    pumpkinGroup.add(leftPupil);

    // Right Eye Charred Outer Depth Rim
    const rightEyeRimGeo = new THREE.ShapeGeometry(rightEyeShape);
    const rightEyeRim = new THREE.Mesh(rightEyeRimGeo, charredRimMat);
    rightEyeRim.position.set(0.35, 0.18, 0.91);
    rightEyeRim.scale.set(1.15, 1.15, 1.15);
    rightEyeRim.rotation.z = 0.15;
    rightEyeRim.rotation.x = -0.15;
    pumpkinGroup.add(rightEyeRim);

    // Right Eye Fiery Mesh
    const rightEyeGeo = new THREE.ShapeGeometry(rightEyeShape);
    const rightEye = new THREE.Mesh(rightEyeGeo, demonFlameMat);
    rightEye.position.set(0.35, 0.18, 0.925);
    rightEye.rotation.z = 0.15;
    rightEye.rotation.x = -0.15;
    pumpkinGroup.add(rightEye);

    // Right Eye Blazing Inner Core
    const rightEyeCore = new THREE.Mesh(rightEyeGeo, demonCoreMat);
    rightEyeCore.position.set(0.35, 0.18, 0.93);
    rightEyeCore.scale.set(0.68, 0.68, 0.68);
    rightEyeCore.rotation.z = 0.15;
    rightEyeCore.rotation.x = -0.15;
    pumpkinGroup.add(rightEyeCore);

    // Right Eye Demonic Slit Pupil
    const rightPupil = new THREE.Mesh(slitGeo, demonPupilMat);
    rightPupil.position.set(0.35, 0.18, 0.938);
    rightPupil.rotation.z = -0.05;
    rightPupil.rotation.x = -0.15;
    pumpkinGroup.add(rightPupil);

    // Dedicated Eye Point Lights for Intense Horror Volumetric Flare
    const leftEyeLight = new THREE.PointLight(0xff1800, 4.0, 3.5);
    leftEyeLight.position.set(-0.35, 0.18, 0.88);
    pumpkinGroup.add(leftEyeLight);

    const rightEyeLight = new THREE.PointLight(0xff1800, 4.0, 3.5);
    rightEyeLight.position.set(0.35, 0.18, 0.88);
    pumpkinGroup.add(rightEyeLight);

    // Carved Jagged Skull Nose
    const noseShape = new THREE.Shape();
    noseShape.moveTo(-0.09, 0.11);
    noseShape.lineTo(0, 0.04); // notch
    noseShape.lineTo(0.09, 0.11);
    noseShape.lineTo(0.06, -0.02);
    noseShape.lineTo(0, -0.13); // fang
    noseShape.lineTo(-0.06, -0.02);
    noseShape.closePath();
    const noseGeo = new THREE.ShapeGeometry(noseShape);
    const noseRim = new THREE.Mesh(noseGeo, charredRimMat);
    noseRim.position.set(0, 0.02, 0.94);
    noseRim.scale.set(1.2, 1.2, 1.2);
    pumpkinGroup.add(noseRim);
    const nose = new THREE.Mesh(noseGeo, demonCoreMat);
    nose.position.set(0, 0.02, 0.96);
    pumpkinGroup.add(nose);

    // Terrifying Wide Jagged Horror Maw with Interlocking Vampire Needle Fangs
    const mouthShape = new THREE.Shape();
    mouthShape.moveTo(-0.72, 0.02);
    // Lower jaw contour with jagged razor fangs
    mouthShape.lineTo(-0.55, -0.24);
    mouthShape.lineTo(-0.46, -0.12); // fang 1
    mouthShape.lineTo(-0.36, -0.32);
    mouthShape.lineTo(-0.26, -0.14); // fang 2
    mouthShape.lineTo(-0.14, -0.38);
    mouthShape.lineTo(0, -0.15);     // lower center fang
    mouthShape.lineTo(0.14, -0.38);
    mouthShape.lineTo(0.26, -0.14);  // fang 4
    mouthShape.lineTo(0.36, -0.32);
    mouthShape.lineTo(0.46, -0.12);  // fang 5
    mouthShape.lineTo(0.55, -0.24);
    mouthShape.lineTo(0.72, 0.02);
    // Upper jaw contour with long dripping vicious needle teeth
    mouthShape.lineTo(0.58, -0.10);
    mouthShape.lineTo(0.44, 0.06);   // upper needle 1
    mouthShape.lineTo(0.34, -0.12);
    mouthShape.lineTo(0.22, 0.10);   // upper massive fang 2
    mouthShape.lineTo(0.10, -0.14);
    mouthShape.lineTo(0, 0.12);      // center upper death tooth
    mouthShape.lineTo(-0.10, -0.14);
    mouthShape.lineTo(-0.22, 0.10);  // upper massive fang 4
    mouthShape.lineTo(-0.34, -0.12);
    mouthShape.lineTo(-0.44, 0.06);  // upper needle 5
    mouthShape.lineTo(-0.58, -0.10);
    mouthShape.closePath();

    const mouthGeo = new THREE.ShapeGeometry(mouthShape);
    // Dark charred mouth rim
    const mouthRim = new THREE.Mesh(mouthGeo, charredRimMat);
    mouthRim.position.set(0, -0.22, 0.905);
    mouthRim.scale.set(1.08, 1.08, 1.08);
    mouthRim.rotation.x = -0.1;
    pumpkinGroup.add(mouthRim);

    // Blazing fiery mouth
    const mouth = new THREE.Mesh(mouthGeo, demonFlameMat);
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

    let shudder = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      targetRotY = x * 0.75;
      targetRotX = -y * 0.5;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Click pumpkin triggers demonic horror surge & witch cackle
    const handleClick = () => {
      shudder = 1.0;
      horrorAudio.playWitchCackle();
      fireLight.intensity = 26;
      fireGlowLight.intensity = 16;
      leftEyeLight.intensity = 24;
      rightEyeLight.intensity = 24;
      demonFlameMat.color.setHex(0xff0000);
      demonCoreMat.color.setHex(0xffffff);

      setTimeout(() => {
        fireLight.intensity = 5.5;
        fireGlowLight.intensity = 3.0;
        leftEyeLight.intensity = 4.0;
        rightEyeLight.intensity = 4.0;
        demonFlameMat.color.setHex(0xff3300);
        demonCoreMat.color.setHex(0xffcc00);
      }, 550);
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

      // Demonic horror twitch/shudder
      if (shudder > 0.01) {
        pumpkinGroup.position.x = (Math.random() - 0.5) * shudder * 0.25;
        pumpkinGroup.position.z = (Math.random() - 0.5) * shudder * 0.25;
        shudder *= 0.91;
      } else {
        pumpkinGroup.position.x = 0;
        pumpkinGroup.position.z = 0;
      }

      // Realistic candle fire flicker inside + demon eye flare
      const flicker = Math.sin(time * 16) * 0.8 + Math.cos(time * 28) * 0.5;
      fireLight.intensity = 5.5 + flicker;
      leftEyeLight.intensity = 4.0 + Math.sin(time * 18) * 1.5;
      rightEyeLight.intensity = 4.0 + Math.cos(time * 22) * 1.5;
      demonFlameMat.opacity = 0.92 + Math.sin(time * 14) * 0.08;
      demonCoreMat.opacity = 0.9 + Math.cos(time * 18) * 0.08;
      core.scale.setScalar(1 + flicker * 0.05);

      // Pupil dilation / creepy jitter
      const pupilJitter = Math.sin(time * 7) * 0.08;
      leftPupil.scale.set(1 + pupilJitter, 1, 1);
      rightPupil.scale.set(1 - pupilJitter, 1, 1);

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
