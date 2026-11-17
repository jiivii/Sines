# Sinestesya · Salud integral

Web de Sinestesya (psicología, logopedia, fisioterapia y nutrición; adultos y niños) con reserva online. Las reservas se gestionan desde Órbita (Web1).
Stack: Vite + React + TypeScript + Tailwind · Supabase (base de datos) · Vercel (hosting y funciones `api/`).

## Estructura
- `src/pages` · `Home`, `Servicio` (una página por especialidad, con su color), `Reservar`, `Legal` (aviso legal, privacidad y cookies)
- `src/services` · datos de las áreas y llamadas a la API
- `src/config.ts` · ajustes del sitio y datos legales de la empresa (`EMPRESA`: CIF, domicilio social…)
- `api/` · funciones de Vercel: `reservar` (valida y llama a Web1) y `disponibilidad` (horas ocupadas)
- `src/seo.ts` · título, descripción y dominio de cada página (también genera el sitemap)
- `scripts/prerender.mjs` · al compilar crea un HTML por página (`dist/logopedia.html`…), `404.html` y `sitemap.xml`
- `public/` · `og.png` (imagen para redes), `robots.txt` e iconos: `favicon.ico` (16/32/48), `favicon-32.png`, `apple-touch-icon.png` (180), `icon-192/512.png` y `site.webmanifest`. Son la S del logo sobre verde bosque (#3E4A41), recortada de `src/assets/logo-sinestesya.png`; si llega el logo en vectorial, conviene regenerarlos desde él.
- `vercel.json` · URLs limpias, cabeceras de seguridad (incluida la Content-Security-Policy) y caché
- `supabase/migrations` · tabla `reservas` con RLS

## Desarrollo
```bash
npm install
cp .env.example .env             # variables del servidor (no hacen falta para npm run dev)
npm run dev                      # web en http://localhost:5173 (sin API)
npm run build && npm run preview # web compilada (páginas generadas) sin API
```
`npm run build` comprueba tipos, compila y genera en `dist/` una página HTML por ruta, la 404 y el sitemap.
Para añadir una página: crea la ruta en `src/App.tsx` y su título y descripción en `src/seo.ts`.
Para añadir un artículo: sus datos en `src/content/articulos.ts`, el texto en un componente de `src/content/` y su entrada en `CUERPOS` (`src/pages/Blog.tsx`). Con `revisado: false` se publica sin indexar.

## Puesta en producción
1. **Supabase**: crea un proyecto y ejecuta `supabase/migrations/001_reservas.sql` en el SQL Editor.
   En *Authentication > Providers > Email* desactiva *Allow new users to sign up*: la web no tiene usuarios (las reservas se gestionan en Órbita).
2. **Vercel** (producción actual): importa el repositorio con build command `npm run build` y output `dist`. Añade estas variables en *Settings > Environment Variables* (Production):
   `SUPABASE_URL`, `SUPABASE_SECRET_KEY` (o `SUPABASE_SERVICE_ROLE_KEY`), `WEB1_API_URL`, `WEB1_API_SECRET`.
   - `WEB1_API_URL` debe ser **HTTPS** y la **URL base** de Klinika, por ejemplo `https://gestkli.vercel.app` (sin `/api` ni `/api/public-reservation`; también se aceptan y se normalizan).
   - `WEB1_API_SECRET` debe coincidir exactamente con `WEB2_API_SECRET` en Klinika.
3. **Dominio**: cámbialo en `src/seo.ts` (`SITE_URL`) y en `public/robots.txt` (ahora `https://sinestesya.es`).

## Seguridad
- Las variables de entorno de Vercel solo deben contener las de `.env.example`. Revisa que no aparezcan otras (p. ej. `NODE_OPTIONS`): podrían volcar los secretos en los logs.
- Los visitantes nunca escriben en la base de datos: reservan por `/api/reservar`, que valida los datos, evita dobles reservas (índice único) y usa la service role, que solo existe en el servidor.
- RLS activada: el navegador no tiene acceso a la base de datos. Nunca pongas la service role con prefijo `VITE_`.
- Formulario con campo trampa anti-bots. Para más protección, añade un captcha (p. ej. Turnstile) o límites de tasa.

## Antes de abrir al público
- Sustituir teléfono, dirección y horario (`src/services/areas.ts`, `CONTACTO`; horario en `MainLayout.tsx` y `src/utils/dates.ts`).
- Completar `EMPRESA` en `src/config.ts` (CIF, domicilio social, registro y autorización sanitaria) y, tras la revisión de la asesoría, poner `legalRevisado: true`.
- Revisar con el equipo sanitario los textos de cada especialidad.
