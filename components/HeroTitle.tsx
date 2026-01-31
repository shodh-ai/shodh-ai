"use client";

const LINES = [
  "BUILDING",
  "THE TYPE 1",
  "CIVILIZATION",
];

export default function HeroTitle() {
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
                  style={{ color: lineIndex === 2 ? "#48cae4" : "#f0f0ff" }}
                >
                  &nbsp;
                </span>
              );
            }

            return (
              <span
                key={`${lineIndex}-${charIndex}`}
                className="inline-block transition-all duration-75 ease-out text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-[min(8vw,124px)]"
                style={{ 
                  opacity: 1,
                  color: lineIndex === 2 ? "#48cae4" : "#f0f0ff",
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
