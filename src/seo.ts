import { EMPRESA, SITE } from './config'
import { AREAS, CONTACTO, ZONA } from './services/areas'
import { FAQ_INICIO, faqServicio, type Faq } from './services/faq'
import { ARTICULOS } from './content/articulos'
import { PROBLEMAS } from './content/problemas'

/** Dominio principal (sin barra final). Se usa en canonical, og:url y sitemap. */
export const SITE_URL = 'https://sinestesya.es'
export const OG_IMAGE = `${SITE_URL}/og.png`

export interface Seo {
  title: string
  description: string
  /** true para pedir a los buscadores que no indexen la página. */
  noindex?: boolean
  /** Preguntas frecuentes de la página (datos estructurados FAQPage). */
  faq?: Faq[]
  /** Otros datos estructurados de la página (p. ej. Article). */
  jsonld?: object
}

const MARCA = 'Sinestesya'
const LUGAR = 'La Puebla de Alfindén'

/** Título y descripción de cada página. La clave es la ruta sin barra final. */
export const SEO: Record<string, Seo> = {
  '/': {
    title: `${MARCA} · Psicología, logopedia, fisioterapia y nutrición en ${LUGAR}`,
    description: `Psicología, logopedia, fisioterapia y nutrición en ${LUGAR}, junto a Alfajarín y Nuez de Ebro. Niños, adultos y mayores. Tel. ${CONTACTO.telefono}.`,
  },
  '/psicologia': {
    title: `Psicología infantil y de adultos en ${LUGAR} · ${MARCA}`,
    description: `Psicología en ${LUGAR}: ansiedad, duelo, TCA y pareja en adultos; conducta, aprendizaje, TDAH y TEA en niños y adolescentes. Presencial y online.`,
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
    description: `Nutrición en ${LUGAR}: control de peso, deporte, colesterol, diabetes, alergias, embarazo y alimentación infantil. Sin dietas imposibles.`,
  },
  '/atencion-temprana': {
    title: `Atención temprana (0–6 años) en ${LUGAR} · ${MARCA}`,
    description: `Atención temprana en ${LUGAR}: psicología, logopedia y fisioterapia coordinadas para el desarrollo de tu hijo de 0 a 6 años, con la familia.`,
  },
  '/online': {
    title: `Psicología, logopedia y nutrición online · ${MARCA}`,
    description: `Sesiones online de psicología, logopedia y nutrición, y acompañamiento a familias, para que la distancia o el horario no sean un obstáculo.`,
  },
  '/programas': {
    title: `Talleres de salud para colegios y empresas en Zaragoza · ${MARCA}`,
    description: `Charlas y talleres de salud a medida para colegios y empresas de ${LUGAR} y Zaragoza: bienestar emocional, lenguaje, ergonomía y alimentación.`,
  },
  '/quienes-somos': {
    title: `Quiénes somos · Centro multidisciplinar en ${LUGAR} · ${MARCA}`,
    description: `${MARCA} reúne psicología, logopedia, fisioterapia y nutrición bajo un mismo techo en ${LUGAR}. Un equipo coordinado para cada etapa de la vida.`,
  },
  '/tarifas': {
    title: `Tarifas · ${MARCA}, ${LUGAR}`,
    description: `Tarifas 2027 de ${MARCA}, ${LUGAR}: precios y duración de las sesiones y bonos de psicología, logopedia, fisioterapia y nutrición.`,
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

SEO['/blog'] = {
  title: `Blog de salud para familias · ${MARCA}, ${LUGAR}`,
  description: `Guías del equipo de ${MARCA} sobre psicología, logopedia, fisioterapia y nutrición para niños y adultos.`,
}
for (const a of ARTICULOS) {
  const ruta = `/blog/${a.slug}`
  SEO[ruta] = {
    title: `${a.titulo} · ${MARCA}`,
    description: a.descripcion,
    noindex: !a.revisado,
    faq: a.faq,
    jsonld: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: a.titulo,
      description: a.descripcion,
      datePublished: a.fecha,
      inLanguage: 'es-ES',
      image: OG_IMAGE,
      mainEntityOfPage: `${SITE_URL}${ruta}`,
      author: { '@type': 'Organization', name: MARCA, url: `${SITE_URL}/` },
      publisher: { '@id': `${SITE_URL}/#centro` },
    },
  }
}

for (const p of PROBLEMAS) {
  const ruta = `/${p.slug}`
  SEO[ruta] = {
    title: `${p.seoTitulo} · ${MARCA}`,
    description: p.descripcion,
    noindex: !p.revisado,
    faq: p.faq,
    jsonld: {
      '@context': 'https://schema.org',
      '@type': 'MedicalWebPage',
      name: p.titulo,
      description: p.descripcion,
      url: `${SITE_URL}${ruta}`,
      inLanguage: 'es-ES',
      about: { '@type': 'MedicalCondition', name: p.titulo },
      audience: { '@type': 'PeopleAudience', geographicArea: { '@type': 'City', name: LUGAR } },
      publisher: { '@id': `${SITE_URL}/#centro` },
    },
  }
}

SEO['/'].faq = FAQ_INICIO
for (const a of AREAS) SEO[`/${a.slug}`].faq = faqServicio(a.slug)

const faqJsonLd = (faq: Faq[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
})
const ldScript = (data: object, id?: string) =>
  `<script type="application/ld+json"${id ? ` id="${id}"` : ''}>${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`

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

/** Ficha del centro para Google (schema.org/MedicalClinic). */
export const CENTRO_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'MedicalClinic',
  '@id': `${SITE_URL}/#centro`,
  name: MARCA,
  alternateName: [`${MARCA} Salud integral`, `${MARCA} ${LUGAR}`],
  legalName: EMPRESA.razonSocial,
  description: `Centro sanitario multidisciplinar en ${LUGAR}: psicología, logopedia, fisioterapia y nutrición para niños, adultos y mayores.`,
  url: `${SITE_URL}/`,
  image: OG_IMAGE,
  telephone: `+34${CONTACTO.telefono.replace(/\s/g, '')}`,
  email: CONTACTO.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: CONTACTO.direccion.split('\n')[0],
    postalCode: '50171',
    addressLocality: LUGAR,
    addressRegion: 'Zaragoza',
    addressCountry: 'ES',
  },
  openingHoursSpecification: [{
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '21:00',
  }],
  medicalSpecialty: ['https://schema.org/SpeechPathology', 'https://schema.org/Physiotherapy', 'https://schema.org/DietNutrition'],
  availableService: ['Psicología', 'Logopedia', 'Fisioterapia', 'Nutrición', 'Atención temprana'].map((name) => ({ '@type': 'MedicalTherapy', name })),
  areaServed: [
    ...[LUGAR, ...ZONA.municipios].map((name) => ({ '@type': 'City', name })),
    ...ZONA.zaragoza.map((name) => ({ '@type': 'Place', name: `${name} (Zaragoza)` })),
    { '@type': 'City', name: 'Zaragoza' },
  ],
  priceRange: '35 €–110 €',
  taxID: EMPRESA.cif ?? undefined,
}

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
    ldScript(CENTRO_JSONLD),
    seo.faq?.length ? ldScript(faqJsonLd(seo.faq), 'faq-jsonld') : '',
    seo.jsonld ? ldScript(seo.jsonld, 'page-jsonld') : '',
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
  // Datos estructurados propios de la página: sustituye o quita los de la página anterior
  document.getElementById('faq-jsonld')?.remove()
  document.getElementById('page-jsonld')?.remove()
  if (seo.jsonld) {
    const el = document.createElement('script')
    el.type = 'application/ld+json'
    el.id = 'page-jsonld'
    el.textContent = JSON.stringify(seo.jsonld)
    document.head.appendChild(el)
  }
  if (seo.faq?.length) {
    const el = document.createElement('script')
    el.type = 'application/ld+json'
    el.id = 'faq-jsonld'
    el.textContent = JSON.stringify(faqJsonLd(seo.faq))
    document.head.appendChild(el)
  }
}
