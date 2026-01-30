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
  const sphereRef = useRef<THREE.Mesh>(null); // Outer Glass
  const coreRef = useRef<THREE.Mesh>(null);   // Inner Metal Core
  const petalRefs = useRef<(THREE.Mesh | null)[]>([]);
  
  const { viewport } = useThree();
  const isMobile = viewport.width < 5;
  
  // Initial Position: Left for Hero
  const startX = isMobile ? 0 : -2.3; 

  const petalData = useMemo(() => {
    const petalKeys = Object.keys(nodes).filter((key) => key.toLowerCase().includes("petal"));

    return petalKeys.map((key) => {
      const node = nodes[key];
      const originalPos = node.position.clone();
      const originalRot = node.rotation.clone();

      // Close Cloud Distance
      const distance = 1.5 + Math.random() * 2.5;

      const direction = new THREE.Vector3(
        (Math.random() - 0.2), // Slight right bias
        (Math.random() - 0.5) * 1.2, 
        (Math.random() - 0.5)
      ).normalize();
      
      const randomPos = direction.multiplyScalar(distance);

      const randomRot = new THREE.Euler(
        Math.random() * Math.PI, // Reduced rotation chaos slightly
        Math.random() * Math.PI,
        Math.random() * Math.PI
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
    // 1. ASSEMBLY PHASE (Synced with new 450vh height)
    // Range extended to 0.65 to cover the longer scroll distance.
    const r1 = scroll.range(0, 0.65);
    const progress = THREE.MathUtils.smootherstep(r1, 0, 1);

    // 2. EXIT PHASE (Late Departure)
    // Starts at 0.70 (Near the very end of the text section)
    // This ensures the flower stays centered while you read the 3rd paragraph.
    const r2 = scroll.range(0.70, 0.20);
    const scrollUpOffset = r2 * 7.5;

    if (group.current) {
        const idleFloat = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;

        // Y POSITION LOGIC
        const assemblyYDrop = THREE.MathUtils.lerp(0, -0.6, progress);
        group.current.position.y = idleFloat + scrollUpOffset + assemblyYDrop;

        // X POSITION: Drifts slowly to center as you read
        const targetX = isMobile ? 0 : THREE.MathUtils.lerp(startX, 0, progress);
        group.current.position.x = targetX;
        
        group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;

        // Scale Animation (0.76 -> 1.14)
        // Reduced by 5% (0.8 -> 0.76 and 1.2 -> 1.14)
        const currentScale = THREE.MathUtils.lerp(0.76, 1.0, progress);
        group.current.scale.set(currentScale, currentScale, currentScale);
    }

    // Outer Glass Rotation
    if (sphereRef.current) {
      sphereRef.current.rotation.y += delta * 0.5;
      sphereRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }

    // Core Rotation (Slow and heavy like metal)
    if (coreRef.current) {
        coreRef.current.rotation.y += delta * 0.5; 
        coreRef.current.rotation.z += delta * 0.2;
    }

    // Petal Logic
    petalRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const data = petalData[i];

      const targetX = THREE.MathUtils.lerp(data.randomPos.x, data.originalPos.x, progress);
      const targetY = THREE.MathUtils.lerp(data.randomPos.y, data.originalPos.y, progress);
      const targetZ = THREE.MathUtils.lerp(data.randomPos.z, data.originalPos.z, progress);

      const rotX = THREE.MathUtils.lerp(data.randomRot.x, data.originalRot.x, progress);
      const rotY = THREE.MathUtils.lerp(data.randomRot.y, data.originalRot.y, progress);
      const rotZ = THREE.MathUtils.lerp(data.randomRot.z, data.originalRot.z, progress);

      // Increased damping slightly for smoother slow-motion feel
      mesh.position.x = MathUtils.damp(mesh.position.x, targetX, 6, delta);
      mesh.position.y = MathUtils.damp(mesh.position.y, targetY, 6, delta);
      mesh.position.z = MathUtils.damp(mesh.position.z, targetZ, 6, delta);

      mesh.rotation.x = MathUtils.damp(mesh.rotation.x, rotX, 6, delta);
      mesh.rotation.y = MathUtils.damp(mesh.rotation.y, rotY, 6, delta);
      mesh.rotation.z = MathUtils.damp(mesh.rotation.z, rotZ, 6, delta);
    });
  });

  return (
    // Note: yPosition is handled in useFrame now, so we pass 0 here
    // Updated initial scale to match the 5% reduction
    <group ref={group} dispose={null} scale={[0.76, 0.76, 0.76]} position={[startX, 0, 0]}>
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
            scale={[1, 1, 1]}
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

      {/* INNER CORE: Now Metallic to match the petals */}
      {nodes.Sphere001 && (
        <mesh 
            ref={coreRef} 
            geometry={nodes.Sphere001.geometry}
            scale={[1, 1, 1]}
        >
          <meshPhysicalMaterial
            color="#48cae4" // Shodh AI Cyan/Blue
            emissive="#001a24" // Very slight self-illumination so it doesn't look dead in shadows
            emissiveIntensity={0.5}
            metalness={1}    // Pure metal
            roughness={0.1}  // Polished chrome look
            clearcoat={1}    // Car-paint like coating
            clearcoatRoughness={0.1}
            reflectivity={1}
            iridescence={0.5} 
            iridescenceIOR={1.3}
          />
        </mesh>
      )}
    </group>
  );
}

useGLTF.preload("/Untitled1.glb");
