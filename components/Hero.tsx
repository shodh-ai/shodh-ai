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
        <div className="flex w-full items-end px-10">
          
          {/* Left Column */}
          <div className="flex w-1/2 flex-col pb-4">
            <p className="text-white text-xl leading-relaxed max-w-md mb-9">
              Shodh AI is building India&apos;s sovereign engine to design &amp;
              discover next generation of Energy Materials.
            </p>

            {/* CTA Buttons */}
            <div className="flex gap-5">
              <Link
                href="#mission"
                className="inline-flex items-center justify-center px-5 py-3 bg-[#f0f0ff] text-[#081421] text-base tracking-wide rounded-md hover:bg-white transition-colors"
              >
                OUR MISSION
              </Link>
              <Link
                href="#how-it-works"
                className="inline-flex items-center justify-center px-5 py-3 bg-transparent text-white text-base tracking-wide border border-white/50 rounded-md hover:bg-white/10 transition-colors"
              >
                See How It Works
              </Link>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex w-1/2 flex-col items-end pointer-events-none pb-4">
            {/* Replaced Static H1 with Scroll-Animated Title */}
            <HeroTitle />
          </div>

        </div>
      </div>
    </section>
  );
}
