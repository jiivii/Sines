import { Link, useLocation } from 'react-router-dom'
import FaqList from '../components/Faq'
import { getProblema, PROBLEMAS } from '../content/problemas'
import { SITE } from '../config'
import { useWhatsApp } from '../hooks/useWhatsApp'
import { CONTACTO, getArea, listaY } from '../services/areas'
import { getTarifas } from '../services/tarifas'
import NotFound from './NotFound'

export default function ProblemaPage() {
  const wa = useWhatsApp()
  const p = getProblema(useLocation().pathname.split('/')[1])
  if (!p) return <NotFound />
  const area = getArea(p.area)!
  const areas = [p.area, ...p.otras].map((s) => getArea(s)!)
  const primeras = p.primera
    .map((x) => ({ ...x, t: getTarifas(x.area)?.tarifas.find((t) => t.servicio === x.servicio) }))
    .filter((x) => x.t)
  const relacionados = PROBLEMAS.filter((x) => x.slug !== p.slug && [x.area, ...x.otras].some((a) => [p.area, ...p.otras].includes(a)))
  const tel = `tel:+34${CONTACTO.telefono.replace(/\s/g, '')}`

  return (
    <div>
      <div className={`${area.bg} rounded-b-[56px] py-[clamp(40px,8vw,84px)] text-tinta`}>
        <div className="wrap">
          <nav aria-label="Ruta" className="text-[.85rem]">
            {areas.map((a, i) => <span key={a.slug}>{i > 0 && ' · '}<Link to={`/${a.slug}`} className="text-tinta">{a.nombre}</Link></span>)}
          </nav>
          <h1 className="mb-4 mt-3.5 max-w-[22ch]">{p.titulo}{' '}<span className="mt-2 block text-[.42em] font-light italic leading-tight">en La Puebla de Alfindén</span></h1>
          <p className="text-[1.1rem]">{p.intro}</p>
          <div className="mt-2 flex flex-wrap gap-3">
            {SITE.reservasAbiertas && <Link to={`/reservar?area=${p.area}`} className="btn">Reservar cita</Link>}
            <a href={wa} target="_blank" rel="noreferrer" className={SITE.reservasAbiertas ? 'btn btn-alt' : 'btn'}>Consultar por WhatsApp</a>
            <a href={tel} className="btn btn-alt">Llamar al {CONTACTO.telefono}</a>
          </div>
          <p className="mb-0 mt-4 text-[.85rem]">Con {listaY(areas.map((a) => a.nombre.toLowerCase()))} coordinadas. Presencial y online cuando es posible.</p>
        </div>
      </div>

      <div className="wrap">
        <section className="mt-14">
          <span className="lab">¿Es para ti?</span>
          <h2 className="mt-2">Es para ti si…</h2>
          <ul className="mt-5 grid list-none gap-3 p-0 md:grid-cols-2">
            {p.paraTi.map((x) => (
              <li key={x} className={`${area.soft} rounded-[22px] p-5`}>{x}</li>
            ))}
          </ul>
        </section>

        {p.aviso && (
          <p role="note" className="mt-8 rounded-[22px] border-2 border-[#A5502F] p-5 text-[.95rem]">
            <strong className="font-medium">Importante: </strong>{p.aviso}
          </p>
        )}

        <section className="mt-20">
          <span className="lab">Cómo te acompañamos</span>
          <h2 className="mt-2">Cómo trabajamos</h2>
          <div className="steps">
            {p.como.map((c, i) => (
              <div key={c.titulo} className="border-t-2 border-current pt-3.5">
                <span className="block font-serif text-[2.6rem] font-light italic leading-none">{i + 1}</span>
                <h3>{c.titulo}</h3>
                <p>{c.texto}</p>
              </div>
            ))}
          </div>
        </section>

        {primeras.length > 0 && (
          <section className="mt-20">
            <span className="lab">Precio y duración</span>
            <h2 className="mt-2">La primera visita</h2>
            <ul className="tile m-0 mt-6 max-w-[720px] list-none">
              {primeras.map(({ area: a, t }) => (
                <li key={a + t!.servicio} className="flex items-start justify-between gap-4 border-t border-line py-3 first:border-t-0 first:pt-0">
                  <span className="min-w-0">
                    <span className="block leading-snug">{getArea(a)!.nombre} · {t!.servicio}</span>
                    <span className="block text-[.82rem] text-soft">{t!.detalle}</span>
                  </span>
                  <span className="shrink-0 font-serif text-[1.4rem] leading-none">{t!.precio}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[.9rem] text-soft">
              Después, las sesiones siguen el <Link to={`/tarifas#${p.area}`} className="underline">tarifario de {area.nombre.toLowerCase()}</Link>. No trabajamos con mutuas.
            </p>
          </section>
        )}

        <FaqList items={p.faq} titulo={`Preguntas frecuentes sobre ${p.nombre}`} className="mt-20" />

        <section className={`${area.soft} mt-20 rounded-[28px] p-8 text-center`}>
          <p className="mx-auto mb-3 max-w-[34ch] font-serif text-3xl font-light italic">¿Tienes dudas sobre tu caso?</p>
          <p className="mx-auto mb-5 max-w-[52ch] text-soft">Cuéntanos qué te pasa y te orientamos sin compromiso.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href={wa} target="_blank" rel="noreferrer" className="btn">Escribir por WhatsApp</a>
            <a href={tel} className="btn btn-alt">Llamar al {CONTACTO.telefono}</a>
          </div>
        </section>

        <section className="mt-14">
          <span className="lab">Más información</span>
          <ul className="m-0 mt-3 flex list-none flex-wrap gap-x-6 gap-y-2 p-0">
            {areas.map((a) => <li key={a.slug}><Link to={`/${a.slug}`} className="underline">{a.nombre}</Link></li>)}
            {relacionados.map((x) => <li key={x.slug}><Link to={`/${x.slug}`} className="underline">{x.titulo}</Link></li>)}
          </ul>
        </section>
      </div>
    </div>
  )
}
