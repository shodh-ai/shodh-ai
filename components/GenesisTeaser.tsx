"use client";

import Link from "next/link";
import { ArrowRight, Clock, Zap } from "lucide-react";

export default function GenesisTeaser() {
  return (
    <section className="relative w-full bg-[#081421] py-32 px-6 md:px-10 border-t border-white/5">
      <div className="max-w-[1440px] mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* LEFT: Text Content */}
          <div className="flex flex-col items-start">
            {/* Tag */}
            <div className="flex items-center gap-2 bg-[#48cae4]/10 rounded px-3 py-2.5 w-fit mb-8">
              <div className="w-2.5 h-2.5 bg-[#48cae4] rounded-sm shadow-[0_0_8px_#48cae4]" />
              <span className="text-[#48cae4] text-xs tracking-wider uppercase font-medium">
                The Shift
              </span>
            </div>

            <h2 className="text-white text-5xl md:text-7xl lg:text-8xl font-medium uppercase leading-[0.9] tracking-tight mb-8">
              The Genesis <br />
              <span className="text-[#f0f0ff]/50">Protocol.</span>
            </h2>

            <p className="text-[#f0f0ff]/70 text-lg md:text-xl leading-relaxed max-w-lg mb-12 font-light">
              Shodh AI deletes the iteration loop. We are compressing 
              <span className="text-white font-normal"> 5 years of lab failure</span> into 
              <span className="text-[#48cae4] font-normal"> 6 months of factory success</span>.
            </p>

            <Link
              href="/genesis"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-[#081421] text-xs font-bold tracking-widest uppercase rounded hover:bg-[#48cae4] transition-all duration-300"
            >
              Read The Manifesto
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* RIGHT: The Shift Visualization */}
          <div className="relative">
            {/* Glass Container */}
            <div className="relative z-10 bg-white/[0.03] border border-white/10 rounded-2xl p-8 md:p-12 backdrop-blur-sm">
              
              {/* Traditional Flow (Dimmed) */}
              <div className="mb-12 opacity-40">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold tracking-widest uppercase text-white">Traditional</span>
                  <div className="flex items-center gap-2 text-white/70">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm font-mono">5 YEARS</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 overflow-hidden">
                  <div className="flex-1 h-1 bg-white/20 rounded-full" />
                  <div className="flex gap-2 text-xs md:text-sm font-mono text-white/60 whitespace-nowrap">
                    <span>Design</span>
                    <span>→</span>
                    <span>Lab</span>
                    <span>→</span>
                    <span>Fail</span>
                    <span>→</span>
                    <span>Repeat</span>
                  </div>
                </div>
              </div>

              {/* Shodh Flow (Highlighted) */}
              <div className="relative">
                {/* Glow Effect */}
                <div className="absolute -inset-4 bg-[#48cae4]/5 rounded-xl blur-xl" />
                
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold tracking-widest uppercase text-[#48cae4]">Shodh AI</span>
                    <div className="flex items-center gap-2 text-[#48cae4]">
                      <Zap className="w-4 h-4 fill-current" />
                      <span className="text-sm font-mono font-bold">6 MONTHS</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    {/* Progress Bar */}
                    <div className="w-full h-1 bg-[#48cae4]/20 rounded-full overflow-hidden">
                      <div className="h-full bg-[#48cae4] w-full shadow-[0_0_15px_#48cae4]" />
                    </div>
                    
                    {/* Steps */}
                    <div className="flex justify-between items-center text-sm md:text-base font-medium text-white">
                      <span>Design</span>
                      <ArrowRight className="w-4 h-4 text-[#48cae4]" />
                      <span className="text-[#48cae4] drop-shadow-[0_0_8px_rgba(72,202,228,0.5)]">
                        Matter Compiler
                      </span>
                      <ArrowRight className="w-4 h-4 text-[#48cae4]" />
                      <span>Success</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#48cae4] rounded-full opacity-5 blur-[100px]" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500 rounded-full opacity-5 blur-[100px]" />
          </div>

        </div>
      </div>
    </section>
  );
}
