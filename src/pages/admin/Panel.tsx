import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../hooks/useAuth'
import { useTitle } from '../../hooks/useTitle'
import { cambiarEstado, listarReservas } from '../../services/bookings'
import { getArea } from '../../services/areas'
import { fmtFecha } from '../../utils/dates'
import type { Estado, Reserva } from '../../types'

export default function Panel() {
  useTitle('Panel')
  const { session, loading } = useAuth()
  const [rows, setRows] = useState<Reserva[]>([])
  const [err, setErr] = useState('')
  const [f, setF] = useState({ email: '', password: '' })

  const cargar = () => listarReservas().then(setRows).catch((e: Error) => setErr(e.message))
  useEffect(() => { if (session) void cargar() }, [session])

  if (!supabase) return <div className="wrap py-20"><h1>Panel</h1><p>Configura VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY para activarlo.</p></div>
  if (loading) return null
  if (!session) return (
    <div className="wrap py-20"><form className="tile mx-auto max-w-md" onSubmit={async (e) => {
      e.preventDefault(); setErr('')
      const { error } = await supabase!.auth.signInWithPassword(f)
      if (error) setErr('Email o contraseña incorrectos.')
    }}>
      <h1 className="mb-4 text-4xl">Acceso del equipo</h1>
      <label htmlFor="e" className="block text-[.85rem] font-medium">Email</label><input id="e" type="email" className="field mb-3" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} />
      <label htmlFor="p" className="block text-[.85rem] font-medium">Contraseña</label><input id="p" type="password" className="field" value={f.password} onChange={(e) => setF({ ...f, password: e.target.value })} />
      <p role="alert" className="mt-2 min-h-[1.4em] text-[.88rem] text-[#A5502F]">{err}</p><button className="btn">Entrar</button>
    </form></div>
  )
  return (
    <div className="wrap py-12">
      <div className="flex items-center justify-between"><h1 className="text-4xl">Reservas</h1><button className="btn btn-alt" onClick={() => supabase!.auth.signOut()}>Salir</button></div>
      {err && <p role="alert" className="mt-3 text-[#A5502F]">{err}</p>}
      <div className="mt-6 overflow-x-auto rounded-[28px] bg-panel p-4">
        <table className="w-full min-w-[760px] text-left text-[.92rem]">
          <thead className="lab text-[.7rem] text-soft"><tr>{['Fecha', 'Área', 'Paciente', 'Contacto', 'Estado'].map((h) => <th key={h} className="p-3">{h}</th>)}</tr></thead>
          <tbody>{rows.map((r) => (
            <tr key={r.id} className="border-t border-line align-top">
              <td className="p-3">{fmtFecha(r.fecha)}<br />{r.hora}</td>
              <td className="p-3"><span className={`rounded-full px-3 py-1 text-tinta ${getArea(r.area)?.bg}`}>{getArea(r.area)?.nombre}</span></td>
              <td className="p-3">{r.nombre}<br /><span className="text-soft">{r.paciente === 'nino' ? `Niño/a, ${r.edad} años` : 'Adulto'}</span>{r.notas && <><br /><em className="text-soft">{r.notas}</em></>}</td>
              <td className="p-3"><a href={`tel:${r.telefono}`}>{r.telefono}</a><br /><a href={`mailto:${r.email}`}>{r.email}</a></td>
              <td className="p-3"><select aria-label="Estado" className="field !w-auto !py-2" value={r.estado} onChange={(e) => cambiarEstado(r.id, e.target.value as Estado).then(cargar).catch((x: Error) => setErr(x.message))}>
                <option value="pendiente">Pendiente</option><option value="confirmada">Confirmada</option><option value="cancelada">Cancelada</option></select></td>
            </tr>))}
            {!rows.length && <tr><td colSpan={5} className="p-6 text-soft">Aún no hay reservas.</td></tr>}</tbody>
        </table>
      </div>
    </div>
  )
}
