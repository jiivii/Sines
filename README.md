# Sinestesya · Salud integral

Web de Sinestesya (psicología, logopedia, fisioterapia y nutrición; adultos y niños) con reserva online. Las reservas se gestionan desde Órbita (Web1).
Stack: Vite + React + TypeScript + Tailwind · Supabase (BD y acceso) · Cloudflare Pages (hosting y funciones `functions/`).

## Estructura
- `src/pages` · `Home`, `Servicio` (una página por especialidad, con su color), `Reservar`, `Legal` (aviso legal, privacidad y cookies)
- `src/services` · datos de las áreas y llamadas a la API
- `src/config.ts` · ajustes del sitio y datos legales de la empresa (`EMPRESA`: CIF, domicilio social…)
- `functions/` · Pages Functions: `api/reservar` (valida y llama a Web1) y `api/disponibilidad` (horas ocupadas)
- `public/` · `_redirects` (SPA), `_headers` (cabeceras de seguridad) y `_routes.json` (solo `/api/*` invoca functions)
- `supabase/migrations` · tabla `reservas` con RLS
- `api/` + `vercel.json` · compatibilidad con Vercel, **temporal** como red de seguridad; se eliminará tras verificar el despliegue en Cloudflare

## Desarrollo
```bash
npm install
cp .env.example .env             # variables del servidor (no hacen falta para npm run dev)
cp .dev.vars.example .dev.vars   # secretos del servidor para preview con functions
npm run dev                      # web en http://localhost:5173 (sin API)
npm run preview:cf               # build + wrangler pages dev: web y functions en local
```
`npm run build` comprueba tipos y genera `dist/`.

## Puesta en producción
1. **Supabase**: crea un proyecto y ejecuta `supabase/migrations/001_reservas.sql` en el SQL Editor.
   En *Authentication > Providers > Email* desactiva *Allow new users to sign up*, y crea a mano los usuarios del equipo (*Authentication > Users*).
2. **Vercel** (producción actual): importa el repositorio con build command `npm run build` y output `dist`. Añade estas variables en *Settings > Environment Variables* (Production):
   `SUPABASE_URL`, `SUPABASE_SECRET_KEY` (o `SUPABASE_SERVICE_ROLE_KEY`), `WEB1_API_URL`, `WEB1_API_SECRET`.
   - `WEB1_API_URL` debe ser **HTTPS** y la **URL base** de Klinika, por ejemplo `https://gestkli.vercel.app` (sin `/api` ni `/api/public-reservation`; también se aceptan y se normalizan).
   - `WEB1_API_SECRET` debe coincidir exactamente con `WEB2_API_SECRET` en Klinika.
   - Las `functions/` de Cloudflare se mantienen como alternativa; si se usa Cloudflare Pages, los mismos nombres van en *Settings > Environment variables*.
3. **Dominio**: cámbialo en `public/robots.txt` y `public/sitemap.xml` (ahora `sinestesya.es`).

## Seguridad
- Los visitantes nunca escriben en la base de datos: reservan por `/api/reservar`, que valida los datos, evita dobles reservas (índice único) y usa la service role, que solo existe en el servidor.
- RLS activada: el navegador no tiene acceso a la base de datos. Nunca pongas la service role con prefijo `VITE_`.
- Formulario con campo trampa anti-bots. Para más protección, añade Cloudflare Turnstile o límites de tasa.

## Antes de abrir al público
- Sustituir teléfono, dirección y horario (`src/services/areas.ts`, `CONTACTO`; horario en `MainLayout.tsx` y `src/utils/dates.ts`).
- Completar `EMPRESA` en `src/config.ts` (CIF, domicilio social, registro y autorización sanitaria) y, tras la revisión de la asesoría, poner `legalRevisado: true`.
- Revisar con el equipo sanitario los textos de cada especialidad.
