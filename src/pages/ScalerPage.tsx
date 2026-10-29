import React, { useState, useEffect } from 'react';
import { ImagePlaceholder } from '../components/ImagePlaceholder';
import { ScrollReveal } from '../components/ScrollReveal';
import { LetterScrollReveal } from '../components/LetterScrollReveal';
import { useTheme } from '../context/ThemeContext';

export function ScalerPage() {
  const { theme } = useTheme();
  const [logoVariant, setLogoVariant] = useState<'color' | 'white' | 'black'>(() => {
    return theme === 'dark' ? 'white' : 'color';
  });

  useEffect(() => {
    setLogoVariant(theme === 'dark' ? 'white' : 'color');
  }, [theme]);

  return (
    <div className="relative min-h-screen text-[var(--text)] transition-colors duration-200 overflow-x-hidden font-sans bg-[var(--bg)]">
      <main className="pt-32 sm:pt-40 pb-36 px-4 sm:px-6 md:px-8 lg:px-10 w-full">
        <div className="max-w-[1920px] mx-auto">
          
          {/* Centered Editorial Header (Written Centered) */}
          <ScrollReveal blur={8} yOffset={20} className="text-center max-w-4xl mx-auto mb-16 sm:mb-20">
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--text-muted)] block mb-3">
              Working on · Proyecto en desarrollo activo
            </span>
            <LetterScrollReveal
              as="h1"
              text="Scaler: Plataforma para impulsar tu carrera"
              className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[var(--text)] leading-[1.08] text-center mb-6"
              center={true}
            />
            <p className="text-lg sm:text-xl lg:text-2xl text-[var(--text)] leading-relaxed font-light text-center max-w-3xl mx-auto">
              Proyecto en el que me encuentro trabajando actualmente. Diseñado para acompañar a las personas en su búsqueda laboral, optimizar su perfil profesional y avanzar con paso firme hacia su siguiente empleo.
            </p>
          </ScrollReveal>

          {/* Editorial Masthead Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20 pb-12 w-full">
            <ScrollReveal blur={8} yOffset={20} className="lg:col-span-8 space-y-6">
              <div className="space-y-4 text-base sm:text-lg text-[var(--text-muted)] leading-relaxed font-light">
                <p>
                  Buscar empleo suele ser un proceso complejo, desorientador y desgastante. Scaler nace para resolver esa necesidad de fondo: brindar a cada profesional un camino claro, ordenado y estratégico que lo guíe desde la preparación inicial hasta la contratación.
                </p>
                <p>
                  Mediante automatización e inteligencia artificial, la plataforma optimiza currículums y redacta cartas de presentación (cover letters) personalizadas para cada vacante. Al mismo tiempo, acompaña el crecimiento a través de cursos y certificaciones que potencian las competencias clave para alcanzar el puesto anhelado.
                </p>
              </div>

              {/* Pilares estratégicos de Scaler */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-4 text-xs font-mono">
                <div className="p-4 bg-[var(--surface)] border border-[var(--border)] rounded-xl">
                  <span className="text-[var(--text)] font-semibold block mb-1"><span className="tabular-nums">01</span> · Empleabilidad activa</span>
                  <span className="text-[var(--text-muted)]">Acompañamiento y herramientas para conseguir trabajo de forma estratégica.</span>
                </div>
                <div className="p-4 bg-[var(--surface)] border border-[var(--border)] rounded-xl">
                  <span className="text-[var(--text)] font-semibold block mb-1"><span className="tabular-nums">02</span> · Currículum y perfil</span>
                  <span className="text-[var(--text-muted)]">Optimización integral del CV y del perfil profesional para destacar ante reclutadores.</span>
                </div>
                <div className="p-4 bg-[var(--surface)] border border-[var(--border)] rounded-xl">
                  <span className="text-[var(--text)] font-semibold block mb-1"><span className="tabular-nums">03</span> · Cursos y certificados</span>
                  <span className="text-[var(--text-muted)]">Rutas de aprendizaje y acreditaciones para cerrar brechas y subir de nivel.</span>
                </div>
                <div className="p-4 bg-[var(--surface)] border border-[var(--border)] rounded-xl">
                  <span className="text-[var(--text)] font-semibold block mb-1"><span className="tabular-nums">04</span> · IA y automatización</span>
                  <span className="text-[var(--text-muted)]">Asistentes inteligentes para adaptar CVs y cartas de presentación a cada vacante.</span>
                </div>
              </div>
            </ScrollReveal>

          <ScrollReveal blur={8} yOffset={20} className="lg:col-span-4 p-8 bg-[var(--surface)] space-y-5 rounded-2xl shadow-xs border border-[var(--border)]/30">
            <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] font-mono font-semibold pb-2">
              Datos del proyecto
            </h2>
            <div className="space-y-3.5 text-xs font-mono">
              <div className="flex justify-between py-1 items-center">
                <span className="text-[var(--text-muted)]">Estado:</span>
                <span className="font-semibold text-emerald-500 text-right inline-flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
                  Working on (En proceso)
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[var(--text-muted)]">Tipo:</span>
                <span className="font-semibold text-[var(--text)] text-right">Plataforma de carrera & IA</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[var(--text-muted)]">Diseño:</span>
                <span className="font-semibold text-[var(--text)]">Alejandro Rivera Castro</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[var(--text-muted)]">Año:</span>
                <span className="font-semibold text-[var(--text)] tabular-nums">2026</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[var(--text-muted)]">Enfoque:</span>
                <span className="text-[var(--text)] font-semibold text-right">Búsqueda laboral y desarrollo</span>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* =======================================================================
            IDENTIDAD VISUAL DE SCALER
            ======================================================================= */}
        <section className="mb-24">
          <ScrollReveal blur={8} yOffset={20}>
            <div className="p-8 sm:p-12 bg-[var(--surface)] rounded-2xl transition-colors shadow-xs border border-[var(--border)]/30">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10 pb-4 border-b border-[var(--border)]">
                <div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text)] tracking-tight">
                    Identidad visual de Scaler
                  </h2>
                  <p className="text-sm text-[var(--text-muted)] mt-1.5 font-light">
                    Versiones oficiales del logotipo en color, blanco y negro.
                  </p>
                </div>

                {/* Variant Switcher Pills */}
                <div className="inline-flex items-center p-1 bg-[var(--bg)] rounded-full border border-[var(--border)] text-xs font-mono self-start sm:self-auto shrink-0">
                  {(['color', 'white', 'black'] as const).map((variant) => (
                    <button
                      key={variant}
                      type="button"
                      onClick={() => setLogoVariant(variant)}
                      className={`px-4 py-1.5 rounded-full capitalize transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--text)] ${
                        logoVariant === variant
                          ? 'bg-[var(--text)] text-[var(--bg)] font-medium shadow-xs'
                          : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                      }`}
                    >
                      {variant === 'color' ? 'A Color' : variant === 'white' ? 'Blanco' : 'Negro'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Scaler Logo Canvas Display */}
              <div className="mb-6 w-full">
                {logoVariant === 'color' && (
                  <ImagePlaceholder
                    slotId="scaler-logo-color"
                    label="Logo Scaler · Versión a Color"
                    aspect="16:9"
                    fixedFrame
                    fillFrame
                    className="w-full min-h-[360px] sm:min-h-[460px] md:min-h-[520px] rounded-xl shadow-xs"
                  />
                )}

                {logoVariant === 'white' && (
                  <ImagePlaceholder
                    slotId="scaler-logo-white"
                    label="Logo Scaler · Versión en Blanco"
                    aspect="16:9"
                    fixedFrame
                    fillFrame
                    className="w-full min-h-[360px] sm:min-h-[460px] md:min-h-[520px] bg-[#0D0E11] text-white border-neutral-800 rounded-xl shadow-xs"
                  />
                )}

                {logoVariant === 'black' && (
                  <ImagePlaceholder
                    slotId="scaler-logo-black"
                    label="Logo Scaler · Versión en Negro"
                    aspect="16:9"
                    fixedFrame
                    fillFrame
                    className="w-full min-h-[360px] sm:min-h-[460px] md:min-h-[520px] bg-neutral-100 text-neutral-900 border-neutral-300 rounded-xl shadow-xs"
                  />
                )}
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* Blueprint Slots: Expansive Visual Grid */}
        <section className="mb-16">
          <ScrollReveal blur={8} yOffset={20} className="pb-8 mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl sm:text-5xl font-bold text-[var(--text)] tracking-tight">
                Maquetas y pantallas
              </h2>
            </div>
            <p className="text-xs font-mono text-[var(--text-muted)]">
              Despliegue visual de la plataforma Scaler
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <ScrollReveal blur={8} yOffset={24}>
              <ImagePlaceholder
                slotId="SLOT-SCALER-01"
                label="Scaler: Panel de optimización de perfil y CV"
                sublabel="Herramientas con IA para adaptar currículum y postulaciones laborales"
                aspect="16:9"
              />
            </ScrollReveal>
            <ScrollReveal blur={8} yOffset={24}>
              <ImagePlaceholder
                slotId="SLOT-SCALER-02"
                label="Scaler: Rutas de formación y certificaciones"
                sublabel="Módulos de desarrollo profesional, cursos recomendados y metas de carrera"
                aspect="16:9"
              />
            </ScrollReveal>
          </div>

          <ScrollReveal blur={10} yOffset={28} className="mt-10">
            <ImagePlaceholder
              slotId="SLOT-SCALER-03"
              label="Scaler: Experiencia integral de la plataforma"
              sublabel="Composición panorámica del ecosistema de aceleración profesional"
              aspect="21:9"
            />
          </ScrollReveal>
        </section>

        </div>
      </main>
    </div>
  );
}

export default ScalerPage;
