"use client";

import Link from "next/link";
// Import the new component
import HeroTitle from "./HeroTitle";

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Background gradients - Keep these for mood, but ensure they are semi-transparent */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Removed the BG color so the canvas shows through */}
        <div className="absolute inset-0 bg-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(72,202,228,0.15)_0%,_transparent_50%)]" />
      </div>

      {/* Content Container - Vertically Centered */}
      <div className="relative z-10 flex min-h-screen w-full flex-col justify-center">
        
        {/* Row - Aligns Left and Right columns at the bottom */}
        <div className="flex w-full flex-col md:flex-row md:items-end px-6 md:px-10">
          
          {/* Left Column */}
          <div className="flex w-full md:w-1/2 flex-col pb-4">
            <p className="text-white max-w-md mb-9 font-aeonik text-base sm:text-lg" style={{
              fontFamily: 'Aeonik, sans-serif',
              fontWeight: '400',
              fontStyle: 'normal',
              lineHeight: '110%',
              letterSpacing: '0%',
              verticalAlign: 'bottom'
            }}>
              Mastery over the planet requires AI for material science.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 w-full">
              <Link
                href="#mission"
                className="inline-flex items-center justify-center bg-[#f0f0ff] text-[#081421] text-sm sm:text-base tracking-wide hover:bg-white transition-colors h-11 px-5"
                style={{
                  opacity: '1',
                  borderRadius: '8px',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderColor: 'transparent',
                  clipPath: 'polygon(0% 0%, 100% 0%, 100% 65%, 85% 100%, 0% 100%)',
                }}
              >
                OUR MISSION
              </Link>
              <Link
                href="#how-it-works"
                className="inline-flex items-center justify-center bg-white/10 text-white text-sm sm:text-base tracking-wide h-11 px-5"
                style={{
                  opacity: '1',
                  borderRadius: '8px',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                  clipPath: 'polygon(0% 0%, 100% 0%, 100% 65%, 85% 100%, 0% 100%)'
                }}
              >
                See How It Works
              </Link>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex w-full md:w-1/2 flex-col items-start md:items-end pointer-events-none pb-4 mt-10 md:mt-0">
            {/* Replaced Static H1 with Scroll-Animated Title */}
            <HeroTitle />
          </div>

        </div>
      </div>
    </section>
  );
}
