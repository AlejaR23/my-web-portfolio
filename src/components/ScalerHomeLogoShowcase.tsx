import React, { useState, useEffect } from 'react';
import { Upload, X, Check, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import {
  persistImage,
  getStoredImageSync,
  getStoredImageAsync,
  removePersistedImage,
  optimizeImageFile,
} from '../utils/imageStorage';

interface ScalerHomeLogoShowcaseProps {
  className?: string;
}

export function ScalerHomeLogoShowcase({ className = '' }: ScalerHomeLogoShowcaseProps) {
  const { theme } = useTheme();

  // Mode follows site theme automatically: 'white' in dark mode, 'color' in light mode
  const [viewMode, setViewMode] = useState<'color' | 'white'>(() => {
    return theme === 'dark' ? 'white' : 'color';
  });

  // Track if user manually overrode the automatic theme matching
  const [userOverrode, setUserOverrode] = useState(false);

  // Sync with theme changes automatically unless user explicitly changed it in current view
  useEffect(() => {
    setViewMode(theme === 'dark' ? 'white' : 'color');
  }, [theme]);

  const [colorImage, setColorImage] = useState<string | null>(() => {
    return (
      getStoredImageSync('SLOT-SCALER-HOME-LIGHT') ||
      getStoredImageSync('SLOT-SCALER-HOME') ||
      getStoredImageSync('SLOT-SCALER-LOGO-COLOR') ||
      null
    );
  });

  const [darkImage, setDarkImage] = useState<string | null>(() => {
    return (
      getStoredImageSync('SLOT-SCALER-HOME-DARK') ||
      getStoredImageSync('SLOT-SCALER-LOGO-WHITE') ||
      null
    );
  });

  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Load from IndexedDB
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
        target === 'SLOT-SCALER-LOGO-COLOR'
      ) {
        setColorImage(dataUrl);
      }
      if (
        target === 'SLOT-SCALER-HOME-DARK' ||
        target === 'SLOT-SCALER-LOGO-WHITE'
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

  // Should we apply a white inversion filter?
  // When in white mode, if the image shown is the color logo without a dedicated white upload, invert black text to pure white.
  const shouldInvertToWhite = isWhiteMode && !darkImage && Boolean(colorImage);

  const handleUploadFile = async (file: File) => {
    setErrorMessage(null);
    try {
      const optimized = await optimizeImageFile(file);
      if (isWhiteMode) {
        // Wait for all required IndexedDB writes to succeed
        await persistImage('SLOT-SCALER-HOME-DARK', optimized);
        await persistImage('SLOT-SCALER-LOGO-WHITE', optimized);
        // Only commit new preview after writes succeed
        setDarkImage(optimized);
      } else {
        await persistImage('SLOT-SCALER-HOME-LIGHT', optimized);
        await persistImage('SLOT-SCALER-LOGO-COLOR', optimized);
        setColorImage(optimized);
      }
    } catch (err) {
      console.error('Error saving Scaler logo image:', err);
      const msg = err instanceof Error ? err.message : 'Error desconocido al guardar en IndexedDB.';
      setErrorMessage(`No se pudo guardar el logo en el navegador. Se conserva el logo anterior. (${msg})`);
      setTimeout(() => setErrorMessage(null), 7000);
    }
  };

  const handleClear = async () => {
    setErrorMessage(null);
    if (isWhiteMode) {
      setDarkImage(null);
      await removePersistedImage('SLOT-SCALER-HOME-DARK');
      await removePersistedImage('SLOT-SCALER-LOGO-WHITE');
    } else {
      setColorImage(null);
      await removePersistedImage('SLOT-SCALER-HOME-LIGHT');
      await removePersistedImage('SLOT-SCALER-LOGO-COLOR');
    }
  };

  const handleSelectMode = (mode: 'color' | 'white') => {
    setViewMode(mode);
    setUserOverrode(true);
  };

  return (
    <div className={`relative flex flex-col gap-3 w-full ${className}`}>
      {/* Top Interactive Selector Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-1">
        <div className="flex items-center gap-1.5 bg-[var(--surface)] p-1 text-[11px] font-mono border border-[var(--border)]">
          <button
            type="button"
            onClick={() => handleSelectMode('color')}
            className={`px-3 py-1 transition-all cursor-pointer ${
              viewMode === 'color'
                ? 'bg-[var(--primary)] text-[var(--on-accent)] font-semibold'
                : 'text-[var(--text-muted)] hover:text-[var(--text)]'
            }`}
          >
            Full Color (Light)
          </button>

          <button
            type="button"
            onClick={() => handleSelectMode('white')}
            className={`px-3 py-1 transition-all cursor-pointer ${
              viewMode === 'white'
                ? 'bg-[var(--primary)] text-[var(--on-accent)] font-semibold'
                : 'text-[var(--text-muted)] hover:text-[var(--text)]'
            }`}
          >
            Blanco (Dark Mode)
          </button>
        </div>

        <div className="flex items-center gap-2 text-[10px] font-mono tracking-wider uppercase text-[var(--text-muted)]">
          <span className="inline-flex items-center gap-1">
            <span className={`w-1.5 h-1.5 rounded-full ${isWhiteMode ? 'bg-white' : 'bg-neutral-900 dark:bg-white'}`} />
            {isWhiteMode ? 'Modo Oscuro: Versión Blanco' : 'Modo Claro: Full Color'}
          </span>
        </div>
      </div>

      {/* Main Display Canvas */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          const f = e.dataTransfer.files?.[0];
          if (f && f.type.startsWith('image/')) {
            handleUploadFile(f);
          }
        }}
        className={`relative aspect-[16/9] w-full border border-[var(--border)] bg-[var(--surface)] transition-colors duration-300 overflow-hidden flex flex-col items-center justify-center ${
          isDragging ? 'border-[var(--text)] scale-[0.99]' : ''
        }`}
      >
        {currentImage ? (
          <div className="absolute inset-0 w-full h-full group select-none overflow-hidden">
            <img
              src={currentImage}
              alt="Scaler Logo"
              className={`w-full h-full object-cover block transition-transform duration-300 group-hover:scale-[1.01] ${
                shouldInvertToWhite ? 'brightness-0 invert drop-shadow-[0_2px_12px_rgba(255,255,255,0.15)]' : ''
              }`}
            />

            {/* Top Bar with Badge, Replace Button, and Clear Button */}
            <div className="absolute top-3 right-3 sm:top-3.5 sm:right-3.5 flex items-center gap-1.5 sm:gap-2 z-20 opacity-80 group-hover:opacity-100 transition-opacity">
              <span className="px-2.5 py-1 bg-[var(--bg)]/90 backdrop-blur-md text-[var(--text)] text-[10px] font-mono tracking-wider uppercase font-semibold border border-[var(--border)] shadow-xs select-none">
                  {isWhiteMode ? 'Logo Blanco' : 'Full Color'}
                </span>

                <label
                  className="p-1.5 sm:p-2 bg-[var(--bg)]/90 backdrop-blur-md hover:bg-[var(--text)] text-[var(--text)] hover:text-[var(--bg)] border border-[var(--border)] shadow-xs transition-colors cursor-pointer"
                  title={isWhiteMode ? "Subir versión en blanco para modo oscuro" : "Subir versión full color para modo claro"}
                >
                  <Upload className="w-3.5 h-3.5" aria-hidden="true" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) handleUploadFile(f);
                    }}
                    className="sr-only"
                  />
                </label>

                <button
                  type="button"
                  onClick={handleClear}
                  className="p-1.5 sm:p-2 bg-[var(--bg)]/90 backdrop-blur-md hover:bg-red-500 hover:text-white text-[var(--text)] border border-[var(--border)] shadow-xs transition-colors cursor-pointer"
                  title="Restaurar logo"
                >
                  <X className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>
          </div>
        ) : (
          /* Authentic Vector Brandmark Showcase */
          <div className={`w-full h-full flex flex-col items-center justify-center relative p-8 select-none transition-colors duration-300 ${
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

            {/* Upload Trigger */}
            <div className="absolute bottom-3 right-3 opacity-70 hover:opacity-100 transition-opacity">
              <label className="p-1 px-2.5 bg-black/75 hover:bg-black text-white text-[10px] font-mono inline-flex items-center gap-1 cursor-pointer border border-white/20 rounded-[2px] shadow-sm">
                <Upload className="w-3 h-3" aria-hidden="true" />
                <span>Subir logo</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) handleUploadFile(f);
                  }}
                  className="sr-only"
                />
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Accessible Error Alert (role="alert" / aria-live="assertive") */}
      {errorMessage && (
        <div
          role="alert"
          aria-live="assertive"
          className="p-3 bg-red-950/95 text-white border border-red-500/70 shadow-xl backdrop-blur-md flex items-start justify-between gap-3 text-xs font-sans animate-in fade-in"
        >
          <div className="flex flex-col gap-0.5">
            <span className="font-semibold text-red-200">Error al guardar</span>
            <span className="text-[11px] text-red-300 font-mono leading-tight">{errorMessage}</span>
          </div>
          <button
            type="button"
            onClick={() => setErrorMessage(null)}
            className="text-red-300 hover:text-white p-0.5 cursor-pointer shrink-0"
            aria-label="Cerrar aviso de error"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}

export default ScalerHomeLogoShowcase;
