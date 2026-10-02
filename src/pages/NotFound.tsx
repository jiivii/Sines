import { Link } from 'react-router-dom'
import { useTitle } from '../hooks/useTitle'

export default function NotFound() {
  useTitle('Página no encontrada')
  return (
    <div className="wrap py-24 text-center">
      <h1>Esta página no existe</h1>
      <p className="mx-auto mt-4">Quizá el enlace ha cambiado. Puedes volver al inicio o reservar tu cita.</p>
      <Link to="/" className="btn">Volver al inicio</Link>
    </div>
  )
}
