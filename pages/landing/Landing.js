import React from "react";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import en from "@/languages/en";
import es from "@/languages/es";
import fr from "@/languages/fr";
import { useRouter } from "next/router";
import Image from "next/image";

export const Landing = ({ theme }) => {
  const router = useRouter();

  let t = en; // valor por defecto
  if (router.locale === "es") t = es;
  if (router.locale === "fr") t = fr;

  return (
    <div
      data-theme={theme}
      className="pb-6 gap-y-6 grid min-h-full bg-transparent"
    >
      {/* HERO */}
      <div className="p-2 place-self-center w-full">
        <div className="relative w-64 h-64 mx-auto">
          <Image
            src="/assets/TTs-removebg.png"
            alt="Sesiones Individuales"
            fill
            className="object-contain"
          />
        </div>

        <h1 className="text-center text-4xl font-bold mt-4">
          {t?.heroTitle ?? "Contenido llamativo"}
        </h1>

        {/* Opcional: subtítulo */}
        <p className="text-center mt-2 opacity-80">
          {t?.heroSubtitle ?? "Texto corto explicando qué ofreces."}
        </p>

        {/* Opcional: botones / RRSS */}
        <div className="flex justify-center gap-4 mt-4">
          <button className="btn btn-primary">
            {t?.heroCta ?? "Reserva tu sesión"}
          </button>
          <a
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
            className="btn btn-ghost btn-circle"
          >
            <BsGithub />
          </a>
          <a
            href="https://linkedin.com/"
            target="_blank"
            rel="noreferrer"
            className="btn btn-ghost btn-circle"
          >
            <BsLinkedin />
          </a>
        </div>

        {/* CAROUSEL */}
        <div className="mt-8">
          <div className="carousel carousel-center bg-transparent max-w-screen space-x-4 mx-auto">
<div className="carousel-item w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 aspect-[4/3]">
              <img
                src="/assets/CARROUSEL4.jpg"
                className="w-full h-full object-cover rounded-box"
                alt="Foto 1"
              />
            </div>
<div className="carousel-item w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 aspect-[4/3]">
              <img
                src="/assets/CARROUSEL2.jpg"
                className="w-full h-full object-cover rounded-box"
                alt="Foto 2"
              />
            </div>
<div className="carousel-item w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 aspect-[4/3]">
              <img
                src="/assets/CARROUSEL3.jpg"
                className="w-full h-full object-cover rounded-box"
                alt="Foto 3"
              />
            </div>
<div className="carousel-item w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 aspect-[4/3]">
              <img
                src="/assets/CARROUSEL1.jpg"
                className="w-full h-full object-cover rounded-box"
                alt="Foto 4"
              />
            </div>
<div className="carousel-item w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 aspect-[4/3]">
              <img
                src="/assets/CARROUSEL5.jpg"
                className="w-full h-full object-cover rounded-box"
                alt="Foto 5"
              />
            </div>            
          </div>
        </div>
      </div>

      
      <div>
        <h1 className="text-center text-3xl text-warning pb-4" id="servicios">Servicios</h1>
        <div className="p-2 flex flex-wrap gap-5 justify-center">
          <div className="card bg-base-100 w-80 image-full shadow-xl transform transition-transform duration-300 hover:scale-110">
            <figure>
              <img
                src="/assets/TTs.jpg"           
                alt="Eventos"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Eventos</h2>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Ir</button>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 w-80 image-full shadow-xl transform transition-transform duration-300 hover:scale-110">
            <figure>
              <img
                src="/assets/TTs.jpg"
                alt="Sesiones Individuales"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Sesiones Individuales</h2>
              <div className="card-actions justify-end">
                <button className=" btn btn-primary">Ir</button>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 w-80 image-full shadow-xl transform transition-transform duration-300 hover:scale-110">
            <figure>
              <img
                src="/assets/TTs.jpg"
                alt="Sessiones Grupales"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Sessiones Grupales</h2>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Ir</button>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 w-80 image-full shadow-xl transform transition-transform duration-300 hover:scale-110">
            <figure>
              <img
                src="/assets/TTs.jpg"
                alt="Recuerdos Inolvidables"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Recuerdos Inolvidables</h2>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Ir</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
