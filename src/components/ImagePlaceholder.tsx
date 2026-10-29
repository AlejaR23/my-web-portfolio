import React, { useState, useEffect, useRef } from 'react';
import {
  getStoredImageSync,
  getStoredImageAsync,
} from '../utils/imageStorage';
import { getDefaultSlotImage } from '../utils/projectArtworkImages';
import { getPermanentImage } from '../data/permanentImages';

export interface ImagePlaceholderProps {
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
  aspect = '16:9',
  className = '',
  id,
  slotId,
  fixedFrame = false,
  fillFrame = false,
}: ImagePlaceholderProps) {
  const slotIdentifier = slotId || id || '';
  const containerRef = useRef<HTMLDivElement>(null);

  const [previewUrl, setPreviewUrl] = useState<string | null>(() => {
    if (!slotIdentifier) return null;
    return (
      getStoredImageSync(slotIdentifier) ||
      getPermanentImage(slotIdentifier) ||
      getDefaultSlotImage(slotIdentifier)
    );
  });

  const [naturalDimensions, setNaturalDimensions] = useState<{ width: number; height: number } | null>(null);

  // Sync state with storage and handle cross-tab/cross-component events
  useEffect(() => {
    if (!slotIdentifier) return;
    let isMounted = true;

    getStoredImageAsync(slotIdentifier).then((img) => {
      const finalImg = img || getPermanentImage(slotIdentifier) || getDefaultSlotImage(slotIdentifier);
      if (isMounted && finalImg) {
        setPreviewUrl(finalImg);
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

  // Load natural dimensions to ensure adaptive, zero-dead-space framing
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

  if (!previewUrl) {
    return null;
  }

  const aspectClass =
    aspect === '4:3'
      ? 'aspect-[4/3]'
      : aspect === '1:1'
      ? 'aspect-square'
      : aspect === '21:9'
      ? 'aspect-[21/9]'
      : aspect === '3:4'
      ? 'aspect-[3/4]'
      : aspect === 'cinematic'
      ? 'aspect-[2.39/1]'
      : 'aspect-[16/9]';

  const isCover = fillFrame;

  return (
    <div
      id={id}
      ref={containerRef}
      className={`relative w-full overflow-hidden bg-[var(--surface)] border border-[var(--border)] select-none transition-all duration-300 group ${
        fixedFrame || isCover
          ? `${aspectClass} p-0`
          : 'h-auto block p-0'
      } ${className}`}
      style={
        !fixedFrame && !isCover && naturalDimensions
          ? {
              aspectRatio: `${naturalDimensions.width} / ${naturalDimensions.height}`,
            }
          : undefined
      }
    >
      <img
        src={previewUrl}
        alt={label}
        loading="lazy"
        className={`w-full block select-none transition-transform duration-500 ease-out group-hover:scale-[1.01] ${
          isCover
            ? 'h-full object-cover'
            : fixedFrame
            ? 'h-full object-contain'
            : 'h-auto block'
        }`}
        style={{
          imageRendering: 'auto',
          display: 'block',
          width: '100%',
          height: fixedFrame || isCover ? '100%' : 'auto',
          objectFit: isCover ? 'cover' : fixedFrame ? 'contain' : undefined,
          maxWidth: '100%',
          margin: '0 auto',
        }}
      />
    </div>
  );
}

export default ImagePlaceholder;
