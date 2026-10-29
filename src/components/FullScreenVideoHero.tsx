import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Film, Trash2, Check, ArrowDown } from 'lucide-react';
import { Link } from '../context/RouterContext';
import defaultFallbackImage from '../assets/images/exofauna-mesa-14-100.jpg';
import {
  persistHeroVideo,
  getStoredHeroVideo,
  removeStoredHeroVideo,
} from '../utils/imageStorage';

export interface FullScreenVideoHeroProps {
  onScrollToPortfolio?: () => void;
}

export function FullScreenVideoHero({ onScrollToPortfolio }: FullScreenVideoHeroProps) {
  // Video source & persistence state
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [isCustomVideo, setIsCustomVideo] = useState(false);
  const [isDraggingVideo, setIsDraggingVideo] = useState(false);
  const [videoNotice, setVideoNotice] = useState<string | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Dual-player seamless crossfade loop refs & state
  const videoRefA = useRef<HTMLVideoElement | null>(null);
  const videoRefB = useRef<HTMLVideoElement | null>(null);
  const [activePlayer, setActivePlayer] = useState<'A' | 'B'>('A');
  const isTransitioningRef = useRef(false);

  const CROSSFADE_SEC = 1.2;

  // Check prefers-reduced-motion
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
      const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }
  }, []);

  // Load persisted video from IndexedDB or default showreel
  useEffect(() => {
    let currentObjectUrl: string | null = null;
    let isMounted = true;

    const loadVideo = async () => {
      try {
        const storedBlob = await getStoredHeroVideo();
        if (storedBlob && isMounted) {
          const url = URL.createObjectURL(storedBlob);
          currentObjectUrl = url;
          setVideoSrc(url);
          setIsCustomVideo(true);
          return;
        }

        // Check if a default hero showreel was placed in /public
        const res = await fetch('/hero-showreel.mp4', { method: 'HEAD' });
        const contentType = res.headers.get('content-type') || '';
        if (res.ok && contentType.includes('video') && isMounted) {
          setVideoSrc('/hero-showreel.mp4');
          setIsCustomVideo(false);
          return;
        }
        if (isMounted) {
          setVideoSrc(null);
          setIsCustomVideo(false);
        }
      } catch {
        if (isMounted) {
          setVideoSrc(null);
          setIsCustomVideo(false);
        }
      }
    };

    loadVideo();

    const handleVideoUpdate = () => {
      loadVideo();
    };

    window.addEventListener('ar_hero_video_updated', handleVideoUpdate);
    return () => {
      isMounted = false;
      window.removeEventListener('ar_hero_video_updated', handleVideoUpdate);
      if (currentObjectUrl) {
        URL.revokeObjectURL(currentObjectUrl);
      }
    };
  }, []);

  // Dual-player seamless crossfade loop logic
  useEffect(() => {
    if (!videoSrc || prefersReducedMotion) return;

    const vA = videoRefA.current;
    const vB = videoRefB.current;
    if (!vA || !vB) return;

    vA.currentTime = 0;
    vA.play().catch(() => {});
    vB.currentTime = 0;
    vB.pause();
    setActivePlayer('A');
    isTransitioningRef.current = false;

    const handleTimeUpdate = (active: 'A' | 'B') => {
      const currentEl = active === 'A' ? vA : vB;
      const nextEl = active === 'A' ? vB : vA;

      if (!currentEl.duration || isNaN(currentEl.duration)) return;

      const timeLeft = currentEl.duration - currentEl.currentTime;

      if (timeLeft <= CROSSFADE_SEC && !isTransitioningRef.current) {
        isTransitioningRef.current = true;
        nextEl.currentTime = 0;
        nextEl.play().catch(() => {});
        setActivePlayer(active === 'A' ? 'B' : 'A');

        setTimeout(() => {
          isTransitioningRef.current = false;
        }, (CROSSFADE_SEC + 0.2) * 1000);
      }
    };

    const onTimeUpdateA = () => {
      if (activePlayer === 'A') handleTimeUpdate('A');
    };

    const onTimeUpdateB = () => {
      if (activePlayer === 'B') handleTimeUpdate('B');
    };

    const onEndedA = () => {
      if (activePlayer === 'A') {
        vB.currentTime = 0;
        vB.play().catch(() => {});
        setActivePlayer('B');
        isTransitioningRef.current = false;
      }
    };

    const onEndedB = () => {
      if (activePlayer === 'B') {
        vA.currentTime = 0;
        vA.play().catch(() => {});
        setActivePlayer('A');
        isTransitioningRef.current = false;
      }
    };

    vA.addEventListener('timeupdate', onTimeUpdateA);
    vB.addEventListener('timeupdate', onTimeUpdateB);
    vA.addEventListener('ended', onEndedA);
    vB.addEventListener('ended', onEndedB);

    return () => {
      vA.removeEventListener('timeupdate', onTimeUpdateA);
      vB.removeEventListener('timeupdate', onTimeUpdateB);
      vA.removeEventListener('ended', onEndedA);
      vB.removeEventListener('ended', onEndedB);
    };
  }, [videoSrc, activePlayer, prefersReducedMotion]);

  // Handle direct file selection / drag-and-drop for the video
  const handleSaveVideoFile = async (file: File) => {
    if (!file.type.startsWith('video/')) {
      alert('Por favor selecciona un archivo de video válido (.mp4, .webm, .mov)');
      return;
    }

    try {
      await persistHeroVideo(file);
      const newUrl = URL.createObjectURL(file);
      setVideoSrc(newUrl);
      setIsCustomVideo(true);
      setVideoNotice('Video fijado con éxito en el Hero.');
      setTimeout(() => setVideoNotice(null), 3500);
    } catch (err) {
      console.error('Error guardando video del Hero:', err);
    }
  };

  const handleVideoFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleSaveVideoFile(file);
    }
    e.target.value = '';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingVideo(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingVideo(false);
  };

  const handleDropVideo = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingVideo(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('video/')) {
      handleSaveVideoFile(file);
    }
  };

  const handleResetVideo = async () => {
    await removeStoredHeroVideo();
    setVideoSrc(null);
    setIsCustomVideo(false);
    setVideoNotice('Video removido.');
    setTimeout(() => setVideoNotice(null), 3000);
  };

  const isDev = false;

  return (
    <div
      onDragOver={isDev ? handleDragOver : undefined}
      onDragLeave={isDev ? handleDragLeave : undefined}
      onDrop={isDev ? handleDropVideo : undefined}
      className="relative w-full h-[100dvh] min-h-[100dvh] flex flex-col justify-between overflow-hidden bg-black text-white select-none"
    >
      {/* 1. FULL-BLEED AUDIOVISUAL HERO BACKGROUND */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        {videoSrc && !prefersReducedMotion ? (
          <>
            <video
              ref={videoRefA}
              src={videoSrc}
              muted
              playsInline
              preload="auto"
              onError={() => setVideoSrc(null)}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                activePlayer === 'A' ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            />
            <video
              ref={videoRefB}
              src={videoSrc}
              muted
              playsInline
              preload="auto"
              onError={() => setVideoSrc(null)}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                activePlayer === 'B' ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            />
          </>
        ) : (
          <img
            src={defaultFallbackImage}
            alt="Alejandro Rivera - Showreel visual"
            className="absolute inset-0 w-full h-full object-cover select-none"
          />
        )}

        {/* Layered Subtle Contrast Gradients: keeps typography legible while showing full image */}
        {/* Bottom vignette: keeps headline, text and buttons legible */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent z-15" />
        {/* Top vignette: keeps overlaid navigation crisp */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent z-15" />
      </div>

      {/* Drag-over indicator overlay (AI Studio dev only) */}
      {isDev && isDraggingVideo && (
        <div className="absolute inset-0 z-50 bg-black/85 backdrop-blur-sm border-4 border-dashed border-white/60 flex flex-col items-center justify-center gap-3 text-white pointer-events-none">
          <Film className="w-12 h-12 text-white animate-bounce" />
          <h3 className="text-xl font-bold font-mono tracking-widest uppercase">
            Soltar video MP4 para el Hero
          </h3>
          <p className="text-xs font-mono text-neutral-400">
            Se reproducirá a pantalla completa con transición continua
          </p>
        </div>
      )}

      {/* Notification banner if video was updated */}
      {videoNotice && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-white text-black border border-white/20 shadow-2xl flex items-center gap-2 text-xs font-mono font-medium" role="status" aria-live="polite">
          <Check className="w-4 h-4 text-emerald-600" aria-hidden="true" />
          <span>{videoNotice}</span>
        </div>
      )}

      {/* Discreet Video Controls (AI Studio dev only) */}
      {isDev && (
        <div className="absolute top-24 right-6 sm:top-28 sm:right-10 z-30 opacity-75 hover:opacity-100 transition-opacity">
          <div className="flex items-center gap-1.5">
            <label
              htmlFor="hero-fullscreen-video-upload"
              className="px-3.5 py-1.5 bg-black/60 backdrop-blur-md hover:bg-black/80 text-white rounded-full border border-white/20 flex items-center gap-1.5 text-[11px] font-mono cursor-pointer shadow-lg transition-colors focus-within:ring-2 focus-within:ring-white"
              title="Cargar video (.mp4)"
            >
              <Film className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{videoSrc ? 'Cambiar Video' : 'Cargar Video Hero'}</span>
            </label>
            <input
              id="hero-fullscreen-video-upload"
              type="file"
              accept="video/mp4,video/webm,video/quicktime"
              className="hidden"
              onChange={handleVideoFileInput}
            />
            {isCustomVideo && (
              <button
                type="button"
                onClick={handleResetVideo}
                aria-label="Restaurar video"
                className="px-3 py-1.5 bg-red-600/80 text-white hover:bg-red-600 rounded-full text-[11px] font-mono flex items-center gap-1 shadow-lg cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                title="Restaurar video"
              >
                <Trash2 className="w-3 h-3" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* 2. TOP SPACER (Gives room for transparent overlaid Navbar) */}
      <div className="pt-24 sm:pt-32" />

      {/* 3. HEADLINE ANCHORED AT THE BOTTOM (Expansive centered layout) */}
      <div className="relative z-20 w-full px-4 sm:px-6 md:px-8 lg:px-10 pb-12 sm:pb-16 mt-auto">
        <div className="w-full max-w-[1920px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6 sm:gap-8 w-full"
          >
            {/* Headline and friendly description across full width */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.2rem] xl:text-[6.2rem] font-bold tracking-tight text-white leading-[1.04] text-balance">
              Diseño marcas, campañas y experiencias visuales
            </h1>

            {/* Secondary Editorial Row: Description and Actions spanning full width */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end pt-2 w-full">
              <div className="lg:col-span-8">
                <p className="text-base sm:text-lg md:text-xl text-neutral-200 font-light leading-relaxed text-pretty">
                  Soy Alejandro Rivera, diseñador publicitario. Creo identidades de marca, publicidad y contenido visual cuidando cada detalle para que todo comunique bien y con personalidad.
                </p>
              </div>

              {/* Action Buttons with Dynamic Bounce & Rounded Pill Shape */}
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
          </motion.div>
        </div>
      </div>

    </div>
  );
}

export default FullScreenVideoHero;
