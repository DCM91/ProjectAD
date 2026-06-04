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
npm run lint       # ESLint
```

## Estructura

```
pages/               # Next.js Pages Router
  _app.js            # Wrapper global: fuentes, transiciones framer-motion
  _document.js       # Shell HTML (lang hardcodeado "en")
  index.js           # Página raíz → renderiza <Landing/>
  landing/
    Landing.js       # Hero, servicios, galería, lightbox, banner contacto
    contact.js       # Formulario contacto vía EmailJS (env vars)
components/
  Layout.js          # Shell: Head + Navbar + Footer (tiene código muerto)
  navbar.js          # Nav sticky + hamburger mobile
  Footer.js          # Footer 3 columnas
  selector.js        # Dropdown idiomas (NUNCA se renderiza, clase rota)
languages/           # Traducciones i18n — SIN USAR (texto hardcodeado en ES)
  en.js, es.js, fr.js
public/assets/       # Imágenes estáticas, logos, galería
styles/globals.css   # Tailwind directives, animaciones custom, CSS vars
```

## Stack

| Dependencia              | Uso                          |
| ------------------------ | ---------------------------- |
| next 13.3.0              | Framework (Pages Router)     |
| react 18.2.0             | UI                           |
| tailwindcss 3.3.1        | Estilos utility-first        |
| daisyui 2.51.5           | Componentes UI (themes)      |
| framer-motion 12.23.25   | Animaciones/transiciones     |
| emailjs/browser 4.4.1    | Formulario de contacto       |
| yet-another-react-lightbox 3.26 | Galería lightbox    |
| react-icons 4.8.0        | Iconos                       |
| react-i18next + i18next  | **Instalados pero NO usados** |

## Configuración relevante

- **Tailwind themes**: `autumn` (claro) y `luxury` (oscuro) vía `tailwind.config.js`. El toggle de tema está implementado pero no tiene UI.
- **i18n**: En `next.config.js` — locales `es`, `en`, `fr` con `defaultLocale: "es"`. Las traducciones en `languages/` existen pero **nunca se usan en el JSX**; todo el texto está hardcodeado en español.
- **Path alias**: `jsconfig.json` define `@/*` → `./*`.
- **EmailJS**: Requiere variables de entorno (no incluidas): `NEXT_PUBLIC_EMAILJS_SERVICE_ID`, `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`, `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`. El formulario de contacto no funciona sin un `.env.local`.

## Issues conocidos

### Críticos
1. **`components/selector.js`**: El selector de idioma está importado en `Layout.js` pero **nunca se renderiza**. La clase `w-` está incompleta (falta el valor).
2. **`components/Layout.js`**: Toggle de tema (sol/luna) implementado con `useState` + `handleTheme` pero **sin UI** — no hay botón para cambiar el tema.
3. **Sistema i18n muerto**: La variable `t` (traducciones) se computa en `index.js`, `Landing.js`, `contact.js` y `selector.js` pero nunca se usa en el JSX. Todo el texto está hardcodeado en español.
4. **Conflicto `data-theme`**: `Layout.js` pone `data-theme={theme}` y `Landing.js` también pone su propio `data-theme={theme}` con `bg-neutral-900` que pisa el `bg-black` del Layout. Además, `index.js` nunca pasa la prop `theme` a `<Landing/>`, así que `theme` siempre es `undefined` en Landing.
5. **Import de `Lightbox`**: `yet-another-react-lightbox` v3.x usa named exports (`{ Lightbox }`), pero se importa como default (`import Lightbox from "..."`). Puede fallar en producción.

### Medios
6. **Imports no usados**:
   - `contact.js`: `MdCameraAlt`
   - `navbar.js`: `Image` de `next/image`
   - `Footer.js`: prop `theme` recibida pero no usada
7. **Dependencias no usadas en `package.json`**: `i18next` y `react-i18next` — inflan el bundle.
8. **`_document.js`**: `lang="en"` hardcodeado, debería ser dinámico según `locale`.

### Bajos
9. Imágenes con espacios en nombres (`ultimos trabajos (1).JPG`) — no es URL-safe.
10. `_app.js` dispara animación de transición en cada cambio de ruta, incluyendo hash navigation.
11. `README.md` es el template por defecto de create-next-app.
12. `localeDetection: true` redundante en `next.config.js` (es el default).
13. Alt text genérico en varias imágenes (`alt="Portfolio item"`, `alt="Background texture"`).
14. Dos `IntersectionObserver` separados en `Landing.js` (`.reveal-on-scroll` y `.reveal`).

## Convenciones

- **Idioma del código**: Variables/funciones en inglés, comentarios en español.
- **Estilos**: Tailwind utility classes. DaisyUI themes (`data-theme`). CSS custom en `globals.css`.
- **Componentes**: Functional components con hooks. Export nombrados (`export const Component`).
- **Rutas**: Hash links para navegación interna (`#home`, `#servicios`, `#gallery`, `#contacto`). Ruta separada `/landing/contact` para el formulario.

## CI/CD

No hay pipeline configurado. Se despliega manualmente en Vercel.
