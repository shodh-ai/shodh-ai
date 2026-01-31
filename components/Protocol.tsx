"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, FileText } from "lucide-react";

const steps = [
  {
    number: "01",
    image: "/scale.svg",
    title: "The Scale",
    description:
      "Atomic models are too small to be useful. We model the Mesoscale—where pores, grains, and defects actually determine if a material works in a factory.",
  },
  {
    number: "02",
    image: "/Design.svg",
    title: "The Design",
    description:
      "We don't do trial and error. You define the target—like heat resistance or energy density—and SkandaX generates the exact microstructure to achieve it.",
  },
  {
    number: "03",
    image: "/Lab.svg",
    title: "The Lab",
    description:
      "Discovery stops at the lab door. We are building Autonomous Robotics to synthesize and test these materials in days, closing the loop between software and hardware.",
  },
];

export default function Protocol() {
  return (
    <section className="relative w-full bg-[#081421] py-32 px-6 md:px-10 flex flex-col items-center overflow-hidden">
      
      {/* Background Decor (Subtle Grid) */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
            backgroundImage: `linear-gradient(#48cae4 1px, transparent 1px), linear-gradient(to right, #48cae4 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
        }}
      />

      <div className="relative z-10 w-full max-w-[1440px] flex flex-col items-center">
        
        {/* Header Section */}
        <div className="relative w-full flex flex-col items-center text-center">
          
          {/* Badge */}
          <div className="flex items-center gap-2 bg-[#48cae4]/10 border border-[#48cae4]/20 rounded px-3 py-2.5 w-fit mb-8 backdrop-blur-md">
            <div className="w-2.5 h-2.5 bg-[#48cae4] rounded-sm shadow-[0_0_8px_#48cae4]" />
            <span className="text-[#48cae4] text-xs tracking-wider uppercase font-medium">
              HOW IT WORKS
            </span>
          </div>

          {/* Main Title */}
          <h2 className="text-white text-4xl md:text-7xl font-medium uppercase tracking-tighter mb-10">
            The Skanda Protocol
          </h2>

          {/* Centered Button with Enhanced Design */}
          <div className="relative flex flex-col items-center mb-20">
            {/* Connecting Line (Top) */}
            <div className="w-px h-10 bg-gradient-to-b from-[#48cae4] to-transparent mb-4 opacity-50" />
            
            <Link
                href="/protocol" 
                className="group relative flex items-center gap-3 px-8 py-4 bg-white/[0.03] hover:bg-white/[0.08] text-white rounded-full border border-white/10 transition-all duration-500 overflow-hidden"
            >
                {/* Internal Glow Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#48cae4]/20 via-transparent to-transparent transition-opacity duration-500" />
                
                <FileText className="w-4 h-4 text-[#48cae4]" />
                <span className="text-xs font-bold tracking-[0.2em] uppercase relative z-10">
                    Read Whitepaper
                </span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 text-white/50 group-hover:text-[#48cae4]" />
            </Link>

            {/* Connecting Line (Bottom) - Guides the eye to the grid */}
            <div className="w-px h-16 bg-gradient-to-t from-[#48cae4] to-transparent mt-4 opacity-30" />
          </div>
        </div>

        {/* The Grid Container */}
        <div className="w-full border border-white/10 rounded-3xl bg-white/[0.01] backdrop-blur-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
            {steps.map((step, index) => (
              <div
                key={index}
                className="group relative flex flex-col items-center text-center px-10 py-20 hover:bg-white/[0.02] transition-colors duration-500"
              >
                {/* Number Indicator */}
                <span className="absolute top-8 left-1/2 -translate-x-1/2 md:left-auto md:right-8 md:translate-x-0 text-white/5 text-5xl font-black group-hover:text-[#48cae4]/10 transition-colors">
                  {step.number}
                </span>

                {/* Icon Container with Glow */}
                <div className="relative mb-12">
                  <div className="absolute inset-0 bg-[#48cae4] blur-[50px] opacity-0 group-hover:opacity-20 transition-opacity duration-700 rounded-full" />
                  <div className="relative w-28 h-28 bg-white/[0.03] border border-white/10 rounded-2xl flex items-center justify-center group-hover:border-[#48cae4]/40 group-hover:rotate-[360deg] transition-all duration-1000">
                    <Image 
                        src={step.image} 
                        alt={step.title} 
                        width={80} 
                        height={80} 
                        className="w-14 h-14 invert opacity-70 group-hover:opacity-100 transition-opacity" 
                    />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-white text-2xl font-medium mb-6 group-hover:text-[#48cae4] transition-colors tracking-wide">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-white/50 text-sm leading-relaxed max-w-[280px] mx-auto">
                  {step.description.split("Mesoscale").map((part, i, arr) => (
                    <span key={i}>
                      {part}
                      {i < arr.length - 1 && (
                        <span className="text-white font-semibold underline decoration-[#48cae4]/30 decoration-2 underline-offset-4">Mesoscale</span>
                      )}
                    </span>
                  ))}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}