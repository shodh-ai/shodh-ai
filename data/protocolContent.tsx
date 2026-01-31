export type ProtocolBrainBullet = {
  lead: string;
  text: string;
};

export type ProtocolValidatorBullet = {
  lead: string;
  text: string;
};

export type ProtocolProcessBullet = {
  lead: string;
  text: string;
};

export type ProtocolSyntheticBullet = {
  lead: string;
  text: string;
};

export type ProtocolSection = {
  id: number;
  title: string;
  paragraphs?: string[];
  quote?: string;
  brainIntro1?: string;
  brainIntro2?: string;
  brainBullets?: ProtocolBrainBullet[];
  validatorIntro1?: string;
  validatorIntro2?: string;
  validatorBullets?: ProtocolValidatorBullet[];
  transferTitle?: string;
  transferParagraphs?: string[];
  processBullets?: ProtocolProcessBullet[];
  processTwinTitle?: string;
  processTwinParagraph?: string;
  syntheticIntro?: string;
  syntheticBullets?: ProtocolSyntheticBullet[];
  simToRealIntro?: string;
  simToRealSteps?: string[];
  simToRealConclusion?: string;
};

export const protocolHeader = {
  title: "The Skanda Protocol",
  subtitle:
    'The Universal "Unreal Engine" for Mesoscale Manufacturing Intelligence',
};

export const protocolSections: ProtocolSection[] = [
  {
    id: 1,
    title: "1. The Mesoscale Imperative: Bridging The Valley Of Death",
    paragraphs: [
      "The current paradigm of material discovery is fundamentally broken. It is stuck in a \"Valley of Death\" between the Lab and the Factory.",
      "On one side, we have \"Atomic AI\" (like Google DeepMind's GNoME), which excels at discovering stable molecules. On the other side, we have \"System AI\" (like Ansys), which simulates complete vehicles. But the real world fails in the middle.",
      "Real-world performance is determined at the Mesoscale (10nm–100μm). This is the invisible regime where \"Atoms\" meet \"Systems.\" It is the chaos of pore networks, grain boundaries, and manufacturing defects.",
      "In a Gigafactory, yield loss is rarely an atomic problem; it is a structural problem. A high-performance material often fails in production because the manufacturing process alters the microstructure in ways that atomic models cannot predict and system models cannot resolve.",
      "Shodh AI introduces Skanda, a proprietary Large Material Model (LMM). By digitizing this \"Missing Middle,\" we are building the \"Unreal Engine\" for matter—a generative architecture that doesn't just predict how materials behave, but designs how they should be built.",
    ],
    quote: "If you control the Mesoscale, you control the Yield.",
  },
  {
    id: 2,
    title: "2. The Core Architecture: Building The Large Material Model (LMM)",
    paragraphs: [
      "To solve the scale-up problem, we cannot rely on traditional \"Discriminative AI\" that simply predicts a number (e.g., \"Will this battery last 500 cycles?\"). We need Generative AI that can design the solution (e.g., \"Draw me a microstructure that lasts 1000 cycles.\").",
      "The Skanda Protocol is built on a dual-engine architecture:",
    ],
    brainIntro1:
      "Most material AI treats matter as 1D strings (text) or 2D graphs. Skanda treats matter as 3D Voxels.",
    brainIntro2:
      "We utilize a 3D Diffusion Transformer (DiT)—the same architecture behind OpenAI's Sora, but retrained for Physics.",
    brainBullets: [
      {
        lead: "How it works:",
        text: "The model learns to reverse the diffusion process. It starts with random noise and iteratively \"denoises\" it into a high-performance microstructure.",
      },
      {
        lead: "The Latent Space:",
        text: "Just as an LLM understands the rules of grammar, Skanda understands the \"Grammar of Topology\"—the intricate rules of how particles pack, how binders stretch, and how pores connect.",
      },
    ],
    validatorIntro1:
      "Generative AI often \"hallucinates\" designs that look good but violate physics. To fix this, we need a feedback loop.",
    validatorIntro2:
      "Traditional physics solvers (like Finite Element Analysis) are too slow, taking hours to validate one design. We replaced them with Fourier Neural Operators (FNO).",
    validatorBullets: [
      {
        lead: "The Speed Advantage:",
        text: "FNOs learn the physics in the frequency domain. They act as a \"Digital Surrogate,\" approximating the solution of complex partial differential equations (PDEs) in milliseconds on a GPU.",
      },
      {
        lead: "System 1 vs. System 2:",
        text: "The FNO acts as the fast, intuitive \"System 1\" thinker, allowing the DiT to explore millions of design iterations per minute.",
      },
    ],
  },
  {
    id: 3,
    title: "3. The Swappable \"Physics Kernels\": One Brain, Infinite Applications",
    paragraphs: [
      "The core innovation of the Skanda Protocol is the separation of Geometry (The Brain) from Physics (The Kernel).",
      "Our Generative Brain (a 3D Diffusion Transformer) is mathematically invariant—it learns the \"Grammar of Topology\" (connectivity, surface area, tortuosity). To teach this brain different laws of physics, we simply swap the \"Physics Kernel.\"",
      "Think of Skanda as a Game Console: The hardware is the same, but we plug in different \"Cartridges\" to solve different industrial problems. This allows us to scale from Batteries to Aerospace without rebuilding our core AI.",
    ],
    transferTitle: "Topological Transfer Learning: The Network Effect",
    transferParagraphs: [
      "The beauty of this architecture is Transfer Learning.",
      "Mathematically, a \"clogged pore\" in a Lithium-Ion battery (Cartridge A) is topologically identical to a \"clogged pore\" in a Hydrogen Electrolyzer (Cartridge B).",
      "By solving the Tortuosity problem for our Battery Beachhead, the Skanda model has already \"pre-trained\" itself to solve the Permeability problem for Hydrogen. We are not building three separate companies; we are building one Universal Intelligence that gets smarter with every material it designs.",
    ],
  },
  {
    id: 4,
    title: "4. Skanda-Morph: The \"Manufacturing-Aware\" Engine",
    paragraphs: [
      "The fatal flaw of most Material AI is the assumption of \"Perfect Geometry.\"",
      "Simulation models often treat a battery electrode as a collection of perfect spheres. But manufacturing is a violent physical process. It deforms, shears, and crushes materials.",
      "If the AI doesn't understand the Factory, the design will fail on the Line.",
      "To bridge this gap, we built Skanda-Morph—a proprietary simulation engine that digitizes the production line itself. It sits between the Generative Brain and the Physics Validator, ensuring that every design is actually manufacturable.",
    ],
    processBullets: [
      {
        lead: "The Mixing Kernel:",
        text: "We simulate the Rheology of the slurry. The AI learns how high-speed mixing shears polymer binders (like PVDF), potentially breaking the electronic network before coating even begins.",
      },
      {
        lead: "The Calendering Kernel:",
        text: "We simulate the Compaction process. The AI models how heavy rollers \"squish\" the active material, predicting how porosity collapses and tortuosity spikes under pressure.",
      },
    ],
    processTwinTitle: "The \"Digital Twin\" of the Process:",
    processTwinParagraph:
      "By integrating Skanda-Morph, our Foundation Model becomes \"Process-Aware.\" It doesn't just tell you what microstructure to build; it tells the factory controls how to build it (e.g., \"Reduce drying temperature by 5°C to prevent binder migration\").",
  },
  {
    id: 5,
    title: "5. The Data Moat: The \"Physics Hypercube\"",
    paragraphs: [
      "The single biggest barrier in Material AI is data scarcity. Unlike ChatGPT, which was trained on the entire public internet, there is no \"Internet of Battery Microstructures.\" Real-world experimental data is sparse, noisy, and proprietary.",
      "Shodh AI does not wait for data. We manufacture it.",
    ],
    syntheticIntro:
      "Before our AI ever sees a real lab experiment, it graduates from the \"Physics Hypercube\"—a massive proprietary dataset generated by our supercomputing cluster.",
    syntheticBullets: [
      {
        lead: "The Concept:",
        text: "We simulate the entire theoretical design space of porous media. We force the AI to learn the Fundamental Laws of Physics (Mass Conservation, Thermodynamics, Stress-Strain) by seeing them play out in 10 million synthetic scenarios.",
      },
      {
        lead: "The Result:",
        text: "A \"Physics-Pretrained\" Foundation Model. Our AI isn't guessing; it is deriving solutions from first principles.",
      },
    ],
    simToRealIntro:
      "Synthetic data is perfect; reality is messy. To close the gap, we employ a \"Sim-to-Real\" Transfer Loop.",
    simToRealSteps: [
      "The Dream: Skanda hallucinates a high-performance anode structure.",
      "The Reality: We analyze real, robot-manufactured electrodes using X-ray Tomography (CT Scans).",
      "The Calibration: The AI compares the Simulated structure with the Real structure. It learns the \"Uncontrolled Approximations\"—the tiny, chaotic deviations caused by humidity, temperature, or gravity in the factory.",
    ],
    simToRealConclusion:
      "This is our Unfair Advantage. While competitors scrape public databases for \"idealized\" crystals, Shodh AI is training on the messy, high-fidelity reality of manufacturing. We own the Data Factory.",
  },
  {
    id: 6,
    title: "6. Commercial Deployment: The \"Sovereign Stack\" Strategy",
    paragraphs: [
      "The Skanda Protocol is not a theoretical project; it is a deployment engine. Our strategy is to secure a commercial \"Beachhead\" in the most critical market, then use the universal architecture to expand effortlessly.",
    ],
  },
  {
    id: 7,
    title: "7. Conclusion: The Era Of Generative Manufacturing",
  },
];

export type ProtocolTableRow = {
  cartridge: string;
  teacher: string;
  lesson: string;
  outputLines: string[];
};

export const protocolTableRows: ProtocolTableRow[] = [
  {
    cartridge: "Cartridge A (Energy)",
    teacher: "Electrochemistry Kernel",
    lesson:
      "The AI learns how Ions navigate tortuous pore networks and manage concentration gradients.",
    outputLines: [
      "Battery Electrodes",
      "Li-Ion, Na-Ion, Solid State",
      "Target: EV Range & Life",
    ],
  },
  {
    cartridge: "Cartridge B (Fluids)",
    teacher: "Fluid Dynamics Kernel",
    lesson:
      "The AI learns how Gases & Liquids flow over catalyst surfaces and through porous transport layers.",
    outputLines: [
      "Green Hydrogen",
      "Electrolyzers & Carbon Capture",
      "Target: Efficiency",
    ],
  },
  {
    cartridge: "Cartridge C (Mechanics)",
    teacher: "Micro-Mechanics Kernel\nCrystal Plasticity FEM (CPFEM)",
    lesson:
      "The AI learns how Metal Grains slip, deform, and initiate cracks under high-velocity impact or heat.",
    outputLines: [
      "Strategic Alloys",
      "Armor, Jet Engines",
      "Target: Strength vs. Ductility",
    ],
  },
];

export type ProtocolVertical = {
  title: string;
  items: string[];
};

export const protocolVerticals: ProtocolVertical[] = [
  {
    title: "Vertical 1: Energy Storage (The Beachhead)",
    items: [
      "Target: The $400B Electric Vehicle & Grid Storage market.",
      "The Pain Point: Silicon Anodes offer 10x capacity but fracture due to volume expansion.",
      "The Solution: Deploying Cartridge A (Electrochemistry) + Solid Mechanics. The AI hallucinates \"Yolk-Shell\" void structures and stress-relief patterns that allow Silicon to expand without breaking the matrix.",
      "Status: Alpha Demo Live (Jan 2026).",
    ],
  },
  {
    title: "Vertical 2: Green Hydrogen (The Expansion)",
    items: [
      "Target: The $150B Green Hydrogen economy.",
      "The Pain Point: Current Porous Transport Layers (PTLs) trap oxygen bubbles, killing efficiency.",
      "The Solution: Deploying Cartridge B (Fluid Dynamics). The AI transfers its \"Topology knowledge\" from batteries to design gradient-porosity PTLs that maximize gas exit pathways.",
    ],
  },
  {
    title: "Vertical 3: Strategic Alloys (The Sovereignty Play)",
    items: [
      "Target: Defense, Aerospace, and National Sovereignty.",
      "The Pain Point: The \"Strength-Ductility Trade-off\" in Armor and jet engines.",
      "The Solution: Deploying Cartridge C (Crystal Plasticity). The AI optimizes grain boundary networks to create High-Entropy Alloys that are lighter than titanium but stronger than steel.",
    ],
  },
];

export const foundryBullets = {
  intro:
    'Our current autonomous facility focuses on "Wet Chemistry"—materials that are mixed as inks, slurries, or liquids.',
  items: [
    "The Workflow: The AI sends a recipe to robotic liquid handlers. They synthesize Battery Electrodes (Slurries) or Hydrogen Catalysts (Inks) at high throughput.",
    "The Feedback: Automated characterization rigs measure performance (impedance, porosity) and feed the data back to the AI to close the Sim-to-Real loop.",
  ],
};

export const hardwareBullets = {
  intro:
    "Just as we swap Software Kernels for different physics, we swap Hardware Modules for different states of matter.",
  items: [
    "For Batteries (Cartridge A): We use Mixing & Coating Robots.",
    "For Alloys (Cartridge C): We integrate with Metallurgical Hardware (Arc Melters, Sintering Furnaces).",
    "The Logic: The Intelligence Layer (Skanda) remains universal, even if the Manufacturing Hardware changes from a beaker to a furnace. We are building the Operating System that controls both.",
  ],
};

export const conclusionParagraphs: string[] = [
  "For the last century, Material Science has been —a game of trial-and-error, driven by luck and taking decades to scale.<br/>That era ends today.",
  "Shodh AI is moving the industry from <span class=\"text-white font-medium\">Discovery by Luck</span> to <span class=\"text-white font-medium\">Discovery by Design</span>.",
  "By digitizing the Mesoscale, we have built the first architecture that connects the Atom to the System. We are not just building better batteries or stronger alloys; we are building the <span class=\"text-white font-medium\">Operating System for the Physical World</span>.",
  "Supported by IndiaAI, we are constructing the foundation of sovereign manufacturing intelligence—scalable, universal, and undeniably real.",
  "Welcome to the Skanda Protocol.",
];

