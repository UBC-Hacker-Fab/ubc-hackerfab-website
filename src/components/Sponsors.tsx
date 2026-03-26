import React, { useEffect, useRef, useState } from "react";

/**
 * SponsorSection v5 – tile now sizes itself to the intrinsic dimensions of the
 * logo inside it.  We drop the fixed `w-28` on the <img> tag and instead keep a
 * max‑height while letting the width grow/shrink naturally.  The surrounding
 * anchor is switched to `inline-block` so its border hugs the logo + padding.
 */

interface Sponsor {
  name: string;
  url: string;
  logoSrc: string;
}

const sponsors: Sponsor[] = [
  {
    name: "Emergent Ventures",
    url: "https://www.mercatus.org/emergent-ventures",
    logoSrc: "/images/EV.png",
  },
  {
    name: "CMU Hacker Fab",
    url: "https://hackerfab.ece.cmu.edu/",
    logoSrc: "/images/HF.png",
  },
  {
    name: "1517",
    url: "https://www.1517fund.com/",
    logoSrc: "/images/1517.jpg",
  },
  {
    name: "UBC MURC",
    url: "https://students.ubc.ca/career/events-workshops/multidisciplinary-undergraduate-research-conference/",
    logoSrc: "/images/ubc_murc.jpg",
  },
  {
    name: "UBC SBME",
    url: "https://bme.ubc.ca/",
    logoSrc: "/images/ubc_sbme.jpg",
  },
  // Add more sponsors here …
];

const SponsorTile: React.FC<{ sponsor: Sponsor }> = ({ sponsor }) => {
  const tileRef = useRef<HTMLAnchorElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  // Simple magnetic hover effect (unchanged)
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!tileRef.current) return;
      const rect = tileRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxMove = 10;
      if (dist < 300) {
        const f = 1 - Math.min(dist / 300, 1);
        setPos({ x: (dx / 300) * maxMove * f, y: (dy / 300) * maxMove * f });
      } else {
        setPos({ x: 0, y: 0 });
      }
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <a
      ref={tileRef}
      href={sponsor.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative inline-block p-6 rounded-lg border border-ubc-slate/30 backdrop-blur-sm bg-[#001a38] shadow-[0_4px_20px_-10px_rgba(139,170,173,0.4)] transition-transform duration-200 ease-out"
      style={{
        transform: `perspective(600px) rotateX(${pos.y * 0.1}deg) rotateY(${-pos.x * 0.1}deg) translateX(${pos.x * 0.3}px) translateY(${pos.y * 0.3}px)`,
      }}
    >
      {/* decorative corner accents */}
      <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-ubc-mint/40 pointer-events-none" />
      <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-ubc-mint/40 pointer-events-none" />

      {/* logo scales on hover but now keeps natural width */}
      <img
        src={sponsor.logoSrc}
        alt={`${sponsor.name} logo`}
        className="h-16 md:h-20 lg:h-24 w-auto object-contain mx-auto transition-transform duration-200 group-hover:scale-105"
        loading="lazy"
      />
    </a>
  );
};

const SponsorSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries[0].isIntersecting && setVisible(true),
      { threshold: 0.2 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => sectionRef.current && observer.disconnect();
  }, []);

  return (
    <section
      id="sponsors"
      className="pt-32 pb-16 px-6 relative overflow-hidden"
    >
      {/* Decorative background (unchanged) */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-full h-full">
          <svg
            className="w-full h-full opacity-5"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <pattern
                id="grid"
                width="8"
                height="8"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 8 0 L 0 0 0 8"
                  fill="none"
                  stroke="#8BAAAD"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect x="0" y="0" width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-32 opacity-10">
          <svg viewBox="0 0 1200 100" preserveAspectRatio="none">
            <path
              d="M0,0 L50,0 C70,0 70,20 90,20 L200,20 C220,20 220,40 240,40 L600,40 C620,40 620,20 640,20 L800,20 C820,20 820,50 840,50 L1200,50"
              stroke="#F4FFF8"
              strokeWidth="1"
              fill="none"
            />
            <circle cx="240" cy="40" r="4" fill="#8BAAAD" />
            <circle cx="640" cy="20" r="4" fill="#8BAAAD" />
            <circle cx="840" cy="50" r="4" fill="#8BAAAD" />
          </svg>
        </div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10" ref={sectionRef}>
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-3 text-ubc-mint inline-block relative">
            Supported by
            <div className="absolute left-0 right-0 h-px bottom-0 bg-ubc-slate" />
          </h2>
        </div>

        <div
          className={`max-w-4xl mx-auto transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}
        >
          {/* Flexbox: centers partial rows */}
          <div className="flex flex-wrap justify-center gap-12">
            {sponsors.map((s) => (
              <SponsorTile key={s.name} sponsor={s} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SponsorSection;
