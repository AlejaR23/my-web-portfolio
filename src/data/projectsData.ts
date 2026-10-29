import { Project, ProjectSegment, SegmentInfo } from '../types';

export const PROJECT_SEGMENTS: Record<ProjectSegment, SegmentInfo> = {
  campaigns: {
    id: 'campaigns',
    name: 'Campañas',
    shortName: 'Campañas',
    tagline: 'Concepto creativo, dirección de arte y piezas para vía pública y digital.',
    description:
      'Proyectos de campaña desarrollados desde la idea central hasta el diseño de piezas exteriores, contenido digital y narrativa visual.',
  },
  'brand-books': {
    id: 'brand-books',
    name: 'Brand guidelines',
    shortName: 'Brand guidelines',
    tagline: 'Manuales de marca, sistemas normativos y coherencia visual.',
    description:
      'Manuales de identidad que definen construcción geométrica, color normado, jerarquías tipográficas y aplicaciones de marca en soportes reales.',
  },
  logofolio: {
    id: 'logofolio',
    name: 'Logofolio & Identidad Visual',
    shortName: 'Logofolio',
    tagline: 'Marcas gráficas, isotipos y síntesis visual.',
    description:
      'Diseño de marcas gráficas enfocado en la síntesis geométrica, la legibilidad y la versatilidad de aplicación en diversos formatos.',
  },
};

export const PROJECTS: Project[] = [
  {
    id: 'exofauna',
    title: 'Exofauna',
    subtitle: 'Hospital Veterinario & Rescate de Fauna Silvestre',
    slug: 'exofauna',
    category: 'Branding & Identidad',
    segment: 'brand-books',
    segmentLabel: 'Manual de Marca (Brand Guidelines)',
    year: '2026',
    role: 'Diseño de Identidad & Manual Normativo',
    heroAccentColor: '#123C3D',
    tagline: 'Protegemos vidas sagradas.',
    shortDescription:
      'Identidad visual y manual de marca para un hospital veterinario y de rescate de fauna silvestre, con especialización en Nuevos Animales de Compañía (NAC).',
    fullOverview:
      'Exofauna es un proyecto de identidad visual y manual normativo desarrollado para un hospital veterinario enfocado en Nuevos Animales de Compañía (conejos, cobayos, hámsters y aves) y en la rehabilitación de fauna silvestre. El sistema gráfico combina motivos de orfebrería ancestral con la sobriedad y la claridad de la comunicación clínica.',
    deliverables: [
      'Identidad Principal & Variantes de Logotipo',
      'Iconografía Inspirada en Herencia Precolombina',
      'Manual Normativo de Marca (52 Páginas)',
      'Paletas Cromáticas Primaria & Secundaria',
      'Patrón Gráfico para Empaques y Papelería',
      'Papelería Clínica & Formatos Administrativos',
      'Uniformes & Ropa Médica',
      'Rotulación Vehicular para Unidad Móvil',
      'Propuesta de Señalética Interior & Rótulo Exterior',
      'Propuesta de Valla Publicitaria & Mupis',
    ],
    palette: [
      { name: 'Azul Petróleo', hex: '#123C3D', rgb: '18, 60, 61', cmyk: '89, 50, 57, 59', usage: 'Lienzo principal y tono clínico distintivo' },
      { name: 'Dorado Ancestral', hex: '#B8863B', rgb: '184, 134, 59', cmyk: '24, 45, 83, 14', usage: 'Calidez simbólica y referencia orfebre' },
      { name: 'Terracota', hex: '#B25D3D', rgb: '178, 93, 61', cmyk: '24, 68, 76, 14', usage: 'Acento cálido de tierra y cerámica' },
      { name: 'Negro Carbón', hex: '#1C1A17', rgb: '28, 26, 23', cmyk: '73, 66, 64, 83', usage: 'Superficies profundas y textos principales' },
      { name: 'Blanco Hueso', hex: '#F5F1E8', rgb: '245, 241, 232', cmyk: '5, 5, 11, 0', usage: 'Fondos limpios y espacio negativo' },
      { name: 'Verde Salvia', hex: '#8CA38F', rgb: '140, 163, 143', cmyk: '14, 0, 12, 36', usage: 'Armonía botánica complementaria' },
      { name: 'Arena', hex: '#DED1B8', rgb: '222, 209, 184', cmyk: '0, 6, 17, 13', usage: 'Neutro cálido de fondo' },
      { name: 'Durazno Coral', hex: '#FFB38E', rgb: '255, 171, 140', cmyk: '0, 33, 45, 0', usage: 'Acento secundario cálido' },
    ],
    typography: [
      {
        name: 'Fraunces',
        role: 'Titulares Editoriales & Logotipo',
        preview: 'Aa Bb Cc Dd 1234567890',
        sample: 'Protegemos vidas sagradas con devoción y rigor científico.',
      },
      {
        name: 'Plus Jakarta Sans',
        role: 'Textos de Lectura & Datos Clínicos',
        preview: 'Aa Bb Cc Dd 1234567890',
        sample: 'Protocolos de atención veterinaria especializada en Nuevos Animales de Compañía.',
      },
    ],
    sections: [
      {
        title: 'Concepto Creativo & Referencias Culturales',
        subtitle: 'Protegemos vidas sagradas',
        type: 'split',
        content: [
          'El concepto visual se apoya en dos pilares: por un lado, el compromiso con la conservación de la fauna silvestre y de especies poco convencionales; por otro, la cosmovisión ancestral donde los animales tenían valor espiritual y de protección.',
          'Esta doble dimensión permite que la clínica transmita cercanía y respeto por la vida animal, sin descuidar el lenguaje técnico y formal que exige un centro de salud.',
        ],
      },
      {
        title: 'Naming & Construcción del Isotipo',
        subtitle: 'Especialización veterinaria con identidad propia',
        type: 'grid',
        content: [
          'El nombre reúne dos ideas: "Exo" alude a especies poco convencionales y a los Nuevos Animales de Compañía que a menudo no encuentran atención adecuada en clínicas tradicionales. "Fauna" amplía el compromiso hacia la protección de animales silvestres.',
          'El isotipo dibuja el perfil de un tucán coronado por alas estilizadas que evocan piezas tradicionales de orfebrería, organizadas en una estructura simétrica con una cruz central de atención médica.',
        ],
      },
      {
        title: 'Manual Normativo & Aplicaciones',
        subtitle: 'Coherencia en piezas impresas y físicas',
        type: 'text',
        content: [
          'El manual de 52 páginas documenta las proporciones exactas del símbolo, los márgenes de respeto, la convivencia cromática y las pautas para uniformes clínicos en azul petróleo, rotulación exterior en relieve, papelería administrativa y vehículos de traslado.',
          'También se diseñaron piezas de comunicación para exteriores con mensajes directos que invitan a valorar la vida de pequeños animales y aves con la misma dedicación que a cualquier otra mascota.',
        ],
      },
    ],
    galleryItems: [
      {
        id: 'exo-1',
        title: 'Propuesta de Valla Exterior',
        caption: '"No hay vida pequeña para nosotros", mensaje de concientización en vía pública',
        type: 'mockup',
        aspect: '16:9',
      },
      {
        id: 'exo-2',
        title: 'Retícula del Isotipo & Manual de Marca',
        caption: 'Construcción geométrica, proporciones del símbolo y versiones de color',
        type: 'artwork',
        aspect: '4:3',
      },
      {
        id: 'exo-3',
        title: 'Papelería & Tarjeta de Presentación',
        caption: 'Aplicación sobre blanco hueso y negro carbón con trama gráfica',
        type: 'mockup',
        aspect: '16:9',
      },
      {
        id: 'exo-4',
        title: 'Propuesta de Mupi Urbano',
        caption: 'Pieza de difusión sobre rescate y cuidado de fauna silvestre',
        type: 'poster',
        aspect: '3:4',
      },
      {
        id: 'exo-5',
        title: 'Rótulo Exterior & Fachada',
        caption: 'Propuesta de rótulo volumétrico con imagotipo en relieve',
        type: 'mockup',
        aspect: '16:9',
      },
      {
        id: 'exo-6',
        title: 'Uniformes & Aplicaciones Físicas',
        caption: 'Bata médica en azul petróleo, bolsa de tela y libreta de control clínico',
        type: 'mockup',
        aspect: '1:1',
      },
    ],
    featured: true,
    order: 1,
  },
  {
    id: 'tempo',
    title: 'Tempo',
    subtitle: 'Concepto de Producto Digital & Interfaz para Ciclismo',
    slug: 'tempo',
    category: 'UI/UX & Producto',
    segment: 'brand-books',
    segmentLabel: 'Producto Digital (Figma UI/UX)',
    year: '2026',
    role: 'Diseño de Interfaz & Prototipado en Figma',
    heroAccentColor: '#FF5C1A',
    tagline: 'Lectura clara de datos para ciclismo en ruta.',
    shortDescription:
      'Proyecto conceptual de producto digital para ciclismo. Diseño de interfaz en Figma con jerarquía visual de alto contraste y prototipo interactivo con Smart Animate.',
    fullOverview:
      'Tempo es un proyecto conceptual de producto digital desarrollado en Figma para ciclistas de ruta y montaña. El ejercicio se centró en resolver la jerarquía visual de la pantalla: ordenar datos como velocidad, cadencia, elevación y ritmo cardíaco para que puedan leerse de un vistazo rápido, utilizando un sistema de diseño modular y prototipado interactivo con Smart Animate.',
    deliverables: [
      'Diseño de Interfaz Móvil en Figma (Modo Oscuro & Claro)',
      'Jerarquía Visual de Pantalla de Manillar (HUD)',
      'Sistema de Componentes y Variantes Interactivas',
      'Prototipo Interactivo con Smart Animate',
      'Paleta Cromática de Alto Contraste para Exteriores',
      'Diseño del Logotipo y Marca Gráfica Tempo',
      'Exploración de Pantalla Companion para Reloj',
      'Propuesta Gráfica de Cartel Conceptual',
    ],
    palette: [
      { name: 'Pure Carbon', hex: '#111113', rgb: '17, 17, 19', usage: 'Fondo oscuro para reducir reflejos' },
      { name: 'Velocity Orange', hex: '#FF5C1A', rgb: '255, 92, 26', usage: 'Acento principal para cronómetro y datos activos' },
      { name: 'Cadence Lime', hex: '#C8F000', rgb: '200, 240, 0', usage: 'Datos de cadencia y elevación' },
      { name: 'Electric Cobalt', hex: '#0057FF', rgb: '0, 87, 255', usage: 'Curvas de potencia y navegación' },
      { name: 'Warm Parchment', hex: '#F5F4F0', rgb: '245, 244, 240', usage: 'Superficie de contraste en modo claro' },
      { name: 'Slate Dusk', hex: '#3D4260', rgb: '61, 66, 96', usage: 'Tarjetas de información secundaria' },
    ],
    typography: [
      {
        name: 'Syne & Bold Italic',
        role: 'Marca Gráfica & Titulares Promocionales',
        preview: 'TEMPO · 120 BPM · 212 W',
        sample: 'Construye tu ritmo, supera tus límites.',
      },
      {
        name: 'Plus Jakarta Sans',
        role: 'Métricas Numéricas & Textos de Interfaz',
        preview: '00:24:53 · 70.4 Km · 756 M',
        sample: 'Datos de elevación, potencia y frecuencia cardíaca organizados por módulos.',
      },
    ],
    sections: [
      {
        title: 'Objetivo de Diseño & Jerarquía Visual',
        subtitle: 'Lectura inmediata en movimiento',
        type: 'split',
        content: [
          'En bicicleta, el tiempo de mirada a la pantalla debe ser mínimo para mantener la atención en el camino. El reto en Figma consistió en estructurar una vista de manillar donde las cifras más críticas (velocidad, tiempo y distancia) dominen el espacio, mientras que la información secundaria queda organizada en módulos periféricos.',
          'Se eligió un fondo casi negro para evitar reflejos molestos en exteriores, combinado con acentos en naranja y lima que destacan los datos clave sin saturar la composición.',
        ],
      },
      {
        title: 'Componentes & Prototipado en Figma',
        subtitle: 'Estructuración modular y transiciones interactivas',
        type: 'grid',
        content: [
          'El archivo en Figma se organizó con componentes reutilizables, variantes para estados activo/pausado y auto-layout para garantizar coherencia en todas las vistas.',
          'Con Smart Animate se armó el prototipo interactivo para simular el paso entre la vista de ruta en tiempo real, el desglose de elevación y el resumen posterior de la sesión.',
        ],
      },
      {
        title: 'Exploración de Vistas',
        subtitle: 'Rutas conceptuales y métricas de elevación',
        type: 'text',
        content: [
          'Como parte de las pantallas conceptuales, se diagramaron perfiles de elevación con desniveles exigentes y puertos de montaña, demostrando cómo la interfaz adaptaría gráficos de pendiente y avisos de altimetría.',
        ],
      },
    ],
    galleryItems: [
      {
        id: 'tempo-1',
        title: 'Pantalla de Manillar (HUD)',
        caption: 'Organización modular de velocidad, tiempo, cadencia y ritmo cardíaco',
        type: 'mockup',
        aspect: '16:9',
      },
      {
        id: 'tempo-2',
        title: 'Panel de Telemetría & Zonas',
        caption: 'Visualización de zonas cardíacas y curvas de esfuerzo',
        type: 'screen',
        aspect: '9:16',
      },
      {
        id: 'tempo-3',
        title: 'Pantalla de Ruta & Perfil de Elevación',
        caption: 'Diagramación de mapa con gráfico altimétrico y pendiente',
        type: 'mockup',
        aspect: '16:9',
      },
      {
        id: 'tempo-4',
        title: 'Flujo de Inicio & Selección de Modalidad',
        caption: 'Componentes y estados diseñados en Figma para la configuración inicial',
        type: 'screen',
        aspect: '16:9',
      },
      {
        id: 'tempo-5',
        title: 'Panel de Resumen & Logros',
        caption: 'Estructura visual para el historial de salidas y metas personales',
        type: 'screen',
        aspect: '9:16',
      },
      {
        id: 'tempo-6',
        title: 'Cartel Promocional Conceptual',
        caption: 'Exploración de cartel gráfico a dos tintas con el lema del proyecto',
        type: 'poster',
        aspect: '1:1',
      },
    ],
    featured: true,
    order: 2,
  },
  {
    id: 'se-vale-avisar',
    title: 'Se Vale Avisar',
    subtitle: 'Concepto de Campaña Social sobre Salud Mental Laboral',
    slug: 'se-vale-avisar',
    category: 'Publicidad & Campañas',
    segment: 'campaigns',
    segmentLabel: 'Concepto de Campaña Social',
    year: '2026',
    role: 'Concepto Creativo, Dirección de Arte & Gráfica de Campaña',
    heroAccentColor: '#FED000',
    tagline: 'Así como lees las señales de riesgo, lee las tuyas.',
    isAcademicConcept: true,
    shortDescription:
      'Concepto de campaña publicitaria sobre agotamiento laboral y salud mental, con recursos visuales inspirados en la señalización de seguridad ocupacional.',
    fullOverview:
      'Se Vale Avisar es un concepto de campaña publicitaria desarrollado como proyecto académico de graduación en Diseño Publicitario. Utiliza el lenguaje visual de las señales de seguridad en el trabajo (amarillo de precaución, diagonales y tipografías condensadas) para hablar del agotamiento mental y desmitificar la idea de que pedir una pausa o buscar apoyo sea señal de debilidad.',
    deliverables: [
      'Concepto Creativo Central & Tono de Comunicación',
      'Dirección de Arte & Sistema Gráfico (Amarillo y Negro)',
      'Propuesta de Vallas Publicitarias Exteriores',
      'Propuesta de Mupis Urbanos',
      'Propuesta de Piezas Gráficas para Redes Sociales',
      'Guion Conceptual para Video Corto',
    ],
    palette: [
      { name: 'Amarillo Señal', hex: '#FED000', rgb: '254, 208, 0', usage: 'Fondo de advertencia y contraste principal' },
      { name: 'Negro Señalización', hex: '#1C1A17', rgb: '28, 26, 23', usage: 'Tipografías pesadas, bordes y franjas diagonales' },
      { name: 'Blanco Puro', hex: '#FFFFFF', rgb: '255, 255, 255', usage: 'Textos de alto contraste en fondos oscuros' },
      { name: 'Naranja Alerta', hex: '#E74C3C', rgb: '231, 76, 60', usage: 'Detalles puntuales de atención' },
    ],
    typography: [
      {
        name: 'Heavy Sans / Titular',
        role: 'Titulares de Campaña & Señalética',
        preview: 'SE VALE AVISAR · AVISAR ES DE VALIENTES',
        sample: 'NO HACE FALTA LLEGAR AL LÍMITE PARA PEDIR AYUDA.',
      },
      {
        name: 'IBM Plex Sans',
        role: 'Textos Informativos & Cuerpo de Pieza',
        preview: 'Reconocer las señales de desgaste a tiempo es parte del cuidado laboral.',
        sample: 'Avisar que un piso está mojado es normal. Avisar que estás agotado también debería serlo.',
      },
    ],
    sections: [
      {
        title: 'Punto de Partida del Concepto',
        subtitle: 'El agotamiento que se calla en el trabajo',
        type: 'split',
        content: [
          'En muchos entornos laborales existe la costumbre de sobrellevar el cansancio extremo en silencio por miedo a parecer menos productivo o comprometido. El proyecto aborda esa barrera cultural desde la publicidad, buscando un mensaje que resulte cercano y directo.',
          'La meta fue crear un concepto visual que le quite el dramatismo clínico a la conversación y la coloque en un terreno cotidiano: cuidarse del agotamiento es tan razonable y preventivo como atender cualquier otra norma de seguridad en el trabajo.',
        ],
      },
      {
        title: 'El Código Visual de la Prevención',
        subtitle: 'Señales que todos entendemos',
        type: 'grid',
        content: [
          'Todos reconocemos un letrero amarillo de "Piso mojado": nadie lo cuestiona ni lo ve como una señal de debilidad, sino como una advertencia útil. La campaña se apropia de ese mismo código gráfico (rombos, diagonales, flechas y amarillo de precaución) para hablar de la salud mental.',
          'Frase guía de la campaña: "Avisar que un piso está mojado no te hace ver débil. Avisar que estás agotado tampoco debería. SE VALE AVISAR."',
        ],
      },
      {
        title: 'Piezas & Formatos Diseñados',
        subtitle: 'De la vía pública a los medios digitales',
        type: 'text',
        content: [
          'El concepto se trasladó a propuestas de vallas de gran formato con titulares cortos y contundentes, mupis con situaciones cotidianas de oficina y piezas estáticas para redes sociales pensadas para abrir conversación.',
          'También se redactó un guion conceptual para un video corto en formato vertical que muestra una pausa en la jornada y plantea la pregunta central de la campaña.',
        ],
      },
    ],
    galleryItems: [
      {
        id: 'sva-1',
        title: 'Propuesta de Valla "Avisar es de valientes"',
        caption: 'Valla exterior con gráfica de señalización y flecha direccional',
        type: 'mockup',
        aspect: '16:9',
      },
      {
        id: 'sva-2',
        title: 'Propuesta de Valla "Aguantar no es lo mismo que estar bien"',
        caption: 'Composición con balanza gráfica y mensaje de prevención',
        type: 'mockup',
        aspect: '16:9',
      },
      {
        id: 'sva-3',
        title: 'Propuesta de Mupi Urbano',
        caption: 'Pieza de vía pública adaptada a formato peatonal',
        type: 'poster',
        aspect: '16:9',
      },
      {
        id: 'sva-4',
        title: 'Piezas Gráficas para Redes Sociales',
        caption: 'Artes con frases directas y recursos de advertencia para pantallas',
        type: 'screen',
        aspect: '16:9',
      },
      {
        id: 'sva-5',
        title: 'Guion Conceptual de Video Vertical',
        caption: 'Estructura de guion para pieza corta de concientización',
        type: 'screen',
        aspect: '4:3',
      },
    ],
    featured: true,
    order: 3,
  },
  {
    id: 'the-traveling-chicken',
    title: 'The Traveling Chicken',
    subtitle: 'Identidad Gastronómica & Emblema para Food Truck',
    slug: 'the-traveling-chicken',
    category: 'Branding & Identidad',
    segment: 'logofolio',
    segmentLabel: 'Logofolio & Emblema Gastronómico',
    year: '2025',
    role: 'Diseño de Identidad & Marca Gráfica',
    heroAccentColor: '#D62828',
    tagline: 'Sabor crujiente en movimiento.',
    shortDescription:
      'Emblema circular para propuesta gastronómica sobre ruedas, combinando el estilo de sello vintage con un personaje ilustrado de trazo definido.',
    fullOverview:
      'The Traveling Chicken es una marca desarrollada para un concepto de comida rápida sobre ruedas. La identidad se construyó alrededor de un sello circular en rojo y blanco hueso con un gallo ilustrado de trazo audaz, pensado para aplicarse en rotulación de remolques, papel antigrasa, calcomanías y menú.',
    deliverables: [
      'Emblema Circular & Mascota Ilustrada',
      'Propuesta de Rotulación para Food Truck',
      'Aplicación en Papel Kraft & Envoltorios',
      'Tablero de Menú & Gráficos Digitales',
    ],
    sections: [
      {
        title: 'Objetivo Gráfico',
        type: 'text',
        content: [
          'En ferias de comida y espacios abiertos, la marca necesita reconocerse a distancia. El formato circular concentra el nombre y la ilustración en un bloque compacto que facilita su lectura en vinil vehicular y empaques pequeños.',
        ],
      },
    ],
    galleryItems: [
      {
        id: 'ttc-1',
        title: 'Emblema The Traveling Chicken',
        caption: 'Sello circular en rojo escarlata y blanco hueso con personaje ilustrado',
        type: 'artwork',
        aspect: '1:1',
      },
    ],
    featured: false,
    order: 4,
  },
  {
    id: 'vault-clothing',
    title: 'VAULT',
    subtitle: 'Identidad Tipográfica & Marca de Ropa Urbana',
    slug: 'vault-clothing',
    category: 'Identidad Visual',
    segment: 'logofolio',
    segmentLabel: 'Logofolio & Isotipo Tipográfico',
    year: '2025',
    role: 'Logotipo & Diseño de Monograma',
    heroAccentColor: '#2B2D42',
    tagline: 'Geometría limpia y detalle tipográfico.',
    shortDescription:
      'Identidad tipográfica minimalista con detalle en espacio negativo: la forma de un ojo de cerradura integrado en la letra capitular.',
    fullOverview:
      'VAULT es una propuesta de marca de moda urbana contemporánea basada en la sobriedad tipográfica. El logotipo integra sutilmente la silueta de un ojo de cerradura en el espacio interno de la letra A, generando un identificador discreto que funciona tanto en etiquetas tejidas como en estampados y papelería.',
    deliverables: [
      'Logotipo Tipográfico con Espacio Negativo',
      'Propuesta de Etiquetas Textiles y Marquillas',
      'Aplicación en Catálogo y Paleta Monocromática',
    ],
    sections: [
      {
        title: 'Detalle en Espacio Negativo',
        type: 'text',
        content: [
          'La identidad prescinde de adornos innecesarios para concentrarse en la solidez de las letras. La cerradura en la letra A añade un punto de interés visual que refuerza el nombre ("bóveda") sin recargar la composición.',
        ],
      },
    ],
    galleryItems: [
      {
        id: 'vault-1',
        title: 'Logotipo VAULT con Espacio Negativo',
        caption: 'Construcción tipográfica con detalle de cerradura sobre tono hueso',
        type: 'artwork',
        aspect: '16:9',
      },
    ],
    featured: false,
    order: 5,
  },
  {
    id: 'tazza-cafe',
    title: 'Tazza Cafe',
    subtitle: 'Cafetería de Especialidad & Tostaduría',
    slug: 'tazza-cafe',
    category: 'Identidad Visual',
    segment: 'logofolio',
    segmentLabel: 'Logofolio & Isotipo Botánico',
    year: '2025',
    role: 'Isotipo & Sistema de Marca',
    heroAccentColor: '#1A3A2A',
    tagline: 'De la raíz al tueste.',
    shortDescription:
      'Isotipo de trazo orgánico que fusiona la silueta de un grano de café tostado con una hoja vegetal, comunicando origen artesanal y cuidado del producto.',
    fullOverview:
      'Proyecto de marca gráfica para una tostaduría y cafetería de especialidad. El isotipo une en un solo contorno la curvatura de una hoja tierna y la hendidura de un grano de café tostado, logrando una figura simple y memorable pensada para bolsas de café en grano, sellos manuales y tazas cerámicas.',
    deliverables: [
      'Isotipo de Doble Lectura (Grano y Hoja)',
      'Diseño de Etiquetas para Bolsas de Café',
      'Propuesta de Rotulación en Vidrio para Cafetería',
    ],
    sections: [
      {
        title: 'La Forma Dual',
        type: 'text',
        content: [
          'El isotipo busca que quien lo observe distinga con naturalidad tanto el grano como la hoja. La simplicidad del trazo facilita su estampado con tinta sobre bolsas de papel kraft y su grabado en vajilla.',
        ],
      },
    ],
    galleryItems: [
      {
        id: 'tazza-1',
        title: 'Isotipo Dual Tazza',
        caption: 'Fusión de grano y hoja en verde bosque profundo y tono arena',
        type: 'artwork',
        aspect: '1:1',
      },
    ],
    featured: false,
    order: 6,
  },
  {
    id: 'kiem-university',
    title: 'KIEM University',
    subtitle: 'Monograma Colegial & Sistema Atlético',
    slug: 'kiem-university',
    category: 'Branding & Identidad',
    segment: 'logofolio',
    segmentLabel: 'Logofolio & Monograma Deportivo',
    year: '2025',
    role: 'Monograma & Sistema Deportivo',
    heroAccentColor: '#1E3A8A',
    tagline: 'Impulso y disciplina en cada trazo.',
    shortDescription:
      'Monograma tipográfico varsity que entrelaza las iniciales con un chevrón ascendente, pensado para aplicaciones deportivas y académicas.',
    fullOverview:
      'Monograma colegial de estilo atlético que entrelaza las letras K y U con una flecha ascendente central. La figura está construida con ángulos limpios y serifas cuadradas características de los uniformes deportivos universitarios, manteniendo legibilidad en bordados, parches y señalización.',
    deliverables: [
      'Monograma Colegial Entrelazado',
      'Paleta Cromática Deportiva (Azul Marino y Crema)',
      'Propuesta de Aplicación en Ropa Deportiva y Señalética',
    ],
    sections: [
      {
        title: 'Geometría Atlética',
        type: 'text',
        content: [
          'El monograma recurre a la solidez del estilo varsity tradicional, integrando un chevrón hacia arriba que aporta dinamismo y sugiere avance constante.',
        ],
      },
    ],
    galleryItems: [
      {
        id: 'kiem-1',
        title: 'Monograma Varsity KIEM',
        caption: 'Letras entrelazadas en azul marino y crema atlético',
        type: 'artwork',
        aspect: '1:1',
      },
    ],
    featured: false,
    order: 7,
  },
];
