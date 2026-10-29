import React, { useState, useEffect } from 'react';
import { ImagePlaceholder } from '../components/ImagePlaceholder';
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
      <main className="pt-32 sm:pt-40 pb-36 px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 w-full">
        
        {/* Editorial Masthead */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20 pb-12 w-full">
          <div className="lg:col-span-8 space-y-6">
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-[var(--text)] leading-none">
              Scaler: Plataforma para impulsar tu carrera
            </h1>
            <p className="text-xl sm:text-2xl lg:text-3xl text-[var(--text)] leading-relaxed font-light">
              Nacida para ayudar a las personas que buscan trabajo a conseguir empleo, perfeccionar su perfil y avanzar con paso firme hacia la carrera que desean.
            </p>
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
              <div className="p-4 bg-[var(--surface)] border border-[var(--border)] rounded-[3px]">
                <span className="text-[var(--text)] font-semibold block mb-1">01 · Empleabilidad activa</span>
                <span className="text-[var(--text-muted)]">Acompañamiento y herramientas para conseguir trabajo de forma estratégica.</span>
              </div>
              <div className="p-4 bg-[var(--surface)] border border-[var(--border)] rounded-[3px]">
                <span className="text-[var(--text)] font-semibold block mb-1">02 · Currículum y perfil</span>
                <span className="text-[var(--text-muted)]">Optimización integral del CV y del perfil profesional para destacar ante reclutadores.</span>
              </div>
              <div className="p-4 bg-[var(--surface)] border border-[var(--border)] rounded-[3px]">
                <span className="text-[var(--text)] font-semibold block mb-1">03 · Cursos y certificados</span>
                <span className="text-[var(--text-muted)]">Rutas de aprendizaje y acreditaciones para cerrar brechas y subir de nivel.</span>
              </div>
              <div className="p-4 bg-[var(--surface)] border border-[var(--border)] rounded-[3px]">
                <span className="text-[var(--text)] font-semibold block mb-1">04 · IA y automatización</span>
                <span className="text-[var(--text-muted)]">Asistentes inteligentes para adaptar CVs y cartas de presentación a cada vacante.</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 p-8 bg-[var(--surface)] space-y-5 rounded-[3px] shadow-xs">
            <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] font-mono font-semibold pb-2">
              Datos del proyecto
            </h2>
            <div className="space-y-3.5 text-xs font-mono">
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
                <span className="font-semibold text-[var(--text)]">2026</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[var(--text-muted)]">Enfoque:</span>
                <span className="text-[var(--text)] font-semibold text-right">Búsqueda laboral y desarrollo</span>
              </div>
            </div>
          </div>
        </div>

        {/* =======================================================================
            IDENTIDAD VISUAL DE SCALER:
            - Solo opciones Color, Blanco y Negro (sin 'ver los 3').
            - Marco fijo y continuo que no encoge ni cambia de tamaño al alternar.
            - Opción sin recorte que abarca todo el espacio del placeholder.
            ======================================================================= */}
        <section className="mb-24">
          <div className="p-8 sm:p-12 bg-[var(--surface)] rounded-[3px] transition-colors shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10 pb-4 border-b border-[var(--border)]">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text)] tracking-tight">
                  Identidad visual de Scaler
                </h2>
                <p className="text-sm text-[var(--text-muted)] mt-1.5 font-light">
                  Ranuras para cargar el logotipo en color, blanco y negro. Abarcan todo el marco sin recorte.
                </p>
              </div>

              {/* Variant Switcher: solo Color, Blanco, Negro */}
              <div 
                className="flex items-center gap-1.5 bg-[var(--bg)] p-1.5 rounded-[3px] border border-[var(--border)]" 
                role="group" 
                aria-label="Variante cromática del isotipo de Scaler"
              >
                {(['color', 'white', 'black'] as const).map((v) => (
                  <button
                    key={v}
                    onClick={() => setLogoVariant(v)}
                    aria-pressed={logoVariant === v}
                    className={`px-4 sm:px-5 py-2 text-xs font-mono tracking-tight rounded-[2px] transition-all cursor-pointer ${
                      logoVariant === v
                        ? 'bg-[var(--primary)] text-[var(--on-accent)] font-semibold shadow-xs'
                        : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                    }`}
                  >
                    {v === 'color' ? 'Color' : v === 'white' ? 'Blanco' : 'Negro'}
                  </button>
                ))}
              </div>
            </div>

            {/* Scaler Logo Canvas Display: Marco siempre fijo, abarcando todo el espacio, relleno completo */}
            <div className="mb-6 w-full">
              {logoVariant === 'color' && (
                <ImagePlaceholder
                  slotId="scaler-logo-color"
                  label="Logo Scaler · Versión a Color"
                  sublabel="Carga o arrastra aquí la imagen del logo en su versión de color principal"
                  aspect="16:9"
                  fixedFrame
                  fillFrame
                  dimensions="Relleno completo · 16:9"
                  className="w-full min-h-[360px] sm:min-h-[460px] md:min-h-[520px] rounded-[3px] shadow-xs"
                />
              )}

              {logoVariant === 'white' && (
                <ImagePlaceholder
                  slotId="scaler-logo-white"
                  label="Logo Scaler · Versión en Blanco"
                  sublabel="Carga o arrastra aquí la imagen del logo en blanco (fondo oscuro)"
                  aspect="16:9"
                  fixedFrame
                  fillFrame
                  dimensions="Relleno completo · 16:9"
                  className="w-full min-h-[360px] sm:min-h-[460px] md:min-h-[520px] bg-[#0D0E11] text-white border-neutral-800 rounded-[3px] shadow-xs"
                />
              )}

              {logoVariant === 'black' && (
                <ImagePlaceholder
                  slotId="scaler-logo-black"
                  label="Logo Scaler · Versión en Negro"
                  sublabel="Carga o arrastra aquí la imagen del logo en negro (fondo claro)"
                  aspect="16:9"
                  fixedFrame
                  fillFrame
                  dimensions="Relleno completo · 16:9"
                  className="w-full min-h-[360px] sm:min-h-[460px] md:min-h-[520px] bg-neutral-100 text-neutral-900 border-neutral-300 rounded-[3px] shadow-xs"
                />
              )}
            </div>

            <p className="text-xs text-[var(--text-muted)] font-mono text-center sm:text-left">
              Ranuras interactivas de tamaño fijo 16:9. La imagen rellena todo el marco sin marcos negros a los lados.
            </p>
          </div>
        </section>

        {/* Blueprint Slots: Expansive Visual Grid */}
        <section className="mb-16">
          <div className="pb-8 mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl sm:text-5xl font-bold text-[var(--text)] tracking-tight">
                Maquetas y pantallas
              </h2>
            </div>
            <p className="text-xs font-mono text-[var(--text-muted)]">
              Despliegue visual de la plataforma Scaler
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <ImagePlaceholder
              slotId="SLOT-SCALER-01"
              label="Scaler: Panel de optimización de perfil y CV"
              sublabel="Herramientas con IA para adaptar currículum y postulaciones laborales"
              aspect="16:9"
            />
            <ImagePlaceholder
              slotId="SLOT-SCALER-02"
              label="Scaler: Rutas de formación y certificaciones"
              sublabel="Módulos de desarrollo profesional, cursos recomendados y metas de carrera"
              aspect="16:9"
            />
          </div>

          <div className="mt-10">
            <ImagePlaceholder
              slotId="SLOT-SCALER-03"
              label="Scaler: Experiencia integral de la plataforma"
              sublabel="Composición panorámica del ecosistema de aceleración profesional"
              aspect="21:9"
            />
          </div>
        </section>

      </main>
    </div>
  );
}

export default ScalerPage;
