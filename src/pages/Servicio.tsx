import { Link, useParams } from 'react-router-dom'
import AreaCard from '../components/AreaCard'
import { AREAS, CONTACTO, getArea } from '../services/areas'
import { useTitle } from '../hooks/useTitle'
import { SITE, WHATSAPP } from '../config'
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
            <p className="mt-1 font-serif text-[1.35rem] font-light italic">{area.claim}</p>
            {SITE.reservasAbiertas ? (
              <Link to={`/reservar?area=${area.slug}`} className="btn mt-3">Reservar en {area.nombre}</Link>
            ) : (
              <a href={WHATSAPP} target="_blank" rel="noreferrer" className="btn mt-3">Contactar por WhatsApp</a>
            )}
            <p className="mb-0 mt-3 text-[.85rem] opacity-80">Atención presencial y online. Las áreas concretas se definen en la primera valoración.</p>
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
          <span className="lab">Cómo te acompañamos</span>
          <h2 className="mt-2">Así trabajamos en {area.nombre}</h2>
          <div className="steps">
            {area.pasos.map((p, i) => (
              <div key={p.titulo} className="border-t-2 border-current pt-3.5">
                <span className="block font-serif text-[2.6rem] font-light italic leading-none">{i + 1}</span>
                <h3>{p.titulo}</h3>
                <p>{p.descripcion}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={`${area.soft} mt-20 rounded-[28px] p-8 text-center`}>
          <p className="mx-auto mb-3 max-w-[34ch] font-serif text-3xl font-light italic">{area.ctaTitulo}</p>
          <p className="mx-auto mb-5 max-w-[52ch] text-soft">{area.ctaTexto}</p>
          {SITE.reservasAbiertas ? (
            <Link to={`/reservar?area=${area.slug}`} className="btn">Reservar cita</Link>
          ) : (
            <a href={WHATSAPP} target="_blank" rel="noreferrer" className="btn">Hablar con el equipo</a>
          )}
          <p className="mb-0 mt-3 text-[.85rem] text-soft">También puedes llamarnos al {CONTACTO.telefono}.</p>
        </section>

        <section className="mt-14">
          <span className="lab">También en Sinestesya</span>
          <div className="mt-4 grid gap-3.5 sm:grid-cols-3">{AREAS.map((a, i) => a.slug !== area.slug && <AreaCard key={a.slug} area={a} i={i} compact />)}</div>
          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[.9rem]">
            <Link to="/atencion-temprana" className="text-soft underline hover:text-ink">Atención temprana</Link>
            <Link to="/online" className="text-soft underline hover:text-ink">Atención online</Link>
            <Link to="/programas" className="text-soft underline hover:text-ink">Colegios y empresas</Link>
          </div>
        </section>
      </div>
    </div>
  )
}
