import type { Rule, Fact } from '@/types'

// Streamlined Knowledge Base - Focus on most impactful rules
// Core decision factors: Activity Preference + Budget/Duration

export interface DestinationInfo {
  id: string
  name: string
  description: string
  region: string
  image: string
  activities: string[]
  climate: string[]
  altitude: string
  avgTemperature: string
  bestMonths: string[]
  accommodations: string
  localFood: string
  localTransport: string
}

// Essential destinations only
export const destinationInfo: Record<string, DestinationInfo> = {
  'cusco-machu-picchu': {
    id: 'cusco-machu-picchu',
    name: 'Cusco y Machu Picchu',
    description:
      'La antigua capital del Imperio Inca y la ciudadela perdida de Machu Picchu. Patrimonio mundial de la UNESCO. Perfecta para cultura, aventura y trekking.',
    region: 'Cusco',
    image: '🏛️',
    activities: ['Tour Machu Picchu', 'Camino Inca', 'City Tour Cusco', 'Valle Sagrado'],
    climate: ['templado', 'frio'],
    altitude: '3400m',
    avgTemperature: '15-20°C',
    bestMonths: ['mayo', 'junio', 'julio', 'agosto', 'septiembre'],
    accommodations: 'Hoteles boutique en el centro histórico, lodges en el Valle Sagrado',
    localFood: 'Cuy, alpaca, quinua, chicha de jora, pisco sour',
    localTransport: 'Taxis, combis, tren a Machu Picchu',
  },
  lima: {
    id: 'lima',
    name: 'Lima - Capital Gastronómica',
    description:
      'Capital de Perú, reconocida mundialmente por su extraordinaria gastronomía. Ideal para cultura urbana, gastronomía y viajes cortos.',
    region: 'Lima',
    image: '🏙️',
    activities: ['Tour Gastronómico', 'Centro Histórico', 'Barranco Bohemio', 'Museos'],
    climate: ['templado'],
    altitude: '150m',
    avgTemperature: '18-25°C',
    bestMonths: ['diciembre', 'enero', 'febrero', 'marzo'],
    accommodations: 'Hoteles urbanos, hostales en Miraflores y Barranco',
    localFood: 'Ceviche, anticuchos, causa limeña, pisco sour',
    localTransport: 'Metropolitano, taxis, Uber',
  },
  'iquitos-amazonas': {
    id: 'iquitos-amazonas',
    name: 'Iquitos y Amazonas',
    description:
      'Puerta de entrada a la Amazonía peruana. La mayor diversidad biológica del planeta. Ideal para naturaleza y aventura.',
    region: 'Loreto',
    image: '🌿',
    activities: [
      'Expedición Selva',
      'Observación de Fauna',
      'Navegación Río Amazonas',
      'Pueblos Nativos',
    ],
    climate: ['calido', 'humedo'],
    altitude: '100m',
    avgTemperature: '26-32°C',
    bestMonths: ['abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre'],
    accommodations: 'Lodges en la selva, hoteles en Iquitos',
    localFood: 'Juanes, tacacho, patarashca, aguaje',
    localTransport: 'Botes, mototaxis, avión desde Lima',
  },
  'arequipa-colca': {
    id: 'arequipa-colca',
    name: 'Arequipa y Cañón del Colca',
    description:
      'La "Ciudad Blanca" de Arequipa y el impresionante Cañón del Colca. Perfecto para naturaleza, gastronomía regional y clima templado.',
    region: 'Arequipa',
    image: '🏔️',
    activities: ['Cañón del Colca', 'Vuelo de Cóndores', 'Tour Ciudad Arequipa', 'Aguas Termales'],
    climate: ['templado', 'seco'],
    altitude: '2300m',
    avgTemperature: '18-24°C',
    bestMonths: ['abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre'],
    accommodations: 'Hoteles coloniales en Arequipa, lodges en Colca',
    localFood: 'Rocoto relleno, adobo arequipeño, queso helado, chicha de guiñapo',
    localTransport: 'Buses turísticos, taxis, tours organizados',
  },
  mancora: {
    id: 'mancora',
    name: 'Máncora - Playa y Surf',
    description:
      'Las mejores playas del norte peruano. Ideal para surf, relax y vida nocturna. Clima tropical todo el año.',
    region: 'Piura',
    image: '🏖️',
    activities: ['Surf', 'Pesca Deportiva', 'Vida Nocturna', 'Relajación en Playas'],
    climate: ['calido', 'tropical'],
    altitude: '0m',
    avgTemperature: '24-30°C',
    bestMonths: ['diciembre', 'enero', 'febrero', 'marzo', 'abril'],
    accommodations: 'Resorts de playa, hostales surfer, bungalows',
    localFood: 'Ceviche norteño, cabrito, chicha de jora, pescados y mariscos',
    localTransport: 'Taxis, mototaxis, buses desde Lima',
  },
  'ica-huacachina-paracas': {
    id: 'ica-huacachina-paracas',
    name: 'Ica, Huacachina y Paracas',
    description:
      'Combinación única de desierto, oasis y reserva marina. Ideal para aventura, naturaleza y fotografía.',
    region: 'Ica',
    image: '🏜️',
    activities: ['Sandboarding', 'Islas Ballestas', 'Reserva de Paracas', 'Tour Bodegas de Pisco'],
    climate: ['seco', 'calido'],
    altitude: '0-400m',
    avgTemperature: '20-28°C',
    bestMonths: ['marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto'],
    accommodations: 'Hoteles en Ica, resorts en Paracas, hostales en Huacachina',
    localFood: 'Pisco, vinos, tejas, pallares, mariscos',
    localTransport: 'Buses desde Lima, tours organizados, taxis',
  },
}

// Streamlined rules - Focus on activity + key modifiers
export const travelRules: Rule[] = [
  // === CULTURA E HISTORIA ===
  {
    id: 'cultura_cusco_premium',
    name: 'Cultura + Presupuesto Medio/Alto → Cusco',
    priority: 9,
    antecedents: ['actividad_preferida_cultura', 'presupuesto_media'],
    consequent: 'destino_recomendado_cusco-machu-picchu',
    confidence: 0.95,
    executed: false,
    description: 'Cusco es el destino cultural por excelencia con presupuesto adecuado',
  },
  {
    id: 'cultura_lima_rapido',
    name: 'Cultura + Viaje Corto → Lima',
    priority: 8,
    antecedents: ['actividad_preferida_cultura', 'duracion_1-3'],
    consequent: 'destino_recomendado_lima',
    confidence: 0.9,
    executed: false,
    description: 'Lima ofrece rica cultura e historia para viajes cortos',
  },
  {
    id: 'cultura_clima_templado',
    name: 'Cultura + Clima Templado → Arequipa',
    priority: 8,
    antecedents: ['actividad_preferida_cultura', 'clima_preferido_templado'],
    consequent: 'destino_recomendado_arequipa-colca',
    confidence: 0.85,
    executed: false,
    description: 'Arequipa ofrece cultura colonial con clima templado ideal',
  },

  // === AVENTURA ===
  {
    id: 'aventura_cusco',
    name: 'Aventura + Tiempo Suficiente → Cusco Trekking',
    priority: 9,
    antecedents: ['actividad_preferida_aventura', 'duracion_4-7'],
    consequent: 'destino_recomendado_cusco-machu-picchu',
    confidence: 0.95,
    executed: false,
    description: 'Cusco ofrece el mejor trekking y aventura en los Andes',
  },
  {
    id: 'aventura_amazonas',
    name: 'Aventura + Presupuesto Alto → Amazonas',
    priority: 8,
    antecedents: ['actividad_preferida_aventura', 'presupuesto_alta'],
    consequent: 'destino_recomendado_iquitos-amazonas',
    confidence: 0.9,
    executed: false,
    description: 'Aventura única en la selva amazónica',
  },
  {
    id: 'aventura_economica',
    name: 'Aventura + Viaje Corto → Ica',
    priority: 7,
    antecedents: ['actividad_preferida_aventura', 'duracion_1-3'],
    consequent: 'destino_recomendado_ica-huacachina-paracas',
    confidence: 0.85,
    executed: false,
    description: 'Sandboarding y aventura marina en poco tiempo',
  },
  {
    id: 'aventura_clima_calido',
    name: 'Aventura + Clima Cálido → Amazonas',
    priority: 8,
    antecedents: ['actividad_preferida_aventura', 'clima_preferido_calido'],
    consequent: 'destino_recomendado_iquitos-amazonas',
    confidence: 0.9,
    executed: false,
    description: 'Aventura en clima tropical amazónico',
  },

  // === NATURALEZA ===
  {
    id: 'naturaleza_amazonas',
    name: 'Naturaleza + Tiempo Suficiente → Amazonas',
    priority: 9,
    antecedents: ['actividad_preferida_naturaleza', 'duracion_4-7'],
    consequent: 'destino_recomendado_iquitos-amazonas',
    confidence: 0.95,
    executed: false,
    description: 'La biodiversidad más rica del planeta',
  },
  {
    id: 'naturaleza_colca',
    name: 'Naturaleza + Presupuesto Medio → Colca',
    priority: 8,
    antecedents: ['actividad_preferida_naturaleza', 'presupuesto_media'],
    consequent: 'destino_recomendado_arequipa-colca',
    confidence: 0.9,
    executed: false,
    description: 'Cañón del Colca y cóndores andinos',
  },
  {
    id: 'naturaleza_rapida',
    name: 'Naturaleza + Viaje Corto → Paracas',
    priority: 7,
    antecedents: ['actividad_preferida_naturaleza', 'duracion_1-3'],
    consequent: 'destino_recomendado_ica-huacachina-paracas',
    confidence: 0.8,
    executed: false,
    description: 'Fauna marina y paisajes únicos cerca de Lima',
  },
  {
    id: 'naturaleza_clima_calido',
    name: 'Naturaleza + Clima Cálido → Amazonas',
    priority: 9,
    antecedents: ['actividad_preferida_naturaleza', 'clima_preferido_calido'],
    consequent: 'destino_recomendado_iquitos-amazonas',
    confidence: 0.95,
    executed: false,
    description: 'Biodiversidad tropical en clima cálido',
  },
  {
    id: 'naturaleza_clima_templado',
    name: 'Naturaleza + Clima Templado → Colca',
    priority: 8,
    antecedents: ['actividad_preferida_naturaleza', 'clima_preferido_templado'],
    consequent: 'destino_recomendado_arequipa-colca',
    confidence: 0.9,
    executed: false,
    description: 'Naturaleza andina con clima templado agradable',
  },

  // === GASTRONOMÍA ===
  {
    id: 'gastronomia_lima',
    name: 'Gastronomía → Lima Capital Gastronómica',
    priority: 10,
    antecedents: ['actividad_preferida_gastronomia'],
    consequent: 'destino_recomendado_lima',
    confidence: 0.98,
    executed: false,
    description: 'Lima es la capital gastronómica de Sudamérica',
  },
  {
    id: 'gastronomia_arequipa',
    name: 'Gastronomía + Tiempo → Arequipa',
    priority: 7,
    antecedents: ['actividad_preferida_gastronomia', 'duracion_4-7'],
    consequent: 'destino_recomendado_arequipa-colca',
    confidence: 0.85,
    executed: false,
    description: 'Cocina arequipeña tradicional y única',
  },

  // === RELAX Y PLAYA ===
  {
    id: 'relax_mancora',
    name: 'Relax → Máncora Playas',
    priority: 9,
    antecedents: ['actividad_preferida_relax'],
    consequent: 'destino_recomendado_mancora',
    confidence: 0.95,
    executed: false,
    description: 'Las mejores playas del norte peruano',
  },
  {
    id: 'relax_clima_calido',
    name: 'Relax + Clima Cálido → Máncora',
    priority: 9,
    antecedents: ['actividad_preferida_relax', 'clima_preferido_calido'],
    consequent: 'destino_recomendado_mancora',
    confidence: 0.98,
    executed: false,
    description: 'Playas tropicales con clima cálido perfecto',
  },

  // === TREKKING ===
  {
    id: 'trekking_cusco',
    name: 'Trekking → Cusco Caminos Incas',
    priority: 10,
    antecedents: ['actividad_preferida_trekking'],
    consequent: 'destino_recomendado_cusco-machu-picchu',
    confidence: 0.98,
    executed: false,
    description: 'El Camino Inca es el trekking más famoso del mundo',
  },
  {
    id: 'trekking_clima_frio',
    name: 'Trekking + Clima Frío → Cusco',
    priority: 9,
    antecedents: ['actividad_preferida_trekking', 'clima_preferido_frio'],
    consequent: 'destino_recomendado_cusco-machu-picchu',
    confidence: 0.95,
    executed: false,
    description: 'Trekking en alta montaña con clima frío',
  },

  // === FOTOGRAFÍA ===
  {
    id: 'fotografia_cusco_tiempo',
    name: 'Fotografía + Tiempo → Cusco',
    priority: 8,
    antecedents: ['actividad_preferida_fotografia', 'duracion_4-7'],
    consequent: 'destino_recomendado_cusco-machu-picchu',
    confidence: 0.9,
    executed: false,
    description: 'Paisajes icónicos y arquitectura inca',
  },
  {
    id: 'fotografia_clima_variado',
    name: 'Fotografía + Clima Variado → Cusco',
    priority: 7,
    antecedents: ['actividad_preferida_fotografia', 'clima_preferido_variado'],
    consequent: 'destino_recomendado_cusco-machu-picchu',
    confidence: 0.85,
    executed: false,
    description: 'Variedad de paisajes y climas para fotografía',
  },

  // === REGLAS POR CLIMA ESPECÍFICO ===
  {
    id: 'clima_calido_general',
    name: 'Clima Cálido + Viaje Corto → Máncora',
    priority: 6,
    antecedents: ['clima_preferido_calido', 'duracion_1-3'],
    consequent: 'destino_recomendado_mancora',
    confidence: 0.8,
    executed: false,
    description: 'Destino cálido para viajes cortos',
  },
  {
    id: 'clima_templado_general',
    name: 'Clima Templado + Presupuesto Medio → Lima',
    priority: 5,
    antecedents: ['clima_preferido_templado', 'presupuesto_media'],
    consequent: 'destino_recomendado_lima',
    confidence: 0.75,
    executed: false,
    description: 'Lima ofrece clima templado todo el año',
  },

  // === REGLAS DE RESPALDO ===
  {
    id: 'presupuesto_bajo_general',
    name: 'Presupuesto Bajo → Lima',
    priority: 4,
    antecedents: ['presupuesto_baja'],
    consequent: 'destino_recomendado_lima',
    confidence: 0.7,
    executed: false,
    description: 'Lima es accesible y ofrece gran variedad',
  },
  {
    id: 'viaje_largo_amazonas',
    name: 'Viaje Largo + Presupuesto Alto → Amazonas',
    priority: 6,
    antecedents: ['duracion_7+', 'presupuesto_alta'],
    consequent: 'destino_recomendado_iquitos-amazonas',
    confidence: 0.8,
    executed: false,
    description: 'Experiencia completa en la selva amazónica',
  },
  {
    id: 'clima_variado_general',
    name: 'Clima Variado → Lima',
    priority: 3,
    antecedents: ['clima_preferido_variado'],
    consequent: 'destino_recomendado_lima',
    confidence: 0.65,
    executed: false,
    description: 'Lima es accesible para quienes no tienen preferencia de clima',
  },

  // === REGLAS ALTERNATIVAS - Para generar múltiples opciones ===
  {
    id: 'alternativa_cultura_cusco',
    name: 'Cultura + Viaje Largo → Cusco Alternativa',
    priority: 6,
    antecedents: ['actividad_preferida_cultura', 'duracion_7+'],
    consequent: 'destino_recomendado_cusco-machu-picchu',
    confidence: 0.8,
    executed: false,
    description: 'Tiempo suficiente para explorar toda la cultura cusqueña',
  },
  {
    id: 'alternativa_aventura_paracas',
    name: 'Aventura + Presupuesto Medio → Paracas',
    priority: 6,
    antecedents: ['actividad_preferida_aventura', 'presupuesto_media'],
    consequent: 'destino_recomendado_ica-huacachina-paracas',
    confidence: 0.75,
    executed: false,
    description: 'Aventura accesible en el desierto y mar',
  },
  {
    id: 'alternativa_naturaleza_lima',
    name: 'Naturaleza + Presupuesto Bajo → Lima',
    priority: 5,
    antecedents: ['actividad_preferida_naturaleza', 'presupuesto_baja'],
    consequent: 'destino_recomendado_lima',
    confidence: 0.6,
    executed: false,
    description: 'Parques y reservas naturales cerca de Lima',
  },
  {
    id: 'alternativa_aventura_arequipa',
    name: 'Aventura + Clima Templado → Arequipa',
    priority: 7,
    antecedents: ['actividad_preferida_aventura', 'clima_preferido_templado'],
    consequent: 'destino_recomendado_arequipa-colca',
    confidence: 0.8,
    executed: false,
    description: 'Aventura en cañones con clima agradable',
  },
  {
    id: 'alternativa_relax_lima',
    name: 'Relax + Viaje Corto → Lima',
    priority: 5,
    antecedents: ['actividad_preferida_relax', 'duracion_1-3'],
    consequent: 'destino_recomendado_lima',
    confidence: 0.65,
    executed: false,
    description: 'Relax urbano en parques y malecones de Lima',
  },
  {
    id: 'alternativa_presupuesto_alto_cusco',
    name: 'Presupuesto Alto + Tiempo → Cusco',
    priority: 5,
    antecedents: ['presupuesto_alta', 'duracion_4-7'],
    consequent: 'destino_recomendado_cusco-machu-picchu',
    confidence: 0.75,
    executed: false,
    description: 'Experiencia premium en Cusco con presupuesto adecuado',
  },

  // === REGLAS SECUNDARIAS - Siempre activas para dar más opciones ===
  {
    id: 'segunda_opcion_cultura',
    name: 'Cultura → Lima como segunda opción',
    priority: 2,
    antecedents: ['actividad_preferida_cultura'],
    consequent: 'destino_recomendado_lima',
    confidence: 0.5,
    executed: false,
    description: 'Lima ofrece excelentes museos y sitios históricos',
  },
  {
    id: 'segunda_opcion_aventura',
    name: 'Aventura → Ica como segunda opción',
    priority: 2,
    antecedents: ['actividad_preferida_aventura'],
    consequent: 'destino_recomendado_ica-huacachina-paracas',
    confidence: 0.5,
    executed: false,
    description: 'Ica ofrece sandboarding y deportes marinos',
  },
  {
    id: 'segunda_opcion_naturaleza',
    name: 'Naturaleza → Arequipa como segunda opción',
    priority: 2,
    antecedents: ['actividad_preferida_naturaleza'],
    consequent: 'destino_recomendado_arequipa-colca',
    confidence: 0.5,
    executed: false,
    description: 'Arequipa tiene el Cañón del Colca y naturaleza andina',
  },
]

// Additional facts for the inference engine
export const additionalFacts: Fact[] = [
  { id: 'peru_destino_sudamerica', value: 'verdadero', confidence: 1.0 },
  { id: 'temporada_alta_junio_agosto', value: 'verdadero', confidence: 1.0 },
  { id: 'moneda_local_soles', value: 'verdadero', confidence: 1.0 },
]
