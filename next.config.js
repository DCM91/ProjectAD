/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n:{
    locales:["en", "es", "fr"],
    defaultLocale: "es",
    localeDetection: true,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "drive.google.com" },
    ],
  },
}

module.exports = nextConfig
