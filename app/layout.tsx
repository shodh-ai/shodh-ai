import "./globals.css";

import { Geist, Geist_Mono, Inter } from "next/font/google";

import type { Metadata } from "next";

const aeonik = Inter({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-aeonik",
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shodh AI - Generative AI for the Physical World",
  description: "Building India's sovereign engine to design & discover next generation of Energy Materials.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${aeonik.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
