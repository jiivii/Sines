export type AreaSlug = 'psicologia' | 'logopedia' | 'fisioterapia' | 'nutricion'
export type Paciente = 'adulto' | 'nino'
export type Estado = 'pendiente' | 'confirmada' | 'cancelada'

export interface Area {
  slug: AreaSlug
  nombre: string
  dimension: string
  bg: string // clases Tailwind completas (deben aparecer literales para que se generen)
  soft: string
  hex: string
  sub: string
  intro: string
  adultos: string[]
  ninos: string[]
  blob: string
}
export interface ReservaInput {
  area: AreaSlug; paciente: Paciente; edad?: number; fecha: string; hora: string
  nombre: string; telefono: string; email: string; notas?: string; web?: string
}
export interface Reserva extends Omit<ReservaInput, 'web'> { id: string; estado: Estado; created_at: string }
