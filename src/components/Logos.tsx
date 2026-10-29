import React from 'react';

/**
 * EXACT FAITHFUL BRAND LOGOS FROM ALEJANDRO RIVERA'S PORTFOLIO
 * 
 * Sourced directly from:
 * - Scaler brand assets (imagotipo scaler full color, isotipo scaler full color, negro, blanco)
 * - Logo tempo.png & Tempo App: Prototipo UI.pdf
 * - Manual de marca Exofauna Prueba de Grado V Alejandro Rivera.pdf
 * - Campaña SE VALE AVISAR.pdf
 * - Portfolio Alejandro Rivera 2026 1.pdf (Traveling Chicken, VAULT, Tazza, KIEM)
 */

// 1. Scaler: Isotipo e imagotipo vectorial

export function ScalerIsotype({
  variant = 'color',
  className = 'w-10 h-10',
}: {
  variant?: 'color' | 'black' | 'white';
  className?: string;
}) {
  const gradientId = React.useId();

  return (
    <svg
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Scaler Isotype"
    >
      <defs>
        <linearGradient
          id={gradientId}
          x1="18"
          y1="135"
          x2="142"
          y2="25"
          gradientUnits="userSpaceOnUse"
        >
          {/* Exact Scaler gradient: deep violet base transitioning to magenta and golden morning dawn */}
          <stop offset="0%" stopColor="#1E1035" />
          <stop offset="30%" stopColor="#3F2168" />
          <stop offset="65%" stopColor="#9C4D78" />
          <stop offset="100%" stopColor="#F5C453" />
        </linearGradient>
      </defs>

      {/* Main Ascending Energy Curve */}
      <path
        d="M 22 118 
           C 18 114, 20 106, 26 98 
           L 58 48 
           C 72 28, 96 18, 120 22 
           C 138 25, 148 38, 148 54 
           C 148 68, 140 78, 128 84 
           C 122 87, 115 85, 111 80 
           L 96 64 
           C 92 60, 86 60, 82 64 
           L 76 70 
           C 72 74, 68 74, 64 70 
           L 54 60 
           C 50 56, 44 58, 42 63 
           L 38 72 
           C 36 76, 38 82, 42 86 
           L 58 102 
           C 65 109, 65 120, 58 127 
           L 46 139 
           C 39 146, 28 144, 22 136 Z"
        fill={
          variant === 'color'
            ? `url(#${gradientId})`
            : variant === 'white'
            ? '#FFFFFF'
            : '#111827'
        }
      />

      {/* Underlying Milestone Diamond Node */}
      <path
        d="M 88 126 
           L 114 100 
           C 119 95, 127 95, 132 100 
           L 146 114 
           C 151 119, 151 127, 146 132 
           L 120 158 
           C 115 163, 107 163, 102 158 
           L 88 144 
           C 83 139, 83 131, 88 126 Z"
        fill={
          variant === 'color'
            ? `url(#${gradientId})`
            : variant === 'white'
            ? '#FFFFFF'
            : '#111827'
        }
      />
    </svg>
  );
}

export function ScalerLogo({
  variant = 'color',
  className = 'h-10',
}: {
  variant?: 'color' | 'black' | 'white';
  className?: string;
}) {
  const textColor =
    variant === 'white' ? '#FFFFFF' : variant === 'black' ? '#111827' : 'currentColor';

  return (
    <div className={`inline-flex items-center gap-3.5 ${className}`}>
      <ScalerIsotype variant={variant} className="h-full w-auto aspect-square shrink-0" />
      <span
        style={{ color: textColor }}
        className="font-display font-bold text-2xl tracking-[-0.03em] select-none"
      >
        Scaler
      </span>
    </div>
  );
}

export const ScalerImagotipo = ScalerLogo;

// 2. Tempo: Logotipo ciclista

export function TempoLogo({
  className = 'h-8',
  variant = 'default',
}: {
  className?: string;
  variant?: 'default' | 'white' | 'black';
}) {
  const textColor =
    variant === 'white' ? '#FFFFFF' : variant === 'black' ? '#111827' : 'currentColor';
  const orangeAccent = '#FF5B00';

  return (
    <div className={`inline-flex items-center gap-2 select-none ${className}`}>
      <svg
        viewBox="0 0 170 42"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto"
        aria-label="Tempo Official Logo"
      >
        {/* Distinctive Orange Parallelogram Accent */}
        <polygon points="26,2 38,2 31,13 19,13" fill={orangeAccent} />

        {/* Dynamic Forward-Slanted Bold Italic Lettering "TEMPO" */}
        <text
          x="0"
          y="35"
          fill={textColor}
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontStyle="italic"
          fontSize="38"
          letterSpacing="-1.5"
        >
          TEMPO
        </text>
      </svg>
    </div>
  );
}

export function TempoGlyph({
  className = 'w-10 h-10',
  color = '#FF5B00',
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Tempo Glyph"
    >
      {/* Orange parallelogram slash */}
      <polygon points="28,4 44,4 34,16 18,16" fill={color} />
      {/* Bold athletic slanted T */}
      <path
        d="M 6 18 L 38 18 L 34 24 L 25 24 L 14 44 L 6 44 L 17 24 L 6 24 Z"
        fill="currentColor"
      />
    </svg>
  );
}

// 3. Exofauna: Isotipo e imagotipo de rescate

export function ExofaunaIsotype({
  className = 'w-12 h-12',
  variant = 'color',
}: {
  className?: string;
  variant?: 'color' | 'gold' | 'light' | 'dark';
}) {
  const crestBg =
    variant === 'light' ? '#FFFFFF' : variant === 'dark' ? '#123C3D' : '#123C3D';
  const goldColor = '#B8863B';
  const beakColor = variant === 'light' ? '#123C3D' : '#F5F1E8';

  return (
    <svg
      viewBox="0 0 100 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Exofauna Toucan Crest"
    >
      {/* Shield Arch Contour */}
      <path
        d="M 12 16 
           C 12 10, 18 6, 24 6 
           L 76 6 
           C 82 6, 88 10, 88 16 
           L 88 74 
           C 88 95, 50 114, 50 114 
           C 50 114, 12 95, 12 74 Z"
        fill={crestBg}
        stroke={goldColor}
        strokeWidth="3"
      />

      {/* Stylized Keel-billed Toucan Profile */}
      {/* Beak Upper Ridge */}
      <path
        d="M 32 30 
           C 48 24, 76 28, 80 44 
           C 74 48, 54 48, 42 46 
           L 32 46 Z"
        fill={goldColor}
      />
      {/* Beak Lower Ridge */}
      <path
        d="M 32 46 
           C 44 48, 64 50, 72 46 
           C 68 56, 52 58, 38 56 
           L 32 56 Z"
        fill="#B25D3D"
      />
      {/* Toucan Head & Neck */}
      <path
        d="M 32 28 
           C 24 32, 22 42, 24 54 
           C 26 68, 34 82, 48 88 
           C 40 78, 36 66, 36 54 
           L 32 46 Z"
        fill={beakColor}
      />
      {/* Toucan Eye */}
      <circle cx="34" cy="38" r="3.5" fill={goldColor} />
      <circle cx="34" cy="38" r="1.5" fill="#123C3D" />

      {/* Decorative Base Flourish */}
      <path
        d="M 38 96 L 50 90 L 62 96 L 50 104 Z"
        fill={goldColor}
      />
    </svg>
  );
}

export function ExofaunaLogo({
  className = 'h-12',
  variant = 'dark',
}: {
  className?: string;
  variant?: 'light' | 'dark' | 'gold';
}) {
  const isLight = variant === 'light';
  const textColor = isLight ? '#F5F1E8' : '#123C3D';
  const goldColor = '#B8863B';

  return (
    <div className={`inline-flex items-center gap-3.5 ${className}`}>
      <ExofaunaIsotype
        variant={isLight ? 'light' : 'dark'}
        className="h-full w-auto aspect-[100/120] shrink-0"
      />
      <div className="flex flex-col justify-center">
        <span
          style={{ color: textColor }}
          className="font-serif-editorial font-bold text-2xl tracking-[0.14em] uppercase leading-none"
        >
          EXOFAUNA
        </span>
        <div className="flex items-center gap-2 mt-1">
          <span className="h-px w-4 bg-[#B8863B]/60" />
          <span
            style={{ color: goldColor }}
            className="text-[9px] font-mono tracking-[0.25em] uppercase font-semibold whitespace-nowrap"
          >
            Hospital Veterinario · NAC
          </span>
        </div>
      </div>
    </div>
  );
}

// 4. Se Vale Avisar: Emblema de campaña

export function SeValeAvisarBadge({
  className = 'h-14',
  size = 'normal',
}: {
  className?: string;
  size?: 'small' | 'normal' | 'large';
}) {
  return (
    <div className={`inline-flex items-center gap-3.5 select-none ${className}`}>
      {/* Yellow Occupational Road Diamond Sign */}
      <div className="relative w-12 h-12 shrink-0 flex items-center justify-center">
        <div className="w-10 h-10 bg-[#FFC107] border-2 border-black rotate-45 flex items-center justify-center shadow-md">
          <div className="-rotate-45 flex flex-col items-center justify-center">
            <span className="text-black font-black text-xl leading-none">!</span>
          </div>
        </div>
      </div>

      {/* Heavy Gothic Typography Block */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className="bg-black text-[#FFC107] font-black text-xs px-2 py-0.5 uppercase tracking-wider font-campaign">
            SE VALE
          </span>
          <span className="bg-[#FFC107] text-black font-black text-xs px-2 py-0.5 uppercase tracking-wider font-campaign border border-black">
            AVISAR
          </span>
        </div>
        <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-neutral-600 dark:text-neutral-400 mt-1 font-semibold">
          Campaña de Salud Mental Laboral
        </span>
      </div>
    </div>
  );
}

// 5. The Traveling Chicken: Sello gastronómico

export function TravelingChickenLogo({
  className = 'w-24 h-24',
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="The Traveling Chicken Food Truck Seal"
    >
      {/* Outer Crimson Circle */}
      <circle cx="80" cy="80" r="74" fill="#D62828" stroke="#FDF0D5" strokeWidth="3" />
      <circle cx="80" cy="80" r="68" stroke="#FDF0D5" strokeDasharray="3 3" strokeWidth="1.5" />

      {/* Center Warm Medallion */}
      <circle cx="80" cy="80" r="48" fill="#FDF0D5" stroke="#D62828" strokeWidth="2" />

      {/* Illustrated Rooster Silhouette */}
      <path
        d="M 68 84 
           C 66 76, 70 66, 76 60 
           C 78 58, 80 54, 80 50 
           C 84 48, 88 52, 90 54 
           C 94 50, 96 52, 98 56 
           C 102 54, 104 58, 102 62 
           C 100 66, 96 70, 96 74 
           C 100 78, 102 84, 98 90 
           C 94 96, 86 100, 78 98 
           C 72 96, 68 90, 68 84 Z"
        fill="#D62828"
      />
      {/* Beak */}
      <polygon points="98,62 108,66 98,70" fill="#F4A261" />
      {/* Eye */}
      <circle cx="88" cy="62" r="2.5" fill="#FDF0D5" />
      {/* Chef Scarf */}
      <path d="M 78 74 C 84 76, 92 76, 96 74 L 92 82 L 82 82 Z" fill="#264653" />

      {/* Arched Typography Paths */}
      <path id="chickenArcTop" d="M 28 80 A 52 52 0 0 1 132 80" fill="none" />
      <path id="chickenArcBottom" d="M 132 80 A 52 52 0 0 1 28 80" fill="none" />

      <text fill="#FDF0D5" fontSize="10" fontWeight="900" letterSpacing="2.5">
        <textPath href="#chickenArcTop" startOffset="50%" textAnchor="middle">
          THE TRAVELING CHICKEN
        </textPath>
      </text>

      <text fill="#FDF0D5" fontSize="8" fontWeight="800" letterSpacing="2">
        <textPath href="#chickenArcBottom" startOffset="50%" textAnchor="middle">
          ★ FOOD TRUCK · CRISPY ★
        </textPath>
      </text>
    </svg>
  );
}

// 6. Baúl (VAULT): Logotipo urbano

export function VaultLogo({
  className = 'text-3xl',
  color = 'currentColor',
}: {
  className?: string;
  color?: string;
}) {
  return (
    <div
      style={{ color }}
      className={`font-sans tracking-[0.35em] font-black uppercase inline-flex items-center select-none ${className}`}
    >
      <span>V</span>
      {/* Custom Keyhole Chevron 'A' */}
      <span className="relative inline-flex items-center justify-center mx-1">
        <svg viewBox="0 0 24 24" className="w-[0.85em] h-[0.85em] fill-current" aria-hidden="true">
          <path d="M 12 2 L 2 22 L 7 22 L 10 16 L 14 16 L 17 22 L 22 22 Z M 12 7 L 14 12 L 10 12 Z" />
          <circle cx="12" cy="18" r="1.5" className="fill-neutral-900 dark:fill-white" />
        </svg>
      </span>
      <span>ULT</span>
    </div>
  );
}

// 7. Taza: Café de especialidad

export function TazzaCafeLogo({
  className = 'w-16 h-16',
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Tazza Cafe Logo"
    >
      <circle cx="50" cy="50" r="46" fill="#0F241A" stroke="#B8863B" strokeWidth="2" />
      {/* Dual Roasted Bean and Botanic Leaf */}
      <path
        d="M 50 22 
           C 66 22, 74 36, 72 50 
           C 70 64, 58 76, 50 78 
           C 42 76, 30 64, 28 50 
           C 26 36, 34 22, 50 22 Z"
        fill="#B8863B"
      />
      {/* Center S-Curved Roast Crease */}
      <path
        d="M 50 24 
           C 54 36, 42 46, 50 56 
           C 58 66, 46 72, 50 76"
        stroke="#0F241A"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

// 8. Kiem: Monograma universitario

export function KiemUniversityLogo({
  className = 'h-12',
}: {
  className?: string;
}) {
  return (
    <div className={`inline-flex items-center gap-2 font-display font-black text-2xl tracking-tight text-[#0E1E38] dark:text-[#E2E8F0] ${className}`}>
      <span className="w-9 h-9 rounded-lg bg-[#0E1E38] dark:bg-[#1E3A8A] text-[#F5C453] flex items-center justify-center text-sm font-black border border-[#F5C453]/40">
        KM
      </span>
      <span>KIEM UNIVERSITY</span>
    </div>
  );
}
