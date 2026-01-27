"use client";

import { Lightbulb, FlaskConical, Factory } from "lucide-react";

const steps = [
  {
    icon: Lightbulb,
    title: "We Input Goals.\nAI Outputs Recipes.",
    description:
      'Instead of guessing, we tell the AI what we need (e.g., "A battery that works at -30°C"). The AI scans billions of possibilities to generate the perfect chemical recipe.',
  },
  {
    icon: FlaskConical,
    title: "We Don't Guess.\nWe Test in the Real World.",
    description:
      "Our 24/7 autonomous lab builds and tests batteries, generating real-world data that makes the AI smarter every day.",
  },
  {
    icon: Factory,
    title: "Ready for Production.",
    description:
      "We ensure discovered materials can be manufactured, bridging lab experiments to real-world products.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative w-full bg-[#f0f0ff] py-20 px-10"
    >
      {/* Section Header */}
      <div className="flex items-start justify-between mb-16">
        <div className="flex items-center gap-2 bg-[#081421]/10 rounded px-3 py-2.5 w-fit">
          <div className="w-2.5 h-2.5 bg-[#48cae4] rounded-sm" />
          <span className="text-[#081421] text-xs tracking-wider uppercase font-medium">
            HOW IT WORKS
          </span>
        </div>
        <h2 className="text-[#081421] text-4xl md:text-5xl lg:text-6xl font-medium uppercase text-right">
          FROM CODE TO CHEMISTRY
        </h2>
      </div>

      {/* Steps */}
      <div className="flex flex-col gap-32 mt-16">
        {steps.map((step, index) => (
          <div key={index} className="relative flex justify-center">
            {/* Ellipse Background */}
            <div className="relative w-full max-w-5xl">
              {/* Outer ellipse */}
              <div className="absolute inset-0 border border-[#081421]/20 rounded-full h-[520px]" />
              {/* Inner ellipse */}
              <div className="absolute left-1/2 -translate-x-1/2 w-[520px] h-[520px] border border-[#081421]/20 rounded-full" />

              {/* Content Card */}
              <div className="relative z-10 flex flex-col items-center justify-center h-[520px] text-center px-8">
                {/* Icon */}
                <div className="w-10 h-10 flex items-center justify-center mb-6">
                  <step.icon className="w-8 h-8 text-[#081421]" strokeWidth={1.5} />
                </div>

                {/* Title */}
                <h3 className="text-[#081421] text-2xl md:text-3xl font-medium whitespace-pre-line mb-4">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-[#081421]/70 text-base max-w-xs leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
