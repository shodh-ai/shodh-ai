import React from "react";

import {
  protocolHeader,
  protocolSections,
  protocolTableRows,
  protocolVerticals,
  foundryBullets,
  hardwareBullets,
  conclusionParagraphs,
  type ProtocolSection,
} from "@/data/protocolContent";

export function ProtocolContent() {
  return (
    <div className="pt-40 pb-20 px-6 md:px-10 max-w-5xl mx-auto">
      {/* Page Header */}
      <header className="text-center mb-32">
        <h1 className="text-5xl md:text-7xl font-medium uppercase tracking-tight mb-4 text-white">
          {protocolHeader.title}
        </h1>
        <p className="text-xl md:text-2xl text-white/60 font-light">
          {protocolHeader.subtitle}
        </p>
      </header>

      {/* Content Sections */}
      <div className="space-y-24 text-lg leading-relaxed text-white/80 font-light">
        {protocolSections.map((section: ProtocolSection) => (
          <section
            key={section.id}
            className="relative rounded-3xl overflow-hidden border border-white/10 bg-[#020617]/60"
            style={{
              backgroundImage: "url('/Rectangle 8.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            {/* Dark overlay to keep text readable on top of the image */}
            <div className="absolute inset-0 bg-[#020617]/70 pointer-events-none" />

            {/* Section content */}
            <div className="relative z-10 p-8 md:p-10">
            <h2 className="text-3xl md:text-4xl font-medium text-white mb-8">
              {section.title}
            </h2>

            {section.paragraphs &&
              section.paragraphs.map((p: string, idx: number) => (
                <p
                  key={idx}
                  className={
                    idx === section.paragraphs!.length - 1 ? "mb-10" : "mb-6"
                  }
                >
                  {p}
                </p>
              ))}

            {section.quote && (
              <div className="border-l-4 border-[#48cae4] pl-8 py-2 my-12 bg-white/5 rounded-r-lg">
                <p className="text-white font-normal text-2xl italic">{section.quote}</p>
              </div>
            )}

            {section.brainBullets && (
              <div className="mb-8">
                <h3 className="text-xl font-medium text-white mb-3">A. The Brain: 3D Diffusion Transformers (DiT)</h3>
                <p className="mb-4">{section.brainIntro1}</p>
                <p className="mb-4">{section.brainIntro2}</p>
                <ul className="list-disc pl-6 space-y-2 marker:text-[#48cae4]">
                  {section.brainBullets.map((b, idx: number) => (
                    <li key={idx}>
                      <span className="text-white">{b.lead}</span> {b.text}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {section.validatorBullets && (
              <div>
                <h3 className="text-xl font-medium text-white mb-3">B. The Validator: Fourier Neural Operators (FNO)</h3>
                <p className="mb-4">{section.validatorIntro1}</p>
                <p className="mb-4">{section.validatorIntro2}</p>
                <ul className="list-disc pl-6 space-y-2 marker:text-[#48cae4]">
                  {section.validatorBullets.map((b, idx: number) => (
                    <li key={idx}>
                      <span className="text-white">{b.lead}</span> {b.text}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {section.id === 3 && (
              <>
                <div className="overflow-x-auto mb-10 border border-white/10 rounded-lg">
                  <table className="w-full text-left text-sm md:text-base">
                    <thead>
                      <tr className="bg-white/5 border-b border-white/10 text-white font-medium">
                        <th className="p-4">Cartridge</th>
                        <th className="p-4">The "Teacher" (Simulator)</th>
                        <th className="p-4">The Physics Lesson</th>
                        <th className="p-4">Industrial Output</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {protocolTableRows.map((row, idx: number) => (
                        <tr key={idx} className="hover:bg-white/[0.02]">
                          <td className="p-4 text-white">{row.cartridge}</td>
                          <td className="p-4">{row.teacher}</td>
                          <td className="p-4">{row.lesson}</td>
                          <td className="p-4">
                            {row.outputLines.map((line, i: number) => (
                              <React.Fragment key={i}>
                                {line}
                                {i < row.outputLines.length - 1 && <br />}
                              </React.Fragment>
                            ))}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {section.transferTitle && (
                  <>
                    <h3 className="text-xl font-medium text-white mb-3">{section.transferTitle}</h3>
                    {section.transferParagraphs?.map((p: string, idx: number) => (
                      <p key={idx} className="mb-4 last:mb-0">
                        {p}
                      </p>
                    ))}
                  </>
                )}
              </>
            )}

            {section.processBullets && (
              <>
                <ul className="list-disc pl-6 space-y-2 marker:text-[#48cae4] mb-8">
                  {section.processBullets.map((b, idx: number) => (
                    <li key={idx}>
                      <span className="text-white">{b.lead}</span> {b.text}
                    </li>
                  ))}
                </ul>
                {section.processTwinTitle && (
                  <>
                    <h3 className="text-xl font-medium text-white mb-3">{section.processTwinTitle}</h3>
                    <p>{section.processTwinParagraph}</p>
                  </>
                )}
              </>
            )}

            {section.syntheticBullets && (
              <>
                <h3 className="text-xl font-medium text-white mb-3">Synthetic Pre-training: The 10-Million Simulation Grid</h3>
                <p className="mb-4">{section.syntheticIntro}</p>
                <ul className="list-disc pl-6 space-y-2 marker:text-[#48cae4] mb-8">
                  {section.syntheticBullets.map((b, idx: number) => (
                    <li key={idx}>
                      <span className="text-white">{b.lead}</span> {b.text}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {section.simToRealSteps && (
              <>
                <h3 className="text-xl font-medium text-white mb-3">Sim-to-Real Calibration</h3>
                <p className="mb-4">{section.simToRealIntro}</p>
                <ol className="list-decimal pl-6 space-y-2 marker:text-[#48cae4]">
                  {section.simToRealSteps.map((step: string, idx: number) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ol>
                <p className="mt-6">{section.simToRealConclusion}</p>
              </>
            )}

            {section.id === 6 && (
              <>
                <div className="space-y-8">
                  {protocolVerticals.map((vertical, idx: number) => (
                    <div key={idx}>
                      <h3 className="text-xl font-medium text-white mb-2">{vertical.title}</h3>
                      <ul className="list-disc pl-6 space-y-1 marker:text-[#48cae4]">
                        {vertical.items.map((item: string, i: number) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="mt-10">
                  <h3 className="text-xl font-medium text-white mb-3">The "Solution-Processable" Foundry (Current)</h3>
                  {foundryBullets.intro && <p className="mb-4">{foundryBullets.intro}</p>}
                  <ul className="list-disc pl-6 space-y-2 marker:text-[#48cae4] mb-8">
                    {foundryBullets.items.map((item: string, idx: number) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>

                  <h3 className="text-xl font-medium text-white mb-3">Hardware Swapping: Beyond Wet Chemistry (Roadmap)</h3>
                  {hardwareBullets.intro && <p className="mb-4">{hardwareBullets.intro}</p>}
                  <ul className="list-disc pl-6 space-y-2 marker:text-[#48cae4]">
                    {hardwareBullets.items.map((item: string, idx: number) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              </>
            )}

            {section.id === 7 && (
              <section className="mb-32">
                <h2 className="text-3xl md:text-4xl font-medium text-white mb-8">
                  {section.title}
                </h2>
                {conclusionParagraphs.map((p: string, idx: number) => (
                  <p
                    key={idx}
                    className={idx === conclusionParagraphs.length - 1 ? "" : "mb-6"}
                    dangerouslySetInnerHTML={{ __html: p }}
                  />
                ))}
              </section>
            )}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
