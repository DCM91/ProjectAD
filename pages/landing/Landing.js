import React, { useEffect } from "react";
import { BsInstagram } from "react-icons/bs";
import en from "@/languages/en";
import es from "@/languages/es";
import fr from "@/languages/fr";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

export const Landing = ({ theme }) => {
  const router = useRouter();

  let t = en; // valor por defecto
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

  return (
    <div
      data-theme={theme}
      className="pb-6 gap-y-6 grid min-h-full bg-transparent"
    >
      {/* HERO */}
      <div className="p-2 place-self-center w-full">
        <div className="relative w-80 h-60 mx-auto">
          <Image
            src="/assets/TTs-removebg_white.png"
            alt="Logo"
            fill
            className="object-contain"
            priority
            sizes="(max-width: 768px) 60vw, 320px"
          />

          <p  className="font-title font-bold text-xl  text-white grid h-full place-content-end pb-7 pr-5 
                      opacity-0 translate-y-3 will-change-transform will-change-opacity reveal">
            By Aroa Carmona
          </p>
        </div>

        <h1 className="font-title text-center text-4xl font-bold mt-1">
          {t?.heroTitle ?? "Mi pasion"}
        </h1>

        {/* Subtítulo */}
        <p className="font-title text-center text-lg text-white max-w-2xl mx-auto leading-relaxed tracking-wide">
          Soy Aroa Carmona, fotógrafa de vocación y enamorada de los pequeños detalles.<br/>
          Me dedico a capturar momentos únicos en eventos, sesiones personales y fotografía animal.<br/>
          Mi objetivo es crear imágenes que transmitan emoción, naturalidad y belleza auténtica.
        </p>

        {/* Botones / RRSS */}
        <div className="flex justify-center gap-4 mt-4">
          <Link href="/landing/contact" className="btn btn-secondary">
            {t?.heroSecondaryCta ?? "Contactar"}
          </Link>
          <a
            href="https://www.instagram.com/byphnix"
            target="_blank"
            rel="noreferrer"
            className="btn btn-ghost btn-circle scale-150"
          >
            <BsInstagram />
          </a>

        </div>

        {/* CAROUSEL */}
        <div className="mt-8">
          <div className="carousel carousel-center bg-transparent max-w-screen mx-auto space-x-4 px-4">
            <div className="carousel-item relative w-4/5 h-[50vh] sm:w-1/2 sm:h-64 md:w-1/3 md:h-72 lg:w-1/4 lg:h-80">
              <Image
                src="/assets/CARROUSEL4.webp"
                alt="Foto 1"
                fill
                className="object-cover rounded-box"
                sizes="(max-width: 640px) 80vw,
                       (max-width: 1024px) 50vw,
                       25vw"
              />
            </div>

            <div className="carousel-item relative w-4/5 h-[50vh] sm:w-1/2 sm:h-64 md:w-1/3 md:h-72 lg:w-1/4 lg:h-80">
              <Image
                src="/assets/CARROUSEL2.webp"
                alt="Foto 2"
                fill
                className="object-cover rounded-box"
                sizes="(max-width: 640px) 80vw,
                       (max-width: 1024px) 50vw,
                       25vw"
              />
            </div>

            <div className="carousel-item relative w-4/5 h-[50vh] sm:w-1/2 sm:h-64 md:w-1/3 md:h-72 lg:w-1/4 lg:h-80">
              <Image
                src="/assets/CARROUSEL3.webp"
                alt="Foto 3"
                fill
                className="object-cover rounded-box"
                sizes="(max-width: 640px) 80vw,
                       (max-width: 1024px) 50vw,
                       25vw"
              />
            </div>

            <div className="carousel-item relative w-4/5 h-[50vh] sm:w-1/2 sm:h-64 md:w-1/3 md:h-72 lg:w-1/4 lg:h-80">
              <Image
                src="/assets/CARROUSEL1.webp"
                alt="Foto 4"
                fill
                className="object-cover rounded-box"
                sizes="(max-width: 640px) 80vw,
                       (max-width: 1024px) 50vw,
                       25vw"
              />
            </div>

            <div className="carousel-item relative w-4/5 h-[50vh] sm:w-1/2 sm:h-64 md:w-1/3 md:h-72 lg:w-1/4 lg:h-80">
              <Image
                src="/assets/CARROUSEL5.webp"
                alt="Foto 5"
                fill
                className="object-cover rounded-box"
                sizes="(max-width: 640px) 80vw,
                       (max-width: 1024px) 50vw,
                       25vw"
              />
            </div>
          </div>
        </div>
      </div>

      {/* SERVICIOS */}
      <div>
        <h1
          className="text-center text-3xl text-warning pb-4"
          id="servicios"
        >
          Servicios
        </h1>

        <div className="p-2 flex flex-wrap gap-5 justify-center">
          {/* Card 1 */}
          <div className="card bg-base-100 w-80 image-full shadow-xl transform transition-transform duration-300 hover:scale-110">
            <figure className="relative w-full h-60">
              <Image
                src="/assets/TTs.jpg"
                alt="Eventos"
                fill
                className="object-cover"
                sizes="320px"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Eventos</h2>
            </div>
          </div>

          {/* Card 2 */}
          <div className="card bg-base-100 w-80 image-full shadow-xl transform transition-transform duration-300 hover:scale-110">
            <figure className="relative w-full h-60">
              <Image
                src="/assets/TTs.jpg"
                alt="Sesiones Individuales"
                fill
                className="object-cover"
                sizes="320px"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Sesiones Individuales</h2>
            </div>
          </div>

          {/* Card 3 */}
          <div className="card bg-base-100 w-80 image-full shadow-xl transform transition-transform duration-300 hover:scale-110">
            <figure className="relative w-full h-60">
              <Image
                src="/assets/TTs.jpg"
                alt="Sessiones Grupales"
                fill
                className="object-cover"
                sizes="320px"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Sessiones Grupales</h2>
            </div>
          </div>

          {/* Card 4 */}
          <div className="card bg-base-100 w-80 image-full shadow-xl transform transition-transform duration-300 hover:scale-110">
            <figure className="relative w-full h-60">
              <Image
                src="/assets/TTs.jpg"
                alt="Recuerdos Inolvidables"
                fill
                className="object-cover"
                sizes="320px"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Recuerdos Inolvidables</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full p-2">
        <p className="font-body text-white text-start text-3xl">AROA CARMONA</p><br/>
        <p className="font-body text-white text-start text-l" >TEL: =34 677 XX XX XX</p>
        <p className="font-body text-white text-start text-l" >Barcelona, Cataluña, España</p>
        <p className="font-body text-white text-start text-l" >ACARMONA@BYPHNIX.COM</p>
      </div>


      {/* FINAL */}
    </div>
  );
};

export default Landing;
