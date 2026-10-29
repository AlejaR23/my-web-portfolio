import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Upload, X, Check } from 'lucide-react';
import { useRouter } from '../../context/RouterContext';
import {
  persistImage,
  getStoredImageSync,
  getStoredImageAsync,
  optimizeImageFile,
  removePersistedImage,
} from '../../utils/imageStorage';

export interface HoverExpandImageItem {
  src: string;
  alt?: string;
  code?: string;
  title?: string;
  subtitle?: string;
  slug?: string;
  slotId?: string;
  href?: string;
  [key: string]: any;
}

export interface HoverExpand_001Props {
  images: HoverExpandImageItem[];
  className?: string;
  defaultExpandedIndex?: number;
  onSelect?: (index: number, image: HoverExpandImageItem) => void;
}

export function HoverExpand_001({
  images,
  className = '',
  defaultExpandedIndex = 0,
  onSelect,
}: HoverExpand_001Props) {
  const isDev = import.meta.env.DEV;
  const [activeIndex, setActiveIndex] = useState<number>(defaultExpandedIndex);
  const [draggedOverIndex, setDraggedOverIndex] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [customPhotos, setCustomPhotos] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    images.forEach((img) => {
      const key = img.slug || img.slotId;
      if (key) {
        const stored = getStoredImageSync(key) || (img.slotId ? getStoredImageSync(img.slotId) : null);
        if (stored) {
          initial[key] = stored;
          if (img.slug) initial[img.slug] = stored;
          if (img.slotId) initial[img.slotId] = stored;
        }
      }
    });
    return initial;
  });

  const router = useRouter();

  useEffect(() => {
    let isMounted = true;

    images.forEach((img) => {
      const targetKey = img.slug || img.slotId;
      if (!targetKey) return;

      getStoredImageAsync(targetKey).then((val) => {
        if (isMounted && val) {
          setCustomPhotos((prev) => ({
            ...prev,
            [targetKey]: val,
            ...(img.slug ? { [img.slug]: val } : {}),
            ...(img.slotId ? { [img.slotId]: val } : {}),
          }));
        }
      });
    });

    const handleUpdate = (e: Event) => {
      const customEvt = e as CustomEvent;
      const id = customEvt.detail?.identifier;
      const dataUrl = customEvt.detail?.dataUrl;
      if (!id) return;

      setCustomPhotos((prev) => {
        const updated = { ...prev };
        if (dataUrl) {
          updated[id] = dataUrl;
        } else {
          delete updated[id];
        }
        return updated;
      });
    };

    window.addEventListener('ar_image_updated', handleUpdate);
    return () => {
      isMounted = false;
      window.removeEventListener('ar_image_updated', handleUpdate);
    };
  }, [images]);

  if (!images || images.length === 0) {
    return null;
  }

  const handleCardClick = (index: number, img: HoverExpandImageItem) => {
    setActiveIndex(index);
    if (onSelect) {
      onSelect(index, img);
    } else if (img.href) {
      router.navigate(img.href);
    } else if (img.slug) {
      router.navigate(`/work/${img.slug}`);
    }
  };

  const handleFileUpload = async (file: File, img: HoverExpandImageItem) => {
    const targetKey = img.slug || img.slotId;
    if (!targetKey) return;

    setErrorMessage(null);
    try {
      const optimized = await optimizeImageFile(file);

      // Wait for all required IndexedDB writes to finish
      await persistImage(targetKey, optimized);
      if (img.slug && img.slug !== targetKey) {
        await persistImage(img.slug, optimized);
      }
      if (img.slotId && img.slotId !== targetKey) {
        await persistImage(img.slotId, optimized);
      }

      // Only commit new preview after writes succeed
      setCustomPhotos((prev) => ({
        ...prev,
        [targetKey]: optimized,
        ...(img.slug ? { [img.slug]: optimized } : {}),
        ...(img.slotId ? { [img.slotId]: optimized } : {}),
      }));
    } catch (err) {
      console.error('Error optimizando y guardando imagen:', err);
      const msg = err instanceof Error ? err.message : 'Error desconocido al guardar en IndexedDB.';
      setErrorMessage(`No se pudo guardar la imagen para "${img.title || targetKey}". Se conserva la imagen anterior. (${msg})`);
      setTimeout(() => setErrorMessage(null), 7000);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, img: HoverExpandImageItem) => {
    e.stopPropagation();
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file, img);
    }
  };

  const handleDrop = (e: React.DragEvent, index: number, img: HoverExpandImageItem) => {
    e.preventDefault();
    e.stopPropagation();
    setDraggedOverIndex(null);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      handleFileUpload(file, img);
    }
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    setDraggedOverIndex(index);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDraggedOverIndex(null);
  };

  const handleClearImage = async (e: React.MouseEvent, img: HoverExpandImageItem) => {
    e.stopPropagation();
    setErrorMessage(null);
    const targetKey = img.slug || img.slotId;
    if (!targetKey) return;

    setCustomPhotos((prev) => {
      const next = { ...prev };
      delete next[targetKey];
      if (img.slug) delete next[img.slug];
      if (img.slotId) delete next[img.slotId];
      return next;
    });

    await removePersistedImage(targetKey);
  };

  return (
    <div
      className={`w-full select-none ${className}`}
      role="region"
      aria-label="Galería interactiva Hover Expand"
    >
      <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3.5 h-[500px] sm:h-[540px] md:h-[580px] lg:h-[620px] w-full items-stretch">
        {images.map((img, index) => {
          const isActive = activeIndex === index;
          const isDraggingOverThis = draggedOverIndex === index;

          const key = img.slug || img.slotId || '';
          const customSrc =
            customPhotos[key] ||
            (img.slug ? customPhotos[img.slug] : null) ||
            (img.slotId ? customPhotos[img.slotId] : null);

          const displaySrc = customSrc || img.src;

          return (
            <motion.div
              key={img.code || img.slug || index}
              layout
              transition={{
                type: 'spring',
                stiffness: 280,
                damping: 28,
                mass: 0.9,
              }}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => handleCardClick(index, img)}
              onDrop={(e) => handleDrop(e, index, img)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragLeave={handleDragLeave}
              className={`relative overflow-hidden cursor-pointer transition-all duration-300 border ${
                isActive
                  ? 'flex-[5] sm:flex-[6] shadow-2xl border-[var(--border-hover)]'
                  : 'flex-[1] sm:flex-[1.1] hover:flex-[1.4] opacity-80 hover:opacity-100 border-[var(--border)]'
              } ${isDraggingOverThis ? 'border-[var(--text)] scale-[1.01]' : ''}`}
              style={{ minWidth: isActive ? '280px' : '64px' }}
            >
              {/* Full-Bleed Photograph / Image */}
              <div className="absolute inset-0 w-full h-full bg-[var(--surface)] overflow-hidden">
                <motion.img
                  src={displaySrc}
                  alt={img.alt || `Obra ${img.code || index + 1}`}
                  loading="lazy"
                  animate={{
                    scale: isActive ? 1.04 : 1.0,
                  }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full object-cover select-none pointer-events-none"
                />

                {/* Ambient Scrim Overlay: Clean subtle contrast without white fog/difuminado */}
                <div
                  className={`absolute inset-0 transition-opacity duration-300 pointer-events-none ${
                    isActive
                      ? 'opacity-0'
                      : 'bg-black/25 hover:bg-black/10'
                  }`}
                />
              </div>

              {/* Top Bar: Controls (AI Studio dev only) */}
              {isDev && (
                <div className="absolute top-4 inset-x-4 z-20 flex items-center justify-end pointer-events-none">
                  {/* Placeholder Upload / Replace Buttons */}
                  {isActive && (
                    <div className="flex items-center gap-2 pointer-events-auto">
                      {customSrc && (
                        <button
                          type="button"
                          onClick={(e) => handleClearImage(e, img)}
                          title="Restaurar imagen gráfica original"
                          aria-label="Restaurar imagen gráfica original"
                          className="p-1.5 sm:p-2 bg-[var(--surface)] hover:bg-red-500 hover:text-white text-[var(--text)] border border-[var(--border)] transition-all cursor-pointer shadow-md"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}

                      <label
                        onClick={(e) => e.stopPropagation()}
                        title="Cambiar imagen"
                        aria-label="Cambiar imagen"
                        className="p-1.5 sm:p-2 sm:px-3 bg-black/60 hover:bg-black/90 text-white border border-white/20 text-xs font-sans tracking-tight transition-all cursor-pointer inline-flex items-center gap-1.5 shadow-md backdrop-blur-sm"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">
                          {customSrc ? 'Cambiar foto' : 'Subir imagen'}
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileChange(e, img)}
                          className="sr-only"
                        />
                      </label>
                    </div>
                  )}
                </div>
              )}

              {/* Drag over cue (AI Studio dev only) */}
              {isDev && isDraggingOverThis && (
                <div className="absolute inset-0 z-30 bg-black/40 flex items-center justify-center pointer-events-none border-2 border-dashed border-white">
                  <span className="bg-[var(--surface)] text-[var(--text)] border border-[var(--border)] px-3.5 py-1.5 text-xs font-mono">
                    Soltar para fijar en {img.title}
                  </span>
                </div>
              )}

              {/* Bottom Card Information: directly on top of the image */}
              {isActive ? (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="absolute bottom-0 inset-x-0 p-6 sm:p-8 z-20 flex flex-col justify-end"
                >
                  <div className="flex items-end justify-between gap-4">
                    <div className="max-w-xl">
                      <h4 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight leading-snug drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                        {img.title || 'Proyecto'}
                      </h4>
                      {img.subtitle && (
                        <p className="text-xs sm:text-sm text-white/80 font-light mt-1 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                          {img.subtitle}
                        </p>
                      )}
                    </div>

                    <div className="shrink-0 flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-white text-black hover:bg-neutral-100 text-xs font-semibold tracking-wider shadow-xl transition-all">
                        <span>Ver proyecto</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="absolute bottom-4 inset-x-3 z-20 flex items-center justify-between text-white/90 drop-shadow-[0_1px_4px_rgba(0,0,0,0.95)]">
                  <span className="font-mono text-[11px] truncate font-medium">{img.title}</span>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Accessible Error Alert (role="alert" / aria-live="assertive") */}
      {errorMessage && (
        <div
          role="alert"
          aria-live="assertive"
          className="mt-3 p-3 bg-red-950/95 text-white border border-red-500/70 shadow-xl backdrop-blur-md flex items-start justify-between gap-3 text-xs font-sans animate-in fade-in"
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
