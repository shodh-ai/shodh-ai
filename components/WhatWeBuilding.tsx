"use client";

import { useFrame } from "@react-three/fiber";
import { useState, useRef, useMemo } from "react";
import { useScroll } from "@react-three/drei";
import * as THREE from "three";

const sections = [
  {
    number: "01",
    total: "03",
    title: "CHEMISTRY IS TOO SLOW",
    text: "10,000 failures. 10 years. 1 material. Discovery is the human bottleneck. We are removing it",
  },
  {
    number: "02",
    total: "03",
    title: "BEYOND SCIENCE FICTION",
    text: "Introducing SkandaX. We don't guess chemistry; We choose the result.",
  },
  {
    number: "03",
    total: "03",
    title: "BEYOND SCIENCE FICTION",
    text: "Generative design. Autonomous robotic labs. Materials that endure heat, pressure, & time. The future is physical.",
  },
];

export default function WhatWeBuilding() {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<HTMLSpanElement[][]>([[], [], []]);
  
  const scroll = useScroll();

  const splitSections = useMemo(() => {
    return sections.map(s => ({
      ...s,
      chars: s.text.split("")
    }));
  }, []);

  useFrame((state, delta) => {
    if (!innerRef.current) return;

    // PINNING MATH (Virtual Scroll)
    const viewportHeight = window.innerHeight;
    const totalScrollHeight = 8.65 * viewportHeight; // (pages - 1)
    
    const currentScrollY = scroll.offset * totalScrollHeight;
    const startY = 1 * viewportHeight; 
    const durationY = 4.5 * viewportHeight;
    const endY = startY + durationY - viewportHeight; 

    let translateY = 0;
    if (currentScrollY >= startY && currentScrollY <= endY) {
        translateY = currentScrollY - startY;
    } else if (currentScrollY > endY) {
        translateY = endY - startY;
    }

    // Apply Transform
    innerRef.current.style.transform = `translateY(${translateY}px)`;
    innerRef.current.style.opacity = "1";

    // ANIMATION PROGRESS
    const progress = scroll.range(1/9.65, 4.5/9.65);
    const animationCap = 0.85;
    const mappedProgress = Math.min(progress / animationCap, 1);
    
    // CHANGED: Damping reduced to 1.5 for heavy, liquid feel.
    // Use Math.min(delta, 0.1) to avoid jumps on tab switch
    const safeDelta = Math.min(delta, 0.1);
    
    // Smooth the main logic variable
    // Note: We create a ref for this to hold value between frames if we weren't already
    // (Assuming smoothedProgress is defined in component scope as useRef)
    // *If it wasn't defined in the previous snippet, I'll use a local var approach here
    // but looking at previous code, I should use the ref.*
    
    // Wait, I need to make sure I'm writing to a Ref, not a local variable. 
    // In previous code `smoothedProgress` was a useRef(0).
    
    // We update the REF value:
    // This affects the text highlight delay.
    // 1.5 is very smooth. 4.0 is snappy.
    // We use a separate smoothed value for the BAR vs the LOGIC if we want different feels,
    // but here we align them.
    
    if (progressBarRef.current) {
        const currentWidth = parseFloat(progressBarRef.current.style.width || "0");
        const targetWidth = mappedProgress * 100;
        // Bar Smoothing
        const smoothWidth = THREE.MathUtils.damp(currentWidth, targetWidth, 1.5, safeDelta);
        progressBarRef.current.style.width = `${smoothWidth}%`;
        
        // We use the bar's smoothed value as the driver for text too, for perfect sync
        // Convert back to 0-1
        var driverProgress = smoothWidth / 100;
    } else {
        var driverProgress = mappedProgress;
    }

    const smoothP = driverProgress;

    // SECTION LOGIC
    let currentIndex = 0;
    let localProgress = 0;

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

    const activeChars = textRefs.current[currentIndex];
    if (activeChars) {
      // Increased buffer (+20) so the fade out trail is longer
      const visibleCharCount = Math.floor(localProgress * (activeChars.length + 20));

      activeChars.forEach((span, i) => {
        if (!span) return;
        const isActive = i < visibleCharCount;
        
        span.style.opacity = isActive ? "1" : "0.15";
        span.style.color = isActive ? "#ffffff" : "rgba(240, 240, 255, 0.3)";
        span.style.textShadow = isActive ? "0 0 15px rgba(255,255,255,0.3)" : "none";
        span.style.transform = isActive ? "translateY(0)" : "translateY(4px)"; // Increased lift distance
      });
    }
  });

  return (
    <section ref={outerRef} className="relative w-full h-[450vh] z-10">
      <div 
        ref={innerRef}
        className="absolute top-0 left-0 w-full h-screen flex flex-col justify-center overflow-hidden will-change-transform"
      >
        {/* Header */}
        <div className="absolute top-20 left-10 z-20">
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded px-3 py-2.5 w-fit backdrop-blur-md">
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
        <div className="w-full max-w-[1440px] mx-auto px-10 flex h-full">
          
          {/* --- LEFT COLUMN --- */}
          <div className="w-1/2 hidden md:block h-full relative -ml-16 pointer-events-none">
            {splitSections.map((section, index) => {
              const isEven = index % 2 === 0;
              const isActive = activeIndex === index;

              return (
                <div key={index} className={`absolute w-[120%] transition-all duration-[1500ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
                  {isEven ? (
                    <div className="absolute -left-32 top-[17vh]">
                      <h2 className="text-6xl lg:text-7xl font-light text-white leading-tight opacity-50">
                        {section.title.split(" ")[0]} <br />
                        <span className="text-[#48cae4] font-normal opacity-100">
                          {section.title.split(" ").slice(1).join(" ")}
                        </span>
                      </h2>
                    </div>
                  ) : (
                    <div className="absolute right-0 top-[60vh] flex flex-col items-end gap-6 text-right w-full">
                      <div className="shrink-0">
                        <div className="border border-white/20 bg-white/5 rounded-full px-6 py-4 w-fit backdrop-blur-md">
                          <span className="text-white text-xs tracking-wider font-medium">
                            {section.number} <span className="text-white/30">/ {section.total}</span>
                          </span>
                        </div>
                      </div>
                      <p className="text-3xl md:text-5xl leading-tight font-light tracking-wide max-w-xl">
                        {section.chars.map((char, charIndex) => (
                          <span
                            key={charIndex}
                            ref={(el) => { if (el) textRefs.current[index][charIndex] = el; }}
                            // CHANGED: duration-700 + ease-out (Soft fade in)
                            className="inline-block transition-all duration-700 ease-out"
                            style={{ opacity: 0.15, willChange: "opacity, color, transform" }}
                          >
                            {char}
                          </span>
                        ))}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* --- RIGHT COLUMN --- */}
          <div className="w-full md:w-1/2 h-full relative translate-x-32 pointer-events-none">
            {splitSections.map((section, index) => {
              const isEven = index % 2 === 0;
              const isActive = activeIndex === index;

              return (
                <div key={index} className={`absolute w-full transition-all duration-[1500ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] ${isActive ? "opacity-100 translate-y-0 scale-100 blur-none" : "opacity-0 translate-y-12 scale-95 blur-md"}`}>
                  {isEven ? (
                    <div className="absolute left-0 top-[60vh] flex flex-col gap-6 w-full">
                      <div className="shrink-0">
                        <div className="border border-white/20 bg-white/5 rounded-full px-6 py-4 w-fit backdrop-blur-md">
                          <span className="text-white text-xs tracking-wider font-medium">
                            {section.number} <span className="text-white/30">/ {section.total}</span>
                          </span>
                        </div>
                      </div>
                      <p className="text-3xl md:text-5xl leading-tight font-light tracking-wide">
                        {section.chars.map((char, charIndex) => (
                          <span
                            key={charIndex}
                            ref={(el) => { if (el) textRefs.current[index][charIndex] = el; }}
                            className="inline-block transition-all duration-700 ease-out"
                            style={{ opacity: 0.15, willChange: "opacity, color, transform" }}
                          >
                            {char}
                          </span>
                        ))}
                      </p>
                    </div>
                  ) : (
                    <div className="absolute -right-16 top-[17vh] text-right w-[120%]">
                      <h2 className="text-6xl lg:text-7xl font-light text-white leading-tight opacity-50">
                        {section.title.split(" ")[0]} <br />
                        <span className="text-[#48cae4] font-normal opacity-100">
                          {section.title.split(" ").slice(1).join(" ")}
                        </span>
                      </h2>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}

