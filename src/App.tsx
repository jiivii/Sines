import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Servicio from './pages/Servicio'
import Reservar from './pages/Reservar'
import NotFound from './pages/NotFound'
import QuienesSomos from './pages/QuienesSomos'
import AtencionTemprana from './pages/AtencionTemprana'
import Online from './pages/Online'
import Programas from './pages/Programas'

const Panel = lazy(() => import('./pages/admin/Panel'))

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="reservar" element={<Reservar />} />
        <Route path="admin" element={<Suspense fallback={null}><Panel /></Suspense>} />
        <Route path="quienes-somos" element={<QuienesSomos />} />
        <Route path="atencion-temprana" element={<AtencionTemprana />} />
        <Route path="online" element={<Online />} />
        <Route path="programas" element={<Programas />} />
        <Route path=":slug" element={<Servicio />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
