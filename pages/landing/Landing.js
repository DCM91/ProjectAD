import React, { useEffect } from "react";
import { BsInstagram } from "react-icons/bs";
import en from "@/languages/en";
import es from "@/languages/es";
import fr from "@/languages/fr";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

export const Landing = ({ theme }) => {
  const router = useRouter();

  let t = en;
  if (router.locale === "es") t = es;
  if (router.locale === "fr") t = fr;

  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("revealed");
      });
    });

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://byphnix.com/#fotografa-aroad-carmona",
    name: "By Phnix - Fotografía by Aroa Carmona",
    image: "https://byphnix.com/assets/CARROUSEL1.webp",
    url: "https://byphnix.com",
    telephone: "+34 677000000",
    priceRange: "€€",
    description:
      "Fotógrafa profesional en Barcelona y Granollers especializada en eventos, sesiones individuales, fotografía animal y recuerdos familiares.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Granollers",
      addressRegion: "Barcelona",
      addressCountry: "ES",
    },
    areaServed: [
      "Granollers",
      "Barcelona",
      "Vallès Oriental",
      "Catalunya",
      "España",
    ],
    sameAs: ["https://www.instagram.com/byphnix"],
    serviceType: [
      "Fotografía de eventos",
      "Sesiones individuales",
      "Sesiones grupales",
      "Fotografía de mascotas",
      "Reportajes familiares",
    ],
  };

  return (
    <>
      <Head>
        <title>
          Fotógrafa profesional en Barcelona y Granollers | Aroa Carmona
        </title>
        <meta
          name="description"
          content="Aroa Carmona, fotógrafa profesional en Barcelona y Granollers. Fotografía de eventos, sesiones individuales, grupales y fotografía animal. Imágenes naturales y llenas de emoción."
        />
        <meta
          name="keywords"
          content="fotógrafa Barcelona, fotógrafa Granollers, fotógrafa profesional, fotografía de eventos Barcelona, sesiones de fotos Granollers, fotógrafa de mascotas, fotógrafa en Vallès Oriental, fotografía natural, reportajes fotográficos Barcelona"
        />
        <meta
          property="og:title"
          content="Fotógrafa profesional en Barcelona y Granollers | Aroa Carmona"
        />
        <meta
          property="og:description"
          content="Fotografía profesional en Barcelona y Granollers: eventos, sesiones personales, grupos y fotografía animal. Por Aroa Carmona."
        />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="es_ES" />
        <meta
          property="og:image"
          content="https://byphnix.com/assets/CARROUSEL1.webp"
        />
        <meta property="og:url" content="https://byphnix.com" />
        <link rel="canonical" href="https://byphnix.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <div
        data-theme={theme}
        className="pb-6 gap-y-6 grid min-h-full bg-transparent"
      >
        <main>
          {/* ---------- HERO SECTION ---------- */}
          <section
            className="p-2 place-self-center w-full"
            aria-labelledby="hero-heading"
          >
            <div className="relative w-80 h-60 mx-auto">
              <Image
                src="/assets/TTs-removebg_white.png"
                alt="By Phnix - Fotografía profesional en Barcelona y Granollers, logo de Aroa Carmona"
                fill
                className="object-contain"
                priority
              />

              <p className="font-title font-bold text-xl text-white grid h-full place-content-end pb-7 pr-5 opacity-0 translate-y-3 reveal">
                By Aroa Carmona
              </p>
            </div>

            <h1
              id="hero-heading"
              className="font-title text-center text-4xl font-bold mt-1 text-white"
            >
              Fotógrafa profesional en Barcelona y Granollers
            </h1>

            <p className="font-title text-center text-lg text-white max-w-2xl mx-auto mt-3">
              Soy <strong>Aroa Carmona</strong>, fotógrafa profesional en{" "}
              <strong>Granollers</strong> y <strong>Barcelona</strong>. Capturo
              momentos únicos en{" "}
              <strong>
                eventos, sesiones personales, grupos y fotografía animal
              </strong>
              .
            </p>

            {/* Botones */}
            <div className="flex justify-center gap-4 mt-4">
              <Link href="/landing/contact" className="btn btn-secondary">
                {t?.heroSecondaryCta ?? "Contactar para una sesión"}
              </Link>
              <a
                href="https://www.instagram.com/byphnix"
                target="_blank"
                rel="noreferrer"
                className="btn btn-ghost btn-circle scale-150"
                aria-label="Instagram"
              >
                <BsInstagram />
              </a>
            </div>

            {/* ---------- LOOP CAROUSEL ---------- */}
            <div
              id="loopCarousel"
              className="carousel carousel-center bg-transparent max-w-screen mx-auto space-x-4 px-4 mt-8"
            >
              {/* 5 ORIGINALES */}
              {[
                "CARROUSEL4.webp",
                "CARROUSEL2.webp",
                "CARROUSEL3.webp",
                "CARROUSEL1.webp",
                "CARROUSEL5.webp",
              ].map((img, i) => (
                <div
                  key={i}
                  className="carousel-item relative w-4/5 h-[50vh] sm:w-1/2 sm:h-64 md:w-1/3 md:h-72 lg:w-1/4 lg:h-80"
                >
                  <Image
                    src={`/assets/${img}`}
                    alt="Fotografía profesional"
                    fill
                    className="object-cover rounded-box"
                  />
                </div>
              ))}
            </div>
          </section>{" "}
          {/* CIERRE CORRECTO DEL HERO */}
          {/* SERVICIOS */}
          <section aria-labelledby="servicios-heading">
            <h2
              className="text-center text-3xl text-warning pb-4 mt-4"
              id="servicios-heading"
            >
              Servicios de fotografía en Barcelona y Granollers
            </h2>

            <p className="font-body text-center text-white max-w-3xl mx-auto mb-2 px-4">
              Ofrezco servicios de fotografía profesional en{" "}
              <strong>Granollers</strong>, <strong>Barcelona</strong> y
              alrededores: eventos especiales, sesiones individuales y grupales
              y recuerdos con tus personas y animales más importantes.
            </p>

            <div className="p-2 flex flex-wrap gap-5 justify-center">
              {/* Card 1 */}
              <article className="card bg-base-100 w-80 image-full shadow-xl transform transition-transform duration-300 hover:scale-110">
                <figure className="relative w-full h-60">
                  <Image
                    src="/assets/TTs.webp"
                    alt="Fotografía de eventos en Barcelona y Granollers: celebraciones, cumpleaños y ocasiones especiales"
                    fill
                    className="object-cover"
                    sizes="320px"
                  />
                </figure>
                <div className="card-body">
                  <h3 className="card-title">Eventos</h3>
                  <p className="text-sm">
                    Cobertura fotográfica de{" "}
                    <strong>eventos en Barcelona y Granollers</strong>:
                    celebraciones, cumpleaños, reuniones y encuentros
                    especiales.
                  </p>
                </div>
              </article>

              {/* Card 2 */}
              <article className="card bg-base-100 w-80 image-full shadow-xl transform transition-transform duration-300 hover:scale-110">
                <figure className="relative w-full h-60">
                  <Image
                    src="/assets/TTs.webp"
                    alt="Sesiones de fotos individuales en Granollers: retratos naturales y profesionales"
                    fill
                    className="object-cover"
                    sizes="320px"
                  />
                </figure>
                <div className="card-body">
                  <h3 className="card-title">Sesiones Individuales</h3>
                  <p className="text-sm">
                    Sesiones de retrato personal en exterior o interior en
                    <strong> Granollers</strong> y <strong>Barcelona</strong>,
                    pensadas para que te sientas tú mismo delante de la cámara.
                  </p>
                </div>
              </article>

              {/* Card 3 */}
              <article className="card bg-base-100 w-80 image-full shadow-xl transform transition-transform duration-300 hover:scale-110">
                <figure className="relative w-full h-60">
                  <Image
                    src="/assets/TTs.webp"
                    alt="Sesiones de fotos grupales y familiares en Barcelona y Vallès Oriental"
                    fill
                    className="object-cover"
                    sizes="320px"
                  />
                </figure>
                <div className="card-body">
                  <h3 className="card-title">Sesiones Grupales</h3>
                  <p className="text-sm">
                    <strong>Sesiones grupales y familiares</strong> para
                    capturar vuestra complicidad: amigos, familia, pareja o
                    equipo.
                  </p>
                </div>
              </article>

              {/* Card 4 */}
              <article className="card bg-base-100 w-80 image-full shadow-xl transform transition-transform duration-300 hover:scale-110">
                <figure className="relative w-full h-60">
                  <Image
                    src="/assets/TTs.webp"
                    alt="Recuerdos fotográficos inolvidables con tus seres queridos y mascotas"
                    fill
                    className="object-cover"
                    sizes="320px"
                  />
                </figure>
                <div className="card-body">
                  <h3 className="card-title">Recuerdos Inolvidables</h3>
                  <p className="text-sm">
                    Reportajes pensados para convertir tus momentos importantes
                    en <strong>recuerdos visuales</strong> que puedas revivir
                    siempre.
                  </p>
                </div>
              </article>
            </div>
          </section>
          {/* INFO / CONTACTO */}
          <section
            className="w-full p-2 mt-4"
            id="contacto"
            aria-labelledby="contacto-heading"
          >
            <br />
            <p className="font-body text-white text-start text-base md:text-lg">
              AROA CARMONA · Fotógrafa profesional
            </p>
            <p className="font-body text-white text-start text-base md:text-lg">
              TEL: +34 677 XX XX XX
            </p>
            <p className="font-body text-white text-start text-base md:text-lg">
              Granollers · Barcelona · Catalunya · España
            </p>
            <p className="font-body text-white text-start text-base md:text-lg">
              Email:{" "}
              <a
                href="mailto:acarmona@byphnix.com"
                className="underline hover:no-underline"
              >
                ACARMONA@BYPHNIX.COM
              </a>
            </p>
          </section>
        </main>

        {/* FINAL */}
      </div>
    </>
  );
};

export default Landing;
