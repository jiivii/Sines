export const HORAS = ['9:00', '10:00', '11:00', '12:00', '16:00', '17:00', '18:00', '19:00']
const p = (n: number) => String(n).padStart(2, '0')
export const toISO = (d: Date) => `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`
export function proximosDias(n: number): string[] {
  const out: string[] = []
  const d = new Date()
  while (out.length < n) {
    d.setDate(d.getDate() + 1)
    if (d.getDay() % 6) out.push(toISO(d)) // sin sábados ni domingos
  }
  return out
}
export const fmtFecha = (iso: string) => {
  const t = new Date(`${iso}T12:00:00`).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })
  return t.charAt(0).toUpperCase() + t.slice(1)
}
