import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  caption?: string;
  children: React.ReactNode;
}

export function ImageLightbox({ isOpen, onClose, title, caption, children }: LightboxProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-[var(--bg)]/95 backdrop-blur-xl animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative max-w-5xl w-full bg-[var(--surface)] border border-[var(--primary)] overflow-hidden shadow-2xl overscroll-contain"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)] bg-[var(--bg)]">
          <div>
            <h3 id="lightbox-modal-title" className="font-sans font-semibold text-[var(--text)] text-base">{title}</h3>
            {caption && <p className="text-xs text-[var(--text-muted)] mt-0.5">{caption}</p>}
          </div>
          <button
            onClick={onClose}
            className="p-2 border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--secondary)] text-[var(--text-muted)] hover:text-[var(--secondary)] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--complement)]"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-8 flex items-center justify-center min-h-[300px] max-h-[75vh] overflow-y-auto bg-[var(--surface)]">
          {children}
        </div>
      </div>
    </div>
  );
}
