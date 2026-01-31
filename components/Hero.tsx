"use client";

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
