/**
 * Ajustes temporales del sitio.
 * `reservasAbiertas` muestra u oculta la reserva online en la web. Desde qué día
 * se puede pedir cita, el horario y las duraciones NO se cambian aquí: los
 * decide Órbita (tabla `web_booking_settings`, archivo `supabase/reservas_web.sql`
 * de Órbita). Si Órbita tiene las reservas paradas o no responde, la página de
 * cita muestra el teléfono y WhatsApp.
 */
export const SITE = {
  nombre: 'Sinestesya',
  claim: 'Salud integral',
  reservasAbiertas: true,
  /** Cuándo abre el centro. Se muestra en el aviso superior, en la página de cita y en las preguntas frecuentes. Pon `null` cuando ya esté abierto. */
  apertura: 'febrero de 2027' as string | null,
}

/** Función de Órbita que da los huecos y recibe las solicitudes (Supabase). */
export const RESERVAS_API: string =
  import.meta.env.VITE_RESERVAS_API || 'https://qgcywuzantcgoitrybwb.supabase.co/functions/v1/web-booking'

export const WHATSAPP = 'https://wa.me/34602533313'

/** Enlace de WhatsApp con un mensaje ya escrito. */
export const whatsappLink = (texto: string) => `${WHATSAPP}?text=${encodeURIComponent(texto)}`

/**
 * Datos legales de la empresa. Los campos en `null` se muestran como
 * «pendiente» en las páginas legales y se ocultan en el pie hasta tenerlos.
 */
export const EMPRESA = {
  razonSocial: 'Sinestesya Villarroya S.L.',
  cif: 'B05747308' as string | null,
  domicilioSocial: 'C/ Fuertes, 1 Bis, 50171 La Puebla de Alfindén (Zaragoza)' as string | null,
  registroMercantil: null as string | null,
  autorizacionSanitaria: null as string | null,
  email: 'hola@sinestesya.es',
  telefono: '602 533 313',
  /** Fecha de la última revisión de los textos legales. */
  revisionLegal: 'noviembre de 2026',
  /** Pon `true` cuando la asesoría haya validado los textos: quita el aviso de borrador. */
  legalRevisado: false,
}
