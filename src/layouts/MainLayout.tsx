import { useEffect } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import Logo from '../components/Logo'
import { AREAS, CONTACTO } from '../services/areas'

const dot: Record<string, string> = { psicologia: 'bg-amarillo', logopedia: 'bg-azul', fisioterapia: 'bg-verde', nutricion: 'bg-naranja' }

export default function MainLayout() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return (
    <>
      <header className="sticky top-0 z-10 border-b border-line bg-bg">
        <div className="wrap flex flex-wrap items-center justify-between gap-4 py-2.5">
          <Link to="/" className="w-[150px] rounded-[22px] bg-lino px-3 py-1.5" aria-label="Sinestesya, inicio"><Logo /></Link>
          <nav aria-label="Principal" className="flex max-w-full items-center gap-1.5 overflow-x-auto">
            {AREAS.map((a) => (
              <NavLink key={a.slug} to={`/${a.slug}`}
                className={({ isActive }) => `flex items-center gap-2 whitespace-nowrap rounded-full px-3.5 py-2 text-[.92rem] font-normal no-underline hover:bg-panel ${isActive ? 'bg-panel' : ''}`}>
                <i className={`h-2.5 w-2.5 rounded-full ${dot[a.slug]}`} />{a.nombre}
              </NavLink>
            ))}
            <NavLink to="/quienes-somos" className="flex items-center gap-2 whitespace-nowrap rounded-full px-3.5 py-2 text-[.92rem] font-normal no-underline hover:bg-panel">
              <i className="h-2.5 w-2.5 rounded-full bg-bosque text-ink" />Quiénes somos
            </NavLink>
            <Link to="/reservar" className="btn !px-5 !py-2">Reservar</Link>
          </nav>
        </div>
      </header>
      <main><Outlet /></main>
      <footer className="relative mt-24 bg-bosque pb-8 pt-12 text-[#D3D9CF]">
        <div className="absolute inset-x-0 top-0 flex h-2.5"><span className="flex-1 bg-amarillo" /><span className="flex-1 bg-azul" /><span className="flex-1 bg-verde" /><span className="flex-1 bg-naranja" /></div>
        <div className="wrap grid gap-7 text-[.92rem] md:grid-cols-[1.2fr_1fr_1fr]">
          <div><p className="lab text-lino">Centro de bienestar</p><p className="font-serif text-2xl italic text-lino">Cuidado integral, en cada etapa de la vida.</p></div>
          <div><p className="lab mb-1 text-lino">Contacto</p><p className="mb-1">{CONTACTO.telefono}</p><p className="mb-1">{CONTACTO.email}</p><p className="mb-1">{CONTACTO.direccion}</p><p className="mb-1">{CONTACTO.web}</p></div>
          <div><p className="lab mb-1 text-lino">Horario</p><p className="mb-1">{CONTACTO.horario}</p></div>
        </div>
      </footer>
    </>
  )
}
