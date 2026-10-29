import React, { useState, useEffect } from 'react';
import { Link } from '../context/RouterContext';
import { Project } from '../types';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { ProjectArtworkRenderer } from './ProjectArtworks';

interface ProjectCarouselProps {
  projects: Project[];
}

export function ProjectCarousel({ projects }: ProjectCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const total = projects.length;

  useEffect(() => {
    if (!isAutoPlaying || total === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 4500);
    return () => clearInterval(interval);
  }, [isAutoPlaying, total]);

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  if (total === 0) return null;
  const current = projects[currentIndex];

  return (
    <div 
      className="w-full border-t border-b border-neutral-200 dark:border-neutral-800 py-12 bg-neutral-50 dark:bg-neutral-950"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="w-full px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20">
        
        {/* Carousel Header & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 mb-8 border-b border-neutral-200 dark:border-neutral-800 gap-4">
          <div>
            <div className="font-mono text-xs text-neutral-400 mb-1">
              CARRUSEL DINÁMICO DE CASOS ({String(currentIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')})
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-black dark:text-white">
              Exploración de Portafolio
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={prevSlide}
              aria-label="Proyecto anterior"
              className="p-2.5 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-black hover:border-black dark:hover:border-white text-black dark:text-white transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Proyecto siguiente"
              className="p-2.5 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-black hover:border-black dark:hover:border-white text-black dark:text-white transition-colors cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Carousel Main Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Project Visual Stage */}
          <div className="lg:col-span-8 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 aspect-video overflow-hidden">
            <ProjectArtworkRenderer project={current} />
          </div>

          {/* Project Description Stage */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2 font-mono text-xs text-neutral-400">
              <span className="font-bold text-black dark:text-white uppercase">{current.category}</span>
              <span>·</span>
              <span>{current.year}</span>
            </div>

            <h4 className="text-3xl font-bold text-black dark:text-white leading-tight">
              {current.title}
            </h4>

            <p className="text-sm font-medium text-neutral-500">
              {current.subtitle}
            </p>

            <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
              {current.shortDescription}
            </p>

            <div className="pt-2">
              <div className="font-mono text-xs text-neutral-400 mb-2">
                ENTREGABLES ({current.deliverables.length}):
              </div>
              <div className="flex flex-wrap gap-1.5 mb-6">
                {current.deliverables.slice(0, 3).map((item, i) => (
                  <span key={i} className="text-[11px] font-mono px-2 py-0.5 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black">
                    {item}
                  </span>
                ))}
              </div>

              <Link
                to={`/work/${current.slug}`}
                className="flat-btn-primary w-full justify-between"
              >
                <span>Ver Caso de Estudio</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>

        {/* Carousel Slide Indicators */}
        <div className="flex items-center gap-1.5 pt-8 mt-8 border-t border-neutral-200 dark:border-neutral-800">
          {projects.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => {
                setIsAutoPlaying(false);
                setCurrentIndex(idx);
              }}
              aria-label={`Ir al proyecto ${p.title}`}
              className={`h-1 flex-1 transition-all cursor-pointer ${
                idx === currentIndex
                  ? 'bg-black dark:bg-white'
                  : 'bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-400'
              }`}
            />
          ))}
        </div>

      </div>
    </div>
  );
}
