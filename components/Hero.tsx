"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Background gradients - Keep these for mood, but ensure they are semi-transparent */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Removed the BG color so the canvas shows through */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#0d1f3c]/50 to-[#081421]/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(72,202,228,0.15)_0%,_transparent_50%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-end">
        {/* Left Column - Description */}
        <div className="flex flex-col justify-end pb-28 pl-10 w-1/2 h-full">
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

        {/* Right Column - Title */}
        <div className="flex flex-col justify-end pb-28 pr-10 w-1/2 h-full pointer-events-none">
          <h1 className="text-[#f0f0ff] text-6xl md:text-7xl lg:text-8xl xl:text-[124px] font-medium leading-[0.85] text-right uppercase opacity-90">
            Generative
            <br />
            AI for THE
            <br />
            Physical
            <br />
            World
          </h1>
        </div>
      </div>
    </section>
  );
}
