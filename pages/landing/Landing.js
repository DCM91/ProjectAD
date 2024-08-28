import React from 'react'
import { BsGithub, BsLinkedin } from "react-icons/bs";
import en from "@/languages/en"
import es from "@/languages/es"
import fr from "@/languages/fr"
import { useRouter } from 'next/router';


export const Landing = ({theme}) => {
  const router = useRouter()
    let t
    if (router.locale === 'en') {
      t = en
    } else if (router.locale === 'es') {
      t = es
    } else if (router.locale === 'fr') {
      t = fr
    }  
  return (
    <div data-theme={theme} className='p-2 grid'>
        <h1 className='text-center text-3xl text-primary pb-4'>Actividades</h1>

        <div className='p-2 flex flex-wrap gap-5 justify-center'>

            <div class="card bg-base-100 w-80 image-full shadow-xl transform transition-transform duration-300 hover:scale-110">
                <figure>
                    <img
                    src="https://cdn.pixabay.com/photo/2023/07/02/22/42/paragliding-8103063_1280.jpg "
                    alt="AIRE" />
                </figure>
                <div class="card-body">
                    <h2 class="card-title">AIRE</h2>
                    <div class="card-actions justify-end">
                    <button class="btn btn-primary">Ir</button>
                    </div>
                </div>
            </div>

            <div class="card bg-base-100 w-80 image-full shadow-xl transform transition-transform duration-300 hover:scale-110">
                <figure>
                    <img
                    src="https://cdn.pixabay.com/photo/2017/04/27/07/26/rock-climbing-2264698_1280.jpg "
                    alt="MONTAÑA" />
                </figure>
                <div class="card-body">
                    <h2 class="card-title">MONTAÑA</h2>
                    <div class="card-actions justify-end">
                    <button class="btn btn-primary">Ir</button>
                    </div>
                </div>
            </div>

            <div class="card bg-base-100 w-80 image-full shadow-xl transform transition-transform duration-300 hover:scale-110">
                <figure>
                    <img
                    src="https://cdn.pixabay.com/photo/2013/02/09/04/33/scuba-diving-79606_1280.jpg"
                    alt="AGUA" />
                </figure>
                <div class="card-body">
                    <h2 class="card-title">AGUA</h2>
                    <div class="card-actions justify-end">
                    <button class="btn btn-primary">Ir</button>
                    </div>
                </div>
            </div>

            <div class="card bg-base-100 w-80 image-full shadow-xl transform transition-transform duration-300 hover:scale-110">
                <figure>
                    <img
                    src="https://cdn.pixabay.com/photo/2015/12/15/18/29/snow-1094695_1280.jpg"
                    alt="NIEVE" />
                </figure>
                <div class="card-body">
                    <h2 class="card-title">NIEVE</h2>
                    <div class="card-actions justify-end">
                    <button class="btn btn-primary">Ir</button>
                    </div>
                </div>
            </div>

        </div>


    </div>
  )
}
export default Landing;
