"use client";

import { Battery, Atom, Rocket, Cpu } from "lucide-react";
import Image from "next/image";

// Data moved from Impact section
const impactCards = [
  {
    image: "/pexels-thisisengineering-3861442%201.svg",
    title: "Better Batteries",
    description: "Silicon Anodes for EVs with 20% more range.",
    overlayStyle: {
      backgroundImage:
        "linear-gradient(212.82853677342678deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 50%), linear-gradient(180deg, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.8) 100%)",
    } as const,
  },
  {
    image: "/image%201.svg",
    title: "Safer Grids",
    description: "Sodium-Ion storage that handles Indian heat.",
    overlayClassName: "bg-[rgba(0,0,0,0.3)]",
  },
  {
    image: "/batteries%201.svg",
    title: "Cheaper Hydrogen",
    description: "New catalysts to replace expensive Platinum.",
    overlayClassName:
      "bg-gradient-to-b from-[rgba(0,0,0,0)] from-1/2 to-[rgba(0,0,0,0.7)]",
  },
];

const stages = [
  {
    label: "TODAY",
    title: "WE BUILD.",
    mission: "The Mission: Energy Storage",
    desc: "Removing defects and scaling safe, high-density EV batteries for the global market.",
    icon: Battery,
    color: "text-[#48cae4]",
    bg: "bg-[#48cae4]/10",
    border: "border-[#48cae4]/20"
  },
  {
    label: "TOMORROW",
    title: "WE DISCOVER.",
    mission: "The Mission: Post-Lithium",
    desc: "Pioneering Sodium-Ion chemistries and non-lithium alternatives to secure material independence.",
    icon: Atom,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20"
  },
  {
    label: "THE FUTURE",
    title: "WE DESIGN.",
    mission: "The Mission: Type 1 Civilization",
    desc: "Inventing the materials required for Fusion, Space Exploration, and Quantum Computing.",
    icon: Rocket,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20"
  },
];

export default function NationalMandate() {
  return (
    <section className="relative w-full bg-[#081421] py-32 px-6 md:px-10 border-t border-white/5">
      
      {/* Background Decor */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
            backgroundImage: `linear-gradient(#48cae4 1px, transparent 1px), linear-gradient(to right, #48cae4 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
        }}
      />

      <div className="max-w-[1440px] mx-auto relative z-10">
        
        {/* --- 1. HEADER --- */}
        <div className="text-center mb-24">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Cpu className="w-5 h-5 text-[#48cae4]" />
            <span className="text-[#48cae4] text-xs font-bold tracking-[0.2em] uppercase">
              The National Mandate
            </span>
          </div>
          
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-medium uppercase tracking-tight text-white mb-6 leading-[1.1]">
            Selected to lead the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#48cae4] to-white">
              'AI for Science' Revolution.
            </span>
          </h2>
          
          <p className="text-xl text-white/60 font-light max-w-2xl mx-auto leading-relaxed">
            Shodh AI is the flagship partner of the <strong className="text-white">IndiaAI Mission</strong>. We are making the national foundation for scientific intelligence.
          </p>
        </div>

        {/* --- 2. IMPACT IMAGES (Moved from Impact section) --- */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-24">
          {impactCards.map((card) => (
            <div key={card.title} className="relative group">
              <div className="relative h-[500px] overflow-hidden rounded-2xl border border-white/10">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlays */}
                {card.overlayStyle ? (
                  <div className="absolute inset-0" style={card.overlayStyle} />
                ) : (
                  <div className={`absolute inset-0 ${card.overlayClassName ?? ""}`} />
                )}

                {/* Text Content */}
                <div className="absolute bottom-8 left-8 right-8 text-[#f0f0ff]">
                  <h3 className="mb-3 text-2xl font-medium capitalize">
                    {card.title}
                  </h3>
                  <p className="text-sm text-white/70 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* --- 3. TIMELINE CARDS --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32">
          {stages.map((stage, i) => (
            <div 
              key={i} 
              className={`relative group p-8 rounded-2xl border ${stage.border} bg-[#0a1628] hover:bg-white/[0.02] transition-all duration-500`}
            >
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-widest mb-8 ${stage.bg} ${stage.color}`}>
                <div className={`w-1.5 h-1.5 rounded-full bg-current`} />
                {stage.label}
              </div>

              <div className="mb-6">
                <h3 className="text-3xl font-medium text-white mb-2">{stage.title}</h3>
                <p className={`text-sm font-mono uppercase tracking-wider ${stage.color}`}>
                  {stage.mission}
                </p>
              </div>

              <p className="text-white/60 leading-relaxed text-sm mb-8 min-h-[60px]">
                {stage.desc}
              </p>

              <div className={`absolute bottom-8 right-8 p-3 rounded-xl ${stage.bg} ${stage.color} opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500`}>
                <stage.icon className="w-6 h-6" />
              </div>
            </div>
          ))}
        </div>

        {/* --- 4. LOGOS --- */}
        <div className="border-t border-white/10 pt-16">
          <p className="text-center text-xs font-bold tracking-[0.2em] text-white/30 uppercase mb-12">
            Backed By National & Global Leaders
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-16 md:gap-32 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
            <div className="flex items-center gap-3">
               <div className="text-2xl font-bold text-white tracking-tighter">
                 India<span className="text-[#ff9933]">AI</span>
               </div>
            </div>
            <div className="flex items-center gap-2">
               <span className="text-2xl font-bold text-white tracking-tight">NVIDIA</span>
            </div>
            <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-white tracking-tight">Google</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}