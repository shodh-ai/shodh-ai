"use client";

const sections = [
  {
    number: "01",
    total: "03",
    text: "We are building SkandaX - the world's largest AI model for Mesoscale Physics, designed to understand how matter behaves beyond ideal lab conditions.",
    highlight: "",
  },
  {
    number: "02",
    total: "03",
    text: "Unlike conventional AI trained on text or images, SkandaX is ",
    highlight:
      "trained on physics and degradation, learning from how materials evolve under real-world stress.",
  },
  {
    number: "03",
    total: "03",
    text: "It understands how materials stretch, crack, and age over time - and instead of just designing new materials, it predicts how long they will last.",
    highlight: "",
    dimmed: true,
  },
];

export default function WhatWeBuilding() {
  return (
    <section className="relative w-full bg-gradient-to-b from-[#081421] via-[#0d1f3c] to-[#081421]">
      {/* Section Header */}
      <div className="px-10 pt-20">
        <div className="flex items-center gap-2 bg-white/10 rounded px-3 py-2.5 w-fit">
          <div className="w-2.5 h-2.5 bg-[#48cae4] rounded-sm" />
          <span className="text-white text-xs tracking-wider uppercase font-medium">
            WHAT WE ARE BUILDING
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="mt-8 w-full h-[2px] bg-white/30">
        <div className="w-1/2 h-full bg-white" />
      </div>

      {/* Content Sections */}
      <div className="px-10 py-16 space-y-32">
        {sections.map((section, index) => (
          <div key={index} className="flex gap-16">
            {/* Number Badge */}
            <div className="shrink-0">
              <div className="border border-white/50 rounded-full px-6 py-4">
                <span className="text-white text-xs tracking-wider font-medium">
                  {section.number}{" "}
                  <span className="text-white/50">/ {section.total}</span>
                </span>
              </div>
            </div>

            {/* Text Content */}
            <div className="flex-1 max-w-4xl ml-auto">
              <p
                className={`text-4xl md:text-5xl leading-tight ${
                  section.dimmed ? "text-white/50" : "text-white"
                }`}
              >
                {section.text}
                {section.highlight && (
                  <span className="text-white/50">{section.highlight}</span>
                )}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
