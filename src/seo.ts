import { SITE } from './config'
import { CONTACTO } from './services/areas'

/** Dominio principal (sin barra final). Se usa en canonical, og:url y sitemap. */
export const SITE_URL = 'https://sinestesya.es'
export const OG_IMAGE = `${SITE_URL}/og.png`

export interface Seo {
  title: string
  description: string
  /** true para pedir a los buscadores que no indexen la página. */
  noindex?: boolean
}

const MARCA = 'Sinestesya'
const LUGAR = 'La Puebla de Alfindén'

/** Título y descripción de cada página. La clave es la ruta sin barra final. */
export const SEO: Record<string, Seo> = {
  '/': {
    title: `${MARCA} · Psicología, logopedia, fisioterapia y nutrición en ${LUGAR}`,
    description: `Centro sanitario multidisciplinar en ${LUGAR} (Zaragoza): psicología, logopedia, fisioterapia y nutrición para niños, adultos y mayores. Tel. y WhatsApp ${CONTACTO.telefono}.`,
  },
  '/psicologia': {
    title: `Psicología infantil y de adultos en ${LUGAR} · ${MARCA}`,
    description: `Psicología en ${LUGAR}: ansiedad, estrés, duelo y autoestima en adultos; dificultades emocionales, de conducta y de aprendizaje en niños y adolescentes. Presencial y online.`,
  },
  '/logopedia': {
    title: `Logopedia infantil y de adultos en ${LUGAR} · ${MARCA}`,
    description: `Logopedia en ${LUGAR}: retraso del lenguaje, dificultades del habla, lectoescritura y dislexia, voz, tartamudez y deglución. Para niños y adultos.`,
  },
  '/fisioterapia': {
    title: `Fisioterapia en ${LUGAR} · ${MARCA}`,
    description: `Fisioterapia en ${LUGAR}: dolor de espalda y cervical, lesiones, rehabilitación postquirúrgica y deportiva, fisioterapia neurológica y pediátrica.`,
  },
  '/nutricion': {
    title: `Nutricionista en ${LUGAR} · ${MARCA}`,
    description: `Nutrición en ${LUGAR}: control de peso, nutrición deportiva, colesterol, diabetes e hipertensión, embarazo y alimentación infantil. Sin dietas imposibles.`,
  },
  '/atencion-temprana': {
    title: `Atención temprana (0–6 años) en ${LUGAR} · ${MARCA}`,
    description: `Atención temprana en ${LUGAR}: psicología, logopedia y fisioterapia coordinadas para acompañar el desarrollo de tu hijo o hija de 0 a 6 años, con la familia dentro del plan.`,
  },
  '/online': {
    title: `Psicología, logopedia y nutrición online · ${MARCA}`,
    description: `Sesiones online de psicología, logopedia y nutrición, y acompañamiento a familias, para que la distancia o el horario no sean un obstáculo.`,
  },
  '/programas': {
    title: `Talleres de salud para colegios y empresas en Zaragoza · ${MARCA}`,
    description: `Charlas, talleres y programas de salud a medida para colegios y empresas de ${LUGAR} y Zaragoza: bienestar emocional, lenguaje, ergonomía y alimentación.`,
  },
  '/quienes-somos': {
    title: `Quiénes somos · Centro multidisciplinar en ${LUGAR} · ${MARCA}`,
    description: `${MARCA} reúne psicología, logopedia, fisioterapia y nutrición bajo un mismo techo en ${LUGAR}. Un equipo coordinado para cada etapa de la vida.`,
  },
  '/tarifas': {
    title: `Tarifas · ${MARCA}, ${LUGAR}`,
    description: `Precios y duración de las sesiones de psicología, logopedia, fisioterapia y nutrición en ${MARCA}, ${LUGAR}.`,
  },
  '/reservar': {
    title: `Pedir cita · ${MARCA}`,
    description: `Pide cita en ${MARCA}, ${LUGAR}, por teléfono o WhatsApp en el ${CONTACTO.telefono}.`,
    noindex: !SITE.reservasAbiertas,
  },
  '/aviso-legal': { title: `Aviso legal · ${MARCA}`, description: `Aviso legal y datos del titular del sitio web de ${MARCA}.` },
  '/privacidad': { title: `Política de privacidad · ${MARCA}`, description: `Cómo trata ${MARCA} tus datos personales y de salud, y cómo ejercer tus derechos.` },
  '/cookies': { title: `Política de cookies · ${MARCA}`, description: `Información sobre el uso de cookies en el sitio web de ${MARCA}.` },
}

export const NOT_FOUND: Seo = {
  title: `Página no encontrada · ${MARCA}`,
  description: 'Esta página no existe.',
  noindex: true,
}

/** Rutas que se generan como HTML al compilar. */
export const RUTAS = Object.keys(SEO)

export const normalizar = (path: string) => (path.length > 1 ? path.replace(/\/+$/, '') : '/')
export const getSeo = (path: string): Seo | undefined => SEO[normalizar(path)]
export const urlCanonica = (path: string) => SITE_URL + (normalizar(path) === '/' ? '/' : normalizar(path))

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/** Etiquetas del <head> para una ruta. `path` es null en la página 404. */
export function headHtml(seo: Seo, path: string | null) {
  const t = esc(seo.title)
  const d = esc(seo.description)
  return [
    `<title>${t}</title>`,
    `<meta name="description" content="${d}" />`,
    seo.noindex ? '<meta name="robots" content="noindex" />' : '',
    path ? `<link rel="canonical" href="${urlCanonica(path)}" />` : '',
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${MARCA}" />`,
    `<meta property="og:locale" content="es_ES" />`,
    `<meta property="og:title" content="${t}" />`,
    `<meta property="og:description" content="${d}" />`,
    path ? `<meta property="og:url" content="${urlCanonica(path)}" />` : '',
    `<meta property="og:image" content="${OG_IMAGE}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
  ].filter(Boolean).join('\n  ')
}

/** Actualiza el <head> en el navegador al cambiar de página. */
export function aplicarSeo(path: string) {
  const known = getSeo(path)
  const seo = known ?? NOT_FOUND
  document.title = seo.title
  const meta = (attr: 'name' | 'property', key: string, value: string | null) => {
    let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
    if (value === null) { el?.remove(); return }
    if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.appendChild(el) }
    el.content = value
  }
  meta('name', 'description', seo.description)
  meta('name', 'robots', seo.noindex ? 'noindex' : null)
  meta('property', 'og:title', seo.title)
  meta('property', 'og:description', seo.description)
  meta('property', 'og:url', known ? urlCanonica(path) : null)
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (known) {
    if (!link) { link = document.createElement('link'); link.rel = 'canonical'; document.head.appendChild(link) }
    link.href = urlCanonica(path)
  } else link?.remove()
}
