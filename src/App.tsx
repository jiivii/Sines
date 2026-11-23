import { Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Servicio from './pages/Servicio'
import Reservar from './pages/Reservar'
import NotFound from './pages/NotFound'
import QuienesSomos from './pages/QuienesSomos'
import Online from './pages/Online'
import Programas from './pages/Programas'
import Tarifas from './pages/Tarifas'
import { AvisoLegal, Cookies, Privacidad } from './pages/Legal'
import { ArticuloPage, BlogIndex } from './pages/Blog'
import ProblemaPage from './pages/Problema'
import { PROBLEMAS } from './content/problemas'

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="reservar" element={<Reservar />} />
        <Route path="quienes-somos" element={<QuienesSomos />} />
        <Route path="online" element={<Online />} />
        <Route path="programas" element={<Programas />} />
        <Route path="tarifas" element={<Tarifas />} />
        <Route path="aviso-legal" element={<AvisoLegal />} />
        <Route path="privacidad" element={<Privacidad />} />
        <Route path="cookies" element={<Cookies />} />
        <Route path="blog" element={<BlogIndex />} />
        <Route path="blog/:slug" element={<ArticuloPage />} />
        {PROBLEMAS.map((p) => <Route key={p.slug} path={p.slug} element={<ProblemaPage />} />)}
        <Route path=":slug" element={<Servicio />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
