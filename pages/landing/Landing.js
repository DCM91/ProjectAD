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
        <h1 className='text-center text-2xl'>Actividades</h1>
        <div className='p-2 flex flex-wrap gap-3 justify-center'>
            <div className='border-2 border-red-600 h-40 w-40 p-2'>AIRE</div>
            <div className='border-2 border-red-600 h-40 w-40 p-2'>MONTANYA</div>
            <div className='border-2 border-red-600 h-40 w-40 p-2'>AGUA</div>
            <div className='border-2 border-red-600 h-40 w-40 p-2'>NIEVE</div>
        </div>


    </div>
  )
}
export default Landing;
