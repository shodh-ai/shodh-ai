"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useMemo, useRef } from "react";

function GlassFlowerModel() {
  const { nodes } = useGLTF("/Untitled1.glb") as any;
  const group = useRef<THREE.Group>(null);

  const petalNodes = useMemo(() => {
    const allKeys = Object.keys(nodes ?? {});
    const explicitPetals = allKeys
      .filter((key) => key.toLowerCase().startsWith("petal"))
      .map((key) => nodes[key]);

    if (explicitPetals.length) return explicitPetals;
    if (nodes?.petals) return [nodes.petals];
    return [];
  }, [nodes]);

  return (
    <group ref={group} position={[0, -0.2, 0]}>
      <group>
        {petalNodes.map((node: any, i: number) => (
          <mesh
            key={node?.uuid || i}
            geometry={node.geometry}
            position={node.position}
            rotation={node.rotation}
            scale={node.scale}
          >
            <meshPhysicalMaterial
              color="#050508"
              metalness={1}
              roughness={0.05}
              envMapIntensity={1.5}
              clearcoat={1}
              clearcoatRoughness={0}
              reflectivity={1}
            />
          </mesh>
        ))}
      </group>

      {/* Outer sphere disabled - was causing WebGL crashes and white blowout
      {nodes?.Sphere?.geometry && (
        <mesh geometry={nodes.Sphere.geometry}>
          <meshPhysicalMaterial
            transmission={0.8}
            thickness={0.5}
            roughness={0.1}
            ior={1.4}
            envMapIntensity={0.5}
            transparent
            opacity={0.3}
          />
        </mesh>
      )}
      */}

      {nodes?.Sphere001?.geometry && (
        <mesh geometry={nodes.Sphere001.geometry}>
          <meshStandardMaterial
            toneMapped={false}
            emissive="#ff4fd8"
            color="#ff1b1b"
            emissiveIntensity={1.2}
          />
        </mesh>
      )}
    </group>
  );
}

export type GlassFlowerHeroSceneProps = {
  eventSource?: HTMLElement | null;
};

export default function GlassFlowerHeroScene({
  eventSource
}: GlassFlowerHeroSceneProps) {
  return (
    <Canvas
      gl={{ antialias: true, alpha: false }}
      camera={{ position: [0, 2.2, 5.2], fov: 35 }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x0a1628, 1)
        gl.domElement.style.background = "#0a1628"
      }}
      eventSource={eventSource ?? undefined}
      eventPrefix="client"
      style={{ width: "100%", height: "100%", pointerEvents: "none" }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 10]} intensity={1.2} color="#cbd5ff" />
      <pointLight position={[-10, -10, -10]} intensity={0.6} color="#ff4d4d" />
      <GlassFlowerModel />
      <OrbitControls
        enableDamping
        dampingFactor={0.08}
        rotateSpeed={0.8}
        enablePan={false}
        enableZoom={false}
      />
      <Environment preset="night" />
    </Canvas>
  );
}

useGLTF.preload("/Untitled1.glb");
