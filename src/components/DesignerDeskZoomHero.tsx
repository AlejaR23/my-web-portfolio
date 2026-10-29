import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowDown, ChevronDown } from 'lucide-react';
import { Link } from '../context/RouterContext';
import deskSetupImage from '../assets/images/designer-desk-setup.jpg';

export interface DesignerDeskZoomHeroProps {
  onScrollToPortfolio?: () => void;
}

export function DesignerDeskZoomHero({ onScrollToPortfolio }: DesignerDeskZoomHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  // Scroll tracking along the hero track (0 to 1)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Camera zoom: pushes in from wide shot (1.0) into the modern monitor (2.72)
  // Focal center calibrated to the monitor screen: 50.6% horizontal, 47.0% vertical
  const scale = useTransform(scrollYProgress, [0, 0.72], [1, 2.72]);

  // Initial prompt (clean room view without clutter) disappears on first scroll
  const cueOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
  const cueY = useTransform(scrollYProgress, [0, 0.08], [0, 16]);

  // Soft ambient screenbar / monitor glow intensifies as camera approaches screen
  const monitorGlowOpacity = useTransform(scrollYProgress, [0.15, 0.65], [0, 0.35]);

  // Screen canvas transition: activates as the monitor encompasses the full viewport
  const screenCanvasOpacity = useTransform(scrollYProgress, [0.60, 0.78], [0, 1]);

  // Hero headline, description, and buttons emerge when the monitor becomes the full screen
  const heroContentOpacity = useTransform(scrollYProgress, [0.68, 0.84], [0, 1]);
  const heroContentY = useTransform(scrollYProgress, [0.68, 0.84], [36, 0]);
  const heroContentScale = useTransform(scrollYProgress, [0.68, 0.84], [0.97, 1]);

  // Buttons become interactive only once the hero content is revealed
  const isContentInteractive = useTransform(scrollYProgress, (v) => (v > 0.70 ? 'auto' : 'none'));

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${
        prefersReduced ? 'h-screen' : 'h-[270vh] sm:h-[300vh]'
      } bg-black`}
    >
      {/* Pinned Fullscreen Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black flex flex-col justify-between select-none">
        
        {/* =====================================================================
            1. CAMERA DOLLY ZOOM SCENE (Modern Cozy Gamer / Designer Studio in 4K)
            ===================================================================== */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <motion.div
            style={{
              scale: prefersReduced ? 1 : scale,
              transformOrigin: '50.6% 47.0%',
              willChange: 'transform',
            }}
            className="relative w-full h-full flex items-center justify-center"
          >
            {/* 4K Ultra-Sharp Wide Photograph (3440x1920) */}
            <img
              src={deskSetupImage}
              alt="Setup moderno gamer acogedor de Alejandro Rivera - Estudio con luz cálida y monitor de alta resolución"
              className="w-full h-full object-cover object-center block select-none"
              style={{
                imageRendering: 'auto',
              }}
            />

            {/* Ambient ScreenBar & Monitor Glow Layer */}
            <motion.div
              style={{ opacity: prefersReduced ? 0 : monitorGlowOpacity }}
              className="absolute inset-0 pointer-events-none"
            >
              <div 
                className="w-full h-full"
                style={{
                  background: 'radial-gradient(circle at 50.6% 47.0%, rgba(255, 235, 190, 0.28) 0%, rgba(234, 179, 8, 0.10) 24%, transparent 48%)',
                }}
              />
            </motion.div>
          </motion.div>

          {/* =====================================================================
              2. SCREEN CANVAS TAKEOVER (Transitions when monitor fills the viewport)
              ===================================================================== */}
          <motion.div
            style={{ opacity: prefersReduced ? 1 : screenCanvasOpacity }}
            className="absolute inset-0 z-20 pointer-events-none"
          >
            {/* Deep rich dark backdrop with subtle warm screenbar ambient light at the top */}
            <div 
              className="w-full h-full"
              style={{
                background: 'radial-gradient(ellipse at 50% 0%, rgba(245, 158, 11, 0.08) 0%, rgba(11, 13, 17, 0.95) 45%, #08090b 100%)',
              }}
            />
          </motion.div>

          {/* Vignette layer for top navigation bar contrast */}
          <div 
            aria-hidden="true" 
            className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/60 via-black/20 to-transparent pointer-events-none z-10" 
          />
        </div>

        {/* 3. TOP SPACER (Preserves clearance for transparent overlaid Navbar) */}
        <div className="pt-24 sm:pt-32" />

        {/* =====================================================================
            4. INITIAL SCENE PROMPT (Minimal & Clean: Room is viewed from afar)
            ===================================================================== */}
        {!prefersReduced && (
          <motion.div
            style={{ opacity: cueOpacity, y: cueY }}
            className="relative z-30 mx-auto text-center pointer-events-none my-auto"
          >
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-black/65 backdrop-blur-md border border-white/20 text-xs font-mono text-neutral-200 shadow-2xl animate-pulse">
              <span>Baja con el mouse para entrar al setup</span>
              <ChevronDown className="w-4 h-4 text-amber-400" aria-hidden="true" />
            </div>
          </motion.div>
        )}

        {/* =====================================================================
            5. HERO CONTENT & ELEMENTS
            (Appears gracefully once the computer screen becomes the full screen)
            ===================================================================== */}
        <motion.div
          style={{
            opacity: prefersReduced ? 1 : heroContentOpacity,
            y: prefersReduced ? 0 : heroContentY,
            scale: prefersReduced ? 1 : heroContentScale,
            pointerEvents: prefersReduced ? 'auto' : isContentInteractive,
          }}
          className="relative z-30 w-full px-4 sm:px-6 md:px-8 lg:px-10 pb-12 sm:pb-16 mt-auto"
        >
          <div className="w-full max-w-[1920px] mx-auto">
            <div className="flex flex-col gap-6 sm:gap-8 w-full">
              
              {/* Overline identity badge */}
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md border border-white/15 rounded-full text-[11px] font-mono tracking-widest uppercase text-neutral-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Alejandro Rivera · Estudio 2026</span>
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.2rem] xl:text-[6.2rem] font-bold tracking-tight text-white leading-[1.04] text-balance">
                Diseño marcas, campañas y experiencias visuales
              </h1>

              {/* Secondary Row: Narrative and Action Buttons */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end pt-2 w-full">
                <div className="lg:col-span-8">
                  <p className="text-base sm:text-lg md:text-xl text-neutral-200 font-light leading-relaxed text-pretty">
                    Soy Alejandro Rivera, diseñador publicitario. Creo identidades de marca, publicidad y contenido visual cuidando cada detalle para que todo comunique bien y con personalidad.
                  </p>
                </div>

                {/* Action Buttons: Dynamic Micro-Bounce with Rounded Pill Shape */}
                <div className="lg:col-span-4 flex items-center justify-start lg:justify-end gap-3.5 flex-wrap">
                  <Link
                    to="/contact"
                    className="btn-bounce px-8 py-3.5 bg-white text-black font-semibold text-xs tracking-wider uppercase rounded-full shadow-lg cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    Hablemos
                  </Link>

                  <button
                    type="button"
                    onClick={onScrollToPortfolio}
                    className="btn-bounce px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs tracking-wider uppercase rounded-full cursor-pointer backdrop-blur-xs flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    <span>Ver proyectos</span>
                    <ArrowDown className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>
              </div>

              {/* Discreet downward transition cue */}
              <div className="pt-2 flex items-center gap-2 text-xs font-mono text-neutral-400/80">
                <ChevronDown className="w-3.5 h-3.5 animate-bounce text-neutral-400" aria-hidden="true" />
                <span>Continúa bajando para explorar el contenido</span>
              </div>

            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}

export default DesignerDeskZoomHero;
