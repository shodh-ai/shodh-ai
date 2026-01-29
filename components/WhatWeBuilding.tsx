"use client";

import { useFrame } from "@react-three/fiber";
import { useState, useRef, useMemo } from "react";
import * as THREE from "three"; // Import Three for math utils

const sections = [
  {
    number: "01",
    total: "03",
    text: "We are building SkandaX - the world's largest AI model for Mesoscale Physics, designed to understand how matter behaves beyond ideal lab conditions.",
  },
  {
    number: "02",
    total: "03",
    text: "Unlike conventional AI trained on text or images, SkandaX is trained on physics and degradation, learning from how materials evolve under real-world stress.",
  },
  {
    number: "03",
    total: "03",
    text: "It understands how materials stretch, crack, and age over time - and instead of just designing new materials, it predicts how long they will last.",
  },
];

export default function WhatWeBuilding() {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<HTMLSpanElement[][]>([[], [], []]);
  
  // NEW: Store the smoothed progress value (0 to 1)
  const smoothedProgress = useRef(0);

  const splitSections = useMemo(() => {
    return sections.map(s => ({
      ...s,
      chars: s.text.split("")
    }));
  }, []);

  useFrame((state, delta) => {
    if (!outerRef.current || !innerRef.current) return;

    const rect = outerRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const scrollableDistance = rect.height - viewportHeight;
    
    // 1. PINNING (Instant - needs to lock to viewport tightly)
    if (rect.top > 0) {
      innerRef.current.style.transform = `translateY(0px)`;
      innerRef.current.style.opacity = "1";
    } else if (rect.bottom < viewportHeight) {
      const endPosition = rect.height - viewportHeight;
      innerRef.current.style.transform = `translateY(${endPosition}px)`;
      innerRef.current.style.opacity = "1";
    } else {
      innerRef.current.style.transform = `translateY(${-rect.top}px)`;
      innerRef.current.style.opacity = "1";

      // 2. SMOOTHING LOGIC
      // Calculate raw target (0 to 1)
      const rawProgress = Math.abs(rect.top) / scrollableDistance;
      const targetProgress = Math.max(0, Math.min(1, rawProgress));

      // DAMPING: This creates the "Sophisticated" delay. 
      // A value of 2 or 3 is slow/luxurious. 10 is snappy.
      smoothedProgress.current = THREE.MathUtils.damp(
        smoothedProgress.current, 
        targetProgress, 
        2.5, // Damping factor (Lower = Smoother/Slower)
        delta
      );

      const smoothP = smoothedProgress.current;

      // 3. UPDATE PROGRESS BAR (With Smooth Value)
      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${smoothP * 100}%`;
      }

      // 4. DETERMINE ACTIVE PARAGRAPH
      let currentIndex = 0;
      let localProgress = 0;

      // Overlap logic: Allow text to finish fading before switching
      if (smoothP < 0.33) {
        currentIndex = 0;
        localProgress = smoothP / 0.33; 
      } else if (smoothP < 0.66) {
        currentIndex = 1;
        localProgress = (smoothP - 0.33) / 0.33;
      } else {
        currentIndex = 2;
        localProgress = (smoothP - 0.66) / 0.34;
      }

      if (activeIndex !== currentIndex) {
        setActiveIndex(currentIndex);
      }

      // 5. TEXT HIGHLIGHT (Char by Char)
      const activeChars = textRefs.current[currentIndex];
      if (activeChars) {
        const visibleCharCount = Math.floor(localProgress * (activeChars.length + 10));

        activeChars.forEach((span, i) => {
          if (!span) return;
          const isActive = i < visibleCharCount;
          
          // Use CSS transitions on the SPAN itself for extra smoothness
          span.style.opacity = isActive ? "1" : "0.15";
          span.style.color = isActive ? "#ffffff" : "rgba(240, 240, 255, 0.3)";
          span.style.textShadow = isActive ? "0 0 15px rgba(255,255,255,0.3)" : "none";
          span.style.transform = isActive ? "translateY(0)" : "translateY(2px)"; // Subtle lift
        });
      }
    }
  });

  return (
    <section 
      ref={outerRef} 
      className="relative w-full h-[300vh] z-10"
    >
      <div 
        ref={innerRef}
        className="absolute top-0 left-0 w-full h-screen flex flex-col justify-center overflow-hidden will-change-transform"
      >
        {/* Header */}
        <div className="absolute top-20 left-10 z-20">
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded px-3 py-2.5 w-fit backdrop-blur-md transition-opacity duration-500">
            <div className="w-2.5 h-2.5 bg-[#48cae4] rounded-sm shadow-[0_0_8px_#48cae4]" />
            <span className="text-white text-xs tracking-wider uppercase font-medium opacity-90">
              WHAT WE ARE BUILDING
            </span>
          </div>
        </div>

        {/* PROGRESS BAR */}
        <div className="absolute top-40 px-10 w-full z-20">
          <div className="w-full h-[1px] bg-white/10 overflow-hidden">
            <div 
              ref={progressBarRef}
              className="h-full bg-gradient-to-r from-[#48cae4] to-white shadow-[0_0_15px_#48cae4]"
              style={{ width: "0%" }}
            />
          </div>
        </div>

        {/* CONTENT ROW */}
        <div className="w-full max-w-[1440px] mx-auto px-10 flex items-center h-full pt-20">
          
          {/* LEFT: Spacer */}
          <div className="w-1/2 hidden md:block" />

          {/* RIGHT: Text Area */}
          <div className="w-full md:w-1/2 relative h-[300px]">
            {splitSections.map((section, sectionIndex) => (
              <div 
                key={sectionIndex}
                // Updated Transition: Slower duration (1000ms) and custom ease for "floaty" feel
                className={`absolute inset-0 flex flex-col gap-6 transition-all duration-1000 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
                  activeIndex === sectionIndex 
                    ? "opacity-100 translate-y-0 scale-100 blur-none pointer-events-auto" 
                    : "opacity-0 translate-y-8 scale-95 blur-md pointer-events-none"
                }`}
              >
                {/* Number Badge */}
                <div className="shrink-0">
                  <div className="border border-white/20 bg-white/5 rounded-full px-6 py-4 w-fit backdrop-blur-md">
                    <span className="text-white text-xs tracking-wider font-medium">
                      {section.number}{" "}
                      <span className="text-white/30">/ {section.total}</span>
                    </span>
                  </div>
                </div>

                {/* Scrubbing Text */}
                <div className="backdrop-blur-[0px]"> {/* Removed blur on container for sharper text */}
                  <p className="text-3xl md:text-5xl leading-tight font-light tracking-wide">
                    {section.chars.map((char, charIndex) => (
                      <span
                        key={charIndex}
                        ref={(el) => {
                           if (el) {
                             if (!textRefs.current[sectionIndex]) textRefs.current[sectionIndex] = [];
                             textRefs.current[sectionIndex][charIndex] = el;
                           }
                        }}
                        // Added transition to the span itself for liquid-like flow
                        className="inline-block transition-all duration-300 ease-out"
                        style={{ 
                          opacity: 0.15,
                          willChange: "opacity, color, transform"
                        }}
                      >
                        {char}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
