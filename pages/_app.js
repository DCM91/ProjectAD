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

import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { Analytics } from '@vercel/analytics/next'

export default function App({ Component, pageProps }) {
  const router = useRouter()

  return (
    <div className={`${cormorant.variable} ${inter.variable}`}>
       <AnimatePresence mode="wait">
          <motion.div
            key={router.route}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="w-full h-full"
          >
             <Component {...pageProps} />
          </motion.div>
       </AnimatePresence>
       <Analytics />
    </div>
  )
}
