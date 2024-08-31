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
    <div data-theme={theme} className="p-2 gap-y-6 grid">
      <div>
        <h1 className="text-center text-3xl text-primary pb-4">Actividades</h1>

        <div className="p-2 flex flex-wrap gap-5 justify-center">
          <div className="card bg-base-100 w-80 image-full shadow-xl transform transition-transform duration-300 hover:scale-110">
            <figure>
              <img
                src="https://cdn.pixabay.com/photo/2023/07/02/22/42/paragliding-8103063_1280.jpg "
                alt="AIRE"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">AIRE</h2>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Ir</button>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 w-80 image-full shadow-xl transform transition-transform duration-300 hover:scale-110">
            <figure>
              <img
                src="https://cdn.pixabay.com/photo/2017/04/27/07/26/rock-climbing-2264698_1280.jpg "
                alt="MONTAÑA"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">MONTAÑA</h2>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Ir</button>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 w-80 image-full shadow-xl transform transition-transform duration-300 hover:scale-110">
            <figure>
              <img
                src="https://cdn.pixabay.com/photo/2013/02/09/04/33/scuba-diving-79606_1280.jpg"
                alt="AGUA"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">AGUA</h2>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Ir</button>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 w-80 image-full shadow-xl transform transition-transform duration-300 hover:scale-110">
            <figure>
              <img
                src="https://cdn.pixabay.com/photo/2015/12/15/18/29/snow-1094695_1280.jpg"
                alt="NIEVE"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">NIEVE</h2>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Ir</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PROMOCIONES---------------------------------------------------------------------------------------------------------------- */}

      <div className="">
        <h1 className="text-center text-3xl text-primary py-4">Promociones</h1>
        <div className="carousel carousel-center bg-neutral rounded-box space-x-4 p-4">
          <div className="carousel-item grid">
            <img
              src="https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/0d/ca/bb/0b.jpg"
              className="rounded-box"
              style={{ width: "300px", height: "200px", objectFit: "cover" }}
            />
            <p className="text-secondary text-xl">Barranquismo</p>
            <p className="text-secondary text-lg">Desde 20e</p>
          </div>
          <div className="carousel-item">
            <img
              src="https://www.hoynoticias.cl/wp-content/uploads/2023/07/Conoce-las-mejores-pistas-disponibles-en-Santiago-para-practicar-karting-1-scaled.webp"
              className="rounded-box"
              style={{ width: "300px", height: "200px", objectFit: "cover" }}
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://sierradelguadarrama.com/wp-content/uploads/2023/04/puenting-salto-madrid.jpg"
              className="rounded-box"
              style={{ width: "300px", height: "200px", objectFit: "cover" }}
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://openwater.es/wp-content/uploads/2019/06/snorkel-espa%C3%B1a.png"
              className="rounded-box"
              style={{ width: "300px", height: "200px", objectFit: "cover" }}
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://www.weeky.es/wp-content/uploads/2018/01/paintball-702x336.jpg"
              className="rounded-box"
              style={{ width: "300px", height: "200px", objectFit: "cover" }}
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://rockclimbingvalencia.com/wp-content/uploads/2022/02/Rapel-2.jpg"
              className="rounded-box"
              style={{ width: "300px", height: "200px", objectFit: "cover" }}
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://res.cloudinary.com/manawa/image/upload/v1639133947/articles/3588/photo-of-man-paddling-kayak-in-raging-river-2250521.jpg"
              className="rounded-box"
              style={{ width: "300px", height: "200px", objectFit: "cover" }}
            />
          </div>
        </div>
      </div>
      <div className='pb-8'>
      <h1 className="text-center text-3xl text-primary py-4">TOP de Septiembre</h1>
      <div className="flex w-full flex-col">
            <div className="card bg-base-300 rounded-box grid h-20 place-items-center">content</div>
            <div className="divider"></div>
            <div className="card bg-base-300 rounded-box grid h-20 place-items-center">content</div>
            <div className="divider"></div>
            <div className="card bg-base-300 rounded-box grid h-20 place-items-center">content</div>
        </div>

      </div>
    </div>
  );
};
export default Landing;
