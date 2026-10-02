import { Link, useParams } from 'react-router-dom'
import AreaCard from '../components/AreaCard'
import { AREAS, getArea } from '../services/areas'
import { useTitle } from '../hooks/useTitle'
import NotFound from './NotFound'

export default function Servicio() {
  const area = getArea(useParams().slug)
  useTitle(area?.nombre)
  if (!area) return <NotFound />
  const list = (items: string[]) => (
    <ul className="mt-3 list-none p-0">
      {items.map((x) => <li key={x} className="relative border-t border-line py-2 pl-5 before:absolute before:left-0 before:top-[1.1rem] before:h-2 before:w-2 before:rounded-full before:content-[''] before:bg-[var(--dot)]">{x}</li>)}
    </ul>
  )
  return (
    <div style={{ '--dot': area.hex } as React.CSSProperties}>
      <div className={`${area.bg} rounded-b-[56px] py-[clamp(40px,8vw,84px)] text-tinta`}>
        <div className="wrap grid items-center gap-6 md:grid-cols-[1.4fr_1fr]">
          <div>
            <span className="lab">{area.dimension} · {area.nombre}</span>
            <h1 className="mb-4 mt-3.5">{area.nombre}</h1>
            <p className="text-[1.15rem]">{area.intro}</p>
            <Link to={`/reservar?area=${area.slug}`} className="btn mt-2">Reservar en {area.nombre}</Link>
          </div>
          <svg viewBox="0 0 100 100" aria-hidden="true" className="max-w-[150px] justify-self-center opacity-55 md:max-w-[300px]"><path fill="#F8F3ED" d={area.blob} /></svg>
        </div>
      </div>
      <div className="wrap">
        <section className="mt-14">
          <h2>{area.sub}</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="tile"><span className="lab">Adultos</span>{list(area.adultos)}</div>
            <div className="tile"><span className="lab">Niños y adolescentes</span>{list(area.ninos)}</div>
          </div>
        </section>
        <section className="mt-20">
          <div className="steps">
            {[['Primera sesión', 'Valoración sin prisas para entender qué necesitas.'], ['Plan a tu medida', 'Objetivos claros y sesiones adaptadas a tu ritmo o al de tu hijo o hija.'], ['Seguimiento', 'Revisamos contigo y nos coordinamos con el resto del equipo si hace falta.']].map(([t, d], i) => (
              <div key={t} className="border-t-2 border-current pt-3.5"><span className="block font-serif text-[2.6rem] font-light italic leading-none">{i + 1}</span><h3>{t}</h3><p>{d}</p></div>
            ))}
          </div>
        </section>
        <section className={`${area.soft} mt-20 rounded-[28px] p-8 text-center`}>
          <p className="mx-auto mb-5 font-serif text-3xl font-light italic">Aquí estamos para lo que venga.</p>
          <Link to={`/reservar?area=${area.slug}`} className="btn">Reservar cita</Link>
        </section>
        <section className="mt-14">
          <span className="lab">También en Sinestesya</span>
          <div className="mt-4 grid gap-3.5 sm:grid-cols-3">{AREAS.map((a, i) => a.slug !== area.slug && <AreaCard key={a.slug} area={a} i={i} compact />)}</div>
        </section>
      </div>
    </div>
  )
}
