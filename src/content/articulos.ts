import type { AreaSlug } from '../types'
import type { Faq } from '../services/faq'

/** Datos de cada artículo del blog (el texto está en su componente, en src/content/). */
export interface Articulo {
  slug: string
  titulo: string
  /** Resumen para el listado, Google y redes. */
  descripcion: string
  area: AreaSlug
  /** Fecha de publicación (AAAA-MM-DD). */
  fecha: string
  /**
   * Contenido sanitario: mientras sea `false`, la página se publica con noindex
   * y queda fuera del sitemap. Ponlo a `true` cuando lo revise el profesional.
   */
  revisado: boolean
  faq: Faq[]
}

export const ARTICULOS: Articulo[] = [
  {
    slug: 'cuando-llevar-a-mi-hijo-al-logopeda',
    titulo: '¿Cuándo llevar a mi hijo al logopeda?',
    descripcion: 'Qué se espera del lenguaje a cada edad, señales para consultar sin esperar y qué pasa en la primera visita al logopeda. Guía para familias.',
    area: 'logopedia',
    fecha: '2026-11-16',
    revisado: false,
    faq: [
      {
        q: '¿Es normal que a los 4 años no pronuncie la «rr»?',
        a: 'Sí. La «rr» es uno de los últimos sonidos en aparecer y muchos niños no la dominan hasta los 5 o 6 años. Si a los 6 años sigue sin pronunciarla, conviene consultar.',
      },
      {
        q: '¿Los niños bilingües empiezan a hablar más tarde?',
        a: 'Pueden mezclar idiomas o tener menos palabras en cada uno, y es normal. El bilingüismo no causa trastornos del lenguaje. Si sumando los dos idiomas usa muy pocas palabras para su edad, consulta.',
      },
      {
        q: '¿Es mejor esperar a ver si se arregla solo?',
        a: 'No hace falta esperar. Una valoración no compromete a nada: si todo va bien, te quedas tranquilo; si hay una dificultad, cuanto antes se trabaje, mejor.',
      },
      {
        q: '¿Debo revisar también la audición?',
        a: 'Si el niño tarda en hablar o parece no oír bien, coméntalo con el pediatra para descartar un problema de audición. Es una de las primeras cosas que hay que comprobar.',
      },
    ],
  },
]

export const getArticulo = (slug?: string) => ARTICULOS.find((a) => a.slug === slug)

export const fmtFechaArticulo = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })
