import React from 'react';
import defaultExofaunaImage from '../assets/images/exofauna-mesa-14-100.jpg';
import { getProjectDefaultImage } from '../utils/projectArtworkImages';
import { Project } from '../types';

export function ProjectVisualGraphic({ project }: { project: Project }) {
  switch (project.slug) {
    case 'exofauna':
      return (
        <div className="w-full h-full relative overflow-hidden bg-[var(--surface)]">
          <img
            src={defaultExofaunaImage}
            alt="Exofauna: Fotografía oficial e identidad clínica de rescate"
            className="w-full h-full object-cover select-none transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)]/60 via-transparent to-transparent pointer-events-none" />
        </div>
      );

    case 'tempo':
      return (
        <div className="w-full h-full relative overflow-hidden bg-[#0a0f18] text-white flex flex-col justify-between p-5 select-none transition-transform duration-700 group-hover:scale-105 border border-[var(--border)]">
          <div className="relative z-10 flex items-center justify-between font-mono text-[10px] text-neutral-400">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-black/60 border border-emerald-500/30 text-emerald-400 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              LIVE TELEMETRY
            </span>
            <span className="text-white font-semibold">120 BPM · 212 W</span>
          </div>

          <div className="relative z-10 flex flex-col items-center justify-center my-auto">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-7 h-2 bg-[#D4FF00] -skew-x-12 inline-block shadow-sm" />
              <span className="font-sans font-black italic text-3xl sm:text-4xl tracking-tighter text-white">
                TEMPO
              </span>
            </div>
            <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#D4FF00]">
              COCKPIT INTERFACE & ELEVATION HUD
            </div>
          </div>

          <div className="relative z-10 flex items-end justify-between pt-3 border-t border-white/10 font-mono text-[9px] text-neutral-400">
            <div>
              <span className="text-neutral-500 block text-[8px]">SUMMIT PASS</span>
              <span className="text-white font-bold">3,821 M</span>
            </div>
            <div className="h-6 w-28 flex items-end gap-1">
              <span className="w-1.5 h-2 bg-neutral-800" />
              <span className="w-1.5 h-3 bg-neutral-700" />
              <span className="w-1.5 h-5 bg-[#D4FF00]" />
              <span className="w-1.5 h-6 bg-[#D4FF00]" />
              <span className="w-1.5 h-3 bg-neutral-700" />
            </div>
            <div className="text-right">
              <span className="text-neutral-500 block text-[8px]">AVG SPEED</span>
              <span className="text-[#D4FF00] font-bold">34.2 KM/H</span>
            </div>
          </div>
        </div>
      );

    case 'se-vale-avisar': {
      const defaultImg = getProjectDefaultImage('se-vale-avisar');
      return (
        <div className="w-full h-full relative overflow-hidden bg-[#0A0B0E] select-none transition-transform duration-700 group-hover:scale-105 border border-[var(--border)] min-h-[320px] flex items-center justify-center">
          <img
            src={defaultImg}
            alt="Se Vale Avisar - Campaña Nacional de Salud Mental Laboral"
            className="w-full h-full object-cover select-none pointer-events-none"
          />
        </div>
      );
    }

    default: {
      const defaultImg = getProjectDefaultImage(project.slug);
      return (
        <div className="w-full h-full relative overflow-hidden bg-[var(--surface)] select-none transition-transform duration-700 group-hover:scale-105 border border-[var(--border)]">
          <img
            src={defaultImg}
            alt={project.title}
            className="w-full h-full object-cover select-none pointer-events-none"
          />
        </div>
      );
    }
  }
}
