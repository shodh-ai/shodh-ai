"use client";

import { useFrame } from "@react-three/fiber";
import { useState, useRef, useMemo } from "react";
import * as THREE from "three"; // Import Three for math utils

const sections = [
  {
    number: "01",
    total: "03",
    title: "CHEMISTRY IS TOO SLOW", // NEW
    text: "10,000 failures. 10 years. 1 material.Discovery is the human bottleneck. We are removing it",
  },
  {
    number: "02",
    total: "03",
    title: "BEYOND SCIENCE FICTION", // NEW
    text: "Introducing SkandaX. We don't guess chemistry;We choose the result.",
  },
  {
    number: "03",
    total: "03",
    title: "BEYOND SCIENCE FICTION", // NEW
    text: "Generative design. Autonomous robotic labs. Materials that endure heat, pressure, & time. The future is physical.",
  },
];


export default function WhatWeBuilding() {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<HTMLSpanElement[][]>([[], [], []]);
  
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
    
    // Pinning Logic
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

      const rawScroll = Math.abs(rect.top) / scrollableDistance;
      const animationCap = 0.85; 
      const mappedProgress = Math.min(rawScroll / animationCap, 1);
      const targetProgress = Math.max(0, mappedProgress);

      smoothedProgress.current = THREE.MathUtils.damp(
        smoothedProgress.current, 
        targetProgress, 
        4.0, 
        delta
      );

      const smoothP = smoothedProgress.current;

      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${smoothP * 100}%`;
      }

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
        const visibleCharCount = Math.floor(localProgress * (activeChars.length + 10));

        activeChars.forEach((span, i) => {
          if (!span) return;
          const isActive = i < visibleCharCount;
          
          span.style.opacity = isActive ? "1" : "0.15";
          span.style.color = isActive ? "#ffffff" : "rgba(240, 240, 255, 0.3)";
          span.style.textShadow = isActive ? "0 0 15px rgba(255,255,255,0.3)" : "none";
          span.style.transform = isActive ? "translateY(0)" : "translateY(2px)";
        });
      }
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
              const isEven = index % 2 === 0; // 0, 2 = Title Left
              const isActive = activeIndex === index;

              return (
                <div key={index} className={`absolute w-[120%] transition-all duration-700 ease-out ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                  {isEven ? (
                    // RENDER TITLE (Standard Position)
                    <div className="absolute -left-32 top-[17vh]">
                      <h2 className="text-6xl lg:text-7xl font-light text-white leading-tight opacity-50">
                        {section.title.split(" ")[0]} <br />
                        <span className="text-[#48cae4] font-normal opacity-100">
                          {section.title.split(" ").slice(1).join(" ")}
                        </span>
                      </h2>
                    </div>
                  ) : (
                    // RENDER TEXT (Swapped Position)
                    // Pushed to bottom (top-[60vh]) to align with where Right text usually is
                    // Aligned Right (items-end) to face the center flower
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
                            className="inline-block transition-all duration-300 ease-out"
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
              const isEven = index % 2 === 0; // 0, 2 = Text Right
              const isActive = activeIndex === index;

              return (
                <div key={index} className={`absolute w-full transition-all duration-1000 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${isActive ? "opacity-100 translate-y-0 scale-100 blur-none" : "opacity-0 translate-y-8 scale-95 blur-md"}`}>
                  {isEven ? (
                    // RENDER TEXT (Standard Position)
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
                            className="inline-block transition-all duration-300 ease-out"
                            style={{ opacity: 0.15, willChange: "opacity, color, transform" }}
                          >
                            {char}
                          </span>
                        ))}
                      </p>
                    </div>
                  ) : (
                    // RENDER TITLE (Swapped Position)
                    // Aligned Right to maintain symmetry
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

