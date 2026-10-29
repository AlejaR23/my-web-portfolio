import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import {
  getStoredImageSync,
  getStoredImageAsync,
} from '../utils/imageStorage';
import { getPermanentImage } from '../data/permanentImages';

interface ScalerHomeLogoShowcaseProps {
  className?: string;
}

export function ScalerHomeLogoShowcase({ className = '' }: ScalerHomeLogoShowcaseProps) {
  const { theme } = useTheme();

  // Mode follows site theme automatically: 'white' in dark mode, 'color' in light mode
  const [viewMode, setViewMode] = useState<'color' | 'white'>(() => {
    return theme === 'dark' ? 'white' : 'color';
  });

  // Sync with theme changes automatically unless user explicitly changed it in current view
  useEffect(() => {
    setViewMode(theme === 'dark' ? 'white' : 'color');
  }, [theme]);

  const [colorImage, setColorImage] = useState<string | null>(() => {
    return (
      getPermanentImage('SLOT-SCALER-HOME-LIGHT') ||
      getPermanentImage('scaler-color') ||
      getStoredImageSync('SLOT-SCALER-HOME-LIGHT') ||
      getStoredImageSync('SLOT-SCALER-HOME') ||
      getStoredImageSync('SLOT-SCALER-LOGO-COLOR') ||
      null
    );
  });

  const [darkImage, setDarkImage] = useState<string | null>(() => {
    return (
      getPermanentImage('SLOT-SCALER-HOME-DARK') ||
      getPermanentImage('scaler-white') ||
      getStoredImageSync('SLOT-SCALER-HOME-DARK') ||
      getStoredImageSync('SLOT-SCALER-LOGO-WHITE') ||
      null
    );
  });

  const [naturalDimensions, setNaturalDimensions] = useState<{ width: number; height: number } | null>(null);

  // Load from IndexedDB / Storage sync
  useEffect(() => {
    let isMounted = true;

    getStoredImageAsync('SLOT-SCALER-HOME-LIGHT').then((img) => {
      if (isMounted && img) setColorImage(img);
    });

    getStoredImageAsync('SLOT-SCALER-HOME-DARK').then((img) => {
      if (isMounted && img) setDarkImage(img);
    });

    const handleUpdate = (e: Event) => {
      const customEvt = e as CustomEvent;
      const target = customEvt.detail?.identifier;
      const dataUrl = customEvt.detail?.dataUrl || null;

      if (
        target === 'SLOT-SCALER-HOME-LIGHT' ||
        target === 'SLOT-SCALER-HOME' ||
        target === 'SLOT-SCALER-LOGO-COLOR' ||
        target === 'scaler-color'
      ) {
        setColorImage(dataUrl);
      }
      if (
        target === 'SLOT-SCALER-HOME-DARK' ||
        target === 'SLOT-SCALER-LOGO-WHITE' ||
        target === 'scaler-white'
      ) {
        setDarkImage(dataUrl);
      }
    };

    window.addEventListener('ar_image_updated', handleUpdate);
    return () => {
      isMounted = false;
      window.removeEventListener('ar_image_updated', handleUpdate);
    };
  }, []);

  // Determine current image:
  // In white mode: prefer darkImage. If only colorImage exists, fallback to colorImage with white filter.
  // In color mode: prefer colorImage. If only darkImage exists, fallback to darkImage.
  const isWhiteMode = viewMode === 'white';
  const currentImage = isWhiteMode
    ? (darkImage || colorImage)
    : (colorImage || darkImage);

  // If in white mode and we only have the colorImage, apply CSS inversion filter
  const shouldInvertToWhite = isWhiteMode && !darkImage && Boolean(colorImage);

  // Load natural dimensions to ensure adaptive, zero-dead-space display
  useEffect(() => {
    if (!currentImage) {
      setNaturalDimensions(null);
      return;
    }
    const img = new window.Image();
    img.src = currentImage;
    img.onload = () => {
      if (img.naturalWidth && img.naturalHeight) {
        setNaturalDimensions({
          width: img.naturalWidth,
          height: img.naturalHeight,
        });
      }
    };
  }, [currentImage]);

  const handleSelectMode = (mode: 'color' | 'white') => {
    setViewMode(mode);
  };

  return (
    <div className={`relative flex flex-col gap-3 w-full ${className}`}>
      {/* Top Interactive Selector Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-1">
        <div className="flex items-center gap-1 bg-[var(--surface)] p-1 text-[11px] font-mono rounded-full border border-[var(--border)]">
          <button
            type="button"
            onClick={() => handleSelectMode('color')}
            className={`px-3.5 py-1 rounded-full transition-all cursor-pointer ${
              viewMode === 'color'
                ? 'bg-[var(--primary)] text-[var(--on-accent)] font-semibold shadow-xs'
                : 'text-[var(--text-muted)] hover:text-[var(--text)]'
            }`}
          >
            Full Color (Light)
          </button>

          <button
            type="button"
            onClick={() => handleSelectMode('white')}
            className={`px-3.5 py-1 rounded-full transition-all cursor-pointer ${
              viewMode === 'white'
                ? 'bg-[var(--primary)] text-[var(--on-accent)] font-semibold shadow-xs'
                : 'text-[var(--text-muted)] hover:text-[var(--text)]'
            }`}
          >
            Blanco (Dark Mode)
          </button>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-flex items-center gap-1.5 text-[10px] font-mono tracking-wider uppercase text-[var(--text-muted)]">
            <span className={`w-1.5 h-1.5 rounded-full ${isWhiteMode ? 'bg-white' : 'bg-neutral-900 dark:bg-white'}`} />
            {isWhiteMode ? 'Modo Oscuro: Versión Blanco' : 'Modo Claro: Full Color'}
          </span>
        </div>
      </div>

      {/* Main Display Canvas (Flat, borderless presentation spanning full width) */}
      <div
        className="relative w-full border-0 bg-transparent transition-colors duration-300 overflow-hidden rounded-xl sm:rounded-2xl"
        style={
          currentImage && naturalDimensions
            ? {
                aspectRatio: `${naturalDimensions.width} / ${naturalDimensions.height}`,
              }
            : undefined
        }
      >
        {currentImage ? (
          <div className="relative w-full h-auto group select-none overflow-hidden">
            <img
              src={currentImage}
              alt="Scaler Logo"
              onLoad={(e) => {
                const img = e.currentTarget;
                if (img.naturalWidth && img.naturalHeight) {
                  setNaturalDimensions({
                    width: img.naturalWidth,
                    height: img.naturalHeight,
                  });
                }
              }}
              className={`w-full h-auto block select-none transition-transform duration-500 ease-out group-hover:scale-[1.01] ${
                shouldInvertToWhite ? 'brightness-0 invert drop-shadow-[0_2px_12px_rgba(255,255,255,0.15)]' : ''
              }`}
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
              }}
            />
          </div>
        ) : (
          /* Authentic Vector Brandmark Showcase */
          <div className={`w-full aspect-[16/9] min-h-[340px] sm:min-h-[460px] md:min-h-[520px] flex flex-col items-center justify-center relative p-8 select-none transition-colors duration-300 rounded-xl sm:rounded-2xl border border-[var(--border)]/20 ${
            isWhiteMode ? 'bg-[#0A0B0E] text-white' : 'bg-[#FAFAF8] text-neutral-900'
          }`}>
            <svg 
              viewBox="0 0 540 220" 
              className="w-full max-w-[420px] max-h-[160px] object-contain drop-shadow-sm" 
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Scaler: Plataforma Creativa & Arquitectura de Marca"
            >
              <defs>
                <linearGradient id="scNodeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F5B838" />
                  <stop offset="100%" stopColor="#A855F7" />
                </linearGradient>
              </defs>
              <g transform="translate(110, 110)">
                <polygon 
                  points="0,-60 52,-26 52,34 0,68 -52,34 -52,-26" 
                  fill={isWhiteMode ? 'none' : 'none'} 
                  stroke={isWhiteMode ? '#FFFFFF' : 'url(#scNodeGrad)'} 
                  strokeWidth="4" 
                  strokeDasharray="8 4" 
                />
                <polygon 
                  points="0,-40 36,-18 36,24 0,46 -36,24 -36,-18" 
                  fill={isWhiteMode ? 'rgba(255,255,255,0.1)' : 'url(#scNodeGrad)'} 
                  fillOpacity={isWhiteMode ? 0.2 : 0.2}
                  stroke={isWhiteMode ? '#FFFFFF' : '#F5B838'} 
                  strokeWidth="2" 
                />
                <circle cx="0" cy="3" r="12" fill={isWhiteMode ? '#FFFFFF' : 'url(#scNodeGrad)'} />
              </g>
              <text 
                x="220" 
                y="118" 
                fontFamily="'Space Grotesk', -apple-system, sans-serif" 
                fontWeight="800" 
                fontSize="44" 
                letterSpacing="6" 
                fill={isWhiteMode ? '#FFFFFF' : '#111111'}
              >
                SCALER
              </text>
              <text 
                x="222" 
                y="146" 
                fontFamily="'Space Grotesk', monospace" 
                fontWeight="600" 
                fontSize="11" 
                letterSpacing="3" 
                fill={isWhiteMode ? '#A1A1AA' : '#666666'}
              >
                CREATIVE VENTURE &amp; BRAND OPS
              </text>
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}

export default ScalerHomeLogoShowcase;
