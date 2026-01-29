"use client";

import { Canvas } from "@react-three/fiber";
import { ScrollControls, Scroll, Environment } from "@react-three/drei";
import { Suspense } from "react";

import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Impact from "@/components/Impact";
import Navbar from "@/components/Navbar";
import WhatWeBuilding from "@/components/WhatWeBuilding";
import { GlassFlower } from "@/components/GlassFlower";

// Extracting this prevents the "createRoot" hydration warning
function HTMLContent() {
  return (
    <>
      <Navbar />
      <Hero />
      <WhatWeBuilding />
      <HowItWorks />
      <Impact />
      <Footer />
    </>
  );
}

export default function Home() {
  return (
    <main className="h-screen w-full bg-[#081421]">
      <Canvas
        gl={{ antialias: true }}
        camera={{ position: [0, 0, 6], fov: 35 }}
        style={{ width: "100%", height: "100vh" }}
      >
        <color attach="background" args={["#081421"]} />
        
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" />
        <pointLight position={[-10, -10, -5]} intensity={5} color="#48cae4" />
        <Environment preset="city" />

        <Suspense fallback={null}>
          {/* FIX: Increased pages from 6 to 8 to accommodate the tall 300vh section */}
          <ScrollControls pages={8.15} damping={0.2}>
            
            {/* The 3D Scene */}
            <GlassFlower />

            {/* The DOM Content */}
            <Scroll html style={{ width: "100%" }}>
              <HTMLContent />
            </Scroll>
          </ScrollControls>
        </Suspense>
      </Canvas>
    </main>
  );
}
