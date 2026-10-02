import type { Area, AreaSlug } from '../types'

export const AREAS: Area[] = [
  { slug: 'psicologia', nombre: 'Psicología', dimension: 'Mente', bg: 'bg-salvia', soft: 'bg-salvia/25', hex: '#9CAE9F',
    sub: 'Un espacio para entenderte con calma.',
    intro: 'Terapia psicológica para ordenar lo que piensas y sientes, a tu ritmo y sin etiquetas prefabricadas.',
    adultos: ['Ansiedad, estrés y bloqueos', 'Duelo y cambios vitales', 'Autoestima y relaciones', 'Terapia individual y de pareja'],
    ninos: ['Emociones, miedos y rabietas', 'Conducta y límites en casa', 'Dificultades de atención y aprendizaje', 'Adolescentes y orientación a familias'],
    blob: 'M20 30c8-16 34-20 52-8 16 10 16 34 4 46-14 14-40 14-54 2C10 60 12 42 20 30z' },
  { slug: 'logopedia', nombre: 'Logopedia', dimension: 'Voz', bg: 'bg-terracota', soft: 'bg-terracota/25', hex: '#E3A995',
    sub: 'Comunicarse es poder contar quién eres.',
    intro: 'Evaluación y tratamiento del lenguaje, el habla, la voz y la deglución, a cualquier edad.',
    adultos: ['Voz: disfonías y uso profesional', 'Afasia y disartria tras un ictus', 'Disfagia y problemas al tragar', 'Tartamudez y comunicación'],
    ninos: ['Retraso del lenguaje y dislalias', 'Tartamudez infantil', 'Dislexia y lectoescritura', 'Atención temprana y respiración oral'],
    blob: 'M24 24c14-14 44-12 56 6 10 16 4 40-14 50-18 8-44 0-50-20-4-14 0-28 8-36z' },
  { slug: 'fisioterapia', nombre: 'Fisioterapia', dimension: 'Cuerpo', bg: 'bg-niebla', soft: 'bg-niebla/25', hex: '#9EAEB5',
    sub: 'Moverte mejor, con menos dolor.',
    intro: 'Valoración y tratamiento manual y con ejercicio para recuperar movimiento y funcionalidad.',
    adultos: ['Dolor lumbar, cervical y articular', 'Recuperación tras lesión o cirugía', 'Suelo pélvico y embarazo', 'Readaptación deportiva'],
    ninos: ['Desarrollo motor y fisioterapia pediátrica', 'Postura y escoliosis', 'Fisioterapia respiratoria', 'Lesiones en deporte escolar'],
    blob: 'M16 40c6-20 30-30 50-22 20 8 26 30 16 48-10 18-36 22-52 10C12 68 10 52 16 40z' },
  { slug: 'nutricion', nombre: 'Nutrición', dimension: 'Alimento', bg: 'bg-ocre', soft: 'bg-ocre/25', hex: '#DCC088',
    sub: 'Comer bien, sin obsesiones ni prohibiciones.',
    intro: 'Planes de alimentación realistas y adaptados a tu vida, tus gustos y tu salud.',
    adultos: ['Hábitos y control de peso', 'Patologías: diabetes, colesterol, digestivas', 'Nutrición deportiva', 'Embarazo, lactancia y menopausia'],
    ninos: ['Alimentación infantil y destete', 'Niños selectivos con la comida', 'Alergias e intolerancias', 'Sobrepeso y hábitos en familia'],
    blob: 'M22 22c16-10 42-8 54 8 12 16 6 40-10 48-16 8-40 2-48-16-6-14-2-32 4-40z' },
]
export const getArea = (slug?: string): Area | undefined => AREAS.find((a) => a.slug === slug)
export const isAreaSlug = (s: unknown): s is AreaSlug => AREAS.some((a) => a.slug === s)
export const CONTACTO = { telefono: '+34 600 000 000', email: 'hola@sinestesya.es', direccion: '[Dirección del centro]' }
