create type estado_reserva as enum ('pendiente', 'confirmada', 'cancelada');

create table public.reservas (
  id uuid primary key default gen_random_uuid(),
  area text not null check (area in ('psicologia','logopedia','fisioterapia','nutricion')),
  paciente text not null check (paciente in ('adulto','nino')),
  edad int check (edad between 0 and 17),
  fecha date not null,
  hora text not null,
  nombre text not null,
  telefono text not null,
  email text not null,
  notas text,
  estado estado_reserva not null default 'pendiente',
  created_at timestamptz not null default now()
);

-- Un hueco por área, fecha y hora (las canceladas lo liberan)
create unique index reservas_hueco_unico on public.reservas (area, fecha, hora) where estado <> 'cancelada';

-- Sin acceso anónimo: las altas pasan por /api/reservar (service role).
alter table public.reservas enable row level security;
create policy "personal lee" on public.reservas for select to authenticated using (true);
create policy "personal actualiza" on public.reservas for update to authenticated using (true) with check (true);
