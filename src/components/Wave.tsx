export default function Wave({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 600 120" aria-hidden="true">
      <defs><linearGradient id="wv">
        <stop offset="0" stopColor="#9CAE9F" /><stop offset=".24" stopColor="#9CAE9F" />
        <stop offset=".34" stopColor="#E3A995" /><stop offset=".5" stopColor="#E3A995" />
        <stop offset=".6" stopColor="#9EAEB5" /><stop offset=".76" stopColor="#9EAEB5" />
        <stop offset=".86" stopColor="#DCC088" /><stop offset="1" stopColor="#DCC088" />
      </linearGradient></defs>
      <path d="M10 70C80 10 140 10 200 60S320 110 390 60S510 10 590 52" fill="none" stroke="url(#wv)" strokeWidth="9" strokeLinecap="round" />
    </svg>
  )
}
