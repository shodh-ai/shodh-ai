"use client";

import { Canvas } from "@react-three/fiber";
import { ScrollControls, Scroll, Environment } from "@react-three/drei";
import { Suspense, useState, useLayoutEffect, useRef } from "react";
import Image from "next/image";

import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import GenesisTeaser from "@/components/GenesisTeaser";
import NationalMandate from "@/components/NationalMandate";
import Impact from "@/components/Impact";
import Navbar from "@/components/Navbar";
import WhatWeBuilding from "@/components/WhatWeBuilding";
import { GlassFlower } from "@/components/GlassFlower";
import Protocol from "@/components/Protocol";

const TOTAL_PAGES_FALLBACK = 10;
const HEIGHT_PX_BUFFER = 96;

export default function Home() {
  const [pages, setPages] = useState(TOTAL_PAGES_FALLBACK);
  const containerRef = useRef<HTMLDivElement>(null);

  // useLayoutEffect runs before the browser repaints, preventing the "jump"
  useLayoutEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        // 1. Get exact pixel height of your content
        const contentHeight = containerRef.current.getBoundingClientRect().height;
        const viewportHeight = window.visualViewport?.height ?? window.innerHeight;
        
        // 2. Convert to Three.js "pages" (floating point)
        const exactPages = (contentHeight + HEIGHT_PX_BUFFER) / viewportHeight;
        
        // 3. Update state
        setPages(exactPages);
      }
    };

    // Use ResizeObserver to detect changes even if images load late or text wraps
    const observer = new ResizeObserver(updateHeight);
    if (containerRef.current) observer.observe(containerRef.current);

    // Initial check
    updateHeight();

    // Also update when the viewport changes (important on mobile address bar show/hide)
    window.addEventListener("resize", updateHeight);
    window.visualViewport?.addEventListener("resize", updateHeight);
    window.visualViewport?.addEventListener("scroll", updateHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateHeight);
      window.visualViewport?.removeEventListener("resize", updateHeight);
      window.visualViewport?.removeEventListener("scroll", updateHeight);
    };
  }, []);

  return (
    <main className="h-screen w-full relative bg-[#081421] overflow-hidden">
      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image 
          src="/Rectangle 8.png" 
          alt="Background"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#081421]/30" />
      </div>

      <Canvas
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0, 6], fov: 35 }}
        style={{ width: "100%", height: "100vh" }}
        className="relative z-10"
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" />
        <pointLight position={[-10, -10, -5]} intensity={5} color="#48cae4" />
        <Environment preset="city" />

        <Suspense fallback={null}>
          {/* pages is now exact to the pixel. Damping 0.4 for smooth heavy scroll */}
          <ScrollControls pages={pages} damping={0.4} infinite={false}>
            <GlassFlower />
            
            <Scroll html style={{ width: "100%" }}>
              {/* IMPORTANT: This div wrapper is the "Anchor" for measurement */}
              <div 
                ref={containerRef} 
                className="w-full flex flex-col relative"
                style={{ transformOrigin: 'top left' }}
              >
                <Navbar />
                <Hero />
                <WhatWeBuilding totalPages={pages} />
                <Protocol />
                <NationalMandate />
                <Impact />
                <GenesisTeaser />
                <Footer />
              </div>
            </Scroll>
          </ScrollControls>
        </Suspense>
      </Canvas>
    </main>
  );
}