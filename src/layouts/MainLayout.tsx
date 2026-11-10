import { useEffect } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import Logo from '../components/Logo'
import { AREAS, CONTACTO } from '../services/areas'
import { EMPRESA, SITE } from '../config'
import { useWhatsApp } from '../hooks/useWhatsApp'
import { aplicarSeo } from '../seo'

const dot: Record<string, string> = { psicologia: 'bg-amarillo', logopedia: 'bg-azul', fisioterapia: 'bg-verde', nutricion: 'bg-naranja' }

const EXTRAS = [
  { to: '/atencion-temprana', label: 'Atención temprana' },
  { to: '/online', label: 'Atención online' },
  { to: '/programas', label: 'Colegios y empresas' },
  { to: '/tarifas', label: 'Tarifas' },
]

export default function MainLayout() {
  const wa = useWhatsApp()
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0); aplicarSeo(pathname) }, [pathname])
  return (
    <>
      <header className="z-20 border-b border-line bg-bg md:sticky md:top-0">
        <div className="wrap flex flex-wrap items-center gap-x-4 gap-y-1 py-2.5">
          <Link to="/" className="order-1 flex items-center gap-3" aria-label="Sinestesya, inicio">
            <span className="w-[92px] rounded-[16px] bg-lino px-2 py-1 sm:w-[128px] sm:rounded-[18px]"><Logo /></span>
            <span className="hidden flex-col border-l border-line pl-3 leading-tight sm:flex">
              <span className="font-serif text-lg text-ink">Salud integral</span>
              <span className="lab mt-1 text-[.58rem] text-soft">Centro multidisciplinar</span>
            </span>
          </Link>
          {SITE.reservasAbiertas ? (
            <Link to="/reservar" className="btn order-2 ml-auto !px-5 !py-2 xl:order-3 xl:ml-0">Reservar</Link>
          ) : (
            <a href={wa} target="_blank" rel="noreferrer" className="btn order-2 ml-auto !px-5 !py-2 xl:order-3 xl:ml-0">Pedir cita</a>
          )}
          <nav aria-label="Principal" className="order-3 -mx-5 flex w-[calc(100%+2.5rem)] items-center gap-1.5 overflow-x-auto px-5 xl:order-2 xl:mx-0 xl:ml-auto xl:w-auto xl:px-0">
            {AREAS.map((a) => (
              <NavLink key={a.slug} to={`/${a.slug}`}
                className={({ isActive }) => `flex items-center gap-2 whitespace-nowrap rounded-full px-3.5 py-2 text-[.92rem] font-normal no-underline hover:bg-panel ${isActive ? 'bg-panel' : ''}`}>
                <i className={`h-2.5 w-2.5 rounded-full ${dot[a.slug]}`} />{a.nombre}
              </NavLink>
            ))}
            <NavLink to="/quienes-somos"
              className={({ isActive }) => `flex items-center gap-2 whitespace-nowrap rounded-full px-3.5 py-2 text-[.92rem] font-normal no-underline hover:bg-panel ${isActive ? 'bg-panel' : ''}`}>
              <i className="h-2.5 w-2.5 rounded-full bg-soft" />Quiénes somos
            </NavLink>
          </nav>
        </div>
        <div className="border-t border-line/70">
          <div className="wrap flex items-center gap-x-4 gap-y-1 overflow-x-auto py-1.5 text-[.82rem] text-soft">
            {EXTRAS.map((e) => (
              <NavLink key={e.to} to={e.to}
                className={({ isActive }) => `whitespace-nowrap no-underline hover:text-ink ${isActive ? 'font-medium text-ink' : ''}`}>
                {e.label}
              </NavLink>
            ))}
            <span className="ml-auto hidden whitespace-nowrap sm:inline">
              Tel. y WhatsApp <a href={`tel:+34${CONTACTO.telefono.replace(/\s/g, '')}`} className="text-ink no-underline">{CONTACTO.telefono}</a>
            </span>
          </div>
        </div>
      </header>

      {!SITE.reservasAbiertas && (
        <div role="status" className="bg-ocre text-tinta">
          <p className="wrap mb-0 py-2 text-center text-[.82rem] leading-snug text-tinta">
            <strong className="font-medium">Web en construcción.</strong> Estamos actualizando el sitio y, de momento, no recogemos citas online. Para cualquier consulta, llámanos o escríbenos al{' '}
            <a href={`tel:+34${CONTACTO.telefono.replace(/\s/g, '')}`} className="whitespace-nowrap font-medium text-tinta underline">{CONTACTO.telefono}</a>.
          </p>
        </div>
      )}

      <main><Outlet /></main>

      <footer className="relative mt-24 bg-bosque pb-24 pt-12 text-[#D3D9CF] md:pb-8">
        <div className="absolute inset-x-0 top-0 flex h-2.5"><span className="flex-1 bg-amarillo" /><span className="flex-1 bg-azul" /><span className="flex-1 bg-verde" /><span className="flex-1 bg-naranja" /></div>
        <div className="wrap grid gap-8 text-[.92rem] md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="lab text-lino">Sinestesya · Salud integral</p>
            <p className="mt-2 font-serif text-2xl italic text-lino">Cuidado integral, en cada etapa de la vida.</p>
            <a href={wa} target="_blank" rel="noreferrer" className="mt-3 inline-block text-[#D3D9CF] underline">Escríbenos por WhatsApp</a>
          </div>
          <div>
            <p className="lab mb-2 text-lino">Disciplinas</p>
            <ul className="m-0 list-none space-y-1 p-0">
              {AREAS.map((a) => (
                <li key={a.slug}><Link to={`/${a.slug}`} className="no-underline hover:text-lino">{a.nombre}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="lab mb-2 text-lino">El centro</p>
            <ul className="m-0 list-none space-y-1 p-0">
              <li><Link to="/quienes-somos" className="no-underline hover:text-lino">Quiénes somos</Link></li>
              {EXTRAS.map((e) => (
                <li key={e.to}><Link to={e.to} className="no-underline hover:text-lino">{e.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="lab mb-2 text-lino">Contacto</p>
            <p className="mb-1"><a href={`tel:+34${CONTACTO.telefono.replace(/\s/g, '')}`} className="no-underline hover:text-lino">{CONTACTO.telefono}</a></p>
            <p className="mb-1"><a href={`mailto:${CONTACTO.email}`} className="no-underline hover:text-lino">{CONTACTO.email}</a></p>
            <p className="mb-1 whitespace-pre-line">{CONTACTO.direccion}</p>
            <p className="mb-1 first-letter:uppercase">{CONTACTO.horario}</p>
            <p className="mb-0">{CONTACTO.web}</p>
          </div>
        </div>
        <div className="wrap mt-8 flex flex-col gap-3 border-t border-white/10 pt-4 text-[.78rem] text-[#AEB9B0] md:flex-row md:items-start md:justify-between">
          <p className="mb-0">
            {[EMPRESA.razonSocial, EMPRESA.cif && `CIF ${EMPRESA.cif}`, EMPRESA.domicilioSocial, 'Centro multidisciplinar sanitario'].filter(Boolean).join(' · ')}
          </p>
          <nav aria-label="Información legal" className="flex flex-wrap gap-x-4 gap-y-1">
            <Link to="/aviso-legal" className="text-[#D3D9CF] hover:text-lino">Aviso legal</Link>
            <Link to="/privacidad" className="text-[#D3D9CF] hover:text-lino">Privacidad</Link>
            <Link to="/cookies" className="text-[#D3D9CF] hover:text-lino">Cookies</Link>
          </nav>
        </div>
      </footer>

      {/* Barra fija de contacto en móvil */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-bg px-3 pt-2 md:hidden" style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + .5rem)' }}>
        <div className="mx-auto grid max-w-[480px] grid-cols-2 gap-2">
          <a href={`tel:+34${CONTACTO.telefono.replace(/\s/g, '')}`} className="btn btn-alt !px-3 !py-2.5 text-center">Llamar</a>
          <a href={wa} target="_blank" rel="noreferrer" className="btn !px-3 !py-2.5 text-center">WhatsApp</a>
        </div>
      </div>
    </>
  )
}
