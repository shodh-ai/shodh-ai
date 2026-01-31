"use client";

import { Canvas } from "@react-three/fiber";
import { ScrollControls, Scroll, Environment } from "@react-three/drei";
import { Suspense } from "react";
import Image from "next/image"; // Import Image component

import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import GenesisTeaser from "@/components/GenesisTeaser";
import NationalMandate from "@/components/NationalMandate";

import Impact from "@/components/Impact";
import Navbar from "@/components/Navbar";
import WhatWeBuilding from "@/components/WhatWeBuilding";
import { GlassFlower } from "@/components/GlassFlower";
import Protocol from "@/components/Protocol";

const TOTAL_PAGES = 10.53;

function HTMLContent() {
  return (
    <>
      <Navbar />
      <Hero />
      <WhatWeBuilding totalPages={TOTAL_PAGES} />
      
      <Protocol />
<NationalMandate />
      <Impact />
      <GenesisTeaser />
      
      <Footer />
    </>
  );
}

export default function Home() {
  return (
    <main className="h-screen w-full relative bg-[#081421]">
      
      {/* 1. BACKGROUND IMAGE (Fixed behind everything) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image 
          src="/Rectangle 8.png" 
          alt="Background"
          fill
          priority
          className="object-cover"
        />
        {/* Optional: Subtle tint to ensure text remains readable */}
        <div className="absolute inset-0 bg-[#081421]/30" />
      </div>

      <Canvas
        // 2. Set alpha: true to make canvas transparent
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0, 6], fov: 35 }}
        style={{ width: "100%", height: "100vh" }}
        className="relative z-10"
      >
        {/* 3. Removed <color attach="background" ... /> so image shows through */}
        
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" />
        <pointLight position={[-10, -10, -5]} intensity={5} color="#48cae4" />
        <Environment preset="city" />

        <Suspense fallback={null}>
          {/* FIX: Use shared TOTAL_PAGES so 3D scroll + WhatWeBuilding stay in sync */}
          <ScrollControls pages={TOTAL_PAGES} damping={0.2}>
            <GlassFlower />
            
            <Scroll html style={{ width: "100%" }}>
              <HTMLContent />
            </Scroll>
          </ScrollControls>
        </Suspense>
      </Canvas>
    </main>
  );
}
