import React from "react";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import en from "@/languages/en";
import es from "@/languages/es";
import fr from "@/languages/fr";
import { useRouter } from "next/router";

export const Landing = ({ theme }) => {
  const router = useRouter();
  let t;
  if (router.locale === "en") {
    t = en;
  } else if (router.locale === "es") {
    t = es;
  } else if (router.locale === "fr") {
    t = fr;
  }
  return (
    <div data-theme={theme} className="py-6 gap-y-6 grid min-h-full">
      <div className="border border-red-500 p-6 place-self-center w-full bg-[url(/assets/Tibidabo.jpg)] bg-cover">
      <h1 className="text-center h-80" >CONTENT LLAMATIVO</h1>
      <h1 className="text-center h-80" >CONTENT LLAMATIVO</h1>
      <h1 className="text-center h-80" >CONTENT LLAMATIVO</h1>
      </div>
      <div>
        <h1 className="text-center text-3xl text-primary pb-4">Servicios</h1>
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
                <button className="btn btn-primary">Ir</button>
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

