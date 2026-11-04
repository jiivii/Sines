import type { Area, AreaSlug } from '../types'

export const AREAS: Area[] = [
  {
    slug: 'psicologia', nombre: 'Psicología', dimension: 'Mente', bg: 'bg-amarillo', soft: 'bg-amarillo/25', hex: '#F5C35E',
    sub: 'Bienestar emocional',
    intro: 'Acompañamos las emociones, la conducta y el desarrollo personal.',
    claim: 'Un espacio para entenderte con calma.',
    adultos: ['Ansiedad, estrés y depresión', 'Duelo y procesos vitales', 'Autoestima y gestión emocional', 'Relaciones y acompañamiento', 'Estimulación cognitiva'],
    ninos: ['Dificultades emocionales y de conducta', 'Ansiedad y miedos', 'Atención y aprendizaje', 'Orientación a familias'],
    pasos: [
      { titulo: 'Primera conversación', descripcion: 'Nos cuentas qué te preocupa y cómo te afecta en tu día a día.' },
      { titulo: 'Valoración emocional', descripcion: 'Exploramos juntos tu historia, tus recursos y tus objetivos.' },
      { titulo: 'Plan a tu ritmo', descripcion: 'Definimos sesiones y estrategias que puedas sostener en el tiempo.' },
    ],
    ctaTitulo: 'Tu bienestar emocional empieza por escucharte.',
    ctaTexto: 'Si sientes que algo te pesa, podemos ayudarte a ponerle nombre y a encontrar tu camino.',
    blob: 'M20 30c8-16 34-20 52-8 16 34 4 46-14 14-40 14-54 2C10 60 12 42 20 30z'
  },
  {
    slug: 'logopedia', nombre: 'Logopedia', dimension: 'Voz', bg: 'bg-azul', soft: 'bg-azul/25', hex: '#6B92DB',
    sub: 'Comunicación y lenguaje',
    intro: 'Mejoramos la comunicación, el habla, la voz y la deglución.',
    claim: 'Comunicarse es poder contar quién eres.',
    adultos: ['Voz y disfonías', 'Tartamudez', 'Trastornos del habla y del lenguaje', 'Disfagia y rehabilitación tras daño cerebral', 'Afasia y rehabilitación neurológica'],
    ninos: ['Retraso y trastornos del lenguaje', 'Dificultades del habla', 'Lectoescritura y dislexia', 'Deglución y alimentación'],
    pasos: [
      { titulo: 'Escucha y observación', descripcion: 'Conocemos cómo se comunica la persona y qué necesita mejorar.' },
      { titulo: 'Valoración del lenguaje', descripcion: 'Analizamos habla, voz, lenguaje o deglución según cada caso.' },
      { titulo: 'Terapia personalizada', descripcion: 'Trabajamos con ejercicios y estrategias adaptadas a cada edad.' },
    ],
    ctaTitulo: 'Que las palabras vuelvan a fluir.',
    ctaTexto: 'Da igual la edad: siempre hay margen para mejorar la comunicación y la deglución.',
    blob: 'M24 24c14-14 44-12 56 6 10 16 4 40-14 50-18 8-44 0-50-20-4-14 0-28 8-36z'
  },
  {
    slug: 'fisioterapia', nombre: 'Fisioterapia', dimension: 'Cuerpo', bg: 'bg-verde', soft: 'bg-verde/25', hex: '#88C57E',
    sub: 'Movimiento y funcionalidad',
    intro: 'Recuperamos el movimiento y cuidamos la funcionalidad del cuerpo.',
    claim: 'Moverte mejor, con menos dolor.',
    adultos: ['Dolor de espalda y cervical', 'Lesiones musculares y articulares', 'Rehabilitación postquirúrgica y deportiva', 'Fisioterapia neurológica', 'Movilidad y prevención de caídas'],
    ninos: ['Fisioterapia pediátrica y desarrollo motor', 'Alteraciones posturales', 'Atención temprana'],
    pasos: [
      { titulo: 'Valoración del movimiento', descripcion: 'Exploramos tu dolor, tu postura y cómo te mueves.' },
      { titulo: 'Tratamiento y ejercicio', descripcion: 'Combinamos técnicas manuales y movimiento para recuperar funcionalidad.' },
      { titulo: 'Progreso y prevención', descripcion: 'Revisamos tu evolución y te damos pautas para evitar recaídas.' },
    ],
    ctaTitulo: 'Recupera el movimiento que te importa.',
    ctaTexto: 'Desde una molestia puntual hasta una rehabilitación completa, te acompañamos paso a paso.',
    blob: 'M16 40c6-20 30-30 50-22 20 8 26 30 16 48-10 18-36 22-52 10C12 68 10 52 16 40z'
  },
  {
    slug: 'nutricion', nombre: 'Nutrición', dimension: 'Alimento', bg: 'bg-naranja', soft: 'bg-naranja/25', hex: '#ED8936',
    sub: 'Salud y equilibrio',
    intro: 'Diseñamos una alimentación a tu medida para cada etapa.',
    claim: 'Comer bien, sin obsesiones ni prohibiciones.',
    adultos: ['Control de peso', 'Educación nutricional', 'Nutrición deportiva', 'Patologías: colesterol, diabetes e hipertensión', 'Embarazo y lactancia', 'Alimentación en la tercera edad', 'Prevención de la desnutrición'],
    ninos: ['Alimentación infantil y adolescente', 'Selectividad alimentaria', 'Hábitos saludables en familia'],
    pasos: [
      { titulo: 'Conocemos tus hábitos', descripcion: 'Hablamos de tu alimentación, tu rutina y tus objetivos.' },
      { titulo: 'Plan a tu medida', descripcion: 'Diseñamos una pauta realista, adaptada a tus gustos y tu salud.' },
      { titulo: 'Seguimiento cercano', descripcion: 'Ajustamos el plan contigo para que sea sostenible en el tiempo.' },
    ],
    ctaTitulo: 'Una alimentación que encaja contigo.',
    ctaTexto: 'Sin dietas imposibles: aprendemos a comer mejor para sentirte mejor.',
    blob: 'M22 22c16-10 42-8 54 8 12 16 6 40-10 48-16 8-40 2-48-16-6-14-2-32 4-40z'
  },
]
export const getArea = (slug?: string): Area | undefined => AREAS.find((a) => a.slug === slug)
export const isAreaSlug = (s: unknown): s is AreaSlug => AREAS.some((a) => a.slug === s)
export const CONTACTO = {
  telefono: '602 533 313',
  email: 'hola@sinestesya.es',
  direccion: 'Calle Fuertes, 1\n50171 La Puebla de Alfindén (Zaragoza)',
  web: 'www.sinestesya.es',
  horario: 'de 9 h a 21 h'
}
