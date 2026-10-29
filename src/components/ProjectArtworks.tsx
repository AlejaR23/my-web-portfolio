import React, { useState, useEffect } from 'react';
import defaultExofaunaImage from '../assets/images/exofauna-mesa-14-100.jpg';
import { ProjectVisualGraphic } from './ProjectCardVisual';
import { Project } from '../types';
import { 
  getStoredImageSync, 
  getStoredImageAsync,
  persistImage,
  optimizeImageFile,
  removePersistedImage
} from '../utils/imageStorage';
import { Upload, X } from 'lucide-react';

const SLUG_TO_SLOT_MAP: Record<string, string> = {
  exofauna: 'SLOT-01',
  tempo: 'SLOT-02',
  'se-vale-avisar': 'SLOT-03',
  'the-traveling-chicken': 'SLOT-04',
  'traveling-chicken': 'SLOT-04',
  'vault-clothing': 'SLOT-05',
  'tazza-cafe': 'SLOT-06',
  'kiem-university': 'SLOT-07',
};

/**
 * Universal interactive project cover artwork component.
 * Allows visitors/users to change the cover image of ANY project
 * (Exofauna, Tempos, EvaluaVisa, TravelinChicken, Vault, Tazza, Qiem).
 * Saves locally in IndexedDB/localStorage with instant real-time sync.
 */
export function GenericProjectArtwork({
  slug,
  title,
  subtitle,
  fullWidth = false,
  className = '',
}: {
  slug: string;
  title: string;
  subtitle?: string;
  fullWidth?: boolean;
  className?: string;
}) {
  const slot = SLUG_TO_SLOT_MAP[slug];
  const coverSlot = `${slug}_cover`;

  const [customImage, setCustomImage] = useState<string | null>(() => {
    return (
      getStoredImageSync(slug) ||
      getStoredImageSync(coverSlot) ||
      (slot ? getStoredImageSync(slot) : null) ||
      null
    );
  });

  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    let isMounted = true;
    
    // Check slug, coverSlot, and slot asynchronously
    getStoredImageAsync(slug).then((img) => {
      if (isMounted && img) {
        setCustomImage(img);
        return;
      }
      getStoredImageAsync(coverSlot).then((cImg) => {
        if (isMounted && cImg) {
          setCustomImage(cImg);
          return;
        }
        if (slot) {
          getStoredImageAsync(slot).then((sImg) => {
            if (isMounted && sImg) setCustomImage(sImg);
          });
        }
      });
    });

    const handleUpdate = (e: Event) => {
      const customEvt = e as CustomEvent;
      const id = customEvt.detail?.identifier;
      if (id === slug || id === coverSlot || (slot && id === slot)) {
        setCustomImage(customEvt.detail.dataUrl);
      }
    };

    window.addEventListener('ar_image_updated', handleUpdate);
    return () => {
      isMounted = false;
      window.removeEventListener('ar_image_updated', handleUpdate);
    };
  }, [slug, slot, coverSlot]);

  // Global paste handler when hovering over this project card
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
  }, [isHovered, slug]);

  const saveUploadedFile = async (file: File) => {
    try {
      const optimized = await optimizeImageFile(file);
      await persistImage(slug, optimized);
      await persistImage(coverSlot, optimized);
      if (slot) {
        await persistImage(slot, optimized);
      }
      setCustomImage(optimized);
    } catch (err) {
      console.error(`Error al guardar foto de portada para ${slug}:`, err);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      saveUploadedFile(file);
    }
    e.target.value = '';
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
    setCustomImage(null);
    await removePersistedImage(slug);
    await removePersistedImage(coverSlot);
    if (slot) {
      await removePersistedImage(slot);
    }
  };

  const projectStub: Partial<Project> = {
    slug,
    title,
    subtitle,
    id: slug,
  };

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
      className={`relative w-full h-full overflow-hidden bg-[var(--surface)] group select-none ${
        isDragging ? 'ring-2 ring-[var(--text)]' : ''
      } ${className}`}
    >
      {/* Background/Cover Image or Bespoke Artwork */}
      {customImage ? (
        <img
          src={customImage}
          alt={`Portada de ${title}`}
          className="w-full h-full object-cover block select-none transition-transform duration-500 ease-out group-hover:scale-[1.01]"
        />
      ) : slug === 'exofauna' ? (
        <img
          src={defaultExofaunaImage}
          alt="Exofauna: Hospital Veterinario & Rescate Silvestre"
          className="w-full h-full object-cover block select-none transition-transform duration-500 ease-out group-hover:scale-[1.01]"
        />
      ) : (
        <div className={`w-full h-full relative overflow-hidden ${fullWidth ? 'min-h-[480px]' : ''}`}>
          <ProjectVisualGraphic project={projectStub as Project} />
        </div>
      )}

      {/* Floating Upload / Restore Controls (Available for ALL projects) */}
      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 flex items-center gap-2 opacity-90 group-hover:opacity-100 transition-opacity">
        {customImage && (
          <button
            type="button"
            onClick={handleClear}
            title={`Restaurar portada original de ${title}`}
            aria-label="Restaurar portada original"
            className="p-1.5 sm:p-2 bg-[var(--surface)]/95 backdrop-blur-md hover:bg-red-500 hover:text-white text-[var(--text)] border border-[var(--border)] transition-all cursor-pointer shadow-md rounded-[2px]"
          >
            <X className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        )}

        <label
          title={`Cargar imagen de portada para ${title}`}
          aria-label={`Cargar imagen de portada para ${title}`}
          onClick={(e) => e.stopPropagation()}
          className="p-1.5 px-3 bg-black/75 hover:bg-black text-white border border-white/20 text-xs font-sans tracking-tight transition-all cursor-pointer inline-flex items-center gap-1.5 shadow-md backdrop-blur-sm rounded-[2px]"
        >
          <Upload className="w-3.5 h-3.5" aria-hidden="true" />
          <span>{customImage ? 'Cambiar foto' : 'Cargar foto'}</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="sr-only"
            aria-label={`Seleccionar nueva foto de portada para ${title}`}
          />
        </label>
      </div>

      {/* Dragging Overlay */}
      {isDragging && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center text-white font-medium text-xs sm:text-sm z-40 border-2 border-dashed border-white p-4 text-center">
          Suelta la imagen para aplicarla como portada de {title}
        </div>
      )}
    </div>
  );
}

export function ProjectArtworkRenderer({
  project,
  fullWidth = false,
  className = '',
}: {
  project: { slug: string; title: string; subtitle?: string };
  fullWidth?: boolean;
  className?: string;
}) {
  return (
    <GenericProjectArtwork
      slug={project.slug}
      title={project.title}
      subtitle={project.subtitle}
      fullWidth={fullWidth}
      className={className}
    />
  );
}
