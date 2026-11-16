import { SITE } from '../config'
import { CONTACTO, getArea } from './areas'
import { getTarifas } from './tarifas'

/** Pregunta frecuente en texto plano: se muestra en la página y en los datos estructurados (FAQPage). */
export interface Faq {
  q: string
  a: string
}

const TEL = CONTACTO.telefono
const DIRECCION = CONTACTO.direccion.replace('\n', ', ')
const CITA = SITE.reservasAbiertas
  ? `Puedes reservar en la web, llamarnos o escribirnos por WhatsApp al ${TEL}, ${CONTACTO.horario}.`
  : `Llámanos o escríbenos por WhatsApp al ${TEL}, ${CONTACTO.horario}. De momento no recogemos citas online.`

export const FAQ_INICIO: Faq[] = [
  { q: '¿Cómo pido cita?', a: CITA },
  { q: '¿Trabajáis con mutuas o aseguradoras?', a: 'No. Todas las sesiones son privadas. Puedes consultar los precios de cada especialidad en la página de tarifas.' },
  { q: 'No sé qué especialista necesito, ¿qué hago?', a: 'Escríbenos y cuéntanos qué te pasa: te orientamos hacia el profesional que mejor encaje. Si hace falta, varios profesionales del equipo valoran el caso juntos y proponen un único plan.' },
  { q: '¿Atendéis a niños?', a: 'Sí. Atendemos a niños y adolescentes de 0 a 18 años, y también a adultos y personas mayores. Los menores acuden acompañados de su padre, madre o tutor.' },
  { q: '¿Se pueden hacer las sesiones online?', a: 'Sí, en psicología, logopedia y nutrición, y en el acompañamiento a familias. En fisioterapia valoramos contigo qué partes del proceso pueden hacerse a distancia.' },
  { q: '¿Dónde estáis?', a: `En ${DIRECCION}. Atendemos ${CONTACTO.horario}.` },
]

const ONLINE: Record<string, string> = {
  psicologia: 'Sí. Las sesiones de psicología pueden hacerse online, por videollamada.',
  logopedia: 'Sí, en muchos casos. En la valoración inicial te indicamos qué partes del tratamiento pueden hacerse online y cuáles conviene hacer en el centro.',
  fisioterapia: 'La fisioterapia es sobre todo presencial. Valoramos contigo qué partes, como el seguimiento o los ejercicios en casa, pueden hacerse a distancia.',
  nutricion: 'Sí. Las consultas de nutrición pueden hacerse online. Las mediciones corporales, cuando hacen falta, se hacen en el centro.',
}

const ESPECIFICAS: Record<string, Faq[]> = {
  psicologia: [
    { q: '¿Atendéis a niños y adolescentes?', a: 'Sí. Trabajamos dificultades emocionales y de conducta, ansiedad y miedos, atención y aprendizaje, y orientamos a las familias.' },
    { q: '¿Hacéis terapia de pareja o familiar?', a: 'Sí. Las sesiones de terapia de pareja y de terapia familiar duran 60 minutos y cuestan 90 €.' },
  ],
  logopedia: [
    { q: 'Mi hijo/a no habla como otros niños de su edad, ¿cuándo consulto?', a: 'No hace falta esperar. Si te preocupa cómo habla, cómo pronuncia o cómo entiende, consúltanos y lo valoramos. Cuanto antes se detecta una dificultad, antes se puede trabajar.' },
    { q: '¿Por qué la valoración y la devolución se pagan por separado?', a: 'Son dos servicios distintos. En la valoración inicial hacemos las pruebas y la observación; en la devolución de resultados te explicamos lo que hemos visto y el plan de trabajo.' },
  ],
  fisioterapia: [
    { q: '¿Qué tengo que llevar a la primera sesión?', a: 'Ropa cómoda y, si los tienes, informes médicos o pruebas de imagen relacionados con tu problema.' },
    { q: '¿Tratáis a bebés y niños?', a: 'Sí. Hacemos fisioterapia pediátrica: desarrollo motor, alteraciones posturales y atención temprana.' },
  ],
  nutricion: [
    { q: '¿Qué incluye la primera consulta?', a: 'Historia nutricional, entrevista, antropometría y mediciones (pliegues cuando procede), valoración de objetivos y planificación nutricional personalizada.' },
    { q: '¿Atendéis a niños que comen muy pocos alimentos?', a: 'Sí. Trabajamos la alimentación infantil y adolescente, la selectividad alimentaria y los hábitos saludables en familia.' },
  ],
}

/** Preguntas de la página de una especialidad: precio, bonos, online y específicas. */
export function faqServicio(slug: string): Faq[] {
  const area = getArea(slug)
  const t = getTarifas(slug)
  if (!area) return []
  const nombre = area.nombre.toLowerCase()
  const out: Faq[] = []
  if (t) {
    const p = t.tarifas[0]
    out.push({ q: `¿Cuánto cuesta la primera sesión de ${nombre}?`, a: `${p.servicio}: ${p.precio} (${p.detalle}). Puedes ver todas las tarifas de ${nombre} en esta página y en la de tarifas.` })
    if (t.bonos.length) out.push({ q: '¿Tenéis bonos?', a: `Sí: ${t.bonos.map((b) => `${b.servicio.charAt(0).toLowerCase()}${b.servicio.slice(1)} (${b.detalle}) por ${b.precio}`).join(' y ')}.` })
  }
  out.push({ q: `¿Se puede hacer ${nombre} online?`, a: ONLINE[slug] })
  out.push(...(ESPECIFICAS[slug] ?? []))
  out.push({ q: '¿Necesito seguro o mutua?', a: 'No trabajamos con mutuas ni aseguradoras: todas las sesiones son privadas.' })
  return out
}
