import defaultExofaunaImage from '../assets/images/exofauna-mesa-14-100.jpg';
import { getPermanentImage } from '../data/permanentImages';

/**
 * High-definition visual SVG data URIs for projects in Alejandro Rivera's portfolio.
 * These serve as the rich photographic/artwork fallback when no custom user photo has been uploaded.
 */

function encodeSvg(svgString: string): string {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svgString.trim())}`;
}

export function getProjectDefaultImage(slug: string): string {
  const permanent = getPermanentImage(slug);
  if (permanent) return permanent;

  switch (slug) {
    case 'exofauna':
      return defaultExofaunaImage;

    case 'tempo':
      return encodeSvg(`
        <svg xmlns="http://www.w3.org/2000/svg" width="1280" height="960" viewBox="0 0 1280 960">
          <defs>
            <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#0A0B0E"/>
              <stop offset="60%" stop-color="#121319"/>
              <stop offset="100%" stop-color="#1E130E"/>
            </linearGradient>
            <radialGradient id="glow" cx="60%" cy="40%" r="50%">
              <stop offset="0%" stop-color="#FF5C1A" stop-opacity="0.35"/>
              <stop offset="100%" stop-color="#FF5C1A" stop-opacity="0"/>
            </radialGradient>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="#ffffff" fill-opacity="0.12"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#bg)"/>
          <rect width="100%" height="100%" fill="url(#glow)"/>
          <rect width="100%" height="100%" fill="url(#grid)"/>

          <!-- Cockpit telemetry graphic -->
          <g transform="translate(180, 260)">
            <!-- Pill tag -->
            <rect x="0" y="0" width="220" height="42" rx="21" fill="#000000" fill-opacity="0.7" stroke="#FF5C1A" stroke-width="1.5"/>
            <circle cx="24" cy="21" r="5" fill="#FF5C1A"/>
            <text x="42" y="27" fill="#FF5C1A" font-family="monospace" font-size="14" font-weight="bold" letter-spacing="2">LIVE TELEMETRY</text>

            <!-- Huge kinetic wordmark -->
            <text x="0" y="160" fill="#ffffff" font-family="system-ui, -apple-system, sans-serif" font-size="120" font-weight="900" font-style="italic" letter-spacing="-4">TEMPO</text>
            <rect x="0" y="185" width="480" height="8" rx="4" fill="#FF5C1A"/>

            <!-- HUD Stats -->
            <text x="0" y="240" fill="#C8F000" font-family="monospace" font-size="22" font-weight="bold" letter-spacing="3">120 BPM · 212 W · 34.2 KM/H</text>
            <text x="0" y="280" fill="#888899" font-family="system-ui, sans-serif" font-size="18">COCKPIT INTERFACE &amp; ELEVATION HUD · VOLCÁN IRAZÚ PASS</text>
          </g>

          <!-- Elevation Sparkline Graphic -->
          <g transform="translate(180, 680)">
            <line x1="0" y1="120" x2="920" y2="120" stroke="#ffffff" stroke-opacity="0.2" stroke-width="2"/>
            <path d="M 0 120 Q 150 110, 240 60 T 480 30 T 700 80 T 920 10" fill="none" stroke="#FF5C1A" stroke-width="4"/>
            <path d="M 0 120 Q 150 110, 240 60 T 480 30 T 700 80 T 920 10 L 920 120 L 0 120 Z" fill="#FF5C1A" fill-opacity="0.15"/>
            <circle cx="920" cy="10" r="8" fill="#C8F000"/>
            <text x="800" y="0" fill="#C8F000" font-family="monospace" font-size="16" font-weight="bold">3,821 M</text>
          </g>
        </svg>
      `);

    case 'se-vale-avisar':
      return encodeSvg(`
        <svg xmlns="http://www.w3.org/2000/svg" width="1280" height="960" viewBox="0 0 1280 960">
          <defs>
            <linearGradient id="caution" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#141416"/>
              <stop offset="100%" stop-color="#09090A"/>
            </linearGradient>
            <pattern id="stripes" width="40" height="40" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="40" stroke="#FED000" stroke-width="12" stroke-opacity="0.12"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#caution)"/>
          <rect width="100%" height="100%" fill="url(#stripes)"/>

          <!-- Caution Badge -->
          <g transform="translate(640, 420)">
            <!-- Diamond Sign -->
            <rect x="-110" y="-110" width="220" height="220" rx="20" fill="#FED000" stroke="#000000" stroke-width="12" transform="rotate(45)" filter="drop-shadow(0 20px 30px rgba(254, 208, 0, 0.3))"/>
            <text x="0" y="35" fill="#000000" font-family="system-ui, sans-serif" font-size="110" font-weight="900" text-anchor="middle">!</text>

            <!-- Slogan Banners -->
            <g transform="translate(0, 160)">
              <rect x="-240" y="-30" width="220" height="60" fill="#000000" stroke="#ffffff" stroke-width="2"/>
              <text x="-130" y="12" fill="#FED000" font-family="system-ui, sans-serif" font-size="32" font-weight="900" text-anchor="middle" letter-spacing="3">SE VALE</text>

              <rect x="-10" y="-30" width="240" height="60" fill="#FED000" stroke="#000000" stroke-width="2"/>
              <text x="110" y="12" fill="#000000" font-family="system-ui, sans-serif" font-size="32" font-weight="900" text-anchor="middle" letter-spacing="3">AVISAR</text>
            </g>

            <text x="0" y="270" fill="#ffffff" font-family="system-ui, sans-serif" font-size="24" font-weight="600" text-anchor="middle">
              Así como lees las señales de alto, lee las tuyas.
            </text>
            <text x="0" y="315" fill="#FED000" font-family="monospace" font-size="18" text-anchor="middle" letter-spacing="2">
              CONSEJO DE SALUD OCUPACIONAL · MTSS / INS
            </text>
          </g>
        </svg>
      `);

    case 'scaler':
      return encodeSvg(`
        <svg xmlns="http://www.w3.org/2000/svg" width="1280" height="960" viewBox="0 0 1280 960">
          <defs>
            <linearGradient id="scBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#08080C"/>
              <stop offset="50%" stop-color="#120A1D"/>
              <stop offset="100%" stop-color="#1A1208"/>
            </linearGradient>
            <linearGradient id="scGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#F5B838"/>
              <stop offset="100%" stop-color="#A855F7"/>
            </linearGradient>
            <radialGradient id="meshGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#A855F7" stop-opacity="0.3"/>
              <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#scBg)"/>
          <circle cx="640" cy="460" r="400" fill="url(#meshGlow)"/>

          <!-- Scaler Node Graphic -->
          <g transform="translate(640, 420)">
            <polygon points="0,-140 120,-60 120,80 0,160 -120,80 -120,-60" fill="none" stroke="url(#scGrad)" stroke-width="8" stroke-dasharray="16 8"/>
            <polygon points="0,-100 85,-45 85,55 0,110 -85,55 -85,-45" fill="url(#scGrad)" fill-opacity="0.18" stroke="#ffffff" stroke-width="2"/>
            <circle cx="0" cy="5" r="28" fill="url(#scGrad)"/>

            <text x="0" y="240" fill="#ffffff" font-family="system-ui, sans-serif" font-size="76" font-weight="900" text-anchor="middle" letter-spacing="8">SCALER</text>
            <text x="0" y="285" fill="#F5B838" font-family="monospace" font-size="18" text-anchor="middle" letter-spacing="4">VENTURE STUDIO &amp; DESIGN SYSTEM</text>
          </g>
        </svg>
      `);

    case 'traveling-chicken':
    case 'the-traveling-chicken':
      return encodeSvg(`
        <svg xmlns="http://www.w3.org/2000/svg" width="1280" height="960" viewBox="0 0 1280 960">
          <defs>
            <linearGradient id="tcBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#4A0C0E"/>
              <stop offset="50%" stop-color="#731416"/>
              <stop offset="100%" stop-color="#260405"/>
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#tcBg)"/>
          
          <g transform="translate(640, 440)">
            <circle cx="0" cy="-40" r="150" fill="none" stroke="#DDA853" stroke-width="5" stroke-dasharray="8 6"/>
            <!-- Silhouette Rooster / Food Truck Symbol -->
            <path d="M -50 -10 Q 0 -90 50 -10 Q 80 50 0 80 Q -80 50 -50 -10 Z" fill="#DDA853" fill-opacity="0.25" stroke="#F5F1E8" stroke-width="4"/>
            <text x="0" y="16" fill="#F5F1E8" font-family="serif" font-size="44" font-weight="bold" text-anchor="middle">TC</text>

            <text x="0" y="150" fill="#F5F1E8" font-family="serif" font-size="52" font-weight="bold" text-anchor="middle" letter-spacing="2">TRAVELING CHICKEN</text>
            <text x="0" y="195" fill="#DDA853" font-family="monospace" font-size="18" text-anchor="middle" letter-spacing="4">MOBILE ARTISAN STREET FOOD</text>
          </g>
        </svg>
      `);

    case 'vault':
    case 'vault-clothing':
    case 'baul':
      return encodeSvg(`
        <svg xmlns="http://www.w3.org/2000/svg" width="1280" height="960" viewBox="0 0 1280 960">
          <defs>
            <linearGradient id="vaultBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#181922"/>
              <stop offset="50%" stop-color="#232532"/>
              <stop offset="100%" stop-color="#101117"/>
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#vaultBg)"/>
          <g transform="translate(640, 430)">
            <rect x="-90" y="-90" width="180" height="180" rx="36" fill="#ffffff" fill-opacity="0.06" stroke="#ffffff" stroke-opacity="0.2" stroke-width="2"/>
            <path d="M 0 -50 L -45 50 L -22 50 L -9 18 L 9 18 L 22 50 L 45 50 Z M 0 -10 L 9 10 L -9 10 Z" fill="#ffffff"/>
            <circle cx="0" cy="36" r="4.5" fill="#181922"/>
            
            <text x="0" y="160" fill="#ffffff" font-family="system-ui, -apple-system, sans-serif" font-size="76" font-weight="900" text-anchor="middle" letter-spacing="16">VAULT</text>
            <text x="0" y="210" fill="#9CA3AF" font-family="monospace" font-size="18" text-anchor="middle" letter-spacing="6">ARCHITECTURAL STREETWEAR · MONOGRAM</text>
          </g>
        </svg>
      `);

    case 'tazza-cafe':
    case 'taza':
      return encodeSvg(`
        <svg xmlns="http://www.w3.org/2000/svg" width="1280" height="960" viewBox="0 0 1280 960">
          <defs>
            <linearGradient id="tazzaBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#091811"/>
              <stop offset="50%" stop-color="#142C20"/>
              <stop offset="100%" stop-color="#08140E"/>
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#tazzaBg)"/>
          <g transform="translate(640, 430)">
            <circle cx="0" cy="-40" r="140" fill="#1A3A2A" stroke="#B8863B" stroke-width="4"/>
            <circle cx="0" cy="-40" r="115" fill="none" stroke="#B8863B" stroke-width="1.5" stroke-dasharray="6 4"/>
            <path d="M 0 -110 C 45 -110, 68 -70, 62 -30 C 56 10, 22 45, 0 50 C -22 45, -56 10, -62 -30 C -68 -70, -45 -110, 0 -110 Z" fill="#B8863B"/>
            <path d="M 0 -105 C 12 -70, -12 -40, 0 -15 C 15 10, -8 25, 0 45" stroke="#091811" stroke-width="8" stroke-linecap="round" fill="none"/>
            
            <text x="0" y="160" fill="#F5F1E8" font-family="serif" font-size="64" font-weight="bold" text-anchor="middle" letter-spacing="8">TAZZA</text>
            <text x="0" y="210" fill="#B8863B" font-family="monospace" font-size="18" text-anchor="middle" letter-spacing="5">SPECIALTY COFFEE &amp; BOTANIC ORIGIN</text>
          </g>
        </svg>
      `);

    case 'kiem-university':
    case 'kiem':
      return encodeSvg(`
        <svg xmlns="http://www.w3.org/2000/svg" width="1280" height="960" viewBox="0 0 1280 960">
          <defs>
            <linearGradient id="kiemBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#08101E"/>
              <stop offset="50%" stop-color="#102038"/>
              <stop offset="100%" stop-color="#060C16"/>
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#kiemBg)"/>
          <g transform="translate(640, 430)">
            <rect x="-110" y="-130" width="220" height="170" rx="28" fill="#1E3A8A" stroke="#F5C453" stroke-width="4"/>
            <text x="0" y="-10" fill="#F5C453" font-family="system-ui, -apple-system, sans-serif" font-size="96" font-weight="900" text-anchor="middle" letter-spacing="-2">KM</text>
            <polygon points="-30,-110 0,-135 30,-110" fill="#F5C453"/>
            
            <text x="0" y="150" fill="#ffffff" font-family="system-ui, -apple-system, sans-serif" font-size="56" font-weight="900" text-anchor="middle" letter-spacing="4">KIEM UNIVERSITY</text>
            <text x="0" y="200" fill="#93C5FD" font-family="monospace" font-size="18" text-anchor="middle" letter-spacing="5">VARSITY ATHLETICS &amp; MONOGRAM</text>
          </g>
        </svg>
      `);

    case 'kuro-streetwear':
      return encodeSvg(`
        <svg xmlns="http://www.w3.org/2000/svg" width="1280" height="960" viewBox="0 0 1280 960">
          <rect width="100%" height="100%" fill="#0C0C0D"/>
          <g transform="translate(640, 450)">
            <rect x="-160" y="-160" width="320" height="320" fill="none" stroke="#ffffff" stroke-width="3"/>
            <text x="0" y="45" fill="#ffffff" font-family="system-ui, sans-serif" font-size="130" font-weight="900" text-anchor="middle" letter-spacing="6">KURO</text>
            <text x="0" y="140" fill="#888888" font-family="monospace" font-size="16" text-anchor="middle" letter-spacing="5">黒 · MINIMALIST STREETWEAR</text>
          </g>
        </svg>
      `);

    case 'aura-botanica':
      return encodeSvg(`
        <svg xmlns="http://www.w3.org/2000/svg" width="1280" height="960" viewBox="0 0 1280 960">
          <defs>
            <linearGradient id="auraBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#10251C"/>
              <stop offset="50%" stop-color="#1B3B2E"/>
              <stop offset="100%" stop-color="#0D1A14"/>
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#auraBg)"/>
          <g transform="translate(640, 440)">
            <circle cx="0" cy="-30" r="130" fill="none" stroke="#A7C4B5" stroke-width="3"/>
            <circle cx="0" cy="-30" r="105" fill="none" stroke="#D8C3A5" stroke-width="1.5" stroke-dasharray="6 4"/>
            <text x="0" y="-15" fill="#F2EFE9" font-family="serif" font-size="38" font-style="italic" text-anchor="middle">Aura</text>
            <text x="0" y="150" fill="#F2EFE9" font-family="serif" font-size="52" font-weight="300" text-anchor="middle" letter-spacing="6">AURA BOTÁNICA</text>
            <text x="0" y="195" fill="#A7C4B5" font-family="monospace" font-size="16" text-anchor="middle" letter-spacing="3">ORGANIC BOTANICAL SKINCARE</text>
          </g>
        </svg>
      `);

    case 'nomada-cafe':
      return encodeSvg(`
        <svg xmlns="http://www.w3.org/2000/svg" width="1280" height="960" viewBox="0 0 1280 960">
          <defs>
            <linearGradient id="nomadaBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#24140D"/>
              <stop offset="50%" stop-color="#3A2114"/>
              <stop offset="100%" stop-color="#170C07"/>
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#nomadaBg)"/>
          <g transform="translate(640, 440)">
            <circle cx="0" cy="-30" r="130" fill="none" stroke="#C59B6D" stroke-width="4"/>
            <text x="0" y="-12" fill="#EAD9C6" font-family="serif" font-size="44" font-weight="bold" text-anchor="middle">NÓMADA</text>
            <text x="0" y="150" fill="#EAD9C6" font-family="system-ui, sans-serif" font-size="48" font-weight="bold" text-anchor="middle" letter-spacing="4">NÓMADA CAFÉ</text>
            <text x="0" y="195" fill="#C59B6D" font-family="monospace" font-size="16" text-anchor="middle" letter-spacing="3">SPECIALTY ROASTERY · TARRAZÚ</text>
          </g>
        </svg>
      `);

    case 'bio':
    case 'alejandro-rivera':
    case 'SLOT-BIO-01':
      return encodeSvg(`
        <svg xmlns="http://www.w3.org/2000/svg" width="960" height="1280" viewBox="0 0 960 1280">
          <defs>
            <linearGradient id="bioBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#0E1014"/>
              <stop offset="60%" stop-color="#14181F"/>
              <stop offset="100%" stop-color="#090A0D"/>
            </linearGradient>
            <radialGradient id="bioGlow" cx="50%" cy="35%" r="50%">
              <stop offset="0%" stop-color="#223344" stop-opacity="0.4"/>
              <stop offset="100%" stop-color="#0E1014" stop-opacity="0"/>
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#bioBg)"/>
          <rect width="100%" height="100%" fill="url(#bioGlow)"/>

          <!-- Framing borders -->
          <rect x="40" y="40" width="880" height="1200" fill="none" stroke="#ffffff" stroke-opacity="0.1" stroke-width="1.5"/>
          <rect x="56" y="56" width="848" height="1168" fill="none" stroke="#ffffff" stroke-opacity="0.04" stroke-width="1"/>

          <!-- Top Monogram -->
          <g transform="translate(480, 420)">
            <!-- Outer circle -->
            <circle cx="0" cy="0" r="160" fill="#14181F" stroke="#ffffff" stroke-opacity="0.2" stroke-width="2"/>
            <circle cx="0" cy="0" r="140" fill="none" stroke="#ffffff" stroke-opacity="0.08" stroke-width="1" stroke-dasharray="6 4"/>
            <!-- AR Monogram Mark -->
            <text x="0" y="42" fill="#ffffff" font-family="system-ui, -apple-system, sans-serif" font-size="110" font-weight="900" text-anchor="middle" letter-spacing="-4">AR</text>
          </g>

          <!-- Typography block -->
          <g transform="translate(480, 800)">
            <text x="0" y="0" fill="#ffffff" font-family="system-ui, -apple-system, sans-serif" font-size="44" font-weight="800" text-anchor="middle" letter-spacing="2">ALEJANDRO RIVERA</text>
            <text x="0" y="42" fill="#9CA3AF" font-family="'Space Grotesk', monospace" font-size="18" font-weight="600" text-anchor="middle" letter-spacing="6">DISEÑADOR PUBLICITARIO</text>
            
            <line x1="-140" y1="90" x2="140" y2="90" stroke="#ffffff" stroke-opacity="0.2" stroke-width="1.5"/>

            <text x="0" y="140" fill="#6B7280" font-family="system-ui, sans-serif" font-size="15" text-anchor="middle" letter-spacing="3">DISEÑO PUBLICITARIO · 2026</text>
            <text x="0" y="175" fill="#4B5563" font-family="monospace" font-size="13" text-anchor="middle" letter-spacing="4">BRANDING · CAMPAÑAS · SISTEMAS</text>
          </g>
        </svg>
      `);

    case 'SLOT-SCALER-01':
      return encodeSvg(`
        <svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">
          <rect width="100%" height="100%" fill="#0C0D12"/>
          <g transform="translate(100, 100)">
            <rect x="0" y="0" width="1080" height="520" rx="16" fill="#141620" stroke="#ffffff" stroke-opacity="0.1" stroke-width="2"/>
            <!-- UI Header bar -->
            <rect x="0" y="0" width="1080" height="56" rx="16" fill="#1C1E2C"/>
            <circle cx="36" cy="28" r="7" fill="#EF4444" fill-opacity="0.7"/>
            <circle cx="60" cy="28" r="7" fill="#F59E0B" fill-opacity="0.7"/>
            <circle cx="84" cy="28" r="7" fill="#10B981" fill-opacity="0.7"/>
            <text x="130" y="34" fill="#9CA3AF" font-family="monospace" font-size="14">scaler.design/ops: Design System Console</text>
            
            <!-- Scaler logo in app -->
            <g transform="translate(60, 110)">
              <text x="0" y="60" fill="#ffffff" font-family="system-ui, sans-serif" font-size="48" font-weight="900" letter-spacing="4">SCALER PLATFORM</text>
              <text x="0" y="96" fill="#A855F7" font-family="monospace" font-size="16" letter-spacing="2">ACTIVE TOKENS: 148 COMPONENTS · 12 REPOSITORIES</text>
            </g>

            <!-- Cards -->
            <g transform="translate(60, 260)">
              <rect x="0" y="0" width="300" height="200" rx="8" fill="#1E2030" stroke="#33374E" stroke-width="1.5"/>
              <text x="24" y="44" fill="#F5B838" font-family="monospace" font-size="13" font-weight="bold">BRAND GUIDELINES</text>
              <text x="24" y="80" fill="#ffffff" font-family="system-ui, sans-serif" font-size="18" font-weight="700">Typography &amp; Grid</text>
              <rect x="24" y="105" width="220" height="8" rx="4" fill="#3B82F6"/>
              <rect x="24" y="125" width="160" height="8" rx="4" fill="#6B7280"/>
            </g>
            <g transform="translate(390, 260)">
              <rect x="0" y="0" width="300" height="200" rx="8" fill="#1E2030" stroke="#33374E" stroke-width="1.5"/>
              <text x="24" y="44" fill="#A855F7" font-family="monospace" font-size="13" font-weight="bold">DESIGN OPS ENGINE</text>
              <text x="24" y="80" fill="#ffffff" font-family="system-ui, sans-serif" font-size="18" font-weight="700">Token Automation</text>
              <rect x="24" y="105" width="200" height="8" rx="4" fill="#10B981"/>
              <rect x="24" y="125" width="140" height="8" rx="4" fill="#6B7280"/>
            </g>
            <g transform="translate(720, 260)">
              <rect x="0" y="0" width="300" height="200" rx="8" fill="#1E2030" stroke="#33374E" stroke-width="1.5"/>
              <text x="24" y="44" fill="#EC4899" font-family="monospace" font-size="13" font-weight="bold">COLOR ARCHITECTURE</text>
              <text x="24" y="80" fill="#ffffff" font-family="system-ui, sans-serif" font-size="18" font-weight="700">Dark / Light Palettes</text>
              <rect x="24" y="105" width="230" height="8" rx="4" fill="#F59E0B"/>
              <rect x="24" y="125" width="180" height="8" rx="4" fill="#6B7280"/>
            </g>
          </g>
        </svg>
      `);

    case 'SLOT-SCALER-02':
      return encodeSvg(`
        <svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">
          <rect width="100%" height="100%" fill="#0A0B0F"/>
          <g transform="translate(140, 120)">
            <text x="0" y="50" fill="#ffffff" font-family="system-ui, sans-serif" font-size="52" font-weight="900" letter-spacing="4">SCALER BRAND MANUAL</text>
            <text x="0" y="90" fill="#F5B838" font-family="monospace" font-size="18" letter-spacing="3">SYSTEM NORMATIVE &amp; GEOMETRIC CONSTRUCTION</text>
            
            <!-- Grid lines -->
            <g transform="translate(0, 150)">
              <line x1="0" y1="0" x2="1000" y2="0" stroke="#ffffff" stroke-opacity="0.1" stroke-width="1"/>
              <line x1="0" y1="100" x2="1000" y2="100" stroke="#ffffff" stroke-opacity="0.1" stroke-width="1"/>
              <line x1="0" y1="200" x2="1000" y2="200" stroke="#ffffff" stroke-opacity="0.1" stroke-width="1"/>
              <line x1="0" y1="300" x2="1000" y2="300" stroke="#ffffff" stroke-opacity="0.1" stroke-width="1"/>
              
              <!-- Construction Circles -->
              <circle cx="200" cy="150" r="100" fill="none" stroke="#A855F7" stroke-width="2" stroke-dasharray="6 4"/>
              <circle cx="200" cy="150" r="60" fill="none" stroke="#F5B838" stroke-width="2"/>
              <circle cx="200" cy="150" r="8" fill="#ffffff"/>
              
              <text x="360" y="130" fill="#ffffff" font-family="monospace" font-size="20" font-weight="bold">PROPORTIONAL RATIO: 1 : 1.618</text>
              <text x="360" y="165" fill="#9CA3AF" font-family="sans-serif" font-size="16">Área de protección mínima: 2x altura del nodo central</text>
              <text x="360" y="200" fill="#9CA3AF" font-family="sans-serif" font-size="16">Tipografía normativa: Space Grotesk / Bold 800</text>
            </g>
          </g>
        </svg>
      `);

    case 'SLOT-SCALER-03':
      return encodeSvg(`
        <svg xmlns="http://www.w3.org/2000/svg" width="1440" height="617" viewBox="0 0 1440 617">
          <defs>
            <linearGradient id="scKeyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#08080C"/>
              <stop offset="50%" stop-color="#140D26"/>
              <stop offset="100%" stop-color="#1A1208"/>
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#scKeyGrad)"/>
          <g transform="translate(720, 310)">
            <text x="0" y="-30" fill="#ffffff" font-family="system-ui, -apple-system, sans-serif" font-size="96" font-weight="900" text-anchor="middle" letter-spacing="16">SCALER</text>
            <text x="0" y="45" fill="#F5B838" font-family="monospace" font-size="24" font-weight="bold" text-anchor="middle" letter-spacing="8">KEY VISUAL &amp; LAUNCH CAMPAIGN</text>
            <text x="0" y="90" fill="#A855F7" font-family="sans-serif" font-size="18" text-anchor="middle" letter-spacing="4">DISEÑO PUBLICITARIO · SISTEMAS VISUALES</text>
          </g>
        </svg>
      `);

    default:
      return encodeSvg(`
        <svg xmlns="http://www.w3.org/2000/svg" width="1280" height="960" viewBox="0 0 1280 960">
          <rect width="100%" height="100%" fill="#141417"/>
          <text x="50%" y="50%" fill="#ffffff" font-family="monospace" font-size="36" text-anchor="middle">${slug.toUpperCase()}</text>
        </svg>
      `);
  }
}

/**
 * Resolves default fallback artwork for specific slot identifiers
 */
export function getDefaultSlotImage(slotIdentifier: string): string | null {
  if (!slotIdentifier) return null;
  const cleanId = slotIdentifier.replace(/^ar_slot_/, '');

  const permanent = getPermanentImage(cleanId);
  if (permanent) return permanent;

  if (cleanId === 'exofauna' || cleanId === 'SLOT-01' || cleanId === 'exofauna-slot-01') {
    return defaultExofaunaImage;
  }
  if (cleanId === 'tempo' || cleanId === 'SLOT-02' || cleanId === 'tempo-slot-01') {
    return getProjectDefaultImage('tempo');
  }
  if (cleanId === 'se-vale-avisar' || cleanId === 'SLOT-03' || cleanId === 'se-vale-avisar-slot-01') {
    return getProjectDefaultImage('se-vale-avisar');
  }
  if (cleanId === 'the-traveling-chicken' || cleanId === 'traveling-chicken' || cleanId === 'SLOT-04' || cleanId === 'the-traveling-chicken-slot-01') {
    return getProjectDefaultImage('the-traveling-chicken');
  }
  if (cleanId === 'vault' || cleanId === 'vault-clothing' || cleanId === 'baul' || cleanId === 'SLOT-05' || cleanId === 'vault-clothing-slot-01') {
    return getProjectDefaultImage('vault-clothing');
  }
  if (cleanId === 'tazza-cafe' || cleanId === 'taza' || cleanId === 'SLOT-06' || cleanId === 'tazza-cafe-slot-01') {
    return getProjectDefaultImage('tazza-cafe');
  }
  if (cleanId === 'kiem-university' || cleanId === 'kiem' || cleanId === 'SLOT-07' || cleanId === 'kiem-university-slot-01') {
    return getProjectDefaultImage('kiem-university');
  }
  if (cleanId === 'bio' || cleanId === 'alejandro-rivera' || cleanId === 'SLOT-BIO-01') {
    return getProjectDefaultImage('SLOT-BIO-01');
  }
  if (cleanId === 'SLOT-SCALER-01') {
    return getProjectDefaultImage('SLOT-SCALER-01');
  }
  if (cleanId === 'SLOT-SCALER-02') {
    return getProjectDefaultImage('SLOT-SCALER-02');
  }
  if (cleanId === 'SLOT-SCALER-03') {
    return getProjectDefaultImage('SLOT-SCALER-03');
  }
  if (cleanId === 'scaler' || cleanId === 'SLOT-SCALER-HOME-LIGHT' || cleanId === 'scaler-home-light') {
    return getProjectDefaultImage('scaler');
  }

  // Check if slot ends with -slot-01 and matches any project
  const matchSlot01 = cleanId.match(/^([a-z0-9-]+)-slot-01$/);
  if (matchSlot01) {
    return getProjectDefaultImage(matchSlot01[1]);
  }

  return null;
}

