import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from '../context/RouterContext';
import { useTheme } from '../context/ThemeContext';

export interface PacmanHeroProps {
  onScrollToPortfolio?: () => void;
}

interface LetterRevealCharProps {
  char: string;
  index: number;
  total: number;
  scrollYProgress: any;
  prefersReduced: boolean | null;
}

function LetterRevealChar({
  char,
  index,
  total,
  scrollYProgress,
  prefersReduced,
}: LetterRevealCharProps) {
  // Stagger start points between 0.32 and 0.60, each letter resolving over a 0.12 progress slice
  const start = 0.32 + (index / total) * 0.26;
  const end = Math.min(0.72, start + 0.12);

  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
  const blurVal = useTransform(scrollYProgress, [start, end], [16, 0]);
  const filter = useTransform(blurVal, (v) => (v <= 0.2 ? 'none' : `blur(${v.toFixed(1)}px)`));
  const y = useTransform(scrollYProgress, [start, end], [14, 0]);

  if (prefersReduced) {
    return <span className="inline-block">{char}</span>;
  }

  return (
    <motion.span
      style={{
        opacity,
        filter,
        y,
        willChange: 'opacity, filter, transform',
      }}
      className="inline-block"
    >
      {char}
    </motion.span>
  );
}

// 3D Particle Interface for Google Antigravity-style floating pellets
interface Particle3D {
  x: number;
  y: number;
  z: number;
  origX: number;
  origY: number;
  baseRadius: number;
  alpha: number;
  vx: number;
  vy: number;
  vz: number;
}

export function PacmanHero({ onScrollToPortfolio }: PacmanHeroProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const isDarkRef = useRef(isDark);
  useEffect(() => {
    isDarkRef.current = isDark;
  }, [isDark]);

  const containerRef = useRef<HTMLDivElement>(null);
  const stickyViewportRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nameHeaderRef = useRef<HTMLHeadingElement>(null);

  const mousePosRef = useRef<{ x: number; y: number } | null>(null);
  const prefersReduced = useReducedMotion();

  // Screen width tracking for responsive pill morph calculations
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Optical circle size matched to the typography height across breakpoints
  const circleSize =
    windowWidth < 640
      ? 56
      : windowWidth < 768
      ? 76
      : windowWidth < 1024
      ? 96
      : windowWidth < 1440
      ? 124
      : 144;

  const pillTargetWidth = Math.min(windowWidth * 0.90, 1340);

  // Scroll tracking across the pinned track
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // =========================================================================
  // 1. INTRO PILL MORPH ANIMATION STATE MACHINE
  // - 'circle': Smooth spring pop of a centered white circle
  // - 'pill': Circle stretches horizontally into an elongated pill badge
  // - 'revealed': Pill transforms into the display name "ALEJANDRO RIVERA"
  // - 'done': Settled into the scrollable hero state
  // =========================================================================
  const [pillPhase, setPillPhase] = useState<'circle' | 'pill' | 'revealed' | 'done'>('circle');

  useEffect(() => {
    if (prefersReduced) {
      setPillPhase('done');
      return;
    }

    setPillPhase('circle');

    // Step 1 -> 2: Flat white circle stretches horizontally into a pill; name is born directly from the expansion
    const t1 = window.setTimeout(() => {
      setPillPhase('pill');
    }, 500);

    // Step 2 -> 3: The pill opens up vertically and dissolves into the name
    const t2 = window.setTimeout(() => {
      setPillPhase('revealed');
    }, 1250);

    // Step 3 -> 4: Done, pill completely unmounted, only the name appears
    const t3 = window.setTimeout(() => {
      setPillPhase('done');
    }, 1750);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, [prefersReduced]);

  // =========================================================================
  // 2. SCROLL DRIVEN ANIMATIONS
  // =========================================================================
  // The giant title "ALEJANDRO RIVERA" dissolves & blurs away on scroll down
  const nameOpacity = useTransform(scrollYProgress, [0, 0.24], [1, 0]);
  const nameBlur = useTransform(scrollYProgress, [0, 0.24], [0, 28]);
  const nameFilter = useTransform(nameBlur, (v) => (v <= 0.2 ? 'none' : `blur(${v.toFixed(1)}px)`));
  const nameY = useTransform(scrollYProgress, [0, 0.24], [0, -48]);
  const nameScale = useTransform(scrollYProgress, [0, 0.24], [1, 1.05]);
  const namePointerEvents = useTransform(scrollYProgress, (v) => (v < 0.2 ? 'auto' : 'none'));

  // Background 3D Antigravity pellet space dims slightly to 0.40 as text enters for APCA contrast
  const canvasOpacity = useTransform(scrollYProgress, [0.20, 0.40], [1, 0.42]);

  // Informational headline, description, and buttons emerge
  const infoContentOpacity = useTransform(scrollYProgress, [0.30, 0.80], [0, 1]);

  // Description paragraph
  const descOpacity = useTransform(scrollYProgress, [0.58, 0.74], [0, 1]);
  const descBlur = useTransform(scrollYProgress, [0.58, 0.74], [14, 0]);
  const descFilter = useTransform(descBlur, (v) => (v <= 0.2 ? 'none' : `blur(${v.toFixed(1)}px)`));
  const descY = useTransform(scrollYProgress, [0.58, 0.74], [16, 0]);

  // Action buttons
  const buttonsOpacity = useTransform(scrollYProgress, [0.70, 0.84], [0, 1]);
  const buttonsY = useTransform(scrollYProgress, [0.70, 0.84], [20, 0]);
  const buttonsInteractive = useTransform(scrollYProgress, (v) => (v > 0.65 ? 'auto' : 'none'));

  // Headline text to reveal letter-by-letter
  const headlineText = "DISEÑO CON PROPÓSITO, DIRECCIÓN DE ARTE E IDENTIDAD ESTRATÉGICA";
  const headlineWords = headlineText.split(' ');
  let charCounter = 0;
  const totalHeadlineChars = headlineText.replace(/\s+/g, '').length || 1;

  // =========================================================================
  // 3. 3D ANTIGRAVITY PELLET PARTICLE FIELD (Google Antigravity-Style Engine)
  // =========================================================================
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Initialize 240 3D arcade pellets floating in space
    const NUM_PELLETS = 240;
    const MAX_DEPTH = 1100;
    const FOV = 550;
    const pellets: Particle3D[] = [];

    for (let i = 0; i < NUM_PELLETS; i++) {
      const rx = (Math.random() - 0.5) * width * 1.6;
      const ry = (Math.random() - 0.5) * height * 1.6;
      const rz = Math.random() * MAX_DEPTH + 40;
      pellets.push({
        x: rx,
        y: ry,
        z: rz,
        origX: rx,
        origY: ry,
        baseRadius: Math.random() * 2.2 + 2.0, // 2px to 4.2px arcade pellet size
        alpha: Math.random() * 0.45 + 0.35,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        vz: -(Math.random() * 0.75 + 0.65), // Drifting toward viewer
      });
    }

    let camRotX = 0;
    let camRotY = 0;
    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const mouse = mousePosRef.current;

      // --- 3D Camera Tilt (Parallax from mouse) ---
      let targetCamRotY = 0;
      let targetCamRotX = 0;
      if (mouse) {
        targetCamRotY = ((mouse.x - centerX) / centerX) * 0.26;
        targetCamRotX = -((mouse.y - centerY) / centerY) * 0.18;
      }
      camRotY += (targetCamRotY - camRotY) * 0.05;
      camRotX += (targetCamRotX - camRotX) * 0.05;

      const cosY = Math.cos(camRotY);
      const sinY = Math.sin(camRotY);
      const cosX = Math.cos(camRotX);
      const sinX = Math.sin(camRotX);

      // --- Draw 3D Antigravity Floating Pellets ---
      for (let i = 0; i < pellets.length; i++) {
        const p = pellets[i];

        // Constant continuous 3D float toward viewer
        p.z += p.vz;
        p.x += p.vx + Math.sin(frame * 0.015 + i) * 0.25;
        p.y += p.vy + Math.cos(frame * 0.015 + i) * 0.25;

        // Wrap around depth
        if (p.z < 25) {
          p.z = MAX_DEPTH;
          p.x = (Math.random() - 0.5) * width * 1.6;
          p.y = (Math.random() - 0.5) * height * 1.6;
          p.origX = p.x;
          p.origY = p.y;
        }

        // 3D Rotation Transform
        const rx = p.x * cosY + p.z * sinY;
        const rz = -p.x * sinY + p.z * cosY;
        const ry = p.y * cosX - rz * sinX;
        const finalZ = p.y * sinX + rz * cosX;

        if (finalZ <= 10) continue;

        // Perspective Projection
        const scale = FOV / (FOV + finalZ);
        const screenX = centerX + rx * scale;
        const screenY = centerY + ry * scale;

        // Mouse Antigravity Force Field Interaction
        if (mouse) {
          const dx = screenX - mouse.x;
          const dy = screenY - mouse.y;
          const dist = Math.hypot(dx, dy);
          const forceRadius = 190;

          if (dist < forceRadius && dist > 1) {
            const force = Math.pow(1 - dist / forceRadius, 1.6) * 7.5;
            p.x += (dx / dist) * force * (1 / scale);
            p.y += (dy / dist) * force * (1 / scale);
          }
        }

        // Gentle spring-back to original orbit
        p.x += (p.origX - p.x) * 0.02;
        p.y += (p.origY - p.y) * 0.02;

        // Draw the 3D Pellet with Luminous Depth
        const currentRadius = Math.max(1, p.baseRadius * scale);
        const currentAlpha = Math.min(1, p.alpha * Math.min(1.4, scale * 1.6));
        const dark = isDarkRef.current;

        ctx.save();
        if (dark) {
          ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha * 0.85})`;
          ctx.shadowColor = '#ffffff';
          ctx.shadowBlur = scale > 0.8 ? 10 : 4;
        } else {
          ctx.fillStyle = `rgba(15, 23, 42, ${currentAlpha * 0.65})`;
          ctx.shadowColor = 'rgba(0, 0, 0, 0.12)';
          ctx.shadowBlur = scale > 0.8 ? 6 : 2;
        }
        ctx.beginPath();
        ctx.arc(screenX, screenY, currentRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${
        prefersReduced ? 'h-screen' : 'h-[270vh] sm:h-[300vh]'
      } bg-[var(--bg)] transition-colors duration-200`}
    >
      {/* Sticky Fullscreen Viewport */}
      <div
        ref={stickyViewportRef}
        onMouseMove={(e) => {
          mousePosRef.current = { x: e.clientX, y: e.clientY };
        }}
        onMouseLeave={() => {
          mousePosRef.current = null;
        }}
        className="sticky top-0 h-screen w-full overflow-hidden bg-[var(--bg)] select-none transition-colors duration-200"
      >
        {/* =====================================================================
            3D ANTIGRAVITY PELLET PARTICLE FIELD CANVAS
            ===================================================================== */}
        <motion.canvas
          ref={canvasRef}
          style={{ opacity: canvasOpacity }}
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
        />

        {/* Ambient Vignette for Cinematic Focus */}
        <div 
          aria-hidden="true" 
          className={`absolute inset-0 pointer-events-none z-10 transition-opacity duration-300 ${
            isDark ? 'opacity-35' : 'opacity-15'
          }`}
          style={{
            background: isDark
              ? 'radial-gradient(circle at 50% 50%, transparent 55%, rgba(0,0,0,0.92) 100%)'
              : 'radial-gradient(circle at 50% 50%, transparent 60%, rgba(0,0,0,0.3) 100%)',
          }}
        />

        {/* =====================================================================
            OPENING SEQUENCE & DISPLAY NAME: MORPHING PILL -> "ALEJANDRO RIVERA"
            ===================================================================== */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none px-4 sm:px-6">
          
          <motion.div
            style={{
              opacity: nameOpacity,
              filter: nameFilter,
              y: nameY,
              scale: nameScale,
              pointerEvents: namePointerEvents,
            }}
            className="relative w-full max-w-[1920px] mx-auto text-center flex items-center justify-center min-h-[120px] sm:min-h-[160px] lg:min-h-[200px]"
          >
            {/* The Morphing Flat White Pill: Pure flat circle -> Expands to Pill -> Opens Up & Dissolves */}
            {pillPhase !== 'done' && !prefersReduced && (
              <motion.div
                aria-hidden="true"
                initial={{ scale: 0, opacity: 0 }}
                animate={
                  pillPhase === 'circle'
                    ? {
                        scale: [0, 1],
                        opacity: 1,
                        width: circleSize,
                        height: circleSize,
                        borderRadius: 9999,
                        scaleY: 1,
                        scaleX: 1,
                      }
                    : pillPhase === 'pill'
                    ? {
                        scale: 1,
                        opacity: 1,
                        width: pillTargetWidth,
                        height: circleSize,
                        borderRadius: 9999,
                        scaleY: 1,
                        scaleX: 1,
                      }
                    : {
                        // The pill opens up vertically and dissolves into thin air!
                        scaleY: 1.5,
                        scaleX: 1.03,
                        opacity: 0,
                        width: pillTargetWidth,
                        height: circleSize,
                        borderRadius: 9999,
                      }
                }
                transition={
                  pillPhase === 'circle'
                    ? { duration: 0.45, ease: [0.16, 1, 0.3, 1] }
                    : pillPhase === 'pill'
                    ? { duration: 0.65, ease: [0.16, 1, 0.3, 1] }
                    : { duration: 0.45, ease: 'easeOut' }
                }
                className={`absolute z-10 pointer-events-none select-none ${
                  isDark
                    ? 'bg-white shadow-none'
                    : 'bg-white border-2 border-neutral-950 shadow-none'
                }`}
              />
            )}

            {/* Giant Display Name: Born directly from the expansion, revealed when the pill opens */}
            <motion.h1
              ref={nameHeaderRef}
              initial={
                prefersReduced
                  ? { opacity: 1, clipPath: 'none' }
                  : { opacity: 0, clipPath: 'inset(0% 50% 0% 50%)' }
              }
              animate={
                prefersReduced || pillPhase === 'done'
                  ? { opacity: 1, clipPath: 'none', filter: 'none' }
                  : pillPhase === 'revealed'
                  ? { opacity: 1, clipPath: 'inset(0% 0% 0% 0%)', filter: 'none' }
                  : pillPhase === 'pill'
                  ? { opacity: 1, clipPath: 'inset(0% 0% 0% 0%)', filter: 'none' }
                  : { opacity: 0, clipPath: 'inset(0% 50% 0% 50%)', filter: 'none' }
              }
              transition={
                pillPhase === 'pill'
                  ? { duration: 0.65, ease: [0.16, 1, 0.3, 1] }
                  : { duration: 0.35, ease: 'easeOut' }
              }
              className={`relative z-20 font-sans font-black text-5xl sm:text-7xl md:text-8xl lg:text-[10.5vw] uppercase tracking-tighter leading-none text-center select-none transition-colors duration-300 px-4 ${
                pillPhase === 'pill'
                  ? 'text-neutral-950'
                  : isDark
                  ? 'text-white'
                  : 'text-neutral-950'
              }`}
              style={{
                textShadow:
                  pillPhase === 'pill'
                    ? 'none'
                    : isDark
                    ? '0 4px 30px rgba(0, 0, 0, 0.9), 0 0 50px rgba(255, 255, 255, 0.12)'
                    : '0 4px 24px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.08)',
              }}
            >
              ALEJANDRO RIVERA
            </motion.h1>
          </motion.div>
        </div>

        {/* =====================================================================
            SCROLL REVEAL CONTENT: TAGLINE (LETTER-BY-LETTER) & INTRO COPY
            ===================================================================== */}
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 lg:px-10 pointer-events-none">
          <motion.div
            style={{ opacity: infoContentOpacity }}
            className="w-full max-w-5xl mx-auto text-center"
          >
            {/* Headline with Signature Letter-by-Letter Scroll Blur Sweep */}
            <h2 className={`text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.12] mb-6 text-center text-balance transition-colors duration-200 ${
              isDark ? 'text-white' : 'text-neutral-950'
            }`}>
              {headlineWords.map((word, wordIdx) => {
                const chars = word.split('');
                return (
                  <span key={wordIdx} className="inline-block whitespace-nowrap mr-[0.28em]">
                    {chars.map((char) => {
                      const currentIdx = charCounter++;
                      return (
                        <LetterRevealChar
                          key={currentIdx}
                          char={char}
                          index={currentIdx}
                          total={totalHeadlineChars}
                          scrollYProgress={scrollYProgress}
                          prefersReduced={prefersReduced}
                        />
                      );
                    })}
                  </span>
                );
              })}
            </h2>

            {/* Description Paragraph */}
            <motion.p
              style={{
                opacity: prefersReduced ? 1 : descOpacity,
                filter: prefersReduced ? 'none' : descFilter,
                y: prefersReduced ? 0 : descY,
              }}
              className={`text-base sm:text-lg lg:text-xl font-light leading-relaxed max-w-3xl mx-auto mb-10 text-pretty transition-colors duration-200 ${
                isDark ? 'text-neutral-300' : 'text-neutral-600'
              }`}
            >
              Especializado en identidad visual, campañas publicitarias de alto impacto y diseño de sistemas interactivos. Creando conexiones estratégicas entre las marcas y su audiencia.
            </motion.p>

            {/* Action Buttons with Spring Bounce */}
            <motion.div
              style={{
                opacity: prefersReduced ? 1 : buttonsOpacity,
                y: prefersReduced ? 0 : buttonsY,
                pointerEvents: buttonsInteractive,
              }}
              className="flex flex-wrap items-center justify-center gap-4"
            >
              <button
                type="button"
                onClick={onScrollToPortfolio}
                className={`btn-bounce inline-flex items-center gap-2.5 px-8 py-4 font-semibold text-xs tracking-wider uppercase rounded-full shadow-lg transition-all focus-visible:outline-none cursor-pointer ${
                  isDark
                    ? 'bg-[#FACC15] hover:bg-[#FFE600] text-black shadow-amber-500/20 focus-visible:ring-2 focus-visible:ring-white'
                    : 'bg-neutral-950 hover:bg-neutral-800 text-white shadow-neutral-900/20 focus-visible:ring-2 focus-visible:ring-neutral-950'
                }`}
              >
                <span>Ver proyectos</span>
                <ArrowRight className={`w-4 h-4 ${isDark ? 'text-black' : 'text-white'}`} aria-hidden="true" />
              </button>

              <Link
                to="/about"
                className={`btn-bounce inline-flex items-center gap-2 px-8 py-4 font-semibold text-xs tracking-wider uppercase rounded-full border backdrop-blur-md transition-all focus-visible:outline-none ${
                  isDark
                    ? 'bg-white/10 hover:bg-white/20 text-white border-white/25 focus-visible:ring-2 focus-visible:ring-white'
                    : 'bg-neutral-950/[0.04] hover:bg-neutral-950/[0.08] text-neutral-950 border-neutral-950/15 focus-visible:ring-2 focus-visible:ring-neutral-950'
                }`}
              >
                <span>Sobre mí & Enfoque</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}

export default PacmanHero;