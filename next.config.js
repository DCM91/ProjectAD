/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n:{
    locales:["en", "es", "fr"],
    defaultLocale: "en",
    localeDetection: true, //detecta el local preferido por el user en el navegador(esta en true por defecto)
  },
  transpilePackages: ['framer-motion', 'yet-another-react-lightbox'],
}

module.exports = nextConfig
