import React, { useEffect, useState, useCallback, useRef } from "react";
import { BsArrowDown, BsPlayFill, BsChevronLeft, BsChevronRight } from "react-icons/bs";
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

const thumbSrc = (id, size) => `https://drive.google.com/thumbnail?id=${id}&sz=w${size}`;
const lightboxSrc = (id) => `https://drive.google.com/thumbnail?id=${id}&sz=w1600`;
const videoPreviewUrl = (id) => `https://drive.google.com/file/d/${id}/preview`;

const SkeletonGrid = () => (
    <div className="flex gap-4 overflow-hidden">
        {[...Array(4)].map((_, i) => (
            <div key={i} className="flex-shrink-0 w-72 h-72 md:w-80 md:h-80 rounded-2xl bg-neutral-800 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full border-2 border-orange-500/20 border-t-orange-500 animate-spin" />
            </div>
        ))}
    </div>
);

const GalleryCategory = ({ category, items, onItemClick }) => {
    const scrollRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const checkScroll = useCallback(() => {
        const el = scrollRef.current;
        if (!el) return;
        setCanScrollLeft(el.scrollLeft > 12);
        setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 12);
    }, []);

    useEffect(() => {
        checkScroll();
        const el = scrollRef.current;
        if (!el) return;
        el.addEventListener("scroll", checkScroll, { passive: true });
        const ro = new ResizeObserver(checkScroll);
        ro.observe(el);
        return () => {
            el.removeEventListener("scroll", checkScroll);
            ro.disconnect();
        };
    }, [checkScroll, items]);

    const scroll = (dir) => {
        scrollRef.current?.scrollBy({ left: dir * 340, behavior: "smooth" });
    };

    return (
        <div id={category.id} className="mb-16 last:mb-0">
            <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                    <div className="h-0.5 w-10 bg-orange-500" />
                    <h2 className="font-title text-3xl text-white tracking-wide">{category.title}</h2>
                    <span className="text-gray-300 text-xs font-mono ml-2 hidden sm:inline">
                        {items.length} {items.length === 1 ? "archivo" : "archivos"}
                    </span>
                </div>

                <div className="hidden sm:flex items-center gap-1">
                    <button
                        onClick={() => scroll(-1)}
                        disabled={!canScrollLeft}
                        className="p-2 rounded-full text-gray-500 hover:text-white hover:bg-white/5 disabled:opacity-20 disabled:cursor-default transition-all duration-200"
                        aria-label="Desplazar izquierda"
                    >
                        <BsChevronLeft size={20} />
                    </button>
                    <button
                        onClick={() => scroll(1)}
                        disabled={!canScrollRight}
                        className="p-2 rounded-full text-gray-500 hover:text-white hover:bg-white/5 disabled:opacity-20 disabled:cursor-default transition-all duration-200"
                        aria-label="Desplazar derecha"
                    >
                        <BsChevronRight size={20} />
                    </button>
                </div>
            </div>

            <div className="relative overflow-hidden">
                <div
                    ref={scrollRef}
                    className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory gallery-slider"
                    style={{ scrollBehavior: "smooth" }}
                >
                    {items.map((item, i) => (
                        <div
                            key={item.id}
                            onClick={() => onItemClick(i)}
                            className="flex-shrink-0 w-72 h-72 md:w-80 md:h-80 snap-start relative group rounded-2xl overflow-hidden cursor-pointer bg-neutral-800 border border-white/[0.04] hover:border-orange-500/30 transition-colors duration-500"
                        >
                            {item.type === "image" ? (
                                <img
                                    src={thumbSrc(item.id, 600)}
                                    alt={item.name}
                                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                    loading={i < 3 ? "eager" : "lazy"}
                                    referrerPolicy="no-referrer"
                                    onError={(e) => {
                                        e.currentTarget.style.display = "none";
                                    }}
                                />
                            ) : (
                                <>
                                    <img
                                        src={thumbSrc(item.id, 600)}
                                        alt={item.name}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                        loading={i < 3 ? "eager" : "lazy"}
                                        referrerPolicy="no-referrer"
                                        onError={(e) => { e.currentTarget.style.display = "none"; }}
                                    />
                                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-800/60 group-hover:bg-neutral-800/80 transition-colors duration-300">
                                        <div className="w-14 h-14 rounded-full bg-black/40 border border-white/20 flex items-center justify-center group-hover:border-orange-400/50 group-hover:bg-black/60 transition-all duration-300">
                                            <BsPlayFill className="text-2xl text-white ml-0.5" />
                                        </div>
                                        <span className="text-gray-400 text-xs mt-3 font-mono uppercase tracking-wider">Video</span>
                                    </div>
                                </>
                            )}

                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-5">
                                <span className="text-white font-title text-xs tracking-[0.25em] uppercase border border-white/40 rounded-full px-4 py-1.5 backdrop-blur-sm">
                                    {item.type === "video" ? "Reproducir" : "Ampliar"}
                                </span>
                            </div>
                        </div>
                    ))}

                    <div className="flex-shrink-0 w-0.5 snap-end" />
                </div>

                {canScrollRight && (
                    <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-neutral-900 to-transparent pointer-events-none hidden sm:block" />
                )}
                {canScrollLeft && (
                    <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-neutral-900 to-transparent pointer-events-none hidden sm:block" />
                )}
            </div>
        </div>
    );
};

export const Landing = () => {
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

    const slides = items.map((item) => ({
      ...item,
      ...(item.type === "image" ? { src: lightboxSrc(item.id) } : {}),
    }));

    setLightbox({ open: true, index: i, items, slides, category: categoryId });
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
    "@type": "LocalBusiness",
    "@id": "https://byphnix.vercel.app/#business",
    name: "Aroa Carmona Fotografía - Byphnix",
    image: "https://byphnix.vercel.app/assets/CARROUSEL1.JPG?v=06022026",
    url: "https://byphnix.vercel.app",
    telephone: "+34 677 36 90 40",
    email: "imaroacarmona@gmail.com",
    description: "Aroa Carmona (Byphnix), fotógrafa profesional especializada en bodas, ceremonias, retratos, eventos y danza en Granollers, Les Franqueses, Vallès Oriental y Barcelona. Reportajes fotográficos creativos y emocionales.",
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
    areaServed: [
      "Granollers",
      "Les Franqueses del Vallès",
      "Barcelona",
      "Vallès Oriental",
      "Vallès Occidental",
      "Mollet del Vallès",
      "Cardedeu",
      "La Garriga",
      "Caldes de Montbui",
      "Sant Celoni",
      "Catalunya"
    ],
    sameAs: [
      "https://www.instagram.com/byphnix"
    ],
    priceRange: "€€",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "20:00"
    },
    knowsAbout: [
      "Fotografía de bodas",
      "Fotografía de retratos",
      "Fotografía de ceremonias",
      "Fotografía de eventos",
      "Fotografía de danza",
      "Creación de contenido",
      "Reportaje fotográfico",
      "Sesiones de fotos profesional"
    ]
  };

  return (
    <>
      <Head>
        <title>Aroa Carmona | Fotógrafa de Bodas en Granollers, Les Franqueses y Barcelona</title>
        <meta name="description" content="Aroa Carmona (Byphnix), fotógrafa profesional en Granollers y Barcelona. Especialista en fotografía de bodas, ceremonias, retratos y eventos en Vallès Oriental. Presupuestos sin compromiso." />
        <meta name="keywords" content="fotógrafa bodas Granollers, fotógrafa Les Franqueses, Aroa Carmona fotógrafa, fotografía bodas Barcelona, reportaje fotográfico Vallès Oriental, Byphnix, fotógrafa Granollers, fotógrafa Vallès Oriental, sesiones de fotos Barcelona, fotografía profesional Granollers" />
        <meta name="author" content="Daniel Castro Martín" />
        <meta name="robots" content="index, follow" />

        <link rel="canonical" href="https://byphnix.vercel.app/" />
        <link rel="alternate" hreflang="es" href="https://byphnix.vercel.app/" />
        <link rel="alternate" hreflang="en" href="https://byphnix.vercel.app/en/" />
        <link rel="alternate" hreflang="fr" href="https://byphnix.vercel.app/fr/" />
        <link rel="alternate" hreflang="x-default" href="https://byphnix.vercel.app/" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://byphnix.vercel.app/" />
        <meta property="og:title" content="Aroa Carmona | Fotógrafa de Bodas en Granollers, Les Franqueses y Barcelona" />
        <meta property="og:description" content="Aroa Carmona (Byphnix), fotógrafa profesional en Granollers. Especialista en bodas, ceremonias, retratos y eventos en Vallès Oriental." />
        <meta property="og:image" content="https://byphnix.vercel.app/assets/CARROUSEL1.JPG?v=06022026" />
        <meta property="og:locale" content="es_ES" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://byphnix.vercel.app/" />
        <meta property="twitter:title" content="Aroa Carmona | Fotógrafa de Bodas en Granollers y Barcelona" />
        <meta property="twitter:description" content="Fotografía profesional de bodas, retratos y eventos en Granollers, Les Franqueses y Vallès Oriental. Aroa Carmona - Byphnix." />
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
          .gallery-slider::-webkit-scrollbar {
            height: 3px;
          }
          .gallery-slider::-webkit-scrollbar-track {
            background: transparent;
          }
          .gallery-slider::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
          }
          .gallery-slider::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 255, 255, 0.25);
          }
          .gallery-slider {
            scrollbar-width: thin;
            scrollbar-color: rgba(255, 255, 255, 0.1) transparent;
          }
        `}</style>
      </Head>

      <div className="min-h-screen w-full min-w-0 bg-neutral-900 text-neutral-content selection:bg-orange-500 selection:text-white overflow-x-hidden">
        
        {/* ---------- HERO SECTION ---------- */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background Image with Parallax-like feel (static for perf, can be fixed) */}
          <div className="absolute inset-0 z-0">
             <Image
                src="/assets/CARROUSEL1.JPG?v=06022026" // Using one of your best shots as hero bg
                alt="Aroa Carmona Byphnix — fotógrafa de bodas, retratos y eventos en Granollers y Barcelona"
                fill
                className="object-cover opacity-40 grayscale-[20%]"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-neutral-900" />
          </div>

          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto space-y-8">
            <div>
                <span className="tracking-[0.3em] text-xs md:text-sm uppercase text-orange-400 font-bold mb-4 block">
                    Portfolio & Gallery
                </span>
                <h1 className="font-title text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight">
                    Aroa<br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-200 to-orange-500">Carmona</span>
                </h1>
            </div>

            <div className="flex flex-col md:flex-row gap-4 justify-center items-center pt-8">
              <Link 
                href="/landing/contact" 
                className="px-8 py-3 bg-orange-700 text-white font-semibold tracking-wide hover:bg-orange-800 transition-all duration-300 rounded-lg"
              >
                RESERVAR SESIÓN
              </Link>
              <Link 
                href="#retratos" 
                className="px-8 py-3 border border-gray-500 text-gray-300 hover:text-white hover:border-white transition-all duration-300 rounded-lg"
              >
                MIS SERVICIOS
              </Link>
            </div>
          </div>

          {/* Scrolldown indicator */}
          <div className="absolute bottom-10 transform -translate-x-1/2 animate-bounce opacity-50">
             <BsArrowDown className="text-3xl text-white"/>
          </div>
        </section>

        {/* ---------- SEO INTRODUCTION ---------- */}
        <section className="py-16 md:py-20 bg-neutral-900">
          <div className="max-w-4xl mx-auto px-6 text-center reveal-on-scroll">
            <h2 className="font-title text-3xl md:text-4xl text-white mb-6">
              Fotógrafa profesional en Granollers, Les Franqueses y Vallès Oriental
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6 font-light">
              Soy <strong className="text-white font-medium">Aroa Carmona</strong>, fotógrafa especializada en 
              <strong className="text-orange-400 font-medium"> bodas, ceremonias, retratos y eventos</strong> en 
              Granollers, Les Franqueses del Vallès, Barcelona y toda la comarca del Vallès Oriental. 
              Mi enfoque combina la fotografía documental con un estilo editorial para crear 
              imágenes que cuentan historias auténticas y emocionales.
            </p>
            <p className="text-gray-400 text-base leading-relaxed font-light max-w-3xl mx-auto">
              Ofrezco servicios de <strong className="text-gray-300 font-medium">reportaje fotográfico de bodas</strong>, 
              sesiones de retrato individual y familiar, fotografía de ceremonias y eventos corporativos, 
              fotografía de danza y creación de contenido para marcas y profesionales. 
              Cada sesión es personalizada y adaptada a tus necesidades, ya sea en exteriores naturales, 
              en estudio o en la localización que elijas. Si buscas una 
              <strong className="text-gray-300 font-medium"> fotógrafa de bodas en Granollers</strong> o 
              alrededores, estaré encantada de acompañarte en un día tan especial.
            </p>
          </div>
        </section>

        {/* ---------- DYNAMIC GALLERY ---------- */}
        <section id="gallery" className="py-20 bg-neutral-900">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16 reveal-on-scroll">
                    <h2 className="font-title text-4xl md:text-5xl mb-4 text-white">Servicios de Fotografía en Granollers y Vallès Oriental</h2>
                    <div className="h-1 w-20 bg-orange-500 mx-auto" />
                    <p className="mt-4 text-gray-400 font-light max-w-2xl mx-auto">Fotografía de bodas, retratos, ceremonias, eventos, danza y creación de contenido. Especialización y pasión en cada disparo en Barcelona, Granollers y Les Franqueses.</p>
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
                <h2 className="font-title text-4xl mb-6 text-white">¿Hablamos de tu sesión?</h2>
                <p className="text-gray-300 mb-8 text-lg font-light">
                    Estoy disponible para nuevos proyectos y colaboraciones en Granollers, Les Franqueses, Barcelona y Vallès Oriental. <br/>
                    Cuéntame tu idea y creemos algo único juntos.
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
