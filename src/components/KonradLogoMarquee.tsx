import React, { useState, useEffect } from 'react';
import { Upload, Trash2, Plus, Check, Palette, Sparkles, Loader2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import {
  getStoredImageSync,
  persistImage,
  removePersistedImage,
  getStoredImageAsync,
  optimizeLogoFile,
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
      <svg viewBox="0 0 240 70" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
        <text x="50%" y="46" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-weight="900" font-size="30" letter-spacing="6" text-anchor="middle">EXOFAUNA</text>
      </svg>
    `,
  },
  {
    id: 'brand-logo-tempo',
    name: 'TEMPO',
    defaultLogoSvg: `
      <svg viewBox="0 0 240 70" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
        <text x="50%" y="46" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-weight="900" font-size="32" letter-spacing="7" text-anchor="middle">TEMPO</text>
      </svg>
    `,
  },
  {
    id: 'brand-logo-scaler',
    name: 'SCALER',
    defaultLogoSvg: `
      <svg viewBox="0 0 240 70" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
        <text x="50%" y="46" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-weight="900" font-size="32" letter-spacing="6" text-anchor="middle">SCALER</text>
      </svg>
    `,
  },
  {
    id: 'brand-logo-sevale',
    name: 'SE VALE AVISAR',
    defaultLogoSvg: `
      <svg viewBox="0 0 260 70" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
        <text x="50%" y="46" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-weight="900" font-size="24" letter-spacing="4" text-anchor="middle">SE VALE AVISAR</text>
      </svg>
    `,
  },
  {
    id: 'brand-logo-baul',
    name: 'VAULT',
    defaultLogoSvg: `
      <svg viewBox="0 0 240 70" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
        <text x="50%" y="46" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-weight="900" font-size="32" letter-spacing="7" text-anchor="middle">VAULT</text>
      </svg>
    `,
  },
  {
    id: 'brand-logo-taza',
    name: 'TAZZA CAFE',
    defaultLogoSvg: `
      <svg viewBox="0 0 240 70" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
        <text x="50%" y="46" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-weight="900" font-size="28" letter-spacing="6" text-anchor="middle">TAZZA</text>
      </svg>
    `,
  },
  {
    id: 'brand-logo-kiem',
    name: 'KIEM',
    defaultLogoSvg: `
      <svg viewBox="0 0 240 70" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
        <text x="50%" y="46" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-weight="900" font-size="32" letter-spacing="7" text-anchor="middle">KIEM</text>
      </svg>
    `,
  },
  {
    id: 'brand-logo-traveling',
    name: 'TRAVELING CHICKEN',
    defaultLogoSvg: `
      <svg viewBox="0 0 280 70" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
        <text x="50%" y="46" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-weight="900" font-size="22" letter-spacing="4" text-anchor="middle">TRAVELING CHICKEN</text>
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

  // 2. Custom logo images dictionary (loaded synchronously first from localStorage)
  const [customLogos, setCustomLogos] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    DEFAULT_LOGOS.forEach((logo) => {
      const syncVal = getStoredImageSync(logo.id);
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

  // 4. Processing status indicator for upload
  const [processingId, setProcessingId] = useState<string | null>(null);

  // 5. User feedback notice for storage events
  const [marqueeFeedback, setMarqueeFeedback] = useState<{
    type: 'saved' | 'error';
    title: string;
    detail?: string;
  } | null>(null);

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

    // Load every logo from IndexedDB if not already in memory
    logoList.forEach((logo) => {
      const syncVal = getStoredImageSync(logo.id);
      if (syncVal) {
        setCustomLogos((prev) => ({ ...prev, [logo.id]: syncVal }));
      }

      getStoredImageAsync(logo.id).then((val: string | null) => {
        if (isMounted && val) {
          setCustomLogos((prev) => {
            if (prev[logo.id] === val) return prev;
            return { ...prev, [logo.id]: val };
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

  // Handle uploading PNG / SVG logo with transparency preservation & auto-optimization
  const handleUploadLogo = async (logoId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setProcessingId(logoId);
      // 1. Optimize PNG to lightweight (<50KB), preserving 100% transparency
      const optimizedPng = await optimizeLogoFile(file);

      // 2. Persist to IndexedDB (primary & sole storage for new images)
      const result = await persistImage(logoId, optimizedPng);

      // 3. Update local state immediately on confirmed save
      if (result && result.saved) {
        setCustomLogos((prev) => ({ ...prev, [logoId]: optimizedPng }));
        setMarqueeFeedback({
          type: 'saved',
          title: 'Logo guardado en IndexedDB',
          detail: 'Almacenado en este navegador. No añade el archivo al proyecto ni garantiza persistencia si AI Studio cambia o limpia el origen.',
        });
        setTimeout(() => setMarqueeFeedback(null), 4500);
      }
    } catch (err) {
      console.error('Error optimizando y guardando logo:', err);
      const errorMsg = err instanceof Error ? err.message : 'Error desconocido al guardar en IndexedDB.';
      setMarqueeFeedback({
        type: 'error',
        title: 'Error al guardar el logo en el navegador',
        detail: `${errorMsg} Se conserva el logo anterior.`,
      });
      setTimeout(() => setMarqueeFeedback(null), 6000);
    } finally {
      setProcessingId(null);
      e.target.value = '';
    }
  };

  // Handle removing a custom uploaded logo
  const handleRemoveLogo = async (logoId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await removePersistedImage(logoId);
      setCustomLogos((prev) => {
        const copy = { ...prev };
        delete copy[logoId];
        return copy;
      });
    } catch (err) {
      console.error('Error eliminando logo:', err);
    }
  };

  // Toggle between Adaptive Monochrome (clean black/white) and Original Colors
  const toggleLogoMode = (logoId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLogoModes((prev) => {
      const current = prev[logoId] || 'adaptive';
      const updated: 'adaptive' | 'original' = current === 'adaptive' ? 'original' : 'adaptive';
      const next: Record<string, 'adaptive' | 'original'> = { ...prev, [logoId]: updated };
      try {
        localStorage.setItem(LOGO_MODES_KEY, JSON.stringify(next));
        window.dispatchEvent(new Event('ar_marquee_modes_updated'));
      } catch {}
      return next;
    });
  };

  // Add an extra logo slot if the user has more than 8 brands
  const handleAddSlot = () => {
    const newId = `brand-logo-custom-${Date.now()}`;
    const newSlot: BrandLogoItem = {
      id: newId,
      name: `LOGOTIPO ${logoList.length + 1}`,
      defaultLogoSvg: `
        <svg viewBox="0 0 240 70" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
          <text x="50%" y="46" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-weight="900" font-size="24" letter-spacing="5" text-anchor="middle">NUEVO LOGO</text>
        </svg>
      `,
      isCustomSlot: true,
    };

    const extraSlots = logoList.filter((l) => l.isCustomSlot).concat(newSlot);
    try {
      localStorage.setItem(EXTRA_SLOTS_KEY, JSON.stringify(extraSlots));
      window.dispatchEvent(new Event('ar_marquee_slots_updated'));
    } catch {}
    setLogoList((prev) => [...prev, newSlot]);
  };

  // Delete a user-created extra slot
  const handleDeleteSlot = async (logoId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    await handleRemoveLogo(logoId, e);
    const updatedExtras = logoList.filter((l) => l.isCustomSlot && l.id !== logoId);
    try {
      localStorage.setItem(EXTRA_SLOTS_KEY, JSON.stringify(updatedExtras));
      window.dispatchEvent(new Event('ar_marquee_slots_updated'));
    } catch {}
    setLogoList(DEFAULT_LOGOS.concat(updatedExtras));
  };

  // Duplicate items for continuous seamless loop marquee
  const marqueeList = [...logoList, ...logoList];
  const isHero = variant === 'hero';

  return (
    <div
      className={`w-full overflow-hidden relative select-none transition-colors duration-200 ${
        isHero
          ? 'py-4 sm:py-5 bg-transparent border-0'
          : 'py-10 sm:py-14 bg-white dark:bg-black border-0'
      } ${className}`}
      style={
        isHero
          ? {
              WebkitMaskImage:
                'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.15) 2%, rgba(0,0,0,0.7) 6%, black 12%, black 88%, rgba(0,0,0,0.7) 94%, rgba(0,0,0,0.15) 98%, transparent 100%)',
              maskImage:
                'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.15) 2%, rgba(0,0,0,0.7) 6%, black 12%, black 88%, rgba(0,0,0,0.7) 94%, rgba(0,0,0,0.15) 98%, transparent 100%)',
            }
          : undefined
      }
    >
      {/* Edge Fade Masks for Section Variant */}
      {!isHero && (
        <>
          <div className="absolute top-0 bottom-0 left-0 w-20 sm:w-36 bg-gradient-to-r from-white via-white/80 to-transparent dark:from-black dark:via-black/80 dark:to-transparent z-20 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-20 sm:w-36 bg-gradient-to-l from-white via-white/80 to-transparent dark:from-black dark:via-black/80 dark:to-transparent z-20 pointer-events-none" />
        </>
      )}

      {/* Marquee Animation Track */}
      <div
        className={`animate-konrad-marquee flex items-center ${
          isHero ? 'gap-6 sm:gap-10 py-1' : 'gap-8 sm:gap-14 py-2'
        }`}
      >
        {marqueeList.map((logo, idx) => {
          const hasCustom = Boolean(customLogos[logo.id]);
          const customSrc = customLogos[logo.id];
          const mode = logoModes[logo.id] || 'adaptive';
          const isAdaptive = mode === 'adaptive';
          const isBusy = processingId === logo.id;
          const inputId = `marquee-upload-${variant}-${logo.id}-${idx}`;

          if (isHero) {
            // HERO VARIANT: Sleek, high-presence, borderless floating logo card
            return (
              <div
                key={`${logo.id}-hero-${idx}`}
                className="group relative flex-shrink-0 w-48 sm:w-64 h-22 sm:h-28 bg-transparent hover:bg-white/[0.06] transition-all duration-300 flex items-center justify-center p-2.5 sm:p-3.5 cursor-pointer"
                title={isDev ? `${logo.name}: Pasa el cursor para subir o cambiar el logo PNG` : logo.name}
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

                {/* Hover Upload & Settings Overlay: Appears ONLY on hover in dev */}
                {isDev && (
                  <div className="absolute inset-0 bg-black/85 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-1.5 p-2 z-30">
                    {isBusy ? (
                      <div className="flex items-center gap-1.5 text-white font-mono text-[10px]">
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Fijando PNG...</span>
                      </div>
                    ) : (
                      <>
                        <label
                          htmlFor={inputId}
                          className="px-3 py-1 bg-white text-black hover:bg-neutral-200 font-mono text-[10px] font-semibold tracking-wider uppercase flex items-center gap-1 cursor-pointer transition-colors shadow-xs"
                        >
                          <Upload className="w-2.5 h-2.5" />
                          <span>{hasCustom ? 'Cambiar PNG' : 'Subir PNG'}</span>
                        </label>
                        <input
                          id={inputId}
                          type="file"
                          accept="image/png,image/svg+xml,image/jpeg,image/webp"
                          className="hidden"
                          onChange={(e) => handleUploadLogo(logo.id, e)}
                        />

                        {hasCustom && (
                          <div className="flex items-center gap-2">
                            {/* Color mode toggle */}
                            <button
                              type="button"
                              onClick={(e) => toggleLogoMode(logo.id, e)}
                              className="text-[9px] text-white/80 hover:text-white font-mono flex items-center gap-1 transition-colors cursor-pointer bg-white/10 px-2 py-0.5 rounded-xs"
                              title={
                                isAdaptive
                                  ? 'Modo actual: B/N adaptable. Clic para ver colores originales'
                                  : 'Modo actual: Color original. Clic para ver B/N adaptable'
                              }
                            >
                              <Palette className="w-2.5 h-2.5" />
                              <span>{isAdaptive ? 'B/N' : 'Original'}</span>
                            </button>

                            {/* Restore default button */}
                            <button
                              type="button"
                              onClick={(e) => handleRemoveLogo(logo.id, e)}
                              className="text-[9px] text-neutral-300 hover:text-red-400 font-mono flex items-center gap-0.5 transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-2.5 h-2.5" />
                              <span>Restaurar</span>
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )}

                {/* Subtle indicator dot when custom PNG is active */}
                {hasCustom && (
                  <span
                    className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400 pointer-events-none"
                    title="PNG fijado permanente"
                  />
                )}
              </div>
            );
          }

          // SECTION VARIANT: Big, prominent, borderless floating logo card
          return (
            <div
              key={`${logo.id}-section-${idx}`}
              className="group relative flex-shrink-0 w-60 sm:w-80 h-36 sm:h-44 bg-transparent hover:bg-neutral-100/60 dark:hover:bg-neutral-900/60 transition-all duration-300 flex items-center justify-center p-3 sm:p-5 cursor-pointer"
              title={isDev ? `${logo.name}: Pasa el cursor para subir o cambiar el logo PNG` : logo.name}
            >
              {/* Logo Display Stage: OCCUPIES MAXIMUM AVAILABLE SPACE */}
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
                    className="w-full h-full max-h-28 sm:max-h-36 max-w-[94%] object-contain transition-all duration-300 group-hover:scale-105 select-none"
                  />
                ) : (
                  <div
                    className="text-neutral-900 group-hover:text-black dark:text-neutral-100 dark:group-hover:text-white transition-colors duration-300 w-full h-full flex items-center justify-center [&>svg]:w-full [&>svg]:h-full [&>svg]:max-h-28 [&>svg]:sm:max-h-36 [&>svg]:object-contain"
                    dangerouslySetInnerHTML={{ __html: logo.defaultLogoSvg || '' }}
                  />
                )}
              </div>

              {/* Hover Action Overlay with Upload & Color Controls (AI Studio dev only) */}
              {isDev && (
                <div className="absolute inset-0 bg-white/95 dark:bg-black/92 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-2.5 p-3 z-30">
                  {isBusy ? (
                    <div className="flex items-center gap-2 text-black dark:text-white font-mono text-xs">
                      <Loader2 className="w-4 h-4 animate-spin text-[#5E0ED7]" />
                      <span>Fijando logo PNG...</span>
                    </div>
                  ) : (
                    <>
                      <label
                        htmlFor={inputId}
                        className="px-3.5 py-1.5 bg-black text-white dark:bg-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 font-mono text-xs font-semibold tracking-wide uppercase flex items-center gap-1.5 cursor-pointer transition-colors shadow-sm"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>{hasCustom ? 'Cambiar PNG' : 'Subir PNG'}</span>
                      </label>
                      <input
                        id={inputId}
                        type="file"
                        accept="image/png,image/svg+xml,image/jpeg,image/webp"
                        className="hidden"
                        onChange={(e) => handleUploadLogo(logo.id, e)}
                      />

                      {hasCustom && (
                        <div className="flex items-center gap-3">
                          {/* Toggle original vs adaptive monochrome */}
                          <button
                            type="button"
                            onClick={(e) => toggleLogoMode(logo.id, e)}
                            className="px-2.5 py-1 bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 font-mono text-[10px] flex items-center gap-1 transition-colors cursor-pointer"
                            title="Alternar entre filtro monocromático y colores originales"
                          >
                            <Palette className="w-3 h-3 text-[#5E0ED7]" />
                            <span>{isAdaptive ? 'Tema B/N' : 'Color original'}</span>
                          </button>

                          {/* Restore original default vector */}
                          <button
                            type="button"
                            onClick={(e) => handleRemoveLogo(logo.id, e)}
                            className="text-[10px] text-neutral-500 hover:text-red-600 dark:text-neutral-400 dark:hover:text-red-400 font-mono flex items-center gap-1 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3 h-3" />
                            <span>Restaurar</span>
                          </button>
                        </div>
                      )}

                      {logo.isCustomSlot && (
                        <button
                          type="button"
                          onClick={(e) => handleDeleteSlot(logo.id, e)}
                          className="text-[9px] text-red-500 hover:underline font-mono cursor-pointer"
                        >
                          Eliminar esta ranura
                        </button>
                      )}
                    </>
                  )}
                </div>
              )}

              {/* Indicator badge if custom logo is uploaded and permanently fixed */}
              {isDev && hasCustom && (
                <span
                  className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 pointer-events-none"
                  title="Logo PNG fijado permanente"
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Subtle control row for Section variant (allows adding more logo slots in dev environment) */}
      {isDev && !isHero && (
        <div className="w-full px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 mt-4 flex items-center justify-between text-[11px] font-mono text-neutral-400 dark:text-neutral-500">
          <span className="flex items-center gap-2">
            <Sparkles className="w-3 h-3 text-[#5E0ED7]" />
            <span>Pasa el cursor sobre cualquier logo para fijar tu archivo PNG transparente</span>
          </span>

          <button
            type="button"
            onClick={handleAddSlot}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-sm border border-neutral-300 dark:border-neutral-700 hover:border-black dark:hover:border-white text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
            title="Añadir otra ranura para un logotipo adicional"
          >
            <Plus className="w-3 h-3" />
            <span>Añadir ranura de logo</span>
          </button>
        </div>
      )}

      {/* Accessible feedback banner for logo uploads (IndexedDB) */}
      {marqueeFeedback && (
        <div
          role={marqueeFeedback.type === 'error' ? 'alert' : 'status'}
          aria-live={marqueeFeedback.type === 'error' ? 'assertive' : 'polite'}
          className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 text-xs font-sans font-medium flex flex-col gap-1 border shadow-2xl pointer-events-auto max-w-[92%] sm:max-w-md backdrop-blur-md animate-in fade-in slide-in-from-bottom-2 duration-200 ${
            marqueeFeedback.type === 'saved'
              ? 'bg-neutral-900/95 text-white border-emerald-500/60'
              : 'bg-red-950/95 text-white border-red-500/70'
          }`}
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              {marqueeFeedback.type === 'saved' ? (
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" aria-hidden="true" />
              ) : (
                <Trash2 className="w-3.5 h-3.5 text-red-400 shrink-0" aria-hidden="true" />
              )}
              <span
                className={`font-semibold tracking-tight ${
                  marqueeFeedback.type === 'saved' ? 'text-emerald-300' : 'text-red-200'
                }`}
              >
                {marqueeFeedback.title}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setMarqueeFeedback(null)}
              className="text-neutral-400 hover:text-white p-0.5 cursor-pointer text-sm leading-none"
              aria-label="Cerrar aviso"
            >
              &times;
            </button>
          </div>
          {marqueeFeedback.detail && (
            <p className="text-[11px] text-neutral-300 font-mono leading-snug">
              {marqueeFeedback.detail}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default KonradLogoMarquee;
