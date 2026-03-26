import React, { useEffect, useRef } from "react";

const images = [
  "/images/1.png",
  // "/images/2.png",
  // "/images/3.jpeg",
  // "/images/4.jpeg",
  // "/images/5.jpeg",
  "/images/6.png",
  "/images/Bfield.png",
  "/images/cement_baking.jpg",
  "/images/software_diagram.png",
  "/images/uv_led.jpg",
];

const MissionSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const carouselViewportRef = useRef<HTMLDivElement>(null);
  const carouselTrackRef = useRef<HTMLDivElement>(null);
  const carouselDragOffsetRef = useRef<HTMLDivElement>(null);

  /* ---------------- scroll‑in animation (unchanged) ---------------- */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("appear");
        }),
      { threshold: 0.1 },
    );

    const section = sectionRef.current;
    if (section) {
      section
        .querySelectorAll(".animate-on-scroll")
        .forEach((el) => observer.observe(el));
    }
    return () => observer.disconnect();
  }, []);

  /* ---------------- draggable carousel ---------------- */
  useEffect(() => {
    const viewport = carouselViewportRef.current;
    const track = carouselTrackRef.current;
    const dragOffsetLayer = carouselDragOffsetRef.current;
    if (!viewport || !track || !dragOffsetLayer) return;

    let isDragging = false;
    let activePointerId: number | null = null;
    let startX = 0;
    let startOffset = 0;
    let currentOffset = 0;

    const getCycleWidth = () => {
      const gapValue = window.getComputedStyle(track).columnGap;
      const gap = Number.parseFloat(gapValue) || 0;
      return track.scrollWidth / 2 + gap / 2;
    };

    const wrapOffset = (value: number) => {
      const cycleWidth = getCycleWidth();
      if (!Number.isFinite(cycleWidth) || cycleWidth <= 0) return value;

      let wrapped = value;
      while (wrapped <= -cycleWidth) wrapped += cycleWidth;
      while (wrapped > 0) wrapped -= cycleWidth;
      return wrapped;
    };

    const setOffset = (value: number) => {
      const wrapped = wrapOffset(value);
      currentOffset = wrapped;
      dragOffsetLayer.style.transform = `translate3d(${wrapped}px, 0, 0)`;
    };

    const endDrag = () => {
      if (!isDragging) return;
      isDragging = false;
      activePointerId = null;
      track.style.animationPlayState = "running";
      viewport.classList.remove("cursor-grabbing");
      viewport.classList.add("cursor-grab");
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (event.button !== 0) return;
      isDragging = true;
      activePointerId = event.pointerId;
      startX = event.clientX;
      startOffset = currentOffset;
      track.style.animationPlayState = "paused";
      viewport.classList.remove("cursor-grab");
      viewport.classList.add("cursor-grabbing");
      viewport.setPointerCapture(event.pointerId);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!isDragging || activePointerId !== event.pointerId) return;
      const delta = event.clientX - startX;
      setOffset(startOffset + delta);
    };

    const handlePointerUp = (event: PointerEvent) => {
      if (activePointerId !== event.pointerId) return;
      if (viewport.hasPointerCapture(event.pointerId)) {
        viewport.releasePointerCapture(event.pointerId);
      }
      endDrag();
    };

    const handlePointerCancel = () => endDrag();

    viewport.addEventListener("pointerdown", handlePointerDown);
    viewport.addEventListener("pointermove", handlePointerMove);
    viewport.addEventListener("pointerup", handlePointerUp);
    viewport.addEventListener("pointercancel", handlePointerCancel);
    window.addEventListener("pointerup", handlePointerCancel);

    return () => {
      viewport.removeEventListener("pointerdown", handlePointerDown);
      viewport.removeEventListener("pointermove", handlePointerMove);
      viewport.removeEventListener("pointerup", handlePointerUp);
      viewport.removeEventListener("pointercancel", handlePointerCancel);
      window.removeEventListener("pointerup", handlePointerCancel);
    };
  }, []);

  /* ---------------- JSX ---------------- */
  return (
    <section
      id="mission"
      ref={sectionRef}
      className="relative overflow-hidden py-24"
    >
      {/* decorative background */}
      <div className="absolute inset-0 z-0">
        <svg
          className="absolute left-0 top-0 h-full w-32 text-ubc-slate/5"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path d="M0,0 L100,0 L50,100 L0,100 Z" fill="currentColor" />
        </svg>
        <svg
          className="absolute right-0 bottom-0 h-full w-48 text-ubc-mint/5"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path d="M100,0 L100,100 L0,100 Z" fill="currentColor" />
        </svg>
        <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-ubc-slate/5 blur-3xl"></div>
        <div className="absolute -bottom-32 -left-16 h-72 w-72 rounded-full bg-ubc-blue/20 blur-3xl"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-8">
        <div className="animate-on-scroll mb-30 translate-y-10 text-center opacity-0 duration-1000">
          <div className="mb-6 flex items-center justify-center">
            <div className="h-px w-12 bg-ubc-slate" />
            <h2 className="mx-4 text-4xl font-bold text-ubc-mint md:text-6xl">
              Our Mission
            </h2>
            <div className="h-px w-12 bg-ubc-slate" />
          </div>

          <div className="mx-auto max-w-3xl">
            <p className="text-lg md:text-xl leading-relaxed text-ubc-mint/90">
              We are a group of UBC students exploring chip fabrication by
              making everything needed to go from silicon to transistor from the
              ground up. Our team is interested in not only developing the tools
              needed to make microscale devices, but eventually support an
              ecosystem of chip projects that are replicable and open to all.
            </p>
          </div>
        </div>

        {/* -------- image carousel -------- */}
        <div
          className="
          animate-on-scroll relative mt-16 mb-8
          left-1/2 right-1/2 -mx-[50vw] w-screen
          translate-y-10 opacity-0 duration-1000
        "
        >
          <div
            ref={carouselViewportRef}
            className="relative overflow-hidden cursor-grab select-none"
            style={{ touchAction: "pan-y" }}
          >
            <div ref={carouselDragOffsetRef}>
              <div
                ref={carouselTrackRef}
                className="flex w-max gap-4 animate-[mission-marquee_28s_linear_infinite]"
              >
                {[...images, ...images].map((src, i) => (
                  <img
                    key={`${src}-${i}`}
                    src={src}
                    alt={`mission-${(i % images.length) + 1}`}
                    className="h-56 w-[70vw] max-w-[540px] flex-none rounded-2xl object-cover object-center shadow-lg sm:h-64 md:h-72"
                    loading="lazy"
                    draggable={false}
                  />
                ))}
              </div>
            </div>
          </div>

          <style>{`
            @keyframes mission-marquee {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(calc(-50% - 0.5rem));
              }
            }
          `}</style>
        </div>
        {/* -------- /image carousel -------- */}
      </div>
    </section>
  );
};

export default MissionSection;
