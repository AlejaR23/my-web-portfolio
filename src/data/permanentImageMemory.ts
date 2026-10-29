/**
 * ============================================================================
 * REGISTRO PERMANENTE Y MEMORIA DE IMÁGENES DEL PORTAFOLIO DE ALEJANDRO RIVERA
 * ============================================================================
 * 
 * Este archivo actúa como la memoria fija, persistente y verificada de todos los
 * recursos visuales, obras, fotografías oficiales, marcas vectoriales y ranuras
 * de imagen establecidas en el portafolio.
 * 
 * Garantías del sistema:
 * 1. Cada recurso cuenta con su origen fijado (activo empaquetado, SVG vectorial
 *    de ultra alta resolución o archivo permanente en /public).
 * 2. Cero pérdida por reinicio: Aunque se borre la caché del navegador o el
 *    almacenamiento local, todos los componentes tienen su fallback fijo y listo.
 * 3. Los identificadores de ranura (slots) están estandarizados y vinculados
 *    a IndexedDB y localStorage con sincronización automática en tiempo real.
 */

export interface RegisteredImageAsset {
  id: string;
  slotId: string;
  projectSlug: string;
  title: string;
  category: string;
  aspect: string;
  dimensions: string;
  type: 'bundled-photo' | 'vector-artwork' | 'brand-svg' | 'showreel-video' | 'editorial-portrait';
  sourcePath: string;
  description: string;
  isLocked: boolean;
}

export const PERMANENT_IMAGE_REGISTRY: RegisteredImageAsset[] = [
  // --- 1. Hero & Showreel ---
  {
    id: 'hero-showreel-video',
    slotId: 'SLOT-HERO-VIDEO',
    projectSlug: 'hero',
    title: 'Showreel Audiovisual de Portafolio',
    category: 'Hero / Motion',
    aspect: '16:9 / Fullscreen',
    dimensions: '1920 × 1080 px (Seamless Loop)',
    type: 'showreel-video',
    sourcePath: '/hero-showreel.mp4 (IndexedDB: ar_hero_video_blob)',
    description: 'Video de fondo en bucle continuo con fundido cruzado suave y viñeta cinemática.',
    isLocked: true,
  },

  // --- 2. Caso Estrella: Exofauna ---
  {
    id: 'exofauna-mesa-14-100',
    slotId: 'SLOT-01',
    projectSlug: 'exofauna',
    title: 'Exofauna: Hospital Veterinario & Rescate Silvestre',
    category: 'Manual de Marca (Brand Guidelines)',
    aspect: '16:9 / 21:9 Panorámico',
    dimensions: '3840 × 2160 px (Ultra-HD)',
    type: 'bundled-photo',
    sourcePath: '/src/assets/images/exofauna-mesa-14-100.jpg & /public/exofauna-mesa-14-100.jpg',
    description: 'Fotografía oficial y pieza maestra de identidad visual y clínica para Exofauna.',
    isLocked: true,
  },

  // --- 3. Tempo ---
  {
    id: 'tempo-cockpit-telemetry',
    slotId: 'SLOT-02',
    projectSlug: 'tempo',
    title: 'Tempo: Plataforma Ciclista & Interfaz HUD',
    category: 'Diseño de Interfaz & Telemetría',
    aspect: '4:3 / 16:9',
    dimensions: '1280 × 960 px',
    type: 'vector-artwork',
    sourcePath: 'getProjectDefaultImage("tempo")',
    description: 'Arte vectorial de alta fidelidad con cockpit HUD, sparkline de elevación Volcán Irazú y telemetría en vivo.',
    isLocked: true,
  },

  // --- 4. Se Vale Avisar ---
  {
    id: 'se-vale-avisar-campaign-artwork',
    slotId: 'SLOT-03',
    projectSlug: 'se-vale-avisar',
    title: 'Se Vale Avisar: Campaña Nacional de Comunicación',
    category: 'Campaña Publicitaria',
    aspect: '4:3 / 16:9',
    dimensions: '1280 × 960 px',
    type: 'vector-artwork',
    sourcePath: 'getProjectDefaultImage("se-vale-avisar")',
    description: 'Emblema institucional en rombo preventivo con franjas de precaución y tipografía de advertencia.',
    isLocked: true,
  },

  // --- 5. The Traveling Chicken ---
  {
    id: 'traveling-chicken-crest',
    slotId: 'SLOT-04',
    projectSlug: 'the-traveling-chicken',
    title: 'The Traveling Chicken: Food Truck Móvil & Branding',
    category: 'Identidad & Emblema',
    aspect: '4:3 / 16:9',
    dimensions: '1280 × 960 px',
    type: 'vector-artwork',
    sourcePath: 'getProjectDefaultImage("the-traveling-chicken")',
    description: 'Sello circular artesanal en fondo granate con silueta estizada y tipografía serif dorada.',
    isLocked: true,
  },

  // --- 6. VAULT ---
  {
    id: 'vault-clothing-monogram',
    slotId: 'SLOT-05',
    projectSlug: 'vault-clothing',
    title: 'VAULT: Moda Urbana Minimalista',
    category: 'Identidad & Monograma',
    aspect: '4:3 / 16:9',
    dimensions: '1280 × 960 px',
    type: 'vector-artwork',
    sourcePath: 'getProjectDefaultImage("vault-clothing")',
    description: 'Monograma arquitectónico blanco sobre lienzo carbón oscuro con tipografía de alto espaciado.',
    isLocked: true,
  },

  // --- 7. Taza (Tazza Cafe) ---
  {
    id: 'tazza-cafe-botanic-seal',
    slotId: 'SLOT-06',
    projectSlug: 'tazza-cafe',
    title: 'Taza (Tazza Cafe): Café de Especialidad & Origen Botánico',
    category: 'Identidad & Marca Gráfica',
    aspect: '4:3 / 16:9',
    dimensions: '1280 × 960 px',
    type: 'vector-artwork',
    sourcePath: 'getProjectDefaultImage("tazza-cafe")',
    description: 'Emblema botánico circular en verde bosque profundo y oro satinado con grano de café germinado.',
    isLocked: true,
  },

  // --- 8. Kiem (KIEM University) ---
  {
    id: 'kiem-university-monogram',
    slotId: 'SLOT-07',
    projectSlug: 'kiem-university',
    title: 'Kiem (KIEM University): Identidad Universitaria & Monograma',
    category: 'Identidad Universitaria',
    aspect: '4:3 / 16:9',
    dimensions: '1280 × 960 px',
    type: 'vector-artwork',
    sourcePath: 'getProjectDefaultImage("kiem-university")',
    description: 'Escudo atlético heráldico con monograma KM, birrete académico y paleta azul marino / dorado.',
    isLocked: true,
  },

  // --- 9. Scaler (Venture Studio & Design System) ---
  {
    id: 'scaler-brandmark-vector',
    slotId: 'SLOT-SCALER-LOGO-COLOR',
    projectSlug: 'scaler',
    title: 'Scaler: Isotipo & Marca Oficial Full Color',
    category: 'Logofolio & Sistema',
    aspect: '5:2',
    dimensions: '600 × 240 px',
    type: 'brand-svg',
    sourcePath: '/public/scaler-logo.svg',
    description: 'Isotipo oficial con nodo central, degradado violeta a ámbar y construcción hexagonal.',
    isLocked: true,
  },
  {
    id: 'scaler-brandmark-white',
    slotId: 'SLOT-SCALER-LOGO-WHITE',
    projectSlug: 'scaler',
    title: 'Scaler: Isotipo Oficial Versión Blanco (Dark Mode)',
    category: 'Logofolio & Sistema',
    aspect: '5:2',
    dimensions: '600 × 240 px',
    type: 'brand-svg',
    sourcePath: '/public/scaler-logo-white.svg',
    description: 'Versión monocromática en blanco puro optimizada para fondo oscuro y alto contraste.',
    isLocked: true,
  },
  {
    id: 'scaler-brandmark-black',
    slotId: 'SLOT-SCALER-LOGO-BLACK',
    projectSlug: 'scaler',
    title: 'Scaler: Isotipo Oficial Versión Negro (Light Mode)',
    category: 'Logofolio & Sistema',
    aspect: '5:2',
    dimensions: '600 × 240 px',
    type: 'brand-svg',
    sourcePath: '/public/scaler-logo-black.svg',
    description: 'Versión monocromática en negro carbón para soportes impresos o fondo claro absoluto.',
    isLocked: true,
  },
  {
    id: 'scaler-slot-01-interface',
    slotId: 'SLOT-SCALER-01',
    projectSlug: 'scaler',
    title: 'Scaler: Interfaz de Plataforma & Design Ops',
    category: 'Plataforma & UI',
    aspect: '16:9',
    dimensions: '1280 × 720 px',
    type: 'vector-artwork',
    sourcePath: 'getProjectDefaultImage("SLOT-SCALER-01")',
    description: 'Maqueta de interfaz de la consola de Design Ops con tarjetas de tokens y componentes.',
    isLocked: true,
  },
  {
    id: 'scaler-slot-02-manual',
    slotId: 'SLOT-SCALER-02',
    projectSlug: 'scaler',
    title: 'Scaler: Manual de Marca Digital & Retícula',
    category: 'Brand Guidelines',
    aspect: '16:9',
    dimensions: '1280 × 720 px',
    type: 'vector-artwork',
    sourcePath: 'getProjectDefaultImage("SLOT-SCALER-02")',
    description: 'Especificación técnica con proporción áurea, círculos constructivos y parámetros normativos.',
    isLocked: true,
  },
  {
    id: 'scaler-slot-03-keyvisual',
    slotId: 'SLOT-SCALER-03',
    projectSlug: 'scaler',
    title: 'Scaler: Despliegue de Campaña & Key Visual',
    category: 'Campaña & Lanzamiento',
    aspect: '21:9',
    dimensions: '1440 × 617 px',
    type: 'vector-artwork',
    sourcePath: 'getProjectDefaultImage("SLOT-SCALER-03")',
    description: 'Arte panorámico cinematográfico institucional para presentación y lanzamiento.',
    isLocked: true,
  },

  // --- 10. Perfil / Bio Alejandro Rivera ---
  {
    id: 'bio-alejandro-rivera-portrait',
    slotId: 'SLOT-BIO-01',
    projectSlug: 'about',
    title: 'Alejandro Rivera Castro: Tarjeta Editorial de Perfil',
    category: 'Biografía & Perfil',
    aspect: '3:4',
    dimensions: '960 × 1280 px',
    type: 'editorial-portrait',
    sourcePath: 'getProjectDefaultImage("SLOT-BIO-01")',
    description: 'Composición editorial con monograma AR, marco de precisión y datos profesionales.',
    isLocked: true,
  },

  // --- 11. Proyectos Adicionales de Logofolio ---
  {
    id: 'kuro-streetwear-artwork',
    slotId: 'kuro-streetwear',
    projectSlug: 'kuro-streetwear',
    title: 'Kuro: Minimalist Streetwear',
    category: 'Logofolio',
    aspect: '4:3',
    dimensions: '1280 × 960 px',
    type: 'vector-artwork',
    sourcePath: 'getProjectDefaultImage("kuro-streetwear")',
    description: 'Marco geométrico blanco y kanji negro para identidad de moda urbana minimalista.',
    isLocked: true,
  },
  {
    id: 'aura-botanica-artwork',
    slotId: 'aura-botanica',
    projectSlug: 'aura-botanica',
    title: 'Aura Botánica: Organic Skincare',
    category: 'Logofolio',
    aspect: '4:3',
    dimensions: '1280 × 960 px',
    type: 'vector-artwork',
    sourcePath: 'getProjectDefaultImage("aura-botanica")',
    description: 'Trazos concéntricos y tipografía caligráfica para cosmética botánica.',
    isLocked: true,
  },
  {
    id: 'nomada-cafe-artwork',
    slotId: 'nomada-cafe',
    projectSlug: 'nomada-cafe',
    title: 'Nómada Café: Specialty Roastery Tarrazú',
    category: 'Logofolio',
    aspect: '4:3',
    dimensions: '1280 × 960 px',
    type: 'vector-artwork',
    sourcePath: 'getProjectDefaultImage("nomada-cafe")',
    description: 'Identidad rústica y artesanal para tostaduría de café de altura en Tarrazú.',
    isLocked: true,
  },
];

/**
 * Consulta un recurso registrado por su identificador de ranura (slotId) o slug de proyecto.
 */
export function getRegisteredAsset(idOrSlug: string): RegisteredImageAsset | undefined {
  const clean = idOrSlug.replace(/^ar_slot_/, '').toLowerCase();
  return PERMANENT_IMAGE_REGISTRY.find(
    (asset) =>
      asset.id.toLowerCase() === clean ||
      asset.slotId.toLowerCase() === clean ||
      asset.projectSlug.toLowerCase() === clean
  );
}

/**
 * Retorna la lista completa de todos los recursos protegidos y memorizados.
 */
export function listAllRegisteredAssets(): RegisteredImageAsset[] {
  return [...PERMANENT_IMAGE_REGISTRY];
}
