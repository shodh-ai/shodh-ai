"use client";

import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="absolute left-0 top-0 z-50 h-[120px] w-full flex items-center justify-between px-6 md:px-10">
      {/* Logo */}
      <Link href="/" className="relative">
        <Image
          src="/Frame.svg"
          alt="Shodh AI"
          width={136}
          height={32}
          priority
          className="w-[110px] md:w-[136px] h-auto"
        />
      </Link>

      {/* Navigation Links */}
      <div className="flex items-center gap-1 md:gap-4">
        <Link href="/demo" className="px-2 md:px-4 py-2 text-white text-sm md:text-base">
          DEMO
        </Link>
        <Link href="#teams" className="px-2 md:px-4 py-2 text-white text-sm md:text-base">
          TEAMS
        </Link>
        <Link href="#careers" className="hidden sm:block px-4 py-2 text-white text-sm md:text-base bg-white/10 rounded-md">
          CAREERS
        </Link>
        <Link href="#contact" className="px-2 md:px-4 py-2 text-white text-sm md:text-base">
          CONTACT
        </Link>
      </div>
    </nav>
  );
}
