"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#0d1f3c] to-[#081421]">
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-10 pt-20 pb-8">
        {/* Top Section */}
        <div className="flex flex-wrap gap-16 lg:gap-32 mb-32">
          {/* Left - CTA */}
          <div className="flex-1 min-w-[300px]">
            <h2 className="text-white text-4xl md:text-5xl font-normal leading-tight mb-12">
              The Future of Material Science.
            </h2>
            <Link
              href="#contact"
              className="inline-flex items-center justify-center px-5 py-3 bg-[#f0f0ff] text-[#081421] text-base tracking-wide rounded-md hover:bg-white transition-colors"
            >
              WORK WITH US
            </Link>
          </div>

          {/* Navigate Links */}
          <div className="border-l border-[#f0f0ff]/50 pl-6">
            <span className="text-[#f0f0ff]/50 text-base tracking-wide uppercase block mb-8">
              Navigate
            </span>
            <nav className="flex flex-col gap-6">
              <Link
                href="#teams"
                className="text-[#f0f0ff] text-base capitalize hover:opacity-80 transition-opacity"
              >
                Teams
              </Link>
              <Link
                href="#careers"
                className="text-[#f0f0ff] text-base capitalize hover:opacity-80 transition-opacity"
              >
                Careers
              </Link>
              <Link
                href="#contact"
                className="text-[#f0f0ff] text-base capitalize hover:opacity-80 transition-opacity"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Connect Links */}
          <div className="border-l border-[#f0f0ff]/50 pl-6">
            <span className="text-[#f0f0ff]/50 text-base tracking-wide uppercase block mb-8">
              Connect
            </span>
            <nav className="flex flex-col gap-6">
              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#f0f0ff] text-base capitalize hover:opacity-80 transition-opacity"
              >
                Linkedin
              </Link>
              <Link
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#f0f0ff] text-base capitalize hover:opacity-80 transition-opacity"
              >
                X
              </Link>
            </nav>
          </div>

          {/* Arrow Button */}
          <div>
            <button className="w-12 h-12 border border-[#f0f0ff] rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors">
              <ArrowUpRight className="w-6 h-6 text-[#f0f0ff]" />
            </button>
          </div>
        </div>

        {/* Large Brand Text */}
        <div className="mb-8 overflow-hidden">
          <h1 className="text-[#f0f0ff] text-[80px] sm:text-[120px] md:text-[180px] lg:text-[280px] xl:text-[341px] font-normal leading-none capitalize whitespace-nowrap">
            Shodh AI
          </h1>
        </div>

        {/* Copyright */}
        <div className="text-[#f0f0ff] text-xs tracking-wider uppercase">
          © 2026 Shodh AI. All rights reserved
        </div>
      </div>
    </footer>
  );
}
