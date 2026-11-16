/**
 * Tarifario de servicios (fuente única: página /tarifas y páginas de cada servicio).
 * Actualiza aquí los precios cuando cambie el tarifario.
 */
export const TARIFARIO_VIGENCIA = 'noviembre de 2026'

export type Tarifa = { servicio: string; detalle: string; precio: string }

export type Bloque = {
  slug: string
  nombre: string
  dimension: string
  soft: string
  dot: string
  intro: string
  tarifas: Tarifa[]
  bonos: Tarifa[]
  nota?: string
}

export const BLOQUES: Bloque[] = [
  {
    slug: 'psicologia',
    nombre: 'Psicología',
    dimension: 'Mente',
    soft: 'bg-amarillo/25',
    dot: 'bg-amarillo',
    intro: 'Acompañamiento emocional para adultos, parejas, familias y menores.',
    tarifas: [
      { servicio: 'Primera consulta / sesión individual', detalle: '45–50 min', precio: '70 €' },
      { servicio: 'Sesión individual', detalle: '45–50 min', precio: '70 €' },
      { servicio: 'Terapia de pareja', detalle: '60 min', precio: '90 €' },
      { servicio: 'Terapia familiar', detalle: '60 min', precio: '90 €' },
      { servicio: 'Informe psicológico', detalle: 'Según complejidad', precio: '70 €' },
    ],
    bonos: [
      { servicio: 'Bono 4 sesiones individuales', detalle: '4 × 45–50 min', precio: '260 €' },
    ],
  },
  {
    slug: 'fisioterapia',
    nombre: 'Fisioterapia',
    dimension: 'Cuerpo',
    soft: 'bg-verde/25',
    dot: 'bg-verde',
    intro: 'Valoración y tratamiento del movimiento, el dolor y la funcionalidad.',
    tarifas: [
      { servicio: 'Primera valoración + tratamiento', detalle: '60 min', precio: '70 €' },
      { servicio: 'Sesión ordinaria', detalle: '50 min', precio: '50 €' },
      { servicio: 'Sesión breve', detalle: '30 min', precio: '35 €' },
    ],
    bonos: [
      { servicio: 'Bono 5 sesiones', detalle: '5 × 50 min', precio: '235 €' },
      { servicio: 'Bono 10 sesiones', detalle: '10 × 50 min', precio: '450 €' },
    ],
  },
  {
    slug: 'logopedia',
    nombre: 'Logopedia',
    dimension: 'Voz',
    soft: 'bg-azul/25',
    dot: 'bg-azul',
    intro: 'Valoración e intervención del lenguaje, el habla, la voz y la deglución.',
    tarifas: [
      { servicio: 'Valoración inicial', detalle: '60 min', precio: '85 €' },
      { servicio: 'Devolución de resultados', detalle: '45 min', precio: '60 €' },
      { servicio: 'Sesión ordinaria', detalle: '45 min', precio: '50 €' },
      { servicio: 'Sesión breve', detalle: '30 min', precio: '35 €' },
    ],
    bonos: [
      { servicio: 'Bono 5 sesiones', detalle: '5 × 45 min', precio: '235 €' },
      { servicio: 'Bono 10 sesiones', detalle: '10 × 45 min', precio: '450 €' },
    ],
    nota: 'La valoración inicial y la devolución de resultados son dos servicios independientes.',
  },
  {
    slug: 'nutricion',
    nombre: 'Nutrición',
    dimension: 'Alimento',
    soft: 'bg-naranja/25',
    dot: 'bg-naranja',
    intro: 'Alimentación personalizada para cada etapa y cada objetivo.',
    tarifas: [
      { servicio: 'Primera consulta completa', detalle: '60–75 min', precio: '110 €' },
      { servicio: 'Seguimiento', detalle: '40–45 min', precio: '50 €' },
      { servicio: 'Valoración antropométrica independiente', detalle: '20–30 min', precio: '40 €' },
    ],
    bonos: [
      { servicio: 'Bono 3 seguimientos', detalle: '3 × 40–45 min', precio: '140 €' },
      { servicio: 'Bono 5 seguimientos', detalle: '5 × 40–45 min', precio: '225 €' },
    ],
    nota: 'La primera consulta incluye historia nutricional, entrevista, antropometría, mediciones, pliegues cuando proceda, valoración de objetivos y planificación nutricional personalizada.',
  },
]

export const getTarifas = (slug: string) => BLOQUES.find((b) => b.slug === slug)
