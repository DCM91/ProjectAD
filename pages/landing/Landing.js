import React, { useEffect, useState, useCallback } from "react";
import { BsArrowDown, BsPlayFill } from "react-icons/bs";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { Lightbox } from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const PROXY_URL = "https://script.google.com/macros/s/AKfycbzsfMmv4EHsDjBRfAXHPuhKgrvoy9OM8c2pJnZMWSYlh_uZ9p9qqN1DnAiRAmfIZp8F/exec";

const GALLERY_CATEGORIES = [
    { id: "retratos",  title: "Retratos",              folderId: "1QB1mxWCAh3oieFacQOzI8P6UX1XMAnfh" },
    { id: "ceremonias", title: "Ceremonias",            folderId: "1ZZGx-N-Pvy--JEfwZmY0kouDlWlqryZB" },
    { id: "eventos",   title: "Eventos",                folderId: "1rGE7Uz02tp1Q88z8gissfiD-YiG7Rp7T" },
    { id: "danza",     title: "Danza",                  folderId: "1ghik0gcgk6qTqSTXR8Q9TzPn0mp4LRJW" },
    { id: "creacion",  title: "Creación de Contenido",  folderId: "1z7NF-h_OaHuLXBt07TCMTy9lXVCTfLb5" },
];

const thumbSrc = (id) => `${PROXY_URL}?fileId=${id}`;

const imageCache = new Map();
const pendingFetches = new Map();

function fetchImage(id) {
    if (imageCache.has(id)) return Promise.resolve(imageCache.get(id));
    if (pendingFetches.has(id)) return pendingFetches.get(id);

    const promise = fetch(`${PROXY_URL}?fileId=${id}`)
        .then((res) => {
            if (!res.ok) throw new Error("Failed");
            return res.text();
        })
        .then((dataUrl) => {
            imageCache.set(id, dataUrl);
            pendingFetches.delete(id);
            return dataUrl;
        })
        .catch(() => {
            pendingFetches.delete(id);
            return null;
        });

    pendingFetches.set(id, promise);
    return promise;
}

function getCachedSrc(id) {
    return imageCache.get(id) || null;
}

const DriveImage = ({ fileId, alt, className }) => {
    const [src, setSrc] = useState(() => getCachedSrc(fileId));
    const [error, setError] = useState(false);

    useEffect(() => {
        if (src) return;
        let cancelled = false;

        fetchImage(fileId).then((dataUrl) => {
            if (!cancelled && dataUrl) setSrc(dataUrl);
            if (!cancelled && !dataUrl) setError(true);
        });

        return () => { cancelled = true; };
    }, [fileId, src]);

    if (error) {
        return (
            <div className={className + " bg-neutral-800 flex items-center justify-center"}>
                <span className="text-gray-600 text-xs">No disponible</span>
            </div>
        );
    }
    if (!src) {
        return <div className={className + " bg-neutral-800 animate-pulse"} />;
    }
    return <img src={src} alt={alt} className={className} loading="lazy" />;
};
const videoPreviewUrl = (id) => `https://drive.google.com/file/d/${id}/preview`;

const SkeletonGrid = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
            <div key={i} className="aspect-square rounded-2xl bg-neutral-800 animate-pulse" />
        ))}
    </div>
);

const GalleryCategory = ({ category, items, onItemClick }) => (
    <div id={category.id} className="mb-20 last:mb-0">
        <div className="flex items-center gap-3 mb-6">
            <div className="h-0.5 w-10 bg-orange-500" />
            <h2 className="font-title text-3xl text-white tracking-wide">{category.title}</h2>
            <span className="text-gray-600 text-xs font-mono ml-2 hidden sm:inline">
                {items.length} {items.length === 1 ? "archivo" : "archivos"}
            </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item, i) => (
                <div
                    key={item.id}
                    onClick={() => onItemClick(i)}
                    className="aspect-square relative group rounded-2xl overflow-hidden cursor-pointer bg-neutral-800 border border-white/[0.04] hover:border-orange-500/30 transition-colors duration-500"
                >
                    {item.type === "image" ? (
                        <DriveImage
                            fileId={item.id}
                            alt={item.name}
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        />
                    ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-neutral-800">
                            <div className="w-14 h-14 rounded-full bg-black/40 border border-white/20 flex items-center justify-center group-hover:border-orange-400/50 group-hover:bg-black/60 transition-all duration-300">
                                <BsPlayFill className="text-2xl text-white ml-0.5" />
                            </div>
                            <span className="text-gray-500 text-xs mt-3 font-mono uppercase tracking-wider">Video</span>
                        </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-5">
                        <span className="text-white font-title text-xs tracking-[0.25em] uppercase border border-white/40 rounded-full px-4 py-1.5 backdrop-blur-sm">
                            {item.type === "video" ? "Reproducir" : "Ampliar"}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export const Landing = ({ theme }) => {
  const router = useRouter();

  const initialGalleryState = () =>
    Object.fromEntries(GALLERY_CATEGORIES.map((c) => [c.id, { items: [], loaded: false, error: false }]));

  const [galleryData, setGalleryData] = useState(initialGalleryState);
  const [lightbox, setLightbox] = useState({ open: false, index: 0, items: [], slides: [], category: null });

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

  // Fix for anchor navigation from other pages
  useEffect(() => {
    const handleHashScroll = () => {
      const hash = window.location.hash;
      if (hash) {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth' });
          }, 100); // Small delay to ensure rendering
        }
      }
    };

    // Run on mount
    handleHashScroll();

    // Listen for hash changes (optional if needed for same-page hash updates not handled by Link)
    const handleRouteChange = (url) => {
        if (url.includes('#')) {
             // Extract hash part and try to scroll
             const hash = url.split('#')[1];
             const element = document.getElementById(hash);
             if(element) setTimeout(() => element.scrollIntoView({ behavior: 'smooth' }), 100);
        }
    }

    router.events.on('hashChangeComplete', handleHashScroll);
    return () => {
        router.events.off('hashChangeComplete', handleHashScroll);
    }
  }, [router.events]);

  const handleLightboxOpen = useCallback((categoryId, i) => {
    const items = galleryData[categoryId].items;

    const initialSlides = items.map((item) => ({
      ...item,
      ...(item.type === "image" ? { src: getCachedSrc(item.id) } : {}),
    }));

    setLightbox({ open: true, index: i, items, slides: initialSlides, category: categoryId });

    items.forEach((item, idx) => {
      if (item.type === "image" && !getCachedSrc(item.id)) {
        fetchImage(item.id).then((dataUrl) => {
          if (dataUrl) {
            setLightbox((prev) => {
              if (!prev.open) return prev;
              const nextSlides = [...prev.slides];
              nextSlides[idx] = { ...nextSlides[idx], src: dataUrl };
              return { ...prev, slides: nextSlides };
            });
          }
        });
      }
    });
  }, [galleryData]);

  const handleLightboxClose = useCallback(() => {
    setLightbox((prev) => ({ ...prev, open: false }));
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    Promise.allSettled(
      GALLERY_CATEGORIES.map(async (cat) => {
        const res = await fetch(`${PROXY_URL}?folderId=${cat.folderId}`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const items = await res.json();
        return { id: cat.id, items: Array.isArray(items) ? items : [] };
      })
    ).then((results) => {
      setGalleryData((prev) => {
        const next = { ...prev };
        results.forEach((result, i) => {
          const id = GALLERY_CATEGORIES[i].id;
          if (result.status === "fulfilled") {
            next[id] = { items: result.value.items, loaded: true, error: false };
          } else {
            next[id] = { items: [], loaded: true, error: true };
          }
        });
        return next;
      });
    }).catch(() => {});

    return () => controller.abort();
  }, []);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Aroa Carmona Fotografía - By Phnix",
    image: "https://byphnix.vercel.app/assets/CARROUSEL1.JPG?v=06022026",
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
        <meta property="og:image" content="https://byphnix.vercel.app/assets/CARROUSEL1.JPG?v=06022026" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://byphnix.vercel.app/" />
        <meta property="twitter:title" content="Aroa Carmona | Fotografía Barcelona" />
        <meta property="twitter:description" content="Fotografía profesional en Barcelona y Granollers. Aroa Carmona captura tu esencia." />
        <meta property="twitter:image" content="https://byphnix.vercel.app/assets/CARROUSEL1.JPG?v=06022026" />

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

      <div data-theme={theme} className="min-h-screen w-full bg-neutral-900 text-neutral-content selection:bg-orange-500 selection:text-white">
        
        {/* ---------- HERO SECTION ---------- */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background Image with Parallax-like feel (static for perf, can be fixed) */}
          <div className="absolute inset-0 z-0">
             <Image
                src="/assets/CARROUSEL1.JPG?v=06022026" // Using one of your best shots as hero bg
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
                    Aroa<br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-200 to-orange-500">Carmona</span>
                </h1>
            </div>
            
            <p className="font-sans text-lg md:text-xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                Capturo instantes que no se repiten, emociones que se sienten y miradas que cuentan historias.<br></br> Transformo momentos reales en recuerdos eternos.<br></br> 
                Fotografía profesional en Barcelona y al rededores.
            </p>

            <div className="flex flex-col md:flex-row gap-4 justify-center items-center pt-8 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              <Link 
                href="/landing/contact" 
                className="px-8 py-3 bg-orange-600 text-white font-semibold tracking-wide hover:bg-orange-700 transition-all duration-300 rounded-lg"
              >
                RESERVAR SESIÓN
              </Link>
              <Link 
                href="#retratos" 
                className="px-8 py-3 border border-gray-500 text-gray-300 hover:text-white hover:border-white transition-all duration-300 rounded-lg"
              >
                VER TRABAJOS
              </Link>
            </div>
          </div>

          {/* Scrolldown indicator */}
          <div className="absolute bottom-10 transform -translate-x-1/2 animate-bounce opacity-50">
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
                        { title: "Eventos", desc: "Bodas, fiestas y momentos únicos irrepetibles.", img: "/assets/eventos.JPG" },
                        { title: "Retratos", desc: "Sesiones individuales para capturar tu mejor versión.", img: "/assets/CARROUSEL3.JPG?v=06022026" },
                        { title: "Mascotas", desc: "La pureza de tus compañeros más fieles.", img: "/assets/CARROUSEL5.JPG" },
                        { title: "Danza", desc: "Familias y amigos unidos por un instante.", img: "/assets/Danza.JPG"}
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

        {/* ---------- DYNAMIC GALLERY ---------- */}
        <section id="gallery" className="py-20 bg-neutral-900">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16 reveal-on-scroll">
                    <h2 className="font-title text-4xl md:text-5xl mb-4 text-white">Galería</h2>
                    <div className="h-1 w-20 bg-orange-500 mx-auto" />
                    <p className="mt-4 text-gray-400 font-light">Explora mi trabajo por categorías</p>
                </div>

                {GALLERY_CATEGORIES.map((category) => {
                    const data = galleryData[category.id];
                    if (!data || !data.loaded) {
                        return (
                            <div key={category.id} className="mb-20 last:mb-0">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="h-0.5 w-10 bg-orange-500/20" />
                                    <div className="h-7 w-40 bg-neutral-800 rounded animate-pulse" />
                                </div>
                                <SkeletonGrid />
                            </div>
                        );
                    }
                    if (data.error) {
                        return (
                            <div key={category.id} className="mb-20 last:mb-0 text-center py-10">
                                <div className="flex items-center justify-center gap-3 mb-3">
                                    <div className="h-0.5 w-10 bg-orange-500/20" />
                                    <h2 className="font-title text-3xl text-white">{category.title}</h2>
                                </div>
                                <p className="text-gray-500 text-sm font-light">No se pudo cargar</p>
                            </div>
                        );
                    }
                    if (data.items.length === 0) {
                        return (
                            <div key={category.id} className="mb-20 last:mb-0 text-center py-10">
                                <div className="flex items-center justify-center gap-3 mb-3">
                                    <div className="h-0.5 w-10 bg-orange-500/20" />
                                    <h2 className="font-title text-3xl text-white">{category.title}</h2>
                                </div>
                                <p className="text-gray-500 text-sm font-light">Próximamente</p>
                            </div>
                        );
                    }
                    return (
                        <GalleryCategory
                            key={category.id}
                            category={category}
                            items={data.items}
                            onItemClick={(i) => handleLightboxOpen(category.id, i)}
                        />
                    );
                })}
            </div>
        </section>

        {/* ---------- LIGHTBOX ---------- */}
        {lightbox.open && (
            <Lightbox
                open={lightbox.open}
                close={handleLightboxClose}
                index={lightbox.index}
                slides={lightbox.slides}
                render={{
                    slide: ({ slide }) => {
                        if (slide.type === "video") {
                            return (
                                <div style={{
                                    width: "100%", height: "100%",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                }}>
                                    <iframe
                                        src={videoPreviewUrl(slide.id)}
                                        width={Math.min(1280, typeof window !== "undefined" ? window.innerWidth * 0.9 : 1280)}
                                        height={Math.min(720, typeof window !== "undefined" ? window.innerHeight * 0.8 : 720)}
                                        allow="autoplay; fullscreen"
                                        allowFullScreen
                                        style={{ border: "none", borderRadius: "12px" }}
                                    />
                                </div>
                            );
                        }
                        if (!slide.src) {
                            return (
                                <div style={{
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    width: "100%", height: "100%",
                                }}>
                                    <div className="w-16 h-16 rounded-full border-2 border-orange-500/30 border-t-orange-500 animate-spin" />
                                </div>
                            );
                        }
                        return (
                            <div style={{
                                display: "flex", alignItems: "center", justifyContent: "center",
                                width: "100%", height: "100%",
                            }}>
                                <img
                                    src={slide.src}
                                    alt=""
                                    style={{
                                        maxWidth: "100%", maxHeight: "100%",
                                        objectFit: "contain",
                                    }}
                                    draggable={false}
                                />
                            </div>
                        );
                    },
                }}
            />
        )}

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
        <section className="pb-10 pt-8">
             <div className="relative w-80 h-60 mx-auto">
              <Image
                src="/assets/logo_white.png?v=06022026"
                alt="By Phnix - Fotografía profesional en Barcelona y Granollers, logo de Aroa Carmona"
                fill
                className="object-cover"
                priority
              />
            </div>
        </section>

      </div>
    </>
  );
};

export default Landing;
