import type { ComponentType } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ARTICULOS, fmtFechaArticulo, getArticulo } from '../content/articulos'
import CuandoLlevarAlLogopeda from '../content/CuandoLlevarAlLogopeda'
import FaqList from '../components/Faq'
import { getArea } from '../services/areas'
import { SITE, whatsappLink } from '../config'
import { CONTACTO } from '../services/areas'
import NotFound from './NotFound'

/** Texto de cada artículo, por slug. */
const CUERPOS: Record<string, ComponentType> = {
  'cuando-llevar-a-mi-hijo-al-logopeda': CuandoLlevarAlLogopeda,
}

export function BlogIndex() {
  return (
    <div className="wrap mt-14">
      <span className="lab">Blog</span>
      <h1 className="mb-2 mt-2 text-[clamp(2.2rem,5vw,3.4rem)]">Guías para cuidar tu salud y la de tu familia</h1>
      <p className="text-soft">Artículos del equipo de Sinestesya sobre psicología, logopedia, fisioterapia y nutrición.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {ARTICULOS.map((a) => {
          const area = getArea(a.area)
          return (
            <Link key={a.slug} to={`/blog/${a.slug}`} className={`${area?.soft ?? 'bg-panel'} flex flex-col rounded-[28px] p-7 no-underline transition-transform hover:-translate-y-1`}>
              <span className="lab text-[.7rem]">{area?.nombre} · {fmtFechaArticulo(a.fecha)}</span>
              <h2 className="mt-3 text-[clamp(1.6rem,3vw,2rem)]">{a.titulo}</h2>
              <p className="mb-0 text-soft">{a.descripcion}</p>
              <span className="mt-4 text-[.92rem] font-medium">Leer artículo →</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export function ArticuloPage() {
  const a = getArticulo(useParams().slug)
  const Cuerpo = a && CUERPOS[a.slug]
  if (!a || !Cuerpo) return <NotFound />
  const area = getArea(a.area)
  const wa = whatsappLink(`Hola, he leído vuestro artículo «${a.titulo}» y quería información sobre ${area?.nombre.toLowerCase() ?? 'Sinestesya'}.`)
  return (
    <div className="wrap mt-10">
      <nav aria-label="Ruta" className="text-[.85rem] text-soft">
        <Link to="/blog" className="text-soft">Blog</Link> <span aria-hidden="true">›</span>{' '}
        {area && <Link to={`/${area.slug}`} className="text-soft">{area.nombre}</Link>}
      </nav>
      <article className="mx-auto mt-6 max-w-[760px]">
        <span className="lab">{area?.nombre}</span>
        <h1 className="mb-3 mt-2 text-[clamp(2.2rem,5.5vw,3.6rem)]">{a.titulo}</h1>
        <p className="text-[.9rem] text-soft">
          Equipo de {area?.nombre.toLowerCase()} de Sinestesya · <time dateTime={a.fecha}>{fmtFechaArticulo(a.fecha)}</time>
        </p>
        <Cuerpo />
        <FaqList items={a.faq} className="mt-14" />
        <section className={`${area?.soft ?? 'bg-panel'} mt-14 rounded-[28px] p-8 text-center`}>
          <p className="mx-auto mb-3 max-w-[30ch] font-serif text-[clamp(1.5rem,3vw,2rem)] font-light italic">¿Tienes dudas sobre tu caso?</p>
          <p className="mx-auto mb-5 text-soft">Cuéntanos qué te preocupa y te orientamos sin compromiso.</p>
          <div className="flex flex-wrap justify-center gap-3">
            {SITE.reservasAbiertas && <Link to={`/reservar?area=${a.area}`} className="btn">Reservar cita</Link>}
            <a href={wa} target="_blank" rel="noreferrer" className={SITE.reservasAbiertas ? 'btn btn-alt' : 'btn'}>Escribir por WhatsApp</a>
            <a href={`tel:+34${CONTACTO.telefono.replace(/\s/g, '')}`} className="btn btn-alt">Llamar al {CONTACTO.telefono}</a>
          </div>
        </section>
      </article>
    </div>
  )
}
