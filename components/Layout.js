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
    <div data-theme={theme} className='h-full grid w-full bg-[url(/assets/Tibidabo.jpg)] bg-cover'>
        <Head>
            <title>{title}</title>
            <meta name="description" content="Byphnix" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <header className='w-full bg-transparent ' >
          <div className=''>
              <Navbar theme={theme}/>

              <div className="relative w-full h-fit flex py-2 items-center menu-title text-accent-content font-bold">

              {/* Selector a la derecha */}
              <div className="ml-auto flex items-center justify-end pr-1">

              </div>
          </div>
          </div>
        </header>

        <main className='w-full '>{children}</main>

        <footer className=''><Footer theme={theme} /></footer>
    </div>
  )
}
