# Plan de mejoras · Sinestesya

Leyenda: ⬜ pendiente · 🟨 en curso · ✅ hecho · ⏸ bloqueado (falta un dato)
Prioridad: A = imprescindible · B = importante · C = si hay tiempo

## Datos confirmados
- Razón social: **Sinestesya Villarroya S.L.**
- Domicilio social, CIF y nº de autorización sanitaria: pendientes de confirmar.
- Precios: de momento **70 €** en todas las especialidades (como psicología).
- Horario: se mantiene «de 9 h a 21 h».
- Reservas online: cerradas. Botón de cabecera «Pedir cita» → WhatsApp.
- Hosting en producción: **Vercel**.
- Mutuas / aseguradoras: **no**.
- `/admin`: se elimina; la gestión se hace desde Órbita. `/api/disponibilidad` se mantiene.
- Equipo: datos del personal más adelante.

## Fase 1 · Quitar riesgos
| # | Prio | Tarea | Estado |
|---|---|---|---|
| 1.1 | A | Registro del plan (`docs/PLAN.md`) | ✅ |
| 1.2 | A | Pie: razón social corregida y enlaces legales ✅ · domicilio social y CIF (se completan en `EMPRESA`, `src/config.ts`) | ⏸ domicilio y CIF |
| 1.3 | A | Páginas Privacidad, Aviso legal y Cookies (borrador para la asesoría) y enlace en el formulario | ✅ pendiente revisión asesoría |
| 1.4 | A | Quiénes somos: variables de color inexistentes sustituidas por colores de marca | ✅ |
| 1.5 | A | Contraste en modo oscuro: aviso «Web en construcción» (texto y teléfono ilegibles), botones de selección y color de barra del navegador | ✅ |
| 1.6 | A | Quitar `/admin` (ruta, panel, login y cliente Supabase en el navegador) | ✅ |
| 1.7 | B | Cambiar «el mismo día laborable» por «48 horas laborables» | ✅ |

## Fase 2 · Contacto (portada, móvil, WhatsApp)
| # | Prio | Tarea | Estado |
|---|---|---|---|
| 2.1 | A | Botón «Pedir cita» siempre visible en la cabecera (móvil incluido) | ⬜ |
| 2.2 | A | Barra fija Llamar / WhatsApp en móvil | ⬜ |
| 2.3 | A | WhatsApp con mensaje predefinido por especialidad | ⬜ |
| 2.4 | A | Nuevo bloque principal de portada | ⬜ |
| 2.5 | A | Bloque «¿Por dónde empiezo?» | ⬜ |

## Fase 3 · SEO técnico
| # | Prio | Tarea | Estado |
|---|---|---|---|
| 3.1 | A | Título y descripción propios por página (servicio + La Puebla de Alfindén) | ⬜ |
| 3.2 | A | Prerenderizado de cada ruta | ⬜ |
| 3.3 | A | 404 real en Vercel (sin devolver la portada con 200) | ⬜ |
| 3.4 | A | Sitemap completo, canonical y og:image | ⬜ |
| 3.5 | B | Datos estructurados `MedicalClinic` | ⬜ |
| 3.6 | B | Encabezados descriptivos y refuerzo «Sinestesya + La Puebla» | ⬜ |
| 3.7 | — | Search Console y ficha de Google Business (fuera del código) | ⬜ |

## Fase 4 · Contenido de servicios
| # | Prio | Tarea | Estado |
|---|---|---|---|
| 4.1 | B | Servicios con «Es para ti si…» y «La primera sesión» | ⬜ |
| 4.2 | B | Precio y duración en cada servicio (70 €) y unificar `/tarifas` | ⬜ |
| 4.3 | B | Formulario «Avísame cuando abráis» con consentimiento separado | ⬜ |

## Fase 5 · Confianza y contenido
| # | Prio | Tarea | Estado |
|---|---|---|---|
| 5.1 | A | Página Equipo | ⏸ datos del personal |
| 5.2 | B | Preguntas frecuentes en inicio y servicios | ⬜ |
| 5.3 | B | Artículo «¿Cuándo llevar a mi hijo al logopeda?» | ⬜ |

## Historial
- **Paso 1** — 1.1, 1.4 y 1.5 hechos.
- **Paso 2** — 1.3, 1.6 y 1.7 hechos; 1.2 a falta de domicilio social y CIF.

## Para la asesoría
- Revisar `/privacidad`, `/aviso-legal` y `/cookies` (textos en `src/pages/Legal.tsx`).
- Confirmar proveedores encargados del tratamiento (Vercel, Supabase, Resend, Órbita) y sus contratos.
- Al validarlos, poner `legalRevisado: true` en `src/config.ts`.
