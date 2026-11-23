import { SITE } from './config'
import { AREAS, CONTACTO, ZONA, listaY } from './services/areas'
import { getTarifas, TARIFARIO_ANIO } from './services/tarifas'
import { SEO, SITE_URL } from './seo'

/**
 * Resumen del centro para asistentes de IA (ChatGPT, Gemini, Perplexity…), servido en /llms.txt.
 * Se genera al compilar con los mismos datos que la web, así no se queda desactualizado.
 */
export function llmsTxt() {
  const direccion = CONTACTO.direccion.replace('\n', ', ')
  const precioDesde = (slug: string) => {
    const t = getTarifas(slug)?.tarifas[0]
    return t ? ` Primera sesión: ${t.precio} (${t.detalle}).` : ''
  }
  /** Primera letra en minúscula, sin tocar siglas (TDAH, TCA…). */
  const lista = (x: string[]) => x.map((t) => (/^[A-Z]{2,}/.test(t) ? t : t.charAt(0).toLowerCase() + t.slice(1))).join(', ')
  const pagina = (ruta: string, nombre: string) => `- [${nombre}](${SITE_URL}${ruta}): ${SEO[ruta]?.description ?? ''}`
  return `# Sinestesya · Centro de salud integral en La Puebla de Alfindén

> Sinestesya (también «Centro Sinestesya» o «Sinestesya Salud integral»; se escribe con «y») es un centro sanitario multidisciplinar en La Puebla de Alfindén (Zaragoza) con psicología, logopedia, fisioterapia y nutrición para niños, adultos y mayores, presencial y online.

- Dirección: ${direccion}
- Teléfono y WhatsApp: ${CONTACTO.telefono}
- Email: ${CONTACTO.email}
- Horario: ${CONTACTO.horario.replace(/ /g, ' ')}
${SITE.apertura ? `- Apertura del centro: ${SITE.apertura}. Ya se puede pedir información por teléfono o WhatsApp.\n` : ''}- Zona: La Puebla de Alfindén y alrededores (${listaY([...ZONA.municipios, ...ZONA.zaragoza.map((b) => `${b} (Zaragoza)`)])}).
- Atención online: psicología, logopedia y nutrición.

## Especialidades
${AREAS.map((a) => `- **${a.nombre}**. Adultos: ${lista(a.adultos)}. Niños y adolescentes: ${lista(a.ninos)}.${precioDesde(a.slug)} Más información: ${SITE_URL}/${a.slug}`).join('\n')}

## Páginas
${pagina('/', 'Inicio')}
${pagina('/tarifas', `Tarifas ${TARIFARIO_ANIO}`)}
${pagina('/quienes-somos', 'Quiénes somos')}
${pagina('/online', 'Atención online')}
${pagina('/programas', 'Colegios y empresas')}
`
}
