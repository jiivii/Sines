import { Link } from 'react-router-dom'
import { AREAS, CONTACTO } from '../services/areas'
import { SITE } from '../config'
import { useWhatsApp } from '../hooks/useWhatsApp'
import { BLOQUES, TARIFARIO_VIGENCIA } from '../services/tarifas'


export default function Tarifas() {
  const wa = useWhatsApp()

  return (
    <div className="wrap">
      <section className="mt-10 rounded-[40px] bg-ocre/30 p-[clamp(28px,6vw,64px)]">
        <span className="lab">Tarifario</span>
        <h1 className="mb-3 mt-3">Tarifas claras, sin sorpresas.</h1>
        <p className="max-w-[62ch] text-[1.15rem]">
          Consulta aquí los precios de las sesiones y bonos de psicología, fisioterapia, logopedia y nutrición.
          Si no sabes qué servicio necesitas, escríbenos y te orientamos sin compromiso.
        </p>
        <div className="mt-3 flex flex-wrap gap-3">
          {SITE.reservasAbiertas ? (
            <Link to="/reservar" className="btn">Reservar cita</Link>
          ) : (
            <a href={wa} target="_blank" rel="noreferrer" className="btn">Hablar con el equipo</a>
          )}
          <a href={`tel:+34${CONTACTO.telefono.replace(/\s/g, '')}`} className="btn btn-alt">
            Llamar al {CONTACTO.telefono}
          </a>
        </div>
        <p className="mb-0 mt-4 text-[.85rem] text-soft">Precios vigentes en {TARIFARIO_VIGENCIA}.</p>
      </section>

      <div className="mt-14 grid gap-5 md:grid-cols-2">
        {BLOQUES.map((b) => (
          <section key={b.slug} id={b.slug} className={`${b.soft} scroll-mt-48 rounded-[28px] p-6 md:p-8`}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="lab">{b.dimension}</span>
                <h2 className="mt-1 text-3xl">{b.nombre}</h2>
              </div>
              <span className={`mt-2 h-3 w-3 shrink-0 rounded-full ${b.dot}`} aria-hidden="true" />
            </div>
            <p className="mt-2 text-[.92rem] text-soft">{b.intro}</p>

            <ul className="m-0 mt-4 list-none p-0">
              {b.tarifas.map((t) => (
                <li key={t.servicio} className="flex items-start justify-between gap-4 border-t border-line py-3">
                  <span className="min-w-0">
                    <span className="block text-[.98rem] leading-snug">{t.servicio}</span>
                    <span className="block text-[.8rem] text-soft">{t.detalle}</span>
                  </span>
                  <span className="shrink-0 font-serif text-[1.35rem] leading-none">{t.precio}</span>
                </li>
              ))}
            </ul>

            {b.bonos.length > 0 && (
              <div className="mt-4 rounded-[18px] bg-panel p-4">
                <span className="lab text-[.68rem]">Bonos</span>
                <ul className="m-0 mt-2 list-none space-y-2 p-0">
                  {b.bonos.map((t) => (
                    <li key={t.servicio} className="flex items-start justify-between gap-3">
                      <span className="min-w-0">
                        <span className="block text-[.9rem] leading-snug">{t.servicio}</span>
                        <span className="block text-[.78rem] text-soft">{t.detalle}</span>
                      </span>
                      <span className="shrink-0 font-serif text-[1.2rem] leading-none">{t.precio}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {b.nota && <p className="mb-0 mt-3 text-[.8rem] text-soft">{b.nota}</p>}
          </section>
        ))}
      </div>

      <section className="mt-16 rounded-[32px] bg-bosque p-[clamp(28px,5vw,56px)] text-[#F3EEE5]">
        <div className="grid gap-8 md:grid-cols-[1.3fr_1fr] md:items-center">
          <div>
            <span className="lab text-ocre">¿Hablamos?</span>
            <h2 className="mt-2 text-lino">Te ayudamos a elegir el servicio que necesitas.</h2>
            <p className="text-[#D3D9CF]">
              Si tienes dudas sobre qué profesional o qué modalidad encaja mejor contigo, llámanos o escríbenos
              y te orientamos.
            </p>
          </div>
          <div className="flex flex-col items-start gap-3 md:items-end">
            <a href={`tel:+34${CONTACTO.telefono.replace(/\s/g, '')}`} className="font-serif text-3xl text-lino no-underline">
              {CONTACTO.telefono}
            </a>
            <a href={wa} target="_blank" rel="noreferrer" className="btn !bg-lino !text-bosque">
              Escríbenos por WhatsApp
            </a>
            <span className="text-[.9rem] text-[#AEB9B0]">{CONTACTO.web}</span>
          </div>
        </div>
      </section>

      <nav aria-label="Más páginas" className="mt-10 flex flex-wrap justify-center gap-x-5 gap-y-2 text-[.9rem]">
        {AREAS.map((a) => (
          <Link key={a.slug} to={`/${a.slug}`} className="text-soft underline hover:text-ink">
            {a.nombre}
          </Link>
        ))}
        <Link to="/quienes-somos" className="text-soft underline hover:text-ink">Quiénes somos</Link>
      </nav>

      <p className="lab mb-0 mt-8 text-center text-[.68rem] text-soft">
        Sinestesya.es · La Puebla de Alfindén · Zaragoza
      </p>
    </div>
  )
}
