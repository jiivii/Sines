/**
 * Ajustes temporales del sitio.
 * Para volver a recoger citas online, cambia `reservasAbiertas` a `true`.
 */
export const SITE = {
  nombre: 'Sinestesya',
  claim: 'Salud integral',
  reservasAbiertas: false,
  avisoConstruccion:
    'Web en construcción. Estamos actualizando el sitio y, de momento, no recogemos citas online. Para cualquier consulta, llámanos o escríbenos.',
}

export const WHATSAPP = 'https://wa.me/34602533313'

/**
 * Datos legales de la empresa. Los campos en `null` se muestran como
 * «pendiente» en las páginas legales y se ocultan en el pie hasta tenerlos.
 */
export const EMPRESA = {
  razonSocial: 'Sinestesya Villarroya S.L.',
  cif: null as string | null,
  domicilioSocial: null as string | null,
  registroMercantil: null as string | null,
  autorizacionSanitaria: null as string | null,
  email: 'hola@sinestesya.es',
  telefono: '602 533 313',
  /** Fecha de la última revisión de los textos legales. */
  revisionLegal: 'noviembre de 2026',
  /** Pon `true` cuando la asesoría haya validado los textos: quita el aviso de borrador. */
  legalRevisado: false,
}
