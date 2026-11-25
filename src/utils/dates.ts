export const fmtFecha = (iso: string) => {
  const t = new Date(`${iso}T12:00:00`).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })
  return t.charAt(0).toUpperCase() + t.slice(1)
}
/** «1 de febrero de 2027» */
export const fmtFechaLarga = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })
