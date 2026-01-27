import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Impact from "@/components/Impact";
import Navbar from "@/components/Navbar";
import WhatWeBuilding from "@/components/WhatWeBuilding";

export default function Home() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden">
      <Navbar />
      <Hero />
      <WhatWeBuilding />
      <HowItWorks />
      <Impact />
      <Footer />
    </main>
  );
}
