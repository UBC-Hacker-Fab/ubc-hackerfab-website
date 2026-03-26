import React, { useEffect, useRef } from "react";
import { CircuitIcon } from "./icons/CircuitIcon";
import { ArrowDown, Cpu, CircuitBoard } from "lucide-react";

const HeroSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Circuit board animation
    const gridSize = 40;
    const nodeSize = 2;
    const nodeChance = 0.3;
    const tracesPerNode = 2;
    const traceLength = 6;
    const speed = 0.25;

    // Grid of nodes
    interface Node {
      x: number;
      y: number;
      traces: Trace[];
      active: boolean;
      pulseRadius: number;
      pulseAlpha: number;
      activationTime: number;
    }

    interface Trace {
      dirX: number;
      dirY: number;
      progress: number;
      active: boolean;
      width: number;
      color: string;
      next: Node | null;
    }

    // Create grid
    const grid: Node[] = [];
    for (let y = 0; y < Math.ceil(canvas.height / gridSize) + 1; y++) {
      for (let x = 0; x < Math.ceil(canvas.width / gridSize) + 1; x++) {
        if (Math.random() < nodeChance) {
          grid.push({
            x: x * gridSize,
            y: y * gridSize,
            traces: [],
            active: false,
            pulseRadius: 0,
            pulseAlpha: 0,
            activationTime: 0,
          });
        }
      }
    }

    // Create traces
    grid.forEach((node) => {
      for (let i = 0; i < Math.floor(Math.random() * tracesPerNode) + 1; i++) {
        const dirs = [
          { x: 1, y: 0 },
          { x: 0, y: 1 },
          { x: -1, y: 0 },
          { x: 0, y: -1 },
        ];

        // Pick a random direction
        const dirIndex = Math.floor(Math.random() * dirs.length);
        const dir = dirs[dirIndex];

        // Try to find next node in that direction
        const targetX = node.x + dir.x * gridSize;
        const targetY = node.y + dir.y * gridSize;
        const nextNode = grid.find((n) => n.x === targetX && n.y === targetY);

        node.traces.push({
          dirX: dir.x,
          dirY: dir.y,
          progress: 0,
          active: false,
          width: Math.random() * 1 + 0.5,
          color: Math.random() > 0.7 ? "#F4FFF8" : "#8BAAAD",
          next: nextNode || null,
        });
      }
    });

    // Activate random nodes periodically
    const activateRandomNode = () => {
      const inactiveNodes = grid.filter((node) => !node.active);
      if (inactiveNodes.length > 0) {
        const randomNode =
          inactiveNodes[Math.floor(Math.random() * inactiveNodes.length)];
        randomNode.active = true;
        randomNode.activationTime = performance.now();
      }

      setTimeout(activateRandomNode, Math.random() * 500 + 500);
    };

    // Start the activation loop
    activateRandomNode();

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const currentTime = performance.now();

      // Draw nodes and traces
      grid.forEach((node) => {
        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, nodeSize, 0, Math.PI * 2);
        ctx.fillStyle = node.active ? "#F4FFF8" : "#8BAAAD80";
        ctx.fill();

        // If node is active, create a pulse
        if (node.active) {
          // How long has this node been active
          const timeSinceActivation = currentTime - node.activationTime;

          // Pulse expands and fades
          node.pulseRadius = Math.min(timeSinceActivation / 10, gridSize / 2);
          node.pulseAlpha = Math.max(0, 1 - timeSinceActivation / 1000);

          // Draw pulse
          if (node.pulseAlpha > 0) {
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.pulseRadius, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(244, 255, 248, ${node.pulseAlpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }

          // Activate traces
          node.traces.forEach((trace) => {
            if (!trace.active && Math.random() < 0.1) {
              trace.active = true;
              trace.progress = 0;
            }
          });

          // Deactivate node after some time
          if (timeSinceActivation > 2000) {
            node.active = false;
          }
        }

        // Draw and update traces
        node.traces.forEach((trace) => {
          if (trace.active) {
            const startX = node.x;
            const startY = node.y;
            const currentLength = trace.progress * gridSize;
            const endX = startX + trace.dirX * currentLength;
            const endY = startY + trace.dirY * currentLength;

            // Draw trace
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.strokeStyle = trace.color;
            ctx.lineWidth = trace.width;
            ctx.stroke();

            // Update trace progress
            trace.progress += speed / 100;

            // If trace reaches end, activate next node
            if (trace.progress >= 1) {
              trace.active = false;
              trace.progress = 0;

              if (trace.next) {
                trace.next.active = true;
                trace.next.activationTime = currentTime;
              }
            }
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className="relative h-screen overflow-hidden flex items-center justify-center">
      {/* Circuit board animation background */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-ubc-slate/5 rounded-bl-[60%] blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-ubc-mint/5 rounded-tr-[70%] blur-[80px]"></div>
      </div>

      <div className="relative z-10 max-w-5xl px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Main title and logo */}
          <div className="md:col-span-8 text-left transform -rotate-3">
            <div className="flex items-center mb-4">
              <CircuitIcon className="w-12 h-12 md:w-16 md:h-16 text-ubc-slate mr-4 animate-pulse-slow" />
              <div className="flex flex-col">
                <span className="text-xs md:text-base text-ubc-mint tracking-widest">
                  UNIVERSITY OF BRITISH COLUMBIA'S
                </span>
                <div className="h-0.5 w-full bg-ubc-slate/50"></div>
              </div>
            </div>

            <h1 className="text-5xl md:text-9xl font-bold tracking-tighter text-ubc-mint">
              HACKER<span className="text-ubc-slate relative">FAB</span>
            </h1>

            <p className="text-lg md:text-2xl text-ubc-mint/90 mt-6 ml-1 max-w-xl">
              Student-run micro-fabrication team making chips{" "}
              <span className="relative inline-block">
                from scratch.
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-ubc-slate"></span>
              </span>
            </p>
          </div>

          {/* Electronic elements visualization */}
          <div className="md:col-span-4 hidden md:flex justify-center items-center">
            <div className="circuit-board-visualization relative w-60 h-60">
              {/* Animated circuit lines */}
              <div className="absolute w-40 h-40 border-2 border-ubc-slate/40 rotate-45 animate-pulse-slow"></div>
              <div
                className="absolute w-60 h-60 border border-ubc-mint/30 animate-float"
                style={{ animationDelay: "1s" }}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-ubc-blue border border-ubc-slate flex items-center justify-center rounded-full">
                  <div className="w-12 h-12 bg-ubc-slate/20 rounded-full flex items-center justify-center animate-pulse-slow">
                    <div className="w-4 h-4 bg-ubc-mint rounded-full"></div>
                  </div>
                </div>
              </div>
              {/* Circuit traces */}
              <div className="absolute top-1/2 right-0 w-20 h-0.5 bg-ubc-slate/60"></div>
              <div className="absolute bottom-0 left-1/2 w-0.5 h-20 bg-ubc-mint/60"></div>
              <div className="absolute top-0 left-1/2 w-0.5 h-10 bg-ubc-slate/60"></div>
            </div>
          </div>
        </div>

        {/* CTA buttons with unusual layout */}
        <div className="mt-16 flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-8">
          <a
            href="#mission"
            className="group relative px-8 py-4 bg-transparent border-2 border-ubc-slate text-ubc-mint font-medium hover:bg-ubc-slate/10 transition-all overflow-hidden"
          >
            <span className="relative z-10 flex items-center group-hover:text-ubc-slate transition-colors">
              Explore Our Mission
              <span className="ml-2 transform group-hover:translate-x-1 transition-transform">
                →
              </span>
            </span>
            <div className="absolute bottom-0 left-0 w-full h-0 bg-ubc-mint group-hover:h-full transition-all duration-300 ease-out z-0"></div>
          </a>
          <a
            href="#interest"
            className="group relative px-8 py-4 bg-ubc-slate text-ubc-blue font-medium overflow-hidden"
          >
            <span className="relative z-10">Join The Team</span>
            <div className="absolute inset-0 bg-gradient-to-r from-ubc-slate via-ubc-mint to-ubc-slate bg-[length:200%] animate-gradient-x"></div>
          </a>
          <a
            href="https://drive.google.com/file/d/1WgmCLoYm5EDYS1e3wlb4RfmbcvPqEoHe/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-8 py-4 border-2 border-ubc-mint/60 text-ubc-mint font-medium hover:bg-ubc-mint/10 transition-all"
          >
            <span className="relative z-10 flex items-center">
              View Research Poster
              <span className="ml-2 transform group-hover:translate-x-1 transition-transform">
                ↗
              </span>
            </span>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 inset-x-0 flex flex-col items-center justify-center animate-bounce">
        <ArrowDown className="w-6 h-6 text-ubc-mint/70" />
        <span className="text-xs text-ubc-mint/50 mt-2 tracking-widest">
          SCROLL
        </span>
      </div>
    </section>
  );
};

export default HeroSection;
