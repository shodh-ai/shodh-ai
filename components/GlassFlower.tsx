"use client";

import React, { useRef, useMemo, useLayoutEffect } from "react";
import { useGLTF, MeshTransmissionMaterial, useScroll } from "@react-three/drei";
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
  const xPosition = isMobile ? 0 : -2.2; 

  const petalData = useMemo(() => {
    const petalKeys = Object.keys(nodes).filter((key) => key.toLowerCase().includes("petal"));

    return petalKeys.map((key) => {
      const node = nodes[key];
      
      const originalPos = node.position.clone();
      const originalRot = node.rotation.clone();

      // SCATTER LOGIC - VISIBILITY FIX
      // Camera is at Z=6. We must ensure petals don't start behind the camera (Z > 6).
      
      const randomX = (Math.random() - 0.5) * 25; // Wide spread horizontally
      const randomY = (Math.random() - 0.5) * 25; // Wide spread vertically
      const randomZ = -5 - Math.random() * 10;    // Start DEEP inside (Z: -5 to -15) so they fly forward
      
      const randomPos = new THREE.Vector3(randomX, randomY, randomZ);

      const randomRot = new THREE.Euler(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
      );

      return {
        geometry: node.geometry,
        originalPos,
        originalRot,
        randomPos,
        randomRot
      };
    });
  }, [nodes]);

  useLayoutEffect(() => {
    petalRefs.current.forEach((mesh, i) => {
      if (mesh && petalData[i]) {
        mesh.position.copy(petalData[i].randomPos);
        mesh.rotation.copy(petalData[i].randomRot);
      }
    });
  }, [petalData]);

  useFrame((state, delta) => {
    // TIMING FIX:
    // 0.25 ensures it finishes strictly within the first 25% of the page
    // (Hero + WhatWeBuilding). It will not go beyond.
    const r1 = scroll.range(0, 0.25); 
    
    // Idle Animation
    if (group.current) {
        group.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
        group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
    }

    if (sphereRef.current) {
      sphereRef.current.rotation.y += delta * 0.5;
      sphereRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }

    // ANIMATION LOOP
    petalRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const data = petalData[i];

      const targetX = THREE.MathUtils.lerp(data.randomPos.x, data.originalPos.x, r1);
      const targetY = THREE.MathUtils.lerp(data.randomPos.y, data.originalPos.y, r1);
      const targetZ = THREE.MathUtils.lerp(data.randomPos.z, data.originalPos.z, r1);

      const rotX = THREE.MathUtils.lerp(data.randomRot.x, data.originalRot.x, r1);
      const rotY = THREE.MathUtils.lerp(data.randomRot.y, data.originalRot.y, r1);
      const rotZ = THREE.MathUtils.lerp(data.randomRot.z, data.originalRot.z, r1);

      // DAMPLING SPEED INCREASED (8)
      // This makes the animation "tighter" so it doesn't lag behind the scrollbar
      mesh.position.x = MathUtils.damp(mesh.position.x, targetX, 8, delta);
      mesh.position.y = MathUtils.damp(mesh.position.y, targetY, 8, delta);
      mesh.position.z = MathUtils.damp(mesh.position.z, targetZ, 8, delta);

      mesh.rotation.x = MathUtils.damp(mesh.rotation.x, rotX, 8, delta);
      mesh.rotation.y = MathUtils.damp(mesh.rotation.y, rotY, 8, delta);
      mesh.rotation.z = MathUtils.damp(mesh.rotation.z, rotZ, 8, delta);
    });
  });

  return (
    <group ref={group} dispose={null} scale={[0.8, 0.8, 0.8]} position={[xPosition, 0, 0]}>
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

      {nodes.Sphere001 && (
        <mesh geometry={nodes.Sphere001.geometry}>
          <meshStandardMaterial
            toneMapped={false}
            emissive="#48cae4"
            color="#000"
            emissiveIntensity={3}
          />
        </mesh>
      )}
    </group>
  );
}

useGLTF.preload("/Untitled1.glb");
