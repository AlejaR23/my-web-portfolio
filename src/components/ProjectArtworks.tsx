import React, { useState, useEffect, useRef } from 'react';
import defaultExofaunaImage from '../assets/images/exofauna-mesa-14-100.jpg';
import { ProjectVisualGraphic } from './ProjectCardVisual';
import { Project } from '../types';
import { 
  getStoredImageSync, 
  getStoredImageAsync,
  persistImage,
  optimizeImageFile,
} from '../utils/imageStorage';
import { getPermanentImage } from '../data/permanentImages';
import { Upload, Download } from 'lucide-react';

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
 * Allows visitors/users to change the cover image of ANY project.
 * Includes developer tools for Tazza and Kiem to download and upload new covers.
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

  const isTazza = slug === 'tazza-cafe' || slug === 'taza';
  const isKiem = slug === 'kiem-university' || slug === 'kiem';
  const showDevButtons = isTazza || isKiem;

  const [customImage, setCustomImage] = useState<string | null>(() => {
    return (
      getPermanentImage(slug) ||
      getPermanentImage(coverSlot) ||
      (slot ? getPermanentImage(slot) : null) ||
      getStoredImageSync(slug) ||
      getStoredImageSync(coverSlot) ||
      (slot ? getStoredImageSync(slot) : null) ||
      null
    );
  });

  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleDownloadCurrent = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const imageToDownload = customImage || (slug === 'exofauna' ? defaultExofaunaImage : null);
    if (!imageToDownload) {
      alert('Aún no hay una imagen cargada para descargar en este proyecto.');
      return;
    }

    try {
      let downloadUrl = imageToDownload;
      if (!imageToDownload.startsWith('data:')) {
        const response = await fetch(imageToDownload);
        const blob = await response.blob();
        downloadUrl = URL.createObjectURL(blob);
      }

      const a = document.createElement('a');
      a.href = downloadUrl;
      const extension = downloadUrl.includes('jpeg') || downloadUrl.includes('jpg') ? 'jpg' : 'png';
      a.download = `portada-${slug}.${extension}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      if (downloadUrl.startsWith('blob:')) {
        setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);
      }
    } catch (err) {
      console.error('Error al descargar imagen:', err);
      window.open(imageToDownload, '_blank');
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setSaveStatus('Guardando…');
      const optimized = await optimizeImageFile(file);
      await persistImage(slug, optimized);
      await persistImage(coverSlot, optimized);
      if (slot) {
        await persistImage(slot, optimized);
      }

      if (isTazza) {
        await persistImage('SLOT-06-tazza-cafe', optimized);
        await persistImage('SLOT-06', optimized);
        await persistImage('tazza-cafe', optimized);
        await persistImage('taza', optimized);
      } else if (isKiem) {
        await persistImage('SLOT-07-kiem-university', optimized);
        await persistImage('SLOT-07', optimized);
        await persistImage('kiem-university', optimized);
        await persistImage('kiem', optimized);
      }

      setCustomImage(optimized);
      setSaveStatus('✓ ¡Fijada en código!');
      setTimeout(() => setSaveStatus(null), 4000);
    } catch (err) {
      console.error(`Error al guardar portada para ${slug}:`, err);
      setSaveStatus('Error');
      setTimeout(() => setSaveStatus(null), 3000);
    }
    e.target.value = '';
  };

  const projectStub: Partial<Project> = {
    slug,
    title,
    subtitle,
    id: slug,
  };

  return (
    <div
      onDragOver={showDevButtons ? (e) => { e.preventDefault(); setIsDragging(true); } : undefined}
      onDragLeave={showDevButtons ? () => setIsDragging(false) : undefined}
      onDrop={showDevButtons ? (e) => {
        e.preventDefault();
        setIsDragging(false);
        const f = e.dataTransfer.files?.[0];
        if (f && f.type.startsWith('image/')) {
          handleFileChange({ target: { files: [f], value: '' } } as unknown as React.ChangeEvent<HTMLInputElement>);
        }
      } : undefined}
      className={`relative w-full h-full overflow-hidden bg-[var(--surface)] group select-none ${
        isDragging ? 'ring-2 ring-amber-400 ring-offset-2' : ''
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

      {/* Developer Buttons for Tazza and Kiem */}
      {showDevButtons && (
        <div className="absolute top-3 right-3 z-30 flex items-center gap-2 pointer-events-auto">
          {/* Botón Descargar Imagen Actual */}
          {customImage && (
            <button
              type="button"
              onClick={handleDownloadCurrent}
              aria-label={`Descargar imagen actual de portada de ${title} (Modo Desarrollador)`}
              title="Descargar imagen actual a tu equipo"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-950/90 hover:bg-neutral-900 text-white text-[11px] font-mono font-medium rounded-full border border-white/20 shadow-xl backdrop-blur-md transition-all hover:scale-105 active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400 shrink-0" aria-hidden="true" />
              <span className="whitespace-nowrap">Descargar actual (Dev)</span>
            </button>
          )}

          {/* Botón Subir / Cambiar Portada */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id={`dev-upload-${slug}`}
          />
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              fileInputRef.current?.click();
            }}
            aria-label={`Subir nueva portada para ${title} (Modo Desarrollador)`}
            title="Cargar y reemplazar imagen de portada"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-neutral-950/95 hover:bg-neutral-900 text-white text-xs font-mono font-medium rounded-full border border-white/25 shadow-xl transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            <Upload className="w-3.5 h-3.5 text-amber-400 shrink-0" aria-hidden="true" />
            <span className="whitespace-nowrap">
              {saveStatus || `Subir portada ${isTazza ? 'Tazza' : 'Kiem'} (Dev)`}
            </span>
          </button>
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

export default ProjectArtworkRenderer;
