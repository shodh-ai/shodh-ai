"use client";

import Link from "next/link";
import Image from "next/image";

const steps = [
  {
    number: "/01",
    image: "/scale.svg",
    title: "The Scale",
    description:
      "Atomic models are too small to be useful. We model the Mesoscale—where pores, grains, and defects actually determine if a material works in a factory.",
  },
  {
    number: "/02",
    image: "/Design.svg",
    title: "The Design",
    description:
      "We don't do trial and error. You define the target—like heat resistance or energy density—and SkandaX generates the exact microstructure to achieve it.",
  },
  {
    number: "/03",
    image: "/Lab.svg",
    title: "The Lab",
    description:
      "Discovery stops at the lab door. We are building Autonomous Robotics to synthesize and test these materials in days, closing the loop between software and hardware.",
  },
];

export default function Protocol() {
  return (
    <section className="relative w-full bg-[#f0f0ff] py-32 px-4 md:px-10 flex flex-col items-center">
      
      {/* Header Badge */}
      <div className="flex items-center gap-2 bg-white rounded px-3 py-2.5 w-fit shadow-sm mb-8">
        <div className="w-2.5 h-2.5 bg-[#48cae4] rounded-sm" />
        <span className="text-[#081421] text-xs tracking-wider uppercase font-medium">
          HOW IT WORKS
        </span>
      </div>

      {/* Main Title */}
      <h2 className="text-[#081421] text-4xl md:text-6xl font-medium uppercase tracking-tight mb-20 text-center">
        The Skanda Protocol
      </h2>

      {/* The Grid Container */}
      <div className="w-full max-w-[1200px] border border-[#081421]/10 bg-transparent backdrop-blur-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#081421]/10">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center px-8 py-16 hover:bg-white/40 transition-colors duration-300"
            >
              {/* Number */}
              <span className="text-[#081421]/40 text-sm font-medium mb-12 block">
                {step.number}
              </span>

              <div className="mb-10 text-[#081421]">
                <Image src={step.image} alt={step.title} width={80} height={80} className="w-16 h-16 md:w-20 md:h-20" />
              </div>

              {/* Title */}
              <h3 className="text-[#081421] text-xl font-medium mb-6">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-[#081421]/60 text-sm leading-relaxed max-w-xs mx-auto">
                {step.description.split("Mesoscale").map((part, i, arr) => (
                  <span key={i}>
                    {part}
                    {i < arr.length - 1 && (
                      <span className="font-semibold text-[#081421]/80">Mesoscale</span>
                    )}
                  </span>
                ))}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Buttons - UPDATED HREF */}
      <div className="flex flex-col sm:flex-row gap-6 mt-20">
        <Link
          href="/protocol" 
          className="px-8 py-4 bg-[#e6e6f2] text-[#081421] text-xs font-medium tracking-wide uppercase rounded-md border border-[#081421]/5 hover:bg-white hover:shadow-lg transition-all"
        >
          See Full Protocol
        </Link>
        <Link
          href="/protocol" 
          className="px-8 py-4 bg-[#e6e6f2] text-[#081421] text-xs font-medium tracking-wide uppercase rounded-md border border-[#081421]/5 hover:bg-white hover:shadow-lg transition-all"
        >
          Read Whitepaper
        </Link>
      </div>
    </section>
  );
}