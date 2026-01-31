"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ProtocolContent } from "@/components/ProtocolContent";

export default function ProtocolPage() {
  return (
    <>
      <style jsx global>{`
        html, body {
          overflow: auto !important;
          height: auto !important;
          max-height: none !important;
        }
      `}</style>
      <div
        style={{
          minHeight: "100vh",
          overflowY: "auto",
          WebkitOverflowScrolling: "touch",
        }}
        className="w-full bg-[#081421] text-[#f0f0ff] font-sans selection:bg-[#48cae4] selection:text-[#081421] relative"
      >
        {/* Content */}
        <div className="relative z-10">
          <Navbar />
          <ProtocolContent />
          <Footer />
        </div>
      </div>
    </>
  );
}
