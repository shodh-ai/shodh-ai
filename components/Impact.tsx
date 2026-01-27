"use client";

import Image from "next/image";

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
    overlayClassName: "bg-[rgba(0,0,0,0.2)]",
  },
  {
    image: "/batteries%201.svg",
    title: "Cheaper Hydrogen",
    description: "New catalysts to replace expensive Platinum.",
    overlayClassName:
      "bg-gradient-to-b from-[rgba(0,0,0,0)] from-1/2 to-[rgba(0,0,0,0.6)]",
  },
];

export default function Impact() {
  return (
    <section className="relative w-full bg-[#f0f0ff] py-20">
      <div className="mx-auto w-full max-w-[1440px] px-10">
        {/* Divider Line (matches Figma Line 1 width/position) */}
        <div className="mb-20 h-px w-full bg-[#173a68]/20" />

        {/* Section Header */}
        <div className="mb-16">
          <div className="mb-12 flex items-center gap-2 rounded bg-white px-3 py-2.5 w-fit">
            <div className="h-2.5 w-2.5 rounded-sm bg-[#48cae4]" />
            <span className="text-xs font-medium uppercase tracking-[0.24px] text-[#173a68]">
              The impact
            </span>
          </div>

          <h2 className="max-w-[897px] text-[#173a68] font-medium uppercase leading-[1.1] text-4xl sm:text-5xl lg:text-[72px]">
            Solving India&apos;s Hardest Energy Problems
          </h2>
        </div>

        {/* Impact Cards */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {impactCards.map((card) => (
            <div key={card.title} className="relative">
              <div className="relative h-[682px] overflow-hidden rounded-[8px]">
                <Image
                  src={card.image}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 440px, 100vw"
                  className="object-cover"
                  priority={card.title === "Better Batteries"}
                />

                {/* Overlays */}
                {card.overlayStyle ? (
                  <div
                    className="absolute inset-0 rounded-[8px]"
                    style={card.overlayStyle}
                  />
                ) : (
                  <div
                    className={`absolute inset-0 rounded-[8px] ${card.overlayClassName ?? ""}`}
                  />
                )}

                {/* Text (40px in from edges, 40px from bottom) */}
                <div className="absolute bottom-10 left-10 right-10 text-[#f0f0ff]">
                  <h3 className="mb-6 text-[32px] font-medium capitalize leading-[1.1]">
                    {card.title}
                  </h3>
                  <p className="text-[20px] leading-[1.1]">{card.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
