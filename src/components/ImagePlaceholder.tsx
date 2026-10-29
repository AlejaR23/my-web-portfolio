import React, { useState, useEffect, useRef } from 'react';
import { 
  Image, 
  Upload, 
  Copy, 
  Check, 
  X, 
  Maximize2, 
  Minimize2, 
  Crop, 
  Expand, 
  CheckCircle2,
  Sparkles,
  Loader2,
  AlertCircle
} from 'lucide-react';
import {
  persistImage,
  getStoredImageSync,
  getStoredImageAsync,
  optimizeImageFile,
  removePersistedImage,
} from '../utils/imageStorage';

interface ImagePlaceholderProps {
  label: string;
  sublabel?: string;
  aspect?: '16:9' | '4:3' | '1:1' | '21:9' | '3:4' | 'cinematic';
  dimensions?: string;
  className?: string;
  id?: string;
  slotId?: string;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  compact?: boolean;
  fixedFrame?: boolean;
  fillFrame?: boolean;
}

export function ImagePlaceholder({
  label,
  sublabel = 'Espacio reservado para imagen final de Alejandro Rivera',
  aspect = '16:9',
  dimensions = '1920 × 1080 px',
  className = '',
  id,
  slotId,
  compact = false,
  fixedFrame = false,
  fillFrame = false,
}: ImagePlaceholderProps) {
  const slotIdentifier = slotId || id || '';
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [previewUrl, setPreviewUrl] = useState<string | null>(() => {
    return slotIdentifier ? getStoredImageSync(slotIdentifier) : null;
  });
  const [copied, setCopied] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: 'idle' | 'saving' | 'saved' | 'error';
    title: string;
    detail?: string;
  }>({ type: 'idle', title: '' });
  const [fitMode, setFitMode] = useState<'natural' | 'cover'>(() => {
    return fillFrame ? 'cover' : 'natural';
  });
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [naturalDimensions, setNaturalDimensions] = useState<{ width: number; height: number } | null>(null);

  const activeBlobUrlRef = useRef<string | null>(null);
  const feedbackTimeoutRef = useRef<number | null>(null);

  // Sync state with storage and handle cross-tab/cross-component events
  useEffect(() => {
    if (!previewUrl) {
      setNaturalDimensions(null);
      return;
    }
    const img = new window.Image();
    img.src = previewUrl;
    img.onload = () => {
      if (img.naturalWidth && img.naturalHeight) {
        setNaturalDimensions({
          width: img.naturalWidth,
          height: img.naturalHeight,
        });
      }
    };
  }, [previewUrl]);

  useEffect(() => {
    if (!slotIdentifier) return;
    let isMounted = true;
    getStoredImageAsync(slotIdentifier).then((img) => {
      if (isMounted && img) {
        setPreviewUrl(img);
      }
    });

    const handleUpdate = (e: Event) => {
      const customEvt = e as CustomEvent;
      const cleanTarget = slotIdentifier.replace(/^ar_slot_/, '');
      if (customEvt.detail?.identifier === cleanTarget) {
        setPreviewUrl(customEvt.detail.dataUrl);
      }
    };

    window.addEventListener('ar_image_updated', handleUpdate);
    return () => {
      isMounted = false;
      window.removeEventListener('ar_image_updated', handleUpdate);
    };
  }, [slotIdentifier]);

  // Revoke any active blob URL cleanly
  const cleanupActiveBlob = () => {
    if (activeBlobUrlRef.current) {
      try {
        URL.revokeObjectURL(activeBlobUrlRef.current);
      } catch {
        // ignore
      }
      activeBlobUrlRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      cleanupActiveBlob();
      if (feedbackTimeoutRef.current) {
        window.clearTimeout(feedbackTimeoutRef.current);
      }
    };
  }, []);

  // Global paste handler when user hovers over this placeholder
  useEffect(() => {
    const handleGlobalPaste = (e: ClipboardEvent) => {
      if (!isHovered) return;
      const items = e.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.type.startsWith('image/')) {
          const file = item.getAsFile();
          if (file) {
            e.preventDefault();
            saveFile(file);
            break;
          }
        }
      }
    };

    window.addEventListener('paste', handleGlobalPaste);
    return () => {
      window.removeEventListener('paste', handleGlobalPaste);
    };
  }, [isHovered, slotIdentifier]);

  const aspectClass =
    aspect === 'cinematic'
      ? 'w-full h-[380px] sm:h-[480px] md:h-[560px] lg:h-[620px]'
      : aspect === '16:9'
      ? 'aspect-[16/9]'
      : aspect === '4:3'
      ? 'aspect-[4/3]'
      : aspect === '1:1'
      ? 'aspect-square'
      : aspect === '3:4'
      ? 'aspect-[3/4]'
      : 'aspect-[21/9]';

  const handleCopySlot = (e: React.MouseEvent) => {
    e.stopPropagation();
    const textToCopy = `Ranura: ${slotId ? `[${slotId}] ` : ''}${label} (${dimensions})`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const saveFile = async (file: File) => {
    if (!slotIdentifier) {
      setFeedback({
        type: 'error',
        title: 'Ranura no identificada',
        detail: 'No se puede guardar porque no hay slotId o id asignado a este componente.',
      });
      return;
    }

    if (feedbackTimeoutRef.current) {
      window.clearTimeout(feedbackTimeoutRef.current);
    }

    // 1. Accessible saving state
    setFeedback({
      type: 'saving',
      title: 'Guardando en el navegador (IndexedDB)…',
      detail: 'Optimizando imagen y registrando en IndexedDB local.',
    });

    try {
      const optimized = await optimizeImageFile(file);
      const result = await persistImage(slotIdentifier, optimized);

      // 2. Only commit new previewUrl once storage confirmed
      if (result && result.saved) {
        cleanupActiveBlob();
        setPreviewUrl(optimized);

        setFeedback({
          type: 'saved',
          title: 'Guardada en IndexedDB de este navegador',
          detail:
            'Almacenada en IndexedDB de este navegador. No añade el archivo al proyecto ni garantiza persistencia si AI Studio cambia o limpia el origen.',
        });

        feedbackTimeoutRef.current = window.setTimeout(() => {
          setFeedback((prev) => (prev.type === 'saved' ? { type: 'idle', title: '' } : prev));
        }, 5000);
      } else {
        throw new Error('IndexedDB no confirmó el guardado.');
      }
    } catch (err) {
      console.error('Error al guardar imagen en ImagePlaceholder:', err);
      const errorMsg =
        err instanceof Error ? err.message : 'Error desconocido al procesar o guardar la imagen en IndexedDB.';

      // Preserve previous previewUrl intact! Do NOT switch to an unverified fallback blob.
      setFeedback({
        type: 'error',
        title: 'Error al guardar la imagen en IndexedDB',
        detail: `${errorMsg} Se conserva la imagen anterior.`,
      });

      feedbackTimeoutRef.current = window.setTimeout(() => {
        setFeedback((prev) => (prev.type === 'error' ? { type: 'idle', title: '' } : prev));
      }, 7000);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      saveFile(file);
    }
    // Reset input value so re-uploading the same file triggers onChange
    e.target.value = '';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      saveFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleClearPreview = async (e: React.MouseEvent) => {
    e.stopPropagation();
    cleanupActiveBlob();
    if (previewUrl && previewUrl.startsWith('blob:')) {
      try {
        URL.revokeObjectURL(previewUrl);
      } catch {
        // ignore
      }
    }
    setPreviewUrl(null);
    setNaturalDimensions(null);
    setFeedback({ type: 'idle', title: '' });
    if (slotIdentifier) {
      await removePersistedImage(slotIdentifier);
    }
  };

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    if (img.naturalWidth && img.naturalHeight) {
      setNaturalDimensions({
        width: img.naturalWidth,
        height: img.naturalHeight,
      });
    }
  };

  return (
    <>
      <div
        id={id}
        ref={containerRef}
        tabIndex={0}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`relative w-full border outline-none ${
          previewUrl
            ? fixedFrame || fitMode === 'cover'
              ? `${aspectClass} border-[var(--border)] bg-[var(--surface)] p-0 overflow-hidden`
              : 'h-auto border-[var(--border)] bg-[var(--surface)] p-0 overflow-hidden block'
            : `${aspectClass} ${
                isDragging
                  ? `border-[var(--text)] bg-[var(--surface)] ${compact ? 'p-3.5 sm:p-5' : 'p-6 sm:p-12'}`
                  : `border-[var(--border)] bg-[var(--surface)] hover:border-[var(--border-hover)] ${compact ? 'p-3.5 sm:p-5' : 'p-6 sm:p-12'}`
              } flex flex-col items-center justify-center text-center overflow-hidden`
        } transition-all duration-300 group ${className}`}
        style={
          !fixedFrame && previewUrl && fitMode === 'natural' && naturalDimensions
            ? {
                aspectRatio: `${naturalDimensions.width} / ${naturalDimensions.height}`,
                maxHeight: '90vh',
              }
            : undefined
        }
      >
        {previewUrl ? (
          /* =========================================================================
             LOADED IMAGE CONTAINER:
             - In cover mode (or fillFrame): 100% edge-to-edge fill, zero padding,
               zero black side bars, covering the whole frame completely.
             - In natural mode: zero distortion, adapting cleanly to image aspect ratio.
             ========================================================================= */
          <div 
            className={`relative w-full ${
              fixedFrame || fitMode === 'cover'
                ? 'h-full p-0 overflow-hidden'
                : 'h-auto block'
            } group`}
          >
            <img
              src={previewUrl}
              alt={label}
              onLoad={handleImageLoad}
              className={`w-full block select-none ${
                fitMode === 'cover'
                  ? 'h-full object-cover'
                  : fixedFrame
                  ? 'h-full object-contain'
                  : 'h-auto object-contain'
              }`}
              style={{
                imageRendering: 'auto',
                display: 'block',
                width: '100%',
                height: fixedFrame || fitMode === 'cover' ? '100%' : 'auto',
                objectFit: fitMode === 'cover' ? 'cover' : 'contain',
                maxHeight: fixedFrame || fitMode === 'cover' ? '100%' : '90vh',
                maxWidth: '100%',
                margin: '0 auto',
              }}
            />

            {/* Subtle top gradient scrim for control readability on hover */}
            <div 
              aria-hidden="true" 
              className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/60 via-black/20 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200" 
            />

            {/* Top Bar with Badge, Mode Toggle, Lightbox, Replace and Clear */}
            <div className="absolute top-3 right-3 sm:top-3.5 sm:right-3.5 flex items-center gap-1.5 sm:gap-2 z-20">
              {/* Natural / Cover Mode Switcher */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setFitMode((prev) => (prev === 'natural' ? 'cover' : 'natural'));
                }}
                className="px-2.5 py-1.5 bg-[var(--surface)]/90 backdrop-blur-md hover:bg-[var(--text)] hover:text-[var(--bg)] text-[var(--text)] text-[11px] font-mono tracking-tight border border-[var(--border)] transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
                title={
                  fitMode === 'natural'
                    ? 'Modo actual: Adaptado al tamaño real de la imagen. Clic para forzar Llenar Marco (Cover)'
                    : 'Modo actual: Llenar Marco (Cover). Clic para adaptar al tamaño real de la imagen (Sin recorte)'
                }
                aria-label="Cambiar modo de encuadre de imagen"
              >
                {fitMode === 'natural' ? (
                  <>
                    <Expand className="w-3 h-3 text-[var(--text)]" aria-hidden="true" />
                    <span className="hidden sm:inline">Sin Recorte</span>
                  </>
                ) : (
                  <>
                    <Crop className="w-3 h-3 text-[var(--text)]" aria-hidden="true" />
                    <span className="hidden sm:inline">Llenar Marco</span>
                  </>
                )}
              </button>

              {/* Fullscreen Lightbox Zoom Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsLightboxOpen(true);
                }}
                className="p-1.5 sm:p-2 bg-[var(--surface)]/90 backdrop-blur-md hover:bg-[var(--text)] hover:text-[var(--bg)] text-[var(--text)] transition-all cursor-pointer border border-[var(--border)] flex items-center justify-center shadow-sm"
                title="Inspeccionar imagen en tamaño completo"
                aria-label="Ver imagen ampliada"
              >
                <Maximize2 className="w-3.5 h-3.5" aria-hidden="true" />
              </button>

              {/* Replace Image Upload Input */}
              <label
                className="p-1.5 sm:p-2 bg-[var(--surface)]/90 backdrop-blur-md hover:bg-[var(--text)] text-[var(--text)] hover:text-[var(--bg)] transition-all cursor-pointer border border-[var(--border)] flex items-center justify-center shadow-sm"
                title="Cambiar imagen"
                aria-label="Reemplazar imagen cargada"
              >
                <Upload className="w-3.5 h-3.5" aria-hidden="true" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="sr-only"
                  aria-label="Seleccionar nueva imagen"
                />
              </label>

              {/* Remove Button */}
              <button
                type="button"
                onClick={handleClearPreview}
                aria-label="Restaurar ranura original"
                className="p-1.5 sm:p-2 bg-[var(--surface)]/90 backdrop-blur-md hover:bg-red-500 hover:text-white text-[var(--text)] transition-all cursor-pointer border border-[var(--border)] flex items-center justify-center shadow-sm"
                title="Eliminar imagen y restaurar ranura"
              >
                <X className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>

            {/* Bottom info badge on hover */}
            <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 bg-gradient-to-t from-black/75 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none flex items-center justify-between text-left">
              <span className="text-white text-xs font-sans font-medium truncate">
                {label}
              </span>
            </div>
          </div>
        ) : (
          /* Empty Placeholder Frame ready for user to drop or upload */
          <div className={`relative z-10 flex flex-col items-center justify-center max-w-sm ${compact ? 'px-2 py-4 w-full' : 'px-4 py-6'}`}>
            <div 
              aria-hidden="true" 
              className={`${compact ? 'w-9 h-9 mb-2.5' : 'w-12 h-12 mb-3'} bg-[var(--bg)] border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] transition-all duration-200 ${
                isDragging ? 'scale-105 border-[var(--text)] text-[var(--text)]' : 'group-hover:border-[var(--border-hover)] group-hover:text-[var(--text)]'
              }`}
            >
              <Image className={compact ? 'w-4 h-4' : 'w-5 h-5'} />
            </div>

            <h4 className={`${compact ? 'text-xs mb-1' : 'text-sm mb-1'} font-sans font-medium text-[var(--text)] text-center tracking-tight`}>
              {label}
            </h4>

            {sublabel && (
              <p className="text-[11px] font-mono text-[var(--text-muted)] text-center mb-3 line-clamp-1 max-w-[280px]">
                {sublabel}
              </p>
            )}

            <label 
              onClick={(e) => e.stopPropagation()}
              className={`inline-flex items-center gap-1.5 ${compact ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-xs'} bg-[var(--text)] text-[var(--bg)] hover:opacity-90 font-sans transition-opacity cursor-pointer font-medium shadow-xs rounded-[2px]`}
              aria-label={`Cargar imagen para ${label}`}
            >
              <Upload className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Cargar imagen</span>
              <input
                type="file"
                accept="image/*"
                aria-label={`Seleccionar archivo para ${label}`}
                onChange={handleFileChange}
                className="sr-only"
              />
            </label>

            <span className="text-[10px] font-mono text-[var(--text-muted)] mt-2">
              o arrastra el archivo aquí
            </span>
          </div>
        )}

        {/* =========================================================================
           ACCESSIBLE STORAGE STATUS NOTIFICATION:
           Informs user about saving state, success (with browser-only disclaimer),
           or failure while preserving the previous image.
           ========================================================================= */}
        {feedback.type !== 'idle' && (
          <div
            role={feedback.type === 'error' ? 'alert' : 'status'}
            aria-live={feedback.type === 'error' ? 'assertive' : 'polite'}
            className={`absolute top-3 left-1/2 -translate-x-1/2 z-30 px-4 py-2 text-xs font-sans font-medium flex flex-col gap-1 border shadow-2xl pointer-events-auto max-w-[92%] sm:max-w-md backdrop-blur-md animate-in fade-in slide-in-from-top-2 duration-200 ${
              feedback.type === 'saving'
                ? 'bg-neutral-900/95 text-white border-amber-500/50'
                : feedback.type === 'saved'
                ? 'bg-neutral-900/95 text-white border-emerald-500/60'
                : 'bg-red-950/95 text-white border-red-500/70'
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                {feedback.type === 'saving' && (
                  <Loader2 className="w-3.5 h-3.5 text-amber-400 animate-spin shrink-0" aria-hidden="true" />
                )}
                {feedback.type === 'saved' && (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" aria-hidden="true" />
                )}
                {feedback.type === 'error' && (
                  <AlertCircle className="w-3.5 h-3.5 text-red-400 shrink-0" aria-hidden="true" />
                )}
                <span className={`font-semibold tracking-tight ${
                  feedback.type === 'saving'
                    ? 'text-amber-200'
                    : feedback.type === 'saved'
                    ? 'text-emerald-300'
                    : 'text-red-200'
                }`}>
                  {feedback.title}
                </span>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setFeedback({ type: 'idle', title: '' });
                }}
                className="text-neutral-400 hover:text-white p-0.5 cursor-pointer transition-colors"
                aria-label="Cerrar aviso"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
            {feedback.detail && (
              <p className="text-[11px] text-neutral-300 font-mono leading-snug pl-5.5">
                {feedback.detail}
              </p>
            )}
          </div>
        )}
      </div>

      {/* =========================================================================
         LIGHTBOX MODAL:
         Full-screen, uncompressed inspection of the uploaded artwork.
         ========================================================================= */}
      {isLightboxOpen && previewUrl && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Vista ampliada de ${label}`}
          onClick={() => setIsLightboxOpen(false)}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200 cursor-zoom-out"
        >
          {/* Top Bar inside modal */}
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="w-full max-w-6xl flex items-center justify-between text-white pb-4 mb-2 border-b border-white/10 text-xs font-mono"
          >
            <div className="flex items-center gap-3">
              <span className="font-semibold text-sm">{label}</span>
              {slotId && <span className="text-white/60">[{slotId}]</span>}
              {naturalDimensions && (
                <span className="px-2 py-0.5 bg-white/10 text-white/80 text-[11px]">
                  {naturalDimensions.width} × {naturalDimensions.height} px
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={() => setIsLightboxOpen(false)}
              className="p-1.5 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="Cerrar vista ampliada"
              title="Cerrar vista"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Centered Large High-Res Image */}
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="relative max-w-6xl max-h-[82vh] overflow-auto flex items-center justify-center p-2"
          >
            <img
              src={previewUrl}
              alt={label}
              className="max-w-full max-h-[80vh] w-auto h-auto object-contain select-none shadow-2xl border border-white/10 cursor-default"
            />
          </div>

          <div className="pt-3 text-[11px] font-mono text-white/50 text-center">
            Presiona cualquier lugar fuera de la imagen o la cruz para cerrar
          </div>
        </div>
      )}
    </>
  );
}
