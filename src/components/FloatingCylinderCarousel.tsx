import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter, Link } from '../context/RouterContext';
import { Project } from '../types';
import { ProjectArtworkRenderer } from './ProjectArtworks';
import { 
  ArrowLeft, 
  ArrowRight, 
  ArrowUpRight, 
  Play, 
  Pause, 
  Eye,
  MoveHorizontal 
} from 'lucide-react';

interface FloatingCylinderCarouselProps {
  projects: Project[];
  hideHeader?: boolean;
}

export function FloatingCylinderCarousel({ projects, hideHeader = false }: FloatingCylinderCarouselProps) {
  const router = useRouter();
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isAutoSpinning, setIsAutoSpinning] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragStartAngle, setDragStartAngle] = useState(0);
  const [hasMoved, setHasMoved] = useState(false);
  const [radiusX, setRadiusX] = useState(380);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  const total = projects.length;
  const anglePerItem = 360 / total;

  // Adapt orbit radius based on window width
  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setRadiusX(145); // Mobile
      } else if (width < 1024) {
        setRadiusX(260); // Tablet
      } else {
        setRadiusX(380); // Desktop
      }
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Smooth continuous rotation via requestAnimationFrame
  const animateSpin = useCallback((time: number) => {
    if (lastTimeRef.current !== null && isAutoSpinning && !isDragging) {
      const delta = (time - lastTimeRef.current) / 1000;
      // 360 degrees in ~36 seconds (10 deg/sec)
      setRotationAngle((prev) => (prev + delta * 10) % 360);
    }
    lastTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animateSpin);
  }, [isAutoSpinning, isDragging]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animateSpin);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [animateSpin]);

  // Touch & Pointer Drag Gestures
  const handlePointerDown = (clientX: number) => {
    setIsDragging(true);
    setDragStartX(clientX);
    setDragStartAngle(rotationAngle);
    setHasMoved(false);
  };

  const handlePointerMove = (clientX: number) => {
    if (!isDragging) return;
    const deltaX = clientX - dragStartX;
    if (Math.abs(deltaX) > 4) {
      setHasMoved(true);
    }
    // Convert horizontal pixel drag to angular rotation
    const sensitivity = radiusX > 300 ? 0.35 : 0.45;
    const newAngle = dragStartAngle - deltaX * sensitivity;
    setRotationAngle(newAngle);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const stepLeft = () => {
    setRotationAngle((prev) => prev - anglePerItem);
  };

  const stepRight = () => {
    setRotationAngle((prev) => prev + anglePerItem);
  };

  // Bring a specific card index to the front smoothly
  const bringToFront = (idx: number) => {
    const targetAngle = idx * anglePerItem;
    // Calculate shortest angular distance
    const currentNorm = ((rotationAngle % 360) + 360) % 360;
    let diff = targetAngle - currentNorm;
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;
    setRotationAngle((prev) => prev + diff);
  };

  // Determine currently focused front item
  const normalizedRotation = ((rotationAngle % 360) + 360) % 360;
  const activeIndex = (Math.round(normalizedRotation / anglePerItem)) % total;
  const activeProject = projects[(total - activeIndex) % total] || projects[0];

  return (
    <div className="w-full bg-transparent text-neutral-900 dark:text-white select-none relative">
      <div className="w-full relative z-10">
        
        {/* Clean Header & Sleek Glass Controls (only shown when not hidden) */}
        {!hideHeader && (
          <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 mb-6 border-b border-neutral-200/70 dark:border-neutral-800/70 gap-6">
            <div>
              <div className="font-mono text-xs text-neutral-500 dark:text-neutral-400 mb-2 tracking-widest uppercase">
                Carrusel Orbital 360° · Liquid Glass
              </div>
              <h3 className="text-2xl sm:text-4xl font-bold tracking-tight text-neutral-950 dark:text-white">
                Exploración de Obras
              </h3>
            </div>

            <div className="flex items-center gap-3 font-mono text-xs">

              {/* Play / Pause Toggle Button */}
              <button
                onClick={() => setIsAutoSpinning(!isAutoSpinning)}
                className="px-3.5 py-1.5 rounded-full liquid-glass hover:bg-white/80 dark:hover:bg-white/15 text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5 transition-all cursor-pointer text-xs font-medium"
                title={isAutoSpinning ? 'Pausar giro continuo' : 'Activar giro continuo'}
              >
                {isAutoSpinning ? (
                  <>
                    <Pause className="w-3 h-3 text-neutral-600 dark:text-neutral-300" />
                    <span>Pausa</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3 h-3 text-neutral-600 dark:text-neutral-300" />
                    <span>Giro</span>
                  </>
                )}
              </button>

              {/* Step Left Button */}
              <button
                onClick={stepLeft}
                aria-label="Orbitar hacia la izquierda"
                className="p-2 rounded-full liquid-glass hover:bg-white/80 dark:hover:bg-white/15 text-neutral-800 dark:text-neutral-200 transition-all cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>

              {/* Step Right Button */}
              <button
                onClick={stepRight}
                aria-label="Orbitar hacia la derecha"
                className="p-2 rounded-full liquid-glass hover:bg-white/80 dark:hover:bg-white/15 text-neutral-800 dark:text-neutral-200 transition-all cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Orbital stage: liquid glass cards */}
        <div 
          ref={containerRef}
          className="relative w-full h-[360px] sm:h-[400px] md:h-[430px] flex items-center justify-center cursor-grab active:cursor-grabbing my-2"
          onMouseDown={(e) => handlePointerDown(e.clientX)}
          onMouseMove={(e) => handlePointerMove(e.clientX)}
          onMouseUp={handlePointerUp}
          onMouseLeave={handlePointerUp}
          onTouchStart={(e) => handlePointerDown(e.touches[0].clientX)}
          onTouchMove={(e) => handlePointerMove(e.touches[0].clientX)}
          onTouchEnd={handlePointerUp}
        >
          {/* Orbital Track Visual (Subtle Liquid Glow Halo) */}
          <div 
            className="absolute rounded-full pointer-events-none opacity-25 dark:opacity-20 border border-neutral-300/40 dark:border-white/10"
            style={{
              width: `${radiusX * 2 + 180}px`,
              height: `${radiusX * 0.45 + 100}px`,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />

          {/* Cards orbiting in circle */}
          <div className="relative w-full h-full flex items-center justify-center">
            {projects.map((project, idx) => {
              const itemAngle = idx * anglePerItem;
              // Angular position relative to the viewing center
              let diffAngle = ((itemAngle - (rotationAngle % 360)) + 360) % 360;
              const rad = (diffAngle * Math.PI) / 180;

              // Elliptical / circular orbital calculation
              // x moves horizontally along the orbit
              const x = Math.sin(rad) * radiusX;
              // z represents depth: +1 is closest front, -1 is furthest back
              const z = Math.cos(rad);

              const depthFactor = (z + 1) / 2; // Normalized depth: 0 (back) to 1 (front)
              const scale = 0.76 + 0.24 * depthFactor;
              const opacity = 0.38 + 0.62 * depthFactor;
              const zIndex = Math.round(depthFactor * 100);
              const isFront = z > 0.88;

              return (
                <div
                  key={project.id}
                  className="absolute transition-transform duration-75 select-none"
                  style={{
                    // IMPORTANT: Zero pitch, zero yaw, zero roll. 
                    // Perfectly straight and upright ("rectas"), revolving in circle!
                    transform: `translate3d(${x}px, 0px, 0px) scale(${scale})`,
                    opacity: opacity,
                    zIndex: zIndex,
                    width: 'clamp(210px, 26vw, 275px)',
                    height: 'clamp(210px, 26vw, 275px)',
                  }}
                  onClick={() => {
                    if (hasMoved) return;
                    if (isFront) {
                      router.navigate(`/work/${project.slug}`);
                    } else {
                      bringToFront(idx);
                    }
                  }}
                >
                  {/* Cuadrado Liquid Glass con Esquinas Redondeadas */}
                  <div 
                    className={`w-full h-full rounded-3xl p-3 sm:p-3.5 flex flex-col justify-between transition-all duration-300 relative overflow-hidden cursor-pointer ${
                      isFront
                        ? 'liquid-glass liquid-glass-active scale-[1.02]'
                        : 'liquid-glass hover:opacity-100 hover:scale-[1.03]'
                    }`}
                  >
                    {/* Liquid Glass Highlight Rim (Top Edge Reflection) */}
                    <div className="pointer-events-none absolute inset-x-4 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white dark:via-white/60 to-transparent" />

                    {/* Liquid Specular Sheen (Diagonal Gloss Reflection) */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/40 via-white/10 to-transparent dark:from-white/15 dark:via-transparent dark:to-transparent rounded-3xl" />

                    {/* Top: Square Thumbnail with Rounded Corners */}
                    <div className="w-full flex-1 rounded-2xl overflow-hidden bg-neutral-100/70 dark:bg-neutral-950/70 border border-white/60 dark:border-white/10 relative shadow-inner mb-2.5">
                      <div className="w-full h-full flex items-center justify-center overflow-hidden">
                        <ProjectArtworkRenderer project={project} />
                      </div>
                    </div>

                    {/* Bottom: Clean Title with Subtle Arrow (No distracting tags covering artwork) */}
                    <div className="relative z-10 flex items-center justify-between gap-2 px-1">
                      <div className="min-w-0">
                        <h4 className="text-xs sm:text-sm font-bold tracking-tight text-neutral-950 dark:text-white truncate">
                          {project.title}
                        </h4>
                      </div>

                      <div className={`p-1.5 rounded-full transition-colors flex-shrink-0 ${
                        isFront 
                          ? 'bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 shadow-md' 
                          : 'bg-neutral-200/60 dark:bg-white/10 text-neutral-700 dark:text-neutral-300'
                      }`}>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Clean Orbit Telemetry Strip */}
        <div className="pt-6 border-t border-neutral-200/70 dark:border-neutral-800/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs text-neutral-500 dark:text-neutral-400">
          <div className="flex items-center gap-2.5">
            <span className="px-2.5 py-1 rounded-full liquid-glass text-neutral-900 dark:text-white font-semibold text-[11px] flex items-center gap-1.5">
              <Eye className="w-3 h-3 text-blue-600 dark:text-blue-400" />
              <span>OBRA EN FOCO:</span>
            </span>
            <span className="text-neutral-950 dark:text-white font-medium text-sm">
              {activeProject.title}
            </span>
            <span className="text-neutral-400 dark:text-neutral-500 text-[11px]">
              · {activeProject.category}
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>ÁNGULO: {Math.round(((rotationAngle % 360) + 360) % 360)}°</span>
            <span className="text-neutral-300 dark:text-neutral-700">/</span>
            <Link 
              to="/work" 
              className="text-neutral-950 dark:text-white hover:underline inline-flex items-center gap-1 font-semibold"
            >
              <span>Ver todas las obras</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
