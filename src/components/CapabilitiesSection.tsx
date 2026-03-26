import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { TabsContent, TabsList, TabsTrigger, Tabs } from "@/components/ui/tabs";

/* ──────────────────────────────────────────────────────────
   Types
   ────────────────────────────────────────────────────────── */
interface CapabilityItem {
  title: string;
  description: string;
  icon?: string;
  imageSrc?: string;
  imageAlt?: string;
}

/* ──────────────────────────────────────────────────────────
   Component
   ────────────────────────────────────────────────────────── */
const CapabilitiesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState("current");
  const containerRef = useRef<HTMLDivElement>(null);

  /* 1. Define capabilities ─────────────────────────────── */
  const currentCapabilities: CapabilityItem[] = [
    // {
    //   title: "Reflow Oven",
    //   description:
    //     "Repurposing an old toaster oven for soldering our PCBs. Precise temperature curve control via PID.",
    //   icon: "circuit",
    // },
    {
      title: "Maskless UV Lithostepper (Patterning)",
      description:
        "Our lithography stepper performs maskless photolithography using a modified Texas Instruments projector that emits ultraviolet light matched to the photoresist sensitivity. The projected image exposes selected regions of the photoresist, enabling rapid prototyping without the need for expensive photomasks. The system scans the wafer using a rasterized exposure process, writing patterns layer by layer.",
      icon: "assembly",
      imageSrc: "/images/1.png",
      imageAlt:
        "Photo of the lithography setup with a DLP projector and optics",
    },
    {
      title: "Tube Furnace (Annealing)",
      description:
        "The Tube Furnace is a high-temperature thermal processing tool used for oxidation, dopant diffusion, and annealing in semiconductor fabrication. The project includes building and operating a horizontal furnace with precise temperature control, programmable heating profiles, and controlled gas environments. We will use this tool to grow oxides, activate dopants, and modify material properties through thermal cycling.",
      icon: "cyto",
      imageSrc: "/images/furnace side2.jpg",
      imageAlt:
        "Photo of the tube furnace setup showing the horizontal tube and control electronics",
    },
    {
      title: "Spin Coater (Deposition)",
      description:
        "The spin coater creates a uniform thin photoresist layer on the wafer surface. The thickness of the resist determines lithography resolution and pattern fidelity. Existing DIY designs rely on machining several parts, but we want to explore minimal designs that rely primarily on 3D printing and off-the-shelf components. The coater will have a motorized chuck to hold the wafer and a control interface for setting spin speed and duration.",
      icon: "cyto",
      imageSrc: "/images/coater_cad.png",
      imageAlt: "Photo of the spin coater 3D model.",
    },
    {
      title: "RF Sputtering Chamber (Deposition)",
      description:
        "We are building a magnetron sputterer to deposit thin films of materials like metals and oxides. This involves designing subsystems for RF power delivery, vacuum generation, gas flow control, and thickness monitoring via a quartz crystal microbalance. This tool is critical for creating conductive and insulating layers in our NMOS process.",
      icon: "equipment",
      imageSrc: "/images/exploded_gun.png",
      imageAlt:
        "Screenshot of the dashboard interface showing temperature curves and control options for the tube furnace",
    },
    {
      title: "Real-Time Dashboard (Software)",
      description:
        "Alongside the hardware, we are developing a real-time dashboard to monitor telemetry and control the settings of our fab tools. Our goal is to eventually streamline our fab process using lab automation, and an intermediate step is to write software that can receive data from our tools and provide a user-friendly interface for manual control.",
      icon: "cyto",
      imageSrc: "/images/dashboard_tube.png",
      imageAlt:
        "Screenshot of the dashboard interface showing temperature curves and control options for the tube furnace",
    },
  ];

  const futureCapabilities: CapabilityItem[] = [
    {
      title: "Plasma Etcher (Etching)",
      description:
        "This device uses ionized gases to etch away material from a wafer. It enables anisotropic etching, which is crucial for fabricating micro and nanoscale features. This effort might involve building extensible hardware on top of our RF sputtering platform to reuse existing components, lowering total costs.",
      icon: "integration",
      imageSrc: "/images/RIE-1.png.webp",
      imageAlt:
        "Screenshot of the dashboard interface showing temperature curves and control options for the tube furnace",
    },
    {
      title: "PN Diode Fabrication",
      description:
        "Using the spin coater and tube furnace with pre-doped p-type silicon and spin-on glass dopant sources, we aim to fabricate simple PN junction diodes. This process will allow us to test the quality of our deposition and annealing steps.",
      icon: "integration",
    },
    {
      title: "Self-aligned NMOS Process",
      description:
        "Building on the PN diode process, we will develop a self-aligned NMOS fabrication process. This involves using the gate electrode as a mask for source/drain implantation, which allows for smaller feature sizes and better performance. Successfully fabricating NMOS transistors will be a major milestone demonstrating the capabilities of our fab tools and processes.",
      icon: "integration",
    },
  ];

  /* 2. Parallax scroll effect ──────────────────────────── */
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const scrollPos = window.scrollY;
      const containerTop =
        container.getBoundingClientRect().top + window.scrollY;
      const offset = scrollPos - containerTop;

      if (
        offset > -window.innerHeight &&
        offset < container.offsetHeight + window.innerHeight
      ) {
        const elements = container.querySelectorAll(".parallax-element");
        elements.forEach((el: any, i) => {
          const speed = i % 2 === 0 ? 0.05 : -0.03;
          el.style.transform = `translateY(${offset * speed}px)`;
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* 3. Utility render helpers ──────────────────────────── */
  const renderCapability = (cap: CapabilityItem, idx: number) => (
    <motion.div
      key={cap.title}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      className="capability-card group mb-8 break-inside-avoid"
    >
      <div className="relative overflow-hidden rounded-lg">
        <div className="bg-[#001a38] border border-ubc-slate/30 p-8 h-full transform group-hover:scale-[0.98] transition-transform">
          <div className="flex items-center gap-3 mb-4">
            {cap.icon ? (
              <div className="p-2 bg-ubc-slate/20 rounded-lg shrink-0">
                {getCapabilityIcon(cap.icon)}
              </div>
            ) : null}
            <h3 className="text-xl font-bold text-ubc-mint">{cap.title}</h3>
          </div>
          {cap.imageSrc ? (
            <img
              src={cap.imageSrc}
              alt={cap.imageAlt ?? cap.title}
              className="mb-4 w-full h-auto rounded-md object-contain"
              loading="lazy"
            />
          ) : null}
          <p className="text-ubc-mint/80">{cap.description}</p>
        </div>

        {/* decorative traces */}
        <div className="absolute top-0 right-0 w-12 h-12">
          <div className="absolute top-0 right-0 w-full h-0.5 bg-ubc-slate/30" />
          <div className="absolute top-0 right-0 h-full w-0.5 bg-ubc-slate/30" />
        </div>
        <div className="absolute bottom-0 left-0 w-8 h-8">
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-ubc-slate/30" />
          <div className="absolute bottom-0 left-0 h-full w-0.5 bg-ubc-slate/30" />
        </div>
      </div>
    </motion.div>
  );

  const getCapabilityIcon = (iconType: string) => {
    switch (iconType) {
      case "circuit":
        return (
          <div className="relative w-6 h-6">
            <div className="absolute inset-0 border-2 border-ubc-mint/60 rounded-full" />
            <div className="absolute inset-[2px] border border-ubc-slate/60 rounded-full" />
            <div className="absolute top-1/2 left-0 w-1.5 h-[1px] bg-ubc-mint" />
            <div className="absolute top-1/2 right-0 w-1.5 h-[1px] bg-ubc-mint" />
            <div className="absolute top-[4px] right-[4px] w-1 h-1 bg-ubc-slate rounded-full" />
            <div className="absolute bottom-[4px] left-[4px] w-1 h-1 bg-ubc-slate rounded-full" />
          </div>
        );
      case "cyto":
        return <img src="/images/cyto.svg" alt="" className="w-6 h-6" />;
      case "assembly":
        return (
          <div className="relative w-6 h-6">
            <div className="absolute inset-0 border border-ubc-mint/60 rounded-md" />
            <div className="absolute top-1/4 right-1/4 w-3 h-3 border border-ubc-slate/60" />
            <div className="absolute bottom-1/4 left-1/4 w-2 h-2 bg-ubc-mint/20" />
            <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-ubc-mint rounded-full -translate-x-1/2 -translate-y-1/2" />
          </div>
        );
      case "testing":
        return (
          <svg
            viewBox="0 0 24 24"
            className="w-6 h-6 text-ubc-slate"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M2 3h20v4H2zM4 7v10M20 7v10M2 17h20v4H2z" />
            <path d="M9 11h6M9 14h6" strokeWidth="1" />
          </svg>
        );
      case "workshop":
        return (
          <div className="relative w-6 h-6">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-4 h-4 border border-ubc-mint/60 rotate-45" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-3 h-3 bg-ubc-slate/20 -rotate-12" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-ubc-mint rounded-full" />
            </div>
          </div>
        );
      case "manufacturing":
        return (
          <svg
            viewBox="0 0 24 24"
            className="w-6 h-6 text-ubc-slate"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <rect x="2" y="2" width="20" height="8" rx="1" />
            <rect x="2" y="14" width="20" height="8" rx="1" />
            <path d="M6 6h.01M6 18h.01M12 6h6M12 18h6" strokeWidth="1.5" />
          </svg>
        );
      case "equipment":
        return (
          <div className="relative w-6 h-6">
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-ubc-mint/60" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-ubc-mint/60" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-ubc-mint/60" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-ubc-mint/60" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-4 h-4 bg-ubc-slate/40 rounded-full" />
            </div>
          </div>
        );
      case "integration":
        return (
          <div className="relative w-6 h-6">
            <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-1">
              <div className="border border-ubc-mint/60" />
              <div className="border border-ubc-slate/60" />
              <div className="border border-ubc-slate/60" />
              <div className="border border-ubc-mint/60" />
            </div>
          </div>
        );
      case "programs":
        return (
          <svg
            viewBox="0 0 24 24"
            className="w-6 h-6 text-ubc-mint"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        );
      default:
        return <div className="w-6 h-6 bg-ubc-slate/20 rounded-full" />;
    }
  };

  /* 4. Render ───────────────────────────────────────────── */
  return (
    <section
      ref={containerRef}
      id="capabilities"
      className="relative overflow-hidden bg-ubc-blue/80 pt-10 pb-4"
    >
      {/* ── Parallax background ──────────────────────────── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="parallax-element absolute -left-32 -top-32 w-96 h-96 rounded-full bg-ubc-slate/5 blur-3xl" />
        <div className="parallax-element absolute -right-48 top-1/2 w-96 h-96 rounded-full bg-ubc-mint/5 blur-3xl" />
        <div className="parallax-element absolute left-1/4 -bottom-48 w-96 h-96 rounded-full bg-ubc-slate/5 blur-3xl" />
        {/* extra circuit lines */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute left-10 top-20 w-20 h-20 border border-ubc-mint/30 rounded-full" />
          <div className="absolute right-20 bottom-40 w-32 h-32 border border-ubc-slate/30 rotate-45" />
          <div className="absolute left-1/3 top-1/3 w-16 h-16 border-2 border-ubc-mint/20" />
          <div className="absolute right-1/4 top-1/4 w-24 h-1 bg-ubc-slate/30" />
          <div className="absolute left-2/3 bottom-1/3 w-1 h-24 bg-ubc-mint/30" />
        </div>
      </div>

      {/* ── Foreground content ───────────────────────────── */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 pb-20">
        {/* Heading */}
        <div className="mb-8 flex flex-col items-center">
          <div className="relative inline-block">
            <h2 className="mb-2 text-4xl font-bold text-ubc-mint md:text-6xl">
              Our Projects
            </h2>
            <div className="absolute -left-4 -right-4 bottom-0 h-px bg-gradient-to-r from-transparent via-ubc-slate to-transparent" />
          </div>
          <p className="mt-6 max-w-2xl text-center text-xl text-ubc-mint/80">
            Our immediate priority is to bring up all the tools necessary to run
            a self-sufficient microfab. As such, active and future projects in
            the short term focus on cost-efficient, commercial-off-the-shelf
            designs for reproducible fabrication tools.
          </p>
        </div>

        {/* Tabs */}
        <Tabs
          defaultValue="current"
          className="w-full"
          onValueChange={setActiveTab}
        >
          {/* list wrapper */}
          <div className="mb-12 flex justify-center px-4">
            <TabsList
              className="
                inline-flex items-stretch flex-wrap gap-2      /* stretch children */
                rounded-md bg-ubc-blue/30 border border-ubc-slate/20
                px-1                                           /* horiz‑padding only */
              "
            >
              {/* Current */}
              <TabsTrigger
                value="current"
                className={`
                  flex items-center justify-center h-full text-center /* centre */
                  whitespace-nowrap
                  px-3  py-2  text-sm
                  sm:px-5 sm:py-2.5 sm:text-base
                  md:px-8 md:py-3   md:text-lg
                  leading-tight
                  transition-all duration-300
                  ${
                    activeTab === "current"
                      ? "text-ubc-blue bg-ubc-mint rounded-sm"
                      : "text-ubc-mint/70 hover:text-ubc-mint"
                  }
                `}
              >
                Current&nbsp;Projects
              </TabsTrigger>

              {/* Future */}
              <TabsTrigger
                value="future"
                className={`
                  flex items-center justify-center h-full text-center
                  whitespace-nowrap
                  px-3  py-2  text-sm
                  sm:px-5 sm:py-2.5 sm:text-base
                  md:px-8 md:py-3   md:text-lg
                  leading-tight
                  transition-all duration-300
                  ${
                    activeTab === "future"
                      ? "text-ubc-blue bg-ubc-mint rounded-sm"
                      : "text-ubc-mint/70 hover:text-ubc-mint"
                  }
                `}
              >
                Future&nbsp;Projects
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Panels */}
          <TabsContent value="current">
            <div className="columns-1 gap-8 md:columns-2">
              {currentCapabilities.map(renderCapability)}
            </div>
          </TabsContent>

          <TabsContent value="future">
            <div className="columns-1 gap-8 md:columns-2">
              {futureCapabilities.map(renderCapability)}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default CapabilitiesSection;
