import React, { useEffect } from "react";
import { BsInstagram, BsArrowDown } from "react-icons/bs";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import en from "@/languages/en";
import es from "@/languages/es";
import fr from "@/languages/fr";

export const Landing = ({ theme }) => {
  const router = useRouter();
  let t = en;
  if (router.locale === "es") t = es;
  if (router.locale === "fr") t = fr;

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in-up");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll(".reveal-on-scroll").forEach((el) => {
      observer.observe(el);
    });

    // Observer separate for the specific logo animation from original
    const logoObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("revealed");
      });
    });
    document.querySelectorAll(".reveal").forEach((el) => logoObserver.observe(el));

    return () => {
      observer.disconnect();
      logoObserver.disconnect();
    };
  }, []);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Aroa Carmona Fotografía - By Phnix",
    image: "https://byphnix.vercel.app/assets/CARROUSEL1.webp",
    url: "https://byphnix.vercel.app",
    telephone: "+34 677 00 00 00",
    description: "Servicios de fotografía profesional en Barcelona y Granollers por Aroa Carmona. Bodas, eventos, mascotas y sesiones de retrato.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Granollers",
      addressRegion: "Barcelona",
      addressCountry: "ES",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 41.607,
      longitude: 2.287
    },
    areaServed: ["Granollers", "Barcelona", "Vallès Oriental", "Catalunya"],
    sameAs: [
      "https://www.instagram.com/byphnix"
    ],
    priceRange: "€€"
  };

  return (
    <>
      <Head>
        <title>Aroa Carmona | Fotografía en Barcelona y Granollers</title>
        <meta name="description" content="Aroa Carmona, fotógrafa en Barcelona y Granollers. Especialista en capturar momentos únicos: eventos, bodas, mascotas y retratos. Web desarrollada por Daniel Castro." />
        <meta name="keywords" content="Aroa Carmona, Fotografía Barcelona, Fotografía Granollers, Fotógrafa de bodas, Sesiones de fotos, Daniel Castro, Daniel Castro Martín, Desarrollador Web" />
        <meta name="author" content="Daniel Castro Martín" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://byphnix.vercel.app/" />
        <meta property="og:title" content="Aroa Carmona | Fotografía Profesional en Barcelona y Granollers" />
        <meta property="og:description" content="Descubre el portfolio de Aroa Carmona. Fotografía emocional y creativa en Barcelona y Granollers. Creado por Daniel Castro." />
        <meta property="og:image" content="https://byphnix.vercel.app/assets/CARROUSEL1.webp" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://byphnix.vercel.app/" />
        <meta property="twitter:title" content="Aroa Carmona | Fotografía Barcelona" />
        <meta property="twitter:description" content="Fotografía profesional en Barcelona y Granollers. Aroa Carmona captura tu esencia." />
        <meta property="twitter:image" content="https://byphnix.vercel.app/assets/CARROUSEL1.webp" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Custom styles for animations within this component */}
        <style>{`
          .animate-fade-in-up {
            animation: fadeInUp 0.8s ease-out forwards;
            opacity: 0;
          }
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .reveal-on-scroll {
            opacity: 0; 
          }
          .reveal {
            transition: all 1s ease-out;
          }
          .revealed {
            opacity: 1 !important;
            transform: translateY(0) !important;
          }
        `}</style>
      </Head>

      <div data-theme={theme} className="min-h-screen bg-neutral-900 text-neutral-content selection:bg-orange-500 selection:text-white overflow-hidden">
        
        {/* ---------- HERO SECTION ---------- */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background Image with Parallax-like feel (static for perf, can be fixed) */}
          <div className="absolute inset-0 z-0">
             <Image
                src="/assets/CARROUSEL1.webp" // Using one of your best shots as hero bg
                alt="Background texture"
                fill
                className="object-cover opacity-40 grayscale-[20%]"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-neutral-900" />
          </div>

          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto space-y-8">
            <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                <span className="tracking-[0.3em] text-xs md:text-sm uppercase text-orange-400 font-bold mb-4 block">
                    Portfolio & Gallery
                </span>
                <h1 className="font-title text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight">
                    Capturando<br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-200 to-orange-500">Esencia</span>
                </h1>
            </div>
            
            <p className="font-sans text-lg md:text-xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                Soy <strong>Aroa Carmona</strong>. Transformo momentos efímeros en recuerdos eternos. 
                Fotógrafa profesional en Barcelona y Granollers.
            </p>

            <div className="flex flex-col md:flex-row gap-4 justify-center items-center pt-8 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              <Link 
                href="/landing/contact" 
                className="px-8 py-3 bg-orange-600 text-white font-semibold tracking-wide hover:bg-orange-700 transition-all duration-300 rounded-lg"
              >
                RESERVAR SESIÓN
              </Link>
              <Link 
                href="#gallery" 
                className="px-8 py-3 border border-gray-500 text-gray-300 hover:text-white hover:border-white transition-all duration-300 rounded-lg"
              >
                VER GALERÍA
              </Link>
            </div>
          </div>

          {/* Scrolldown indicator */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce opacity-50">
             <BsArrowDown className="text-3xl text-white"/>
          </div>
        </section>

        {/* ---------- SERVICES (Minimalist) ---------- */}
        <section id="servicios" className="py-24 px-4 bg-neutral-900 relative">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 reveal-on-scroll">
                    <h2 className="font-title text-4xl md:text-5xl mb-4 text-white">Mis Servicios</h2>
                    <div className="h-1 w-20 bg-orange-500 mx-auto"></div>
                    <p className="mt-4 text-gray-400 font-light">Especialización y pasión en cada disparo</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[ 
                        { title: "Eventos", desc: "Bodas, fiestas y momentos únicos irrepetibles.", img: "/assets/Tibidabo.jpg" },
                        { title: "Retratos", desc: "Sesiones individuales para capturar tu mejor versión.", img: "/assets/CARROUSEL5.webp" },
                        { title: "Mascotas", desc: "La pureza de tus compañeros más fieles.", img: "/assets/CARROUSEL4.webp" },
                        { title: "Grupos", desc: "Familias y amigos unidos por un instante.", img: "/assets/CARROUSEL3.webp" }
                    ].map((service, idx) => (
                        <div key={idx} className="rounded-2xl group relative h-96 w-full overflow-hidden cursor-pointer reveal-on-scroll delay-100">
                             <Image
                                src={service.img}
                                alt={service.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90 transition-opacity duration-300" />
                            <div className="absolute bottom-0 left-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                <h3 className="font-title text-2xl text-white mb-2">{service.title}</h3>
                                <p className="text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                    {service.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* ---------- MASONRY GALLERY ---------- */}
        <section id="gallery" className="py-20 bg-neutral-800">
             <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-end mb-12 reveal-on-scroll">
                    <div>
                        <h2 className="font-title text-3xl md:text-4xl text-white">Últimos Trabajos</h2>
                        <p className="text-gray-400 mt-2">Una selección de mis capturas favoritas</p>
                    </div>
                     <a href="https://www.instagram.com/byphnix" target="_blank" rel="noreferrer" className="hidden md:flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors">
                        <BsInstagram />
                        <span>Seguir en Instagram</span>
                     </a>
                </div>

                {/* Masonry Layout simulation using CSS Columns */}
                <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
                     {[
                        "CARROUSEL2.webp",
                        "CARROUSEL4.webp",
                        "Tibidabo.jpg", // Different aspect ratio helps masonry look
                        "CARROUSEL3.webp",
                        "logo.webp",
                        "CARROUSEL5.webp",
                     ].map((img, i) => (
                        <div key={i} className="break-inside-avoid relative group rounded-2xl overflow-hidden reveal-on-scroll">
                             <Image
                                src={`/assets/${img}`}
                                alt="Portfolio item"
                                width={500}
                                height={700} // Aspact ratio placeholder, style handles visual
                                className="w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <span className="text-white font-title text-xl tracking-widest border border-white px-4 py-2">VER</span>
                            </div>
                        </div>
                     ))}
                </div>
                
                <div className="mt-12 text-center md:hidden">
                    <a href="https://www.instagram.com/byphnix" className="btn btn-outline text-white">Ver más en Instagram</a>
                </div>
             </div>
        </section>

        {/* ---------- CONTACT BANNER ---------- */}
        <section className="py-12 bg-neutral-900 text-center px-4">
            <div className="reveal-on-scroll max-w-2xl mx-auto border border-white/10 p-10 md:p-16 rounded-3xl bg-neutral-800/30">
                <h2 className="font-title text-4xl mb-6 text-white">¿Hablamos?</h2>
                <p className="text-gray-300 mb-8 text-lg font-light">
                    Estoy disponible para nuevos proyectos y colaboraciones. <br/>
                    Cuéntame tu idea y creemos algo mágico juntos.
                </p>
                <Link href="/landing/contact" className="btn btn-primary btn-lg px-10 rounded-full text-white shadow-lg shadow-orange-500/20">
                    Contactar Ahora
                </Link>
            </div>
        </section>

        {/* ---------- SIGNATURE LOGO ---------- */}
        <section className="pb-20 pt-10">
             <div className="relative w-80 h-60 mx-auto">
              <Image
                src="/assets/logo_white.png"
                alt="By Phnix - Fotografía profesional en Barcelona y Granollers, logo de Aroa Carmona"
                fill
                className="object-contain"
                priority
              />

              <p className="font-title font-bold text-xl text-white grid h-full place-content-end pb-7 pr-5 opacity-0 translate-y-5 reveal">
                By Aroa Carmona
              </p>
            </div>
        </section>

      </div>
    </>
  );
};

export default Landing;
