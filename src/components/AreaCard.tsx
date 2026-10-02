import { Link } from 'react-router-dom'
import type { Area } from '../types'

const R = ['rounded-[26px_26px_64px_26px]', 'rounded-[26px_64px_26px_26px]', 'rounded-[64px_26px_26px_26px]', 'rounded-[26px_26px_26px_64px]']

export default function AreaCard({ area, i, compact }: { area: Area; i: number; compact?: boolean }) {
  return (
    <Link to={`/${area.slug}`}
      className={`${area.bg} ${R[i % 4]} flex flex-col p-6 text-tinta no-underline transition-transform hover:-translate-y-1.5 ${compact ? 'min-h-[150px]' : 'min-h-[240px]'}`}>
      <span className="lab opacity-80">{area.dimension}</span>
      <h3 className="mt-1">{area.nombre}</h3>
      {!compact && <p className="mb-auto mt-2 text-[.92rem]">{area.sub}</p>}
      {!compact && <b className="mt-4 font-medium">Conocer más →</b>}
    </Link>
  )
}
