import React, { useEffect, useState } from 'react';

/**
 * TranslucentStudioBackdrop
 * 
 * Generative translucent design studio background with soft ambient depth,
 * frosted glass reflections, subtle refractive lighting caustics, and architectural lines
 * inspired by Apple's minimalist keynote & product showcase environments (apple.com/la).
 */
export function TranslucentStudioBackdrop() {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.3 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Subtle parallax response
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none">
      {/* 1. Generative Studio Ambient Glows (Translucent, breathing) */}
      <div
        className="absolute w-[680px] h-[680px] rounded-full blur-[140px] opacity-40 dark:opacity-20 transition-transform duration-1000 ease-out"
        style={{
          top: '-15%',
          right: '5%',
          background: 'radial-gradient(circle, rgba(230, 200, 160, 0.45) 0%, rgba(240, 180, 200, 0.25) 45%, transparent 70%)',
          transform: `translate(${(mousePos.x - 0.5) * 40}px, ${(mousePos.y - 0.5) * 40}px)`,
        }}
      />

      <div
        className="absolute w-[720px] h-[720px] rounded-full blur-[150px] opacity-35 dark:opacity-20 transition-transform duration-1000 ease-out"
        style={{
          top: '35%',
          left: '-15%',
          background: 'radial-gradient(circle, rgba(160, 200, 255, 0.4) 0%, rgba(180, 240, 220, 0.2) 50%, transparent 75%)',
          transform: `translate(${(0.5 - mousePos.x) * 45}px, ${(0.5 - mousePos.y) * 45}px)`,
        }}
      />

      <div
        className="absolute w-[600px] h-[600px] rounded-full blur-[130px] opacity-30 dark:opacity-15 transition-transform duration-1000 ease-out"
        style={{
          bottom: '-10%',
          right: '25%',
          background: 'radial-gradient(circle, rgba(210, 180, 240, 0.35) 0%, rgba(255, 210, 190, 0.2) 50%, transparent 75%)',
          transform: `translate(${(mousePos.x - 0.5) * 30}px, ${(mousePos.y - 0.5) * 30}px)`,
        }}
      />

      {/* 2. Abstract Generative Frosted Glass Sculptural Shapes (SVG with transparency & blur) */}
      <svg
        className="absolute top-1/4 right-[8%] w-[420px] h-[420px] opacity-25 dark:opacity-15"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="glassGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#d1d5db" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#9ca3af" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="glassStroke1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.0" />
          </linearGradient>
        </defs>
        {/* Generative Floating Lens / Prism */}
        <circle
          cx="200"
          cy="200"
          r="160"
          fill="url(#glassGrad1)"
          stroke="url(#glassStroke1)"
          strokeWidth="1.5"
          className="backdrop-blur-sm"
        />
        <ellipse
          cx="200"
          cy="180"
          rx="120"
          ry="60"
          stroke="url(#glassStroke1)"
          strokeWidth="1"
          opacity="0.6"
        />
        <path
          d="M100 240 C 150 200, 250 200, 300 240"
          stroke="url(#glassStroke1)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          opacity="0.5"
        />
      </svg>

      {/* 3. Subtle Creative Studio Drafting Lines (Apple-grade precision) */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.04] dark:opacity-[0.06]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="studioGrid" width="64" height="64" patternUnits="userSpaceOnUse">
            <path d="M 64 0 L 0 0 0 64" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#studioGrid)" />
      </svg>

      {/* 4. Fine Vertical Architectural Dividers */}
      <div className="absolute top-0 left-[15%] w-px h-full bg-gradient-to-b from-transparent via-neutral-200/50 dark:via-neutral-800/50 to-transparent" />
      <div className="absolute top-0 right-[15%] w-px h-full bg-gradient-to-b from-transparent via-neutral-200/50 dark:via-neutral-800/50 to-transparent" />
      <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-neutral-200/30 dark:via-neutral-800/30 to-transparent" />
    </div>
  );
}
