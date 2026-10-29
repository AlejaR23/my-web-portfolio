import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { getPermanentImage } from '../data/permanentImages';
import {
  getStoredImageSync,
  getStoredImageAsync,
} from '../utils/imageStorage';

export interface BrandLogoItem {
  id: string;
  name: string;
  defaultLogoSvg?: string;
  isCustomSlot?: boolean;
}

export interface KonradLogoMarqueeProps {
  variant?: 'hero' | 'section';
  className?: string;
}

export const DEFAULT_LOGOS: BrandLogoItem[] = [
  {
    id: 'brand-logo-exofauna',
    name: 'EXOFAUNA',
    defaultLogoSvg: `
      <svg viewBox="0 0 260 70" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
        <text x="50%" y="48" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-weight="900" font-size="36" letter-spacing="7" text-anchor="middle">EXOFAUNA</text>
      </svg>
    `,
  },
  {
    id: 'brand-logo-tempo',
    name: 'TEMPO',
    defaultLogoSvg: `
      <svg viewBox="0 0 260 70" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
        <text x="50%" y="48" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-weight="900" font-size="38" letter-spacing="8" text-anchor="middle">TEMPO</text>
      </svg>
    `,
  },
  {
    id: 'brand-logo-scaler',
    name: 'SCALER',
    defaultLogoSvg: `
      <svg viewBox="0 0 260 70" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
        <text x="50%" y="48" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-weight="900" font-size="38" letter-spacing="7" text-anchor="middle">SCALER</text>
      </svg>
    `,
  },
  {
    id: 'brand-logo-sevale',
    name: 'SE VALE AVISAR',
    defaultLogoSvg: `
      <svg viewBox="0 0 290 70" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
        <text x="50%" y="48" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-weight="900" font-size="30" letter-spacing="5" text-anchor="middle">SE VALE AVISAR</text>
      </svg>
    `,
  },
  {
    id: 'brand-logo-baul',
    name: 'VAULT',
    defaultLogoSvg: `
      <svg viewBox="0 0 260 70" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
        <text x="50%" y="48" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-weight="900" font-size="38" letter-spacing="8" text-anchor="middle">VAULT</text>
      </svg>
    `,
  },
  {
    id: 'brand-logo-taza',
    name: 'TAZZA CAFE',
    defaultLogoSvg: `
      <svg viewBox="0 0 260 70" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
        <text x="50%" y="48" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-weight="900" font-size="34" letter-spacing="7" text-anchor="middle">TAZZA</text>
      </svg>
    `,
  },
  {
    id: 'brand-logo-kiem',
    name: 'KIEM',
    defaultLogoSvg: `
      <svg viewBox="0 0 260 70" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
        <text x="50%" y="48" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-weight="900" font-size="38" letter-spacing="8" text-anchor="middle">KIEM</text>
      </svg>
    `,
  },
  {
    id: 'brand-logo-traveling',
    name: 'TRAVELING CHICKEN',
    defaultLogoSvg: `
      <svg viewBox="0 0 310 70" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
        <text x="50%" y="48" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-weight="900" font-size="26" letter-spacing="5" text-anchor="middle">TRAVELING CHICKEN</text>
      </svg>
    `,
  },
];

const EXTRA_SLOTS_KEY = 'ar_extra_marquee_slots';
const LOGO_MODES_KEY = 'ar_logo_color_modes';

export const KonradLogoMarquee: React.FC<KonradLogoMarqueeProps> = ({
  variant = 'section',
  className = '',
}) => {
  const isDev = import.meta.env.DEV;
  const { theme } = useTheme();

  // 1. Dynamic logos list (defaults + any user added extra slots)
  const [logoList, setLogoList] = useState<BrandLogoItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(EXTRA_SLOTS_KEY);
        if (stored) {
          const parsed: BrandLogoItem[] = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return [...DEFAULT_LOGOS, ...parsed];
          }
        }
      } catch (e) {
        console.warn('Error reading extra slots:', e);
      }
    }
    return DEFAULT_LOGOS;
  });

  // 2. Custom logo images dictionary (loaded synchronously first from localStorage / bundle)
  const [customLogos, setCustomLogos] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    DEFAULT_LOGOS.forEach((logo) => {
      const syncVal = getStoredImageSync(logo.id) || getPermanentImage(logo.id);
      if (syncVal) initial[logo.id] = syncVal;
    });
    return initial;
  });

  // 3. Color rendering mode: 'adaptive' (auto black/white silhouette) or 'original' (true PNG colors)
  const [logoModes, setLogoModes] = useState<Record<string, 'adaptive' | 'original'>>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(LOGO_MODES_KEY);
        if (saved) return JSON.parse(saved);
      } catch {}
    }
    return {};
  });

  // Sync extra slots listener across instances
  useEffect(() => {
    const handleSlotsChange = () => {
      try {
        const stored = localStorage.getItem(EXTRA_SLOTS_KEY);
        if (stored) {
          const parsed: BrandLogoItem[] = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            setLogoList([...DEFAULT_LOGOS, ...parsed]);
          }
        } else {
          setLogoList(DEFAULT_LOGOS);
        }
      } catch {}
    };

    const handleModesChange = () => {
      try {
        const saved = localStorage.getItem(LOGO_MODES_KEY);
        if (saved) setLogoModes(JSON.parse(saved));
      } catch {}
    };

    window.addEventListener('ar_marquee_slots_updated', handleSlotsChange);
    window.addEventListener('ar_marquee_modes_updated', handleModesChange);
    return () => {
      window.removeEventListener('ar_marquee_slots_updated', handleSlotsChange);
      window.removeEventListener('ar_marquee_modes_updated', handleModesChange);
    };
  }, []);

  // Hydrate all logos asynchronously from IndexedDB (with legacy localStorage fallback) on mount
  useEffect(() => {
    let isMounted = true;

    // Load every logo from IndexedDB if not already in memory, with bundled permanent image guarantee
    logoList.forEach((logo) => {
      const syncVal = getStoredImageSync(logo.id) || getPermanentImage(logo.id);
      if (syncVal) {
        setCustomLogos((prev) => ({ ...prev, [logo.id]: syncVal }));
      }

      getStoredImageAsync(logo.id).then((val: string | null) => {
        const finalVal = val || getPermanentImage(logo.id);
        if (isMounted && finalVal) {
          setCustomLogos((prev) => {
            if (prev[logo.id] === finalVal) return prev;
            return { ...prev, [logo.id]: finalVal };
          });
        }
      });
    });

    // Targeted real-time update listener: NEVER drop existing logos!
    const handleUpdate = (e: Event) => {
      const customEvt = e as CustomEvent;
      const updatedId = customEvt.detail?.identifier;
      const dataUrl = customEvt.detail?.dataUrl;

      if (updatedId) {
        setCustomLogos((prev) => {
          if (dataUrl) {
            return { ...prev, [updatedId]: dataUrl };
          } else {
            const next = { ...prev };
            delete next[updatedId];
            return next;
          }
        });
      } else {
        // Fallback: check all logos without clearing state
        logoList.forEach((l) => {
          const val = getStoredImageSync(l.id);
          if (val) {
            setCustomLogos((prev) => ({ ...prev, [l.id]: val }));
          }
        });
      }
    };

    window.addEventListener('ar_image_updated', handleUpdate);
    return () => {
      isMounted = false;
      window.removeEventListener('ar_image_updated', handleUpdate);
    };
  }, [logoList]);

  // Duplicate items for continuous seamless loop marquee
  const marqueeList = [...logoList, ...logoList];
  const isHero = variant === 'hero';

  return (
    <div
      className={`w-full overflow-hidden relative select-none transition-colors duration-200 ${
        isHero
          ? 'py-4 sm:py-5 bg-transparent border-0'
          : 'py-6 sm:py-8 bg-transparent border-0'
      } ${className}`}
      style={{
        WebkitMaskImage:
          'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.15) 2%, rgba(0,0,0,0.7) 6%, black 12%, black 88%, rgba(0,0,0,0.7) 94%, rgba(0,0,0,0.15) 98%, transparent 100%)',
        maskImage:
          'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.15) 2%, rgba(0,0,0,0.7) 6%, black 12%, black 88%, rgba(0,0,0,0.7) 94%, rgba(0,0,0,0.15) 98%, transparent 100%)',
      }}
    >
      {/* Marquee Animation Track */}
      <div
        className={`animate-konrad-marquee flex items-center ${
          isHero ? 'gap-6 sm:gap-10 py-1' : 'gap-6 sm:gap-8 md:gap-10 py-2'
        }`}
      >
        {marqueeList.map((logo, idx) => {
          const hasCustom = Boolean(customLogos[logo.id]);
          const customSrc = customLogos[logo.id];
          const mode = logoModes[logo.id] || 'adaptive';
          const isAdaptive = mode === 'adaptive';

          if (isHero) {
            // HERO VARIANT: Sleek, high-presence, borderless floating logo card
            return (
              <div
                key={`${logo.id}-hero-${idx}`}
                className="group relative flex-shrink-0 w-48 sm:w-64 h-22 sm:h-28 bg-transparent hover:bg-white/[0.06] transition-all duration-300 flex items-center justify-center p-2.5 sm:p-3.5 select-none"
                title={logo.name}
              >
                {/* Logo Graphic Stage: OCCUPIES MAXIMUM AVAILABLE SPACE */}
                <div className="w-full h-full flex items-center justify-center pointer-events-none">
                  {hasCustom ? (
                    <img
                      src={customSrc}
                      alt={logo.name}
                      style={
                        isAdaptive
                          ? {
                              filter:
                                theme === 'dark'
                                  ? 'brightness(0) invert(1)'
                                  : 'brightness(0)',
                            }
                          : undefined
                      }
                      className="w-full h-full max-h-16 sm:max-h-22 max-w-[94%] object-contain transition-transform duration-300 group-hover:scale-105 select-none"
                    />
                  ) : (
                    <div
                      className={`${
                        theme === 'dark'
                          ? 'text-white/85 group-hover:text-white'
                          : 'text-black/85 group-hover:text-black'
                      } transition-colors duration-300 w-full h-full flex items-center justify-center [&>svg]:w-full [&>svg]:h-full [&>svg]:max-h-16 [&>svg]:sm:max-h-20 [&>svg]:object-contain`}
                      dangerouslySetInnerHTML={{ __html: logo.defaultLogoSvg || '' }}
                    />
                  )}
                </div>
              </div>
            );
          }

          // SECTION VARIANT: Generous, prominent, impactful floating logo card
          return (
            <div
              key={`${logo.id}-section-${idx}`}
              className="group relative flex-shrink-0 w-44 sm:w-54 md:w-60 h-20 sm:h-24 md:h-26 bg-transparent hover:bg-neutral-100/60 dark:hover:bg-neutral-900/60 transition-all duration-300 flex items-center justify-center p-2.5 sm:p-3 select-none"
              title={logo.name}
            >
              {/* Logo Display Stage: OCCUPIES PROMINENT GENEROUS SPACE */}
              <div className="w-full h-full flex items-center justify-center pointer-events-none">
                {hasCustom ? (
                  <img
                    src={customSrc}
                    alt={logo.name}
                    style={
                      isAdaptive
                        ? {
                            filter:
                              theme === 'dark'
                                ? 'brightness(0) invert(1)'
                                : 'brightness(0)',
                          }
                        : undefined
                    }
                    className="w-full h-full max-h-13 sm:max-h-15 md:max-h-17 max-w-[90%] object-contain transition-all duration-300 group-hover:scale-105 select-none"
                  />
                ) : (
                  <div
                    className="text-neutral-900 group-hover:text-black dark:text-neutral-100 dark:group-hover:text-white transition-colors duration-300 w-full h-full flex items-center justify-center [&>svg]:w-full [&>svg]:h-full [&>svg]:max-h-13 [&>svg]:sm:max-h-15 [&>svg]:md:max-h-17 [&>svg]:object-contain"
                    dangerouslySetInnerHTML={{ __html: logo.defaultLogoSvg || '' }}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default KonradLogoMarquee;
