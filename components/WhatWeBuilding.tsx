"use client";

import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

const sections = [
  {
    number: "01",
    total: "03",
    text: "We are building SkandaX - the world's largest AI model for Mesoscale Physics.",
    highlight: "Designed to understand how matter behaves beyond ideal lab conditions.",
  },
  {
    number: "02",
    total: "03",
    text: "Unlike conventional AI trained on text or images, SkandaX is ",
    highlight:
      "trained on physics and degradation, learning from how materials evolve under real-world stress.",
  },
  {
    number: "03",
    total: "03",
    text: "It understands how materials stretch, crack, and age over time.",
    highlight: "Instead of just designing new materials, it predicts how long they will last.",
  },
];

export default function WhatWeBuilding() {
  const scroll = useScroll();
  const slide1 = useRef<HTMLDivElement>(null);
  const slide2 = useRef<HTMLDivElement>(null);
  const slide3 = useRef<HTMLDivElement>(null);

  useFrame(() => {
    // UNIFIED TIMELINE: 0.15 to 0.80
    // This gives plenty of time for everything to happen together.
    const progress = scroll.range(0.15, 0.65); 

    if (slide1.current && slide2.current && slide3.current) {
      
      // -- LOGIC --
      // Slide 1: Visible 0.00 - 0.30
      // Slide 2: Visible 0.30 - 0.60
      // Slide 3: Visible 0.60 - 1.00 (HOLDS until end)

      // Slide 1 (Fade Out)
      // Ends at 0.3
      const op1 = 1 - (progress * 3.33); 

      // Slide 2 (Bell Curve)
      // Peak at 0.45
      let op2 = 0;
      if (progress > 0.25 && progress < 0.65) {
        op2 = Math.sin((progress - 0.25) / 0.4 * Math.PI); 
      }

      // Slide 3 (Fade In & HOLD)
      // Starts at 0.55, reaches full opacity by 0.75, stays full till 1.0
      let op3 = (progress - 0.55) * 4;
      
      // Apply Styles
      slide1.current.style.opacity = Math.max(0, op1).toString();
      slide1.current.style.pointerEvents = op1 > 0.5 ? "auto" : "none";

      slide2.current.style.opacity = Math.max(0, op2).toString();
      slide2.current.style.pointerEvents = op2 > 0.5 ? "auto" : "none";

      // CLAMP op3 to max 1. This ensures it STAYS visible while flower finishes.
      slide3.current.style.opacity = Math.max(0, Math.min(1, op3)).toString();
      slide3.current.style.pointerEvents = op3 > 0.5 ? "auto" : "none";
    }
  });

  return (
    // 1. SCROLL TRACK (400vh) - Invisible, provides the time
    <section className="relative z-10 w-full h-[400vh] pointer-events-none">
      
      {/* 2. STICKY VIEWPORT - The "One Screen" */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* FIXED SECTION TITLE (Top Left) */}
        <div className="absolute top-10 left-10 z-20">
          <div className="flex items-center gap-2 bg-white/10 rounded px-3 py-2.5 w-fit backdrop-blur-md border border-white/10">
            <div className="w-2.5 h-2.5 bg-[#48cae4] rounded-sm shadow-[0_0_10px_#48cae4]" />
            <span className="text-white text-xs tracking-wider uppercase font-medium">
              WHAT WE ARE BUILDING
            </span>
          </div>
        </div>

        {/* 3. SLIDES CONTAINER (Full Screen) */}
        <div className="relative w-full h-full max-w-[1440px] mx-auto px-10">
          
          {/* --- SLIDE 1 --- */}
          <div ref={slide1} className="absolute inset-0 w-full h-full">
            {/* Heading (Top Left - Below Title) */}
            <div className="absolute top-32 left-0 md:left-10">
               <NumberBadge num="01" total="03" />
            </div>
            {/* Text (Bottom Right - Fixed Position) */}
            <div className="absolute bottom-20 right-0 md:right-10 max-w-lg pointer-events-auto">
               <ContentText section={sections[0]} />
            </div>
          </div>

          {/* --- SLIDE 2 --- */}
          <div ref={slide2} className="absolute inset-0 w-full h-full opacity-0">
            <div className="absolute top-32 left-0 md:left-10">
               <NumberBadge num="02" total="03" />
            </div>
            {/* SAME Position as Slide 1 */}
            <div className="absolute bottom-20 right-0 md:right-10 max-w-lg pointer-events-auto">
               <ContentText section={sections[1]} />
            </div>
          </div>

          {/* --- SLIDE 3 --- */}
          <div ref={slide3} className="absolute inset-0 w-full h-full opacity-0">
            <div className="absolute top-32 left-0 md:left-10">
               <NumberBadge num="03" total="03" />
            </div>
            {/* SAME Position as Slide 1 */}
            <div className="absolute bottom-20 right-0 md:right-10 max-w-lg pointer-events-auto">
               <ContentText section={sections[2]} />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

function NumberBadge({ num, total }: { num: string, total: string }) {
  return (
    <div className="border border-white/20 bg-white/5 rounded-full px-6 py-4 backdrop-blur-md w-fit">
      <span className="text-white text-lg tracking-widest font-light">
        {num} <span className="text-white/30 text-sm">/ {total}</span>
      </span>
    </div>
  );
}

function ContentText({ section }: { section: typeof sections[0] }) {
  return (
    <div className="text-right">
      <div className="inline-block bg-[#081421]/60 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-2xl">
        <p className="text-2xl md:text-3xl lg:text-4xl leading-tight text-white font-light">
          {section.text}
        </p>
        {section.highlight && (
          <p className="text-[#48cae4] text-xl md:text-2xl mt-4 font-normal leading-tight">
            {section.highlight}
          </p>
        )}
      </div>
    </div>
  );
}
