# AGENTS.md

## Project overview

Portfolio web de **Aroa Carmona** ("Byphnix"), fotógrafa profesional. Next.js 13 (Pages Router) + Tailwind CSS + DaisyUI + Framer Motion + EmailJS + lightbox. Multilenguaje (es/en/fr) vía `next.config.js` i18n routing.

**Datos**: `byphnix.vercel.app` | Autor: Daniel Castro Martin

## Quick start

```
npm install
npm run dev        # http://localhost:3000
npm run build      # producción
npm run start      # servir build
npm run lint       # ESLint (requiere instalar eslint primero)
```

## Estructura

```
proxy.gs              # Google Apps Script: proxy para listar carpetas Drive y servir imágenes (data URLs base64)
pages/                # Next.js Pages Router
  _app.js             # Wrapper global: fuentes, transiciones framer-motion
  _document.js        # Shell HTML (lang hardcodeado "en")
  index.js            # Página raíz → renderiza <Landing/>
  landing/
    Landing.js        # Hero, servicios, galería dinámica Drive, lightbox, banner contacto
    contact.js        # Formulario contacto vía EmailJS (env vars)
components/
  Layout.js           # Shell: Head + Navbar + Footer (tiene código muerto)
  navbar.js           # Nav sticky + hamburger mobile (links: Home, Servicios, Galería→#retratos, Contacto)
  Footer.js           # Footer 3 columnas
  selector.js         # Dropdown idiomas (NUNCA se renderiza, clase rota)
languages/            # Traducciones i18n — SIN USAR (texto hardcodeado en ES)
  en.js, es.js, fr.js
public/assets/        # Imágenes estáticas, logos, hero backgrounds
styles/globals.css    # Tailwind directives, animaciones custom, CSS vars
```

## Stack

| Dependencia                   | Uso                          |
| ----------------------------- | ---------------------------- |
| next 13.3.0                   | Framework (Pages Router)     |
| react 18.2.0                  | UI                           |
| tailwindcss 3.3.1             | Estilos utility-first        |
| daisyui 2.51.5                | Componentes UI (themes)      |
| framer-motion 12.23.25        | Animaciones/transiciones     |
| emailjs/browser 4.4.1         | Formulario de contacto       |
| yet-another-react-lightbox 3.26 | Galería lightbox (named export `{ Lightbox }`) |
| react-icons 4.8.0             | Iconos                       |
| react-i18next + i18next       | **Instalados pero NO usados** |

## Galería dinámica (Google Drive)

La galería carga imágenes y videos desde 5 carpetas de Google Drive vía un proxy Google Apps Script.

### Categorías (en orden)

| Categoría               | Folder ID                             |
| ----------------------- | ------------------------------------- |
| Retratos                | `1QB1mxWCAh3oieFacQOzI8P6UX1XMAnfh`  |
| Ceremonias              | `1ZZGx-N-Pvy--JEfwZmY0kouDlWlqryZB`  |
| Eventos                 | `1rGE7Uz02tp1Q88z8gissfiD-YiG7Rp7T`  |
| Danza                   | `1ghik0gcgk6qTqSTXR8Q9TzPn0mp4LRJW`  |
| Creación de Contenido   | `1z7NF-h_OaHuLXBt07TCMTy9lXVCTfLb5`  |

### Arquitectura

```
Google Drive (5 carpetas)
    │
    ▼
Google Apps Script proxy (proxy.gs)
    ├── ?folderId=XXX  → lista archivos (JSON) → tiene CORS (ContentService)
    └── ?fileId=XXX    → devuelve data URL base64 (text/plain) → tiene CORS
    │
    ▼
Landing.js
    ├── GALLERY_CATEGORIES (constante con IDs de carpeta)
    ├── fetchImage(id)  → fetch al proxy → cache en memoria (Map)
    ├── DriveImage      → componente con fetch + loading + error states
    ├── GalleryCategory → grid responsive por categoría
    └── Lightbox        → usa imágenes cacheadas, spinner si no están listas
```

### Flujo de carga
1. Al montar → `Promise.allSettled` a las 5 carpetas (proxy)
2. Skeleton grid mientras carga
3. Al recibir items → `GalleryCategory` renderiza grid con `DriveImage`
4. `DriveImage` hace fetch individual al proxy → obtiene data URL → cachea → renderiza `<img>`
5. Las imágenes quedan cacheadas en `imageCache` (Map) para el lightbox
6. **Añadir/quitar archivos en Drive → se refleja al recargar la página**

### Despliegue del proxy
1. Ir a [script.google.com](https://script.google.com) → Nuevo proyecto
2. Pegar contenido de `proxy.gs`
3. Implementar → Nueva implementación → Aplicación web → "Cualquiera"
4. Copiar URL y ponerla en `Landing.js` → `PROXY_URL`
5. Las carpetas de Drive deben estar compartidas como "Cualquiera con el enlace puede ver"

## Configuración relevante

- **Tailwind themes**: `autumn` (claro) y `luxury` (oscuro) vía `tailwind.config.js`. El toggle de tema está implementado pero no tiene UI.
- **i18n**: En `next.config.js` — locales `es`, `en`, `fr` con `defaultLocale: "es"`. Las traducciones en `languages/` existen pero **nunca se usan en el JSX**; todo el texto está hardcodeado en español.
- **Path alias**: `jsconfig.json` define `@/*` → `./*`.
- **EmailJS**: Requiere variables de entorno (no incluidas): `NEXT_PUBLIC_EMAILJS_SERVICE_ID`, `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`, `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`. El formulario de contacto no funciona sin un `.env.local`.
- **Remote images**: `next.config.js` tiene `images.remotePatterns` para `lh3.googleusercontent.com` y `drive.google.com`.

## Issues conocidos

### Críticos
1. **`components/selector.js`**: El selector de idioma está importado en `Layout.js` pero **nunca se renderiza**. La clase `w-` está incompleta (falta el valor).
2. **`components/Layout.js`**: Toggle de tema (sol/luna) implementado con `useState` + `handleTheme` pero **sin UI** — no hay botón para cambiar el tema.
3. **Sistema i18n muerto**: La variable `t` (traducciones) se computa en `index.js`, `contact.js` y `selector.js` pero nunca se usa en el JSX. Todo el texto está hardcodeado en español.
4. **Conflicto `data-theme`**: `Layout.js` pone `data-theme={theme}` y `Landing.js` también pone su propio `data-theme={theme}` con `bg-neutral-900` que pisa el `bg-black` del Layout. Además, `index.js` nunca pasa la prop `theme` a `<Landing/>`, así que `theme` siempre es `undefined` en Landing.

### Medios
5. **Imports no usados**:
   - `contact.js`: `MdCameraAlt`
   - `navbar.js`: `Image` de `next/image`
   - `Footer.js`: prop `theme` recibida pero no usada
6. **Dependencias no usadas en `package.json`**: `i18next` y `react-i18next` — inflan el bundle.
7. **`_document.js`**: `lang="en"` hardcodeado, debería ser dinámico según `locale`.

### Bajos
8. `_app.js` dispara animación de transición en cada cambio de ruta, incluyendo hash navigation.
9. `README.md` es el template por defecto de create-next-app.
10. `localeDetection: true` redundante en `next.config.js` (es el default).
11. Alt text genérico en varias imágenes (`alt="Portfolio item"`, `alt="Background texture"`).
12. Dos `IntersectionObserver` separados en `Landing.js` (`.reveal-on-scroll` y `.reveal`).

### Resueltos recientemente
- ~~Import de `Lightbox`~~: corregido a named export `{ Lightbox }` en `Landing.js:7`.
- ~~Galería con imágenes locales + nombres con espacios~~: reemplazada por galería dinámica desde Google Drive. Carpeta `public/assets/lastWorks/` eliminada.
- ~~Imágenes no cargan por CORS~~: resuelto con proxy Google Apps Script que sirve data URLs base64.
- ~~Galería rompía layout (flex overflow)~~: cambiado a grid responsive `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`.
- ~~`#gallery` links rotos~~: actualizado a `#retratos` en navbar, footer y hero button.

## Convenciones

- **Idioma del código**: Variables/funciones en inglés, comentarios en español.
- **Estilos**: Tailwind utility classes. DaisyUI themes (`data-theme`). CSS custom en `globals.css`.
- **Componentes**: Functional components con hooks. Export nombrados (`export const Component`).
- **Rutas**: Hash links para navegación interna (`#servicios`, `#retratos`, `#ceremonias`, `#eventos`, `#danza`, `#creacion`, `#contacto`). Ruta separada `/landing/contact` para el formulario.

## CI/CD

No hay pipeline configurado. Se despliega manualmente en Vercel.
