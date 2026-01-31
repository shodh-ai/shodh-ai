"use client";

import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";

const LINES = [
  "BUILDING",
  "THE TYPE 1",
  "CIVILIZATION",
];

export default function HeroTitle() {
  const scroll = useScroll();
  // Array to store refs for every single letter
  const spansRef = useRef<(HTMLSpanElement | null)[]>([]);

  // Count total non-space characters to map scroll percentage to index
  const totalChars = useMemo(() => {
    return LINES.join("").replace(/\s/g, "").length; 
  }, []); 

  useFrame(() => {
    // Range 0 to 0.09 (Fast highlight)
    const r1 = scroll.range(0, 0.09);
    
    // LOGIC CHANGE:
    // We multiply by (totalChars + 1) to ensure we can reach the end.
    // We use Math.floor to get an integer "Count" of active characters.
    // At r1 = 0, this results in 0.
    const activeCharCount = Math.floor(r1 * (totalChars + 1));

    let charCounter = 0;

    spansRef.current.forEach((span, i) => {
      if (!span) return;
      
      // LOGIC CHANGE:
      // Use Strict Less Than (<).
      // If charCounter is 0 and activeCharCount is 0: 0 < 0 is FALSE. (First letter OFF)
      // If activeCharCount becomes 1: 0 < 1 is TRUE. (First letter ON)
      const isActive = charCounter < activeCharCount;
      
      const targetOpacity = isActive ? 1 : 0.15;
      
      const targetColor = isActive && span.dataset.highlight === "true" 
        ? "#48cae4" 
        : "#f0f0ff";

      span.style.opacity = targetOpacity.toString();
      span.style.color = targetColor;
      span.style.textShadow = isActive 
        ? "0 0 20px rgba(72, 202, 228, 0.5)" 
        : "none";

      charCounter++;
    });
  });

  // Global index for ref assignment
  let refIndex = 0;

  return (
    <h1 className="text-left md:text-right font-medium leading-none uppercase select-none pointer-events-none">
      {LINES.map((line, lineIndex) => (
        <div key={lineIndex} className="block">
          {line.split("").map((char, charIndex) => {
            
            // Handle Spaces (Layout only, no Ref needed for animation usually)
            if (char === " ") {
              return (
                <span 
                  key={`${lineIndex}-${charIndex}`} 
                  className="inline-block whitespace-pre text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-[min(8vw,124px)]"
                >
                  &nbsp;
                </span>
              );
            }

            // Handle Letters
            const currentRefIndex = refIndex++;
            // Check if this letter belongs to "Physical" or "World" (Lines 2 and 3)
            const isHighlightSection = lineIndex >= 2;

            return (
              <span
                key={`${lineIndex}-${charIndex}`}
                ref={(el) => { spansRef.current[currentRefIndex] = el; }}
                data-highlight={isHighlightSection} // Store this for the useFrame logic
                className="inline-block transition-all duration-75 ease-out text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-[min(8vw,124px)]"
                style={{ 
                  opacity: 0.15, // Ensures it starts fully dimmed
                  color: "#f0f0ff",
                  willChange: "opacity, color",
                  lineHeight: "0.9",
                }} 
              >
                {char}
              </span>
            );
          })}
        </div>
      ))}
    </h1>
  );
}
