import { useLocation } from 'react-router-dom'
import { whatsappLink } from '../config'
import { getArea } from '../services/areas'

/** Mensajes predefinidos por página (sin barra inicial). */
const MENSAJES: Record<string, string> = {
  'atencion-temprana': 'Hola, quería información sobre atención temprana para mi hijo/a.',
  online: 'Hola, quería información sobre la atención online de Sinestesya.',
  programas: 'Hola, quería información sobre los programas para colegios y empresas.',
}
const GENERAL = 'Hola, quería información sobre Sinestesya.'

/** Enlace de WhatsApp con el mensaje adecuado a la página actual. */
export function useWhatsApp() {
  const slug = useLocation().pathname.split('/')[1] ?? ''
  const area = getArea(slug)
  const texto = area ? `Hola, quería información sobre ${area.nombre.toLowerCase()} en Sinestesya.` : MENSAJES[slug] ?? GENERAL
  return whatsappLink(texto)
}
