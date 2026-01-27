"use client";

import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="absolute left-0 top-0 z-50 h-[120px] w-full">
      {/* Logo */}
      <Link href="/" className="absolute left-10 top-10">
        <Image
          src="/Frame.svg"
          alt="Shodh AI"
          width={136}
          height={32}
          priority
          className="h-[32px] w-[135.467px]"
        />
      </Link>

      {/* Navigation Links */}
      <div className="absolute right-10 top-[34px] flex items-center">
        <Link
          href="#teams"
          className="px-4 py-4 text-white text-base tracking-wide hover:opacity-80 transition-opacity"
        >
          TEAMS
        </Link>
        <Link
          href="#careers"
          className="px-4 py-4 text-white text-base tracking-wide bg-white/10 rounded-md hover:bg-white/20 transition-colors"
        >
          CAREERS
        </Link>
        <Link
          href="#contact"
          className="px-4 py-4 text-white text-base tracking-wide hover:opacity-80 transition-opacity"
        >
          CONTACT
        </Link>
      </div>
    </nav>
  );
}
