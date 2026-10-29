import React, { useEffect, useState, useRef } from 'react';

/**
 * ChromaticFluidBackdrop
 * 
 * A vibrant, dynamic fluid animated background with rich colors and organic motion.
 * Strictly pinned to the background (-z-10, pointer-events-none) so it NEVER
 * overlaps or obscures any page content, while shining through frosted glass surfaces.
 */
export function ChromaticFluidBackdrop() {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setMouseOffset({ x: 0, y: 0 });
      return;
    }

    let animationFrameId: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      // Calculate normalized mouse offset from center (-1 to 1)
      targetX = (e.clientX / window.innerWidth - 0.5) * 60;
      targetY = (e.clientY / window.innerHeight - 0.5) * 60;
    };

    const updatePhysics = () => {
      // Smooth lerp easing
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;
      setMouseOffset({ x: currentX, y: currentY });
      animationFrameId = requestAnimationFrame(updatePhysics);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    animationFrameId = requestAnimationFrame(updatePhysics);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none"
    >
      {/* 1. Base luminous canvas wash */}
      <div className="absolute inset-0 bg-white/75 dark:bg-black/85 backdrop-blur-[100px] transition-colors duration-500 z-10" />

      {/* 2. Primary Vibrant Chromatic Orbs with Organic Movement */}
      <div
        className="absolute inset-0 transition-transform duration-300 ease-out"
        style={{
          transform: `translate(${mouseOffset.x}px, ${mouseOffset.y}px)`,
        }}
      >
        {/* Orb 1: Radiant Magenta & Royal Purple (Top Right) */}
        <div
          className="absolute -top-[10%] -right-[5%] w-[650px] sm:w-[850px] h-[650px] sm:h-[850px] rounded-full blur-[90px] sm:blur-[120px] opacity-75 dark:opacity-65 animate-fluid-1"
          style={{
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.75) 0%, rgba(217, 70, 239, 0.6) 35%, rgba(124, 58, 237, 0.3) 65%, transparent 80%)',
          }}
        />

        {/* Orb 2: Electric Azure & Vivid Cyan (Mid Left / Center) */}
        <div
          className="absolute top-[25%] -left-[10%] w-[600px] sm:w-[800px] h-[600px] sm:h-[800px] rounded-full blur-[80px] sm:blur-[110px] opacity-70 dark:opacity-60 animate-fluid-2"
          style={{
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.75) 0%, rgba(37, 99, 235, 0.6) 40%, rgba(14, 165, 233, 0.25) 70%, transparent 80%)',
          }}
        />

        {/* Orb 3: Warm Solar Amber, Tangerine & Coral (Bottom Center / Right) */}
        <div
          className="absolute -bottom-[15%] right-[15%] w-[600px] sm:w-[750px] h-[600px] sm:h-[750px] rounded-full blur-[90px] sm:blur-[130px] opacity-70 dark:opacity-60 animate-fluid-3"
          style={{
            background: 'radial-gradient(circle, rgba(249, 115, 22, 0.8) 0%, rgba(244, 63, 94, 0.55) 40%, rgba(251, 191, 36, 0.25) 70%, transparent 85%)',
          }}
        />

        {/* Orb 4: Emerald Caustic & Spring Turquoise Accent (Center / Deep) */}
        <div
          className="absolute top-[50%] left-[30%] w-[500px] sm:w-[650px] h-[500px] sm:h-[650px] rounded-full blur-[85px] sm:blur-[120px] opacity-55 dark:opacity-45 animate-fluid-4"
          style={{
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.65) 0%, rgba(6, 182, 212, 0.45) 45%, rgba(59, 130, 246, 0.2) 75%, transparent 85%)',
          }}
        />

        {/* Orb 5: High-intensity Violet-Rose Core (Center Top) */}
        <div
          className="absolute top-[5%] left-[25%] w-[450px] h-[450px] rounded-full blur-[70px] sm:blur-[100px] opacity-50 dark:opacity-40 animate-fluid-2"
          style={{
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.7) 0%, rgba(139, 92, 246, 0.45) 50%, transparent 75%)',
          }}
        />
      </div>

      {/* 3. Subtle Animated Chromatic Waves / Prismatic Caustic Overlay */}
      <svg
        className="absolute inset-0 w-full h-full opacity-30 dark:opacity-20 z-10 mix-blend-overlay"
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="fluidWaveGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        <path
          d="M0,300 C320,150 420,450 720,280 C1020,110 1120,400 1440,250 L1440,900 L0,900 Z"
          fill="url(#fluidWaveGrad1)"
          className="animate-fluid-1"
        />
      </svg>

      {/* 4. Fine Spatial Architectural Drafting Grid (Apple-grade precision) */}
      <div className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04] bg-[radial-gradient(#000_1px,transparent_1px)] dark:bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:32px_32px] z-20 pointer-events-none" />

      {/* 5. Delicate Architectural Light Guides */}
      <div className="absolute top-0 left-[20%] w-px h-full bg-gradient-to-b from-transparent via-neutral-300/30 dark:via-white/10 to-transparent z-20 pointer-events-none" />
      <div className="absolute top-0 right-[20%] w-px h-full bg-gradient-to-b from-transparent via-neutral-300/30 dark:via-white/10 to-transparent z-20 pointer-events-none" />
    </div>
  );
}
