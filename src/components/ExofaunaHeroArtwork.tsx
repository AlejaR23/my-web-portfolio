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
    </div>
  );
}

export default ExofaunaHeroArtwork;
