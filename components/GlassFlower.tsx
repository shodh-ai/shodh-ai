"use client";

import React, { useRef, useMemo, useLayoutEffect } from "react";
import { useGLTF, MeshTransmissionMaterial, useScroll, MeshDistortMaterial } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { MathUtils } from "three";

export function GlassFlower() {
  const { nodes } = useGLTF("/Untitled1.glb") as any;
  const scroll = useScroll();
  const group = useRef<THREE.Group>(null);
  const sphereRef = useRef<THREE.Mesh>(null);
  const petalRefs = useRef<(THREE.Mesh | null)[]>([]);
  
  const { viewport } = useThree();
  const isMobile = viewport.width < 5;
  
  const startX = isMobile ? 0 : -2.5; 
  const endX = 0; // STRICT CENTER 

  const petalData = useMemo(() => {
    const petalKeys = Object.keys(nodes).filter((key) => key.toLowerCase().includes("petal"));

    return petalKeys.map((key) => {
      const node = nodes[key];
      const originalPos = node.position.clone();
      const originalRot = node.rotation.clone();

      // Distance: How scattered they are initially
      const distance = 3.5 + Math.random() * 4.0;

      const direction = new THREE.Vector3(
        (Math.random() - 0.5), 
        (Math.random() - 0.5) * 1.5, 
        (Math.random() - 0.5)
      ).normalize();
      
      const randomPos = direction.multiplyScalar(distance);

      const randomRot = new THREE.Euler(Math.random()*Math.PI, Math.random()*Math.PI, Math.random()*Math.PI);

      return {
        geometry: node.geometry,
        originalPos,
        originalRot,
        randomPos,
        randomRot
      };
    });
  }, [nodes]);

  // Pre-position meshes to prevent "flicker" on load
  useLayoutEffect(() => {
    petalRefs.current.forEach((mesh, i) => {
      if (mesh && petalData[i]) {
        mesh.position.copy(petalData[i].randomPos);
        mesh.rotation.copy(petalData[i].randomRot);
      }
    });
  }, [petalData]);

  useFrame((state, delta) => {
    // 1. MOVEMENT (Fast entry)
    const r_move = scroll.range(0, 0.15);
    const moveProgress = THREE.MathUtils.smoothstep(r_move, 0, 1);
    
    // 2. ASSEMBLY (SYNCED WITH TEXT)
    // Range matches WhatWeBuilding: 0.15 to 0.65
    // The flower will be fully assembled exactly when Slide 3 is fully visible.
    const r_assemble = scroll.range(0.15, 0.65);
    const assembleProgress = THREE.MathUtils.smootherstep(r_assemble, 0, 1);

    // 3. EXIT (Only after everything is done)
    // Starts at 0.80 (0.15 + 0.65)
    const r_exit = scroll.range(0.80, 0.15);
    const scrollUpOffset = r_exit * 25;

    if (group.current) {
        const currentX = THREE.MathUtils.lerp(startX, endX, moveProgress);
        const breath = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
        group.current.scale.set(0.8 * breath, 0.8 * breath, 0.8 * breath);
        group.current.position.x = currentX;
        
        // Stays at Y=0 while text is visible. Only moves up on Exit.
        const idleFloat = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
        group.current.position.y = idleFloat + scrollUpOffset;
        
        group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }

    if (sphereRef.current) {
      sphereRef.current.rotation.y += delta * 0.5;
      sphereRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }

    petalRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const data = petalData[i];

      const targetX = THREE.MathUtils.lerp(data.randomPos.x, data.originalPos.x, assembleProgress);
      const targetY = THREE.MathUtils.lerp(data.randomPos.y, data.originalPos.y, assembleProgress);
      const targetZ = THREE.MathUtils.lerp(data.randomPos.z, data.originalPos.z, assembleProgress);

      const rotX = THREE.MathUtils.lerp(data.randomRot.x, data.originalRot.x, assembleProgress);
      const rotY = THREE.MathUtils.lerp(data.randomRot.y, data.originalRot.y, assembleProgress);
      const rotZ = THREE.MathUtils.lerp(data.randomRot.z, data.originalRot.z, assembleProgress);

      // TIGHTER DAMPING (Increased from 3 to 8)
      // This forces the flower to stick closely to the text timing without lagging behind.
      mesh.position.x = MathUtils.damp(mesh.position.x, targetX, 8, delta);
      mesh.position.y = MathUtils.damp(mesh.position.y, targetY, 8, delta);
      mesh.position.z = MathUtils.damp(mesh.position.z, targetZ, 8, delta);

      mesh.rotation.x = MathUtils.damp(mesh.rotation.x, rotX, 8, delta);
      mesh.rotation.y = MathUtils.damp(mesh.rotation.y, rotY, 8, delta);
      mesh.rotation.z = MathUtils.damp(mesh.rotation.z, rotZ, 8, delta);
    });
  });

  return (
    // Note: Initial position is handled via ref in useFrame
    <group ref={group} dispose={null} scale={[0.8, 0.8, 0.8]}>
      {petalData.map((p, i) => (
        <mesh 
          key={i} 
          ref={(el) => { petalRefs.current[i] = el; }} 
          geometry={p.geometry}
        >
           <meshPhysicalMaterial 
            color="#1a2e4a" 
            roughness={0.15} 
            metalness={0.9} 
            reflectivity={1}
            iridescence={0.3}
            clearcoat={1}
           />
        </mesh>
      ))}

      {/* Outer Glass Shell */}
      {nodes.Sphere && (
        <mesh 
            ref={sphereRef}
            geometry={nodes.Sphere.geometry} 
            scale={[1.1, 1.1, 1.1]}
        >
          <MeshTransmissionMaterial
            backside
            samples={4} 
            thickness={0.8}
            chromaticAberration={0.06}
            anisotropy={0.1}
            distortion={0.3}
            distortionScale={0.3}
            temporalDistortion={0.2}
            iridescence={0.5}
            iridescenceIOR={1}
            roughness={0.15}
            clearcoat={1}
            color="#c9e6ff"
          />
        </mesh>
      )}

      {/* Cosmic Ball */}
      {nodes.Sphere001 && (
        <mesh geometry={nodes.Sphere001.geometry}>
          <pointLight intensity={30} distance={15} color="#48cae4" decay={1} />
          <MeshDistortMaterial
            speed={3}
            distort={0.6}
            color="#a2d2ff"
            emissive="#48cae4"
            emissiveIntensity={5}
            toneMapped={false}
            roughness={0.2}
          />
        </mesh>
      )}
    </group>
  );
}

useGLTF.preload("/Untitled1.glb");
