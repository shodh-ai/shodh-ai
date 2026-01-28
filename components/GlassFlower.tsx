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
  const coreRef = useRef<THREE.Mesh>(null);   // Neutron Star Core
  const petalRefs = useRef<(THREE.Mesh | null)[]>([]);
  
  const { viewport } = useThree();
  const isMobile = viewport.width < 5;
  
  // Position aligned with your "White Circle" design (Left side)
  const xPosition = isMobile ? 0 : -2.2; 

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
    const r1 = scroll.range(0, 0.25);
    const progress = THREE.MathUtils.smootherstep(r1, 0, 1);
    
    // Exit Phase
    const r2 = scroll.range(0.35, 0.20);
    const scrollUpOffset = r2 * 14;

    if (group.current) {
        const idleFloat = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
        group.current.position.y = idleFloat + scrollUpOffset;
        group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
    }

    // Outer Glass Rotation
    if (sphereRef.current) {
      sphereRef.current.rotation.y += delta * 0.5;
      sphereRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }

    // --- NEUTRON STAR ANIMATION ---
    if (coreRef.current) {
        // Fast spin (Neutron stars spin rapidly)
        coreRef.current.rotation.y -= delta * 5; 
        
        // Pulsing Intensity (Heartbeat of the star)
        // We access the material via type casting to animate properties
        const material = coreRef.current.material as THREE.MeshStandardMaterial;
        // Pulse between 4 and 8 intensity
        material.emissiveIntensity = 6 + Math.sin(state.clock.elapsedTime * 8) * 2;
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

      mesh.position.x = MathUtils.damp(mesh.position.x, targetX, 8, delta);
      mesh.position.y = MathUtils.damp(mesh.position.y, targetY, 8, delta);
      mesh.position.z = MathUtils.damp(mesh.position.z, targetZ, 8, delta);

      mesh.rotation.x = MathUtils.damp(mesh.rotation.x, rotX, 8, delta);
      mesh.rotation.y = MathUtils.damp(mesh.rotation.y, rotY, 8, delta);
      mesh.rotation.z = MathUtils.damp(mesh.rotation.z, rotZ, 8, delta);
    });
  });

  return (
    // Note: yPosition is handled in useFrame now, so we pass 0 here
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

      {/* NEUTRON STAR CORE */}
      {nodes.Sphere001 && (
        <mesh 
            ref={coreRef} // Attached Ref
            geometry={nodes.Sphere001.geometry}
        >
          <meshStandardMaterial
            toneMapped={false}
            // "Neutron Star" Color: Very bright, slightly blue-white
            emissive="#cceeff" 
            color="#ffffff"
            emissiveIntensity={6} // High intensity for bloom/glow feel
          />
        </mesh>
      )}
    </group>
  );
}

useGLTF.preload("/Untitled1.glb");
