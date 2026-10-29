import React, { useState, useEffect } from 'react';
import defaultExofaunaImage from '../assets/images/exofauna-mesa-14-100.jpg';
import { ProjectVisualGraphic } from './ProjectCardVisual';
import { Project } from '../types';
import { 
  getStoredImageSync, 
  getStoredImageAsync,
} from '../utils/imageStorage';
import { getPermanentImage } from '../data/permanentImages';

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
      getPermanentImage(slug) ||
      getPermanentImage(coverSlot) ||
      (slot ? getPermanentImage(slot) : null) ||
      getStoredImageSync(slug) ||
      getStoredImageSync(coverSlot) ||
      (slot ? getStoredImageSync(slot) : null) ||
      null
    );
  });

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

  const projectStub: Partial<Project> = {
    slug,
    title,
    subtitle,
    id: slug,
  };

  return (
    <div
      className={`relative w-full h-full overflow-hidden bg-[var(--surface)] group select-none ${className}`}
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
