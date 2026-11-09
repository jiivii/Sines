import logo from '../assets/logo-sinestesya.png'

/** Logotipo de Sinestesya en alta resolución y con fondo transparente. */
export default function Logo({ className = '' }: { className?: string }) {
  return (
    <img src={logo} alt="Sinestesya" className={`block h-auto w-full object-contain ${className}`} />
  )
}
