import logo from '../assets/logo-sinestesya.webp'

/** Logotipo de Sinestesya (WebP 256 px, fondo transparente). El original en PNG está en src/assets. */
export default function Logo({ className = '' }: { className?: string }) {
  return (
    <img src={logo} alt="Sinestesya" width={256} height={237} decoding="async" className={`block h-auto w-full object-contain ${className}`} />
  )
}
