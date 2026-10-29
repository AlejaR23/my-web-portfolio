import React from 'react';
import { Link } from '../context/RouterContext';
import { ImagePlaceholder } from '../components/ImagePlaceholder';
import { 
  ArrowRight, 
  ArrowUpRight, 
  BookOpen,
  Megaphone,
  Palette
} from 'lucide-react';

export function AboutPage() {
  const OUTLOOK_EMAIL = 'alejandrorr.castro23@outlook.com';

  return (
    <div className="relative min-h-screen text-[var(--text)] transition-colors duration-200 overflow-x-hidden font-sans bg-[var(--bg)]">
      <main className="pt-32 sm:pt-40 pb-36 px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 w-full">
        
        {/* Editorial Masthead */}
        <div className="pb-12 mb-14 w-full">
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold text-[var(--text)] tracking-tight mb-6 leading-none">
            Sobre mí
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl text-[var(--text-muted)] leading-relaxed font-light">
            Diseño marcas, publicidad y piezas visuales con un enfoque práctico y cercano.
          </p>
        </div>

        {/* Main Grid: Narrative & Quick Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-24 items-start">
          
          {/* Narrative Column */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-8 text-[var(--text-muted)] font-sans text-base sm:text-lg leading-relaxed font-light">
            <div className="p-8 sm:p-10 bg-[var(--surface)] rounded-[3px]">
              <p className="text-xl sm:text-2xl text-[var(--text)] font-normal leading-relaxed">
                Soy <strong className="text-[var(--text)] font-bold">Alejandro Rivera Castro</strong>, diseñador publicitario. Concluí mi formación en 2026 y me dedico a crear identidades de marca, campañas publicitarias, contenido digital y edición de video o animación.
              </p>
            </div>

            <p>
              Para mí el buen diseño no se trata de complicar las cosas, sino de ordenar las ideas para que el mensaje llegue claro a las personas. Me gusta que cada pieza tenga una razón de ser, desde un cartel en la calle hasta un post en redes o la pantalla de una aplicación.
            </p>

            <p>
              En este espacio reúno proyectos donde he aplicado ese enfoque: la identidad visual de <strong className="text-[var(--text)] font-medium">Exofauna</strong> para un hospital veterinario de animales no convencionales, el prototipo interactivo en Figma de <strong className="text-[var(--text)] font-medium">Tempo</strong> para ciclistas, y la campaña <strong className="text-[var(--text)] font-medium">Se Vale Avisar</strong>, que utiliza señales ocupacionales para hablar de salud mental y descanso.
            </p>
          </div>

          {/* Right Column: Portrait & Details */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-8">
            
            {/* Portrait Image Placeholder */}
            <div className="overflow-hidden rounded-[3px] shadow-xs">
              <ImagePlaceholder
                slotId="SLOT-BIO-01"
                label="Alejandro Rivera"
                aspect="3:4"
              />
            </div>

            {/* Details Card */}
            <div className="p-8 bg-[var(--surface)] rounded-[3px] space-y-6 shadow-xs">
              <div className="space-y-4 text-xs font-sans">
                <div>
                  <span className="text-[var(--text-muted)] block mb-1 font-mono text-[10px] uppercase">FORMACIÓN</span>
                  <span className="text-[var(--text)] font-medium text-sm">
                    Diseño Publicitario (2026)
                  </span>
                </div>

                <div>
                  <span className="text-[var(--text-muted)] block mb-1 font-mono text-[10px] uppercase">ÁREAS DE ENFOQUE</span>
                  <span className="text-[var(--text)] font-medium leading-relaxed block text-sm">
                    Identidad de marca, publicidad, piezas digitales, video y motion graphics
                  </span>
                </div>

                <div>
                  <span className="text-[var(--text-muted)] block mb-1 font-mono text-[10px] uppercase">DISPONIBILIDAD</span>
                  <span className="text-[var(--text)] font-medium text-sm">
                    Abierto a nuevos proyectos y encargos
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/contact"
                  className="w-full py-3.5 bg-[var(--primary)] text-[var(--on-accent)] font-semibold text-xs tracking-wider uppercase rounded-[3px] flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-xs"
                >
                  <span>Hablemos de tu proyecto</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>
        </div>

        {/* Disciplines Section */}
        <section className="mb-20">
          <div className="pb-8 mb-12">
            <h2 className="text-3xl sm:text-5xl font-bold text-[var(--text)] tracking-tight">
              Áreas de trabajo
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-[var(--surface)] rounded-[3px] flex flex-col justify-between shadow-xs">
              <div>
                <div className="w-10 h-10 bg-[var(--bg)] rounded-[3px] flex items-center justify-center text-[var(--text)] mb-6">
                  <Megaphone className="w-4 h-4" />
                </div>
                <h3 className="text-xl font-bold text-[var(--text)] mb-3">
                  Campañas publicitarias
                </h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-6 font-light">
                  Ideas creativas, dirección de arte para vallas y cartelería exterior, y piezas adaptadas para redes sociales.
                </p>
              </div>
              <ul className="space-y-1.5 text-xs font-mono text-[var(--text-muted)] pt-2">
                <li>· Concepto creativo y redacción</li>
                <li>· Formatos para vía pública</li>
                <li>· Contenido para redes sociales</li>
              </ul>
            </div>

            <div className="p-8 bg-[var(--surface)] rounded-[3px] flex flex-col justify-between shadow-xs">
              <div>
                <div className="w-10 h-10 bg-[var(--bg)] rounded-[3px] flex items-center justify-center text-[var(--text)] mb-6">
                  <BookOpen className="w-4 h-4" />
                </div>
                <h3 className="text-xl font-bold text-[var(--text)] mb-3">
                  Branding e identidad visual
                </h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-6 font-light">
                  Logotipos, sistemas gráficos, paletas de color y manuales de marca para mantener orden y consistencia.
                </p>
              </div>
              <ul className="space-y-1.5 text-xs font-mono text-[var(--text-muted)] pt-2">
                <li>· Manuales prácticos de marca</li>
                <li>· Retículas constructivas y color</li>
                <li>· Aplicaciones en papelería y soportes</li>
              </ul>
            </div>

            <div className="p-8 bg-[var(--surface)] rounded-[3px] flex flex-col justify-between shadow-xs">
              <div>
                <div className="w-10 h-10 bg-[var(--bg)] rounded-[3px] flex items-center justify-center text-[var(--text)] mb-6">
                  <Palette className="w-4 h-4" />
                </div>
                <h3 className="text-xl font-bold text-[var(--text)] mb-3">
                  Diseño digital y audiovisual
                </h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-6 font-light">
                  Diseño de marcas gráficas, prototipado de pantallas en Figma, edición de video y animación gráfica.
                </p>
              </div>
              <ul className="space-y-1.5 text-xs font-mono text-[var(--text-muted)] pt-2">
                <li>· Marcas gráficas e isotipos</li>
                <li>· Prototipos en Figma</li>
                <li>· Edición de video y motion graphics</li>
              </ul>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}

export default AboutPage;
