import Head from 'next/head'
import { Footer } from './Footer'
import { Navbar } from './navbar'
import { Selector } from './selector'
import { useState } from "react"
import { BsFillSunFill, BsFillMoonStarsFill } from "react-icons/bs";




export const Layout = ({ title = "Byphnix" , children}) => {
  const [theme, setTheme] = useState("autumn")
  const handleTheme = () =>{
    setTheme(theme === "autumn" ? "luxury" : "autumn")
  }
  const typetheme=["luxury", "autumn"]


  return (
    <div data-theme={theme} className='h-full grid w-full'>
        <Head>
            <title>{title}</title>
            <meta name="description" content="PrrojectAD" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <header className='w-full'>
          <div>
            <Navbar theme={theme}/>

            <div className='w-full h-16 flex justify-end items-center gap-2'>

               <div className='flex items-center justify-end pr-4'>          
                  <BsFillSunFill className='text-lg mx-1'/>
                  <input type="checkbox" className="toggle toggle-md" id="luxury" checked={theme === "luxury"} onChange={handleTheme} />
                  <BsFillMoonStarsFill className='mx-1 mr-3' />
              </div>
            </div>

          </div>
        </header>

        <main className='w-full'>{children}</main>

        <footer className=''><Footer theme={theme} /></footer>
    </div>
  )
}
