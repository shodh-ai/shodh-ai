"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { GlassFlowerHeroSceneProps } from "@/components/GlassFlowerHeroScene";

const GlassFlowerHeroScene = dynamic<GlassFlowerHeroSceneProps>(
  () =>
    import("@/components/GlassFlowerHeroScene").then((m) => m.default),
  { ssr: false }
)

export default function Hero() {
  const eventsRef = useRef<HTMLDivElement | null>(null);
  const [eventSource, setEventSource] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setEventSource(eventsRef.current);
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#0d1f3c] to-[#081421]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(72,202,228,0.1)_0%,_transparent_50%)]" />
        <div className="absolute inset-y-0 left-0 w-[70%] z-0 bg-[#0a1628]">
          <div
            ref={eventsRef}
            className="absolute inset-0 z-10 bg-transparent select-none touch-none cursor-grab active:cursor-grabbing"
          />
          <div className="absolute inset-0 z-0">
            <GlassFlowerHeroScene eventSource={eventSource} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen">
        {/* Left Column - Description */}
        <div className="flex flex-col justify-end pb-32 pl-10 w-1/2">
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
        <div className="flex flex-col justify-end pb-24 pr-10 w-1/2">
          <h1 className="text-[#f0f0ff] text-6xl md:text-7xl lg:text-8xl xl:text-[124px] font-medium leading-none text-right uppercase">
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
