import React, { useState, useEffect } from 'react';
import defaultExofaunaImage from '../assets/images/exofauna-mesa-14-100.jpg';
import { Upload, X } from 'lucide-react';
import {
  persistImage,
  getStoredImageSync,
  getStoredImageAsync,
  optimizeImageFile,
  removePersistedImage,
} from '../utils/imageStorage';

interface ExofaunaHeroArtworkProps {
  fullWidth?: boolean;
  className?: string;
}

export function ExofaunaHeroArtwork({
  className = '',
}: ExofaunaHeroArtworkProps) {
  const [customImage, setCustomImage] = useState<string | null>(() => {
    return getStoredImageSync('exofauna') || getStoredImageSync('SLOT-01') || null;
  });
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    let isMounted = true;
    getStoredImageAsync('exofauna').then((img) => {
      if (isMounted && img) {
        setCustomImage(img);
        return;
      }
      getStoredImageAsync('SLOT-01').then((slotImg) => {
        if (isMounted && slotImg) {
          setCustomImage(slotImg);
        }
      });
    });

    const handleUpdate = (e: Event) => {
      const customEvt = e as CustomEvent;
      const id = customEvt.detail?.identifier;
      if (id === 'exofauna' || id === 'SLOT-01') {
        setCustomImage(customEvt.detail.dataUrl);
      }
    };

    window.addEventListener('ar_image_updated', handleUpdate);
    return () => {
      isMounted = false;
      window.removeEventListener('ar_image_updated', handleUpdate);
    };
  }, []);

  const [isHovered, setIsHovered] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
            saveUploadedFile(file);
            break;
          }
        }
      }
    };
    window.addEventListener('paste', handleGlobalPaste);
    return () => {
      window.removeEventListener('paste', handleGlobalPaste);
    };
  }, [isHovered]);

  const saveUploadedFile = async (file: File) => {
    setErrorMessage(null);
    try {
      const optimized = await optimizeImageFile(file);
      // Wait for all required IndexedDB writes to succeed
      await persistImage('exofauna', optimized);
      await persistImage('SLOT-01', optimized);
      // Only commit new preview after writes succeed
      setCustomImage(optimized);
    } catch (err) {
      console.error('Error saving Exofauna hero image:', err);
      const msg = err instanceof Error ? err.message : 'Error desconocido al guardar en IndexedDB.';
      setErrorMessage(`No se pudo guardar la imagen en el navegador. Se conserva la imagen anterior. (${msg})`);
      setTimeout(() => setErrorMessage(null), 7000);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      saveUploadedFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      saveUploadedFile(file);
    }
  };

  const handleClear = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setErrorMessage(null);
    setCustomImage(null);
    await removePersistedImage('exofauna');
    await removePersistedImage('SLOT-01');
  };

  const activeSrc = customImage || defaultExofaunaImage;

  const isDev = import.meta.env.DEV;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onDrop={handleDrop}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      className={`relative w-full aspect-[16/9] min-h-[340px] sm:min-h-[460px] md:min-h-[540px] lg:min-h-[620px] overflow-hidden bg-[var(--surface)] group select-none ${
        isDragging ? 'ring-2 ring-[var(--text)]' : ''
      } ${className}`}
    >
      {/* Edge-to-edge non-distorted responsive image covering 100% of the bounding frame */}
      <img
        src={activeSrc}
        alt="Exofauna: Hospital Veterinario & Rescate Silvestre"
        loading="eager"
        className="absolute inset-0 w-full h-full object-cover block select-none transition-transform duration-500 ease-out group-hover:scale-[1.01]"
      />

      {/* Floating Upload / Restore Control */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2 opacity-85 group-hover:opacity-100 transition-opacity">
        {customImage && (
          <button
            onClick={handleClear}
            title="Restaurar fotografía original de Exofauna"
            aria-label="Restaurar fotografía original de Exofauna"
            className="p-2 bg-[var(--surface)]/90 backdrop-blur-md hover:bg-red-500 hover:text-white text-[var(--text)] border border-[var(--border)] transition-all cursor-pointer shadow-md rounded-[2px]"
          >
            <X className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        )}

        <label
          title="Cambiar fotografía"
          aria-label="Cambiar fotografía"
          className="p-1.5 px-3 bg-black/75 hover:bg-black text-white border border-white/20 text-xs font-sans tracking-tight transition-all cursor-pointer inline-flex items-center gap-1.5 shadow-md backdrop-blur-sm rounded-[2px]"
        >
          <Upload className="w-3.5 h-3.5" aria-hidden="true" />
          <span>{customImage ? 'Cambiar foto' : 'Cargar foto'}</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="sr-only"
          />
        </label>
      </div>

      {/* Accessible Error Alert (role="alert" / aria-live="assertive") */}
      {errorMessage && (
        <div
          role="alert"
          aria-live="assertive"
          className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 z-40 max-w-md bg-red-950/95 text-white border border-red-500/70 p-3 shadow-2xl backdrop-blur-md flex items-start justify-between gap-3 text-xs font-sans animate-in fade-in slide-in-from-bottom-2 duration-200"
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

export default ExofaunaHeroArtwork;
