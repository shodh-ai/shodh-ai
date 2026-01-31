"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ProtocolContent } from "@/components/ProtocolContent";
import Image from "next/image";

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
        {/* Background Image */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image 
            src="/Frame 626503.png" 
            alt="Background"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#081421]/40" />
        </div>
        
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
