import React from 'react';
import { Link } from '../context/RouterContext';
import { ArrowUp, ArrowUpRight } from 'lucide-react';

export function Footer() {
  const OUTLOOK_EMAIL = 'alejandrorr.castro23@outlook.com';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      id="footer"
      className="w-full bg-[#0d0d0d] text-white font-sans transition-colors duration-200 select-none overflow-hidden"
    >
      <div className="max-w-[1920px] mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-10 pt-20 sm:pt-28 pb-4 flex flex-col justify-between min-h-[95svh]">
        
        {/* =========================================================================
            TOP SECTION: EXACT 4-COLUMN HYPER EFFEKT GRID (From Reference Screenshot)
            ========================================================================= */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-14 xl:gap-18">
          
          {/* COLUMN 1: CONTACTO & DETALLES */}
          <div className="flex flex-col justify-between space-y-10 sm:space-y-14">
            {/* Top: Contact invite */}
            <div>
              <Link 
                to="/contact" 
                className="group inline-flex items-center gap-2 text-2xl sm:text-3xl lg:text-[34px] font-bold tracking-tight text-white hover:text-neutral-300 transition-colors leading-tight"
              >
                <span>Hablemos de tu proyecto</span>
                <ArrowUpRight className="w-6 h-6 sm:w-7 sm:h-7 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 shrink-0" aria-hidden="true" />
              </Link>
            </div>

            {/* Bottom: Designer & Studio Details */}
            <div className="space-y-2 text-xs sm:text-[13px] text-neutral-400 leading-relaxed">
              <span className="text-neutral-400 block font-normal text-xs sm:text-[13px] mb-1">
                Sobre mi trabajo
              </span>
              <p className="text-neutral-300 font-light max-w-xs">
                Identidades visuales, publicidad y dirección de arte pensadas para comunicar con claridad.
              </p>
              <div className="pt-2 text-neutral-400 space-y-0.5">
                <p className="text-neutral-200 font-medium">Alejandro Rivera Castro</p>
              </div>
            </div>
          </div>

          {/* COLUMN 2: CONTACTO Y DISPONIBILIDAD */}
          <div className="flex flex-col justify-between space-y-10 sm:space-y-14">
            {/* Top: Private Email Contact & Response */}
            <div className="space-y-1 text-xs sm:text-[13px]">
              <a 
                href={`mailto:${OUTLOOK_EMAIL}?subject=Consulta%20-%20Alejandro%20Rivera`}
                className="text-white hover:text-neutral-300 transition-colors inline-flex items-center gap-1.5 font-sans text-sm sm:text-base font-normal group"
              >
                <span>Contactar por correo</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white transition-colors" aria-hidden="true" />
              </a>
              <p className="text-neutral-400 font-normal">
                Respuesta en menos de 24 horas
              </p>
            </div>

            {/* Bottom: Background & Availability */}
            <div className="space-y-2 text-xs sm:text-[13px] text-neutral-400">
              <p className="text-neutral-300 font-mono text-[12px] tabular-nums">
                Diseño Publicitario (2026)
              </p>
              <p className="text-neutral-400 font-mono text-[12px]">
                Modalidad: Proyectos locales y remotos
              </p>
            </div>
          </div>

          {/* COLUMN 3: SITEMAP & DISCIPLINES */}
          <div className="flex flex-col justify-between space-y-10 sm:space-y-14">
            {/* Top: Sitemap */}
            <div>
              <span className="text-xs sm:text-[13px] text-neutral-400 block mb-3 font-normal">
                Sitemap
              </span>
              <ul className="space-y-2 text-sm sm:text-[15px] text-neutral-200">
                <li><Link to="/work" className="hover:text-white transition-colors">Proyectos</Link></li>
                <li><Link to="/about" className="hover:text-white transition-colors">Perfil</Link></li>
                <li><Link to="/working-on" className="hover:text-white transition-colors">Working on (Scaler)</Link></li>
                <li><Link to="/updates" className="hover:text-white transition-colors">Bitácora</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contacto</Link></li>
              </ul>
            </div>

            {/* Bottom: Disciplines */}
            <div>
              <span className="text-xs sm:text-[13px] text-neutral-400 block mb-2 font-normal">
                Disciplinas
              </span>
              <ul className="space-y-1.5 text-xs sm:text-[13px] text-neutral-400">
                <li>Identidad de Marca & Manuales</li>
                <li>Campañas Publicitarias & Vía Pública</li>
                <li>Dirección de Arte & Concepto</li>
                <li>Sistemas Normativos & Signos</li>
              </ul>
            </div>
          </div>

          {/* COLUMN 4: CHANNELS & SYSTEMS */}
          <div className="flex flex-col justify-between space-y-10 sm:space-y-14">
            {/* Top: Channels & Actions */}
            <div>
              <span className="text-xs sm:text-[13px] text-neutral-400 block mb-3 font-normal">
                Canales
              </span>
              <ul className="space-y-2 text-sm sm:text-[15px] text-neutral-200">
                <li>
                  <Link to="/contact" className="hover:text-white transition-colors">
                    Formulario de Brief
                  </Link>
                </li>
                <li>
                  <a 
                    href="https://www.behance.net/gallery/254632137/PORTFOLIO-Graphic-Design-2026?platform=direct" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-white transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>Behance Oficial 2026</span>
                    <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                </li>
                <li>
                  <button 
                    onClick={scrollToTop} 
                    className="hover:text-white transition-colors inline-flex items-center gap-1.5 cursor-pointer text-neutral-400 hover:text-white pt-1 text-xs sm:text-[13px]"
                  >
                    <span>Volver arriba</span>
                    <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </li>
              </ul>
            </div>

            {/* Bottom: Digital & Systems */}
            <div>
              <span className="text-xs sm:text-[13px] text-neutral-400 block mb-2 font-normal">
                Sistemas & Digital
              </span>
              <ul className="space-y-1.5 text-xs sm:text-[13px] text-neutral-400">
                <li>Diseño de Interfaz (UI/UX) en Figma</li>
                <li>Design Tokens & Scaler Platform</li>
                <li>Edición de Video & Motion Graphics</li>
                <li>Prototipado Interactivo Smart Animate</li>
              </ul>
            </div>
          </div>

        </div>

        {/* =========================================================================
            BOTTOM SECTION: EXACT HYPER EFFEKT CRISP LOW-BRIGHTNESS BRAND SIGNATURE
            (NO blur, NO glow, NO gradient mask - pure sharp text with 15% brightness)
            ========================================================================= */}
        <div className="pt-24 sm:pt-32 lg:pt-40 w-full overflow-hidden select-none pointer-events-none">
          <div className="w-full flex items-baseline overflow-hidden text-white/15">
            {/* Massive, razor-sharp brand wordmark spanning edge-to-edge with 15% brightness */}
            <span 
              className="text-[10vw] sm:text-[11vw] lg:text-[11.8vw] font-bold tracking-tight leading-none whitespace-nowrap select-none text-white/15"
              style={{ letterSpacing: '-0.035em' }}
            >
              Alejandro Rivera
            </span>
          </div>

          {/* Discreet copyright line matching overall minimal studio design */}
          <div className="pt-6 pb-2 flex flex-col sm:flex-row items-start sm:items-center justify-between text-[11px] font-mono text-neutral-500 w-full">
            <span>© 2026 Alejandro Rivera Castro. Todos los derechos reservados.</span>
            <span>DISEÑO PUBLICITARIO & DIRECCIÓN DE ARTE</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
