import '@/styles/globals.css'
import { Cormorant_Garamond, Inter } from 'next/font/google'

// Fuente elegante para títulos
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['400', '700'],  // 👈 AÑADIR ESTO
  display: 'swap',
})

// Fuente moderna para textos
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '700'], // opcional
  display: 'swap',
})

export default function App({ Component, pageProps }) {
  return (
    <div className={`${cormorant.variable} ${inter.variable}`}>
      <Component {...pageProps} />
    </div>
  )
}
