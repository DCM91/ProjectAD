import Head from 'next/head'
import { Footer } from './Footer'
import { Navbar } from './navbar'
import { Selector } from './selector'
import { useState } from "react"
import { BsFillSunFill, BsFillMoonStarsFill } from "react-icons/bs";




export const Layout = ({ title = "ProjectAD" , children}) => {
  const [theme, setTheme] = useState("cupcake")
  const handleTheme = () =>{
    setTheme(theme === "cupcake" ? "luxury" : "cupcake")
  }
  const typetheme=["luxury", "cupcake"]


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
            <div className='w-full h-12 flex items-center justify-end pr-4'>
              <BsFillSunFill className='text-lg mx-1'/>
              <input type="checkbox" className="toggle toggle-md" id="luxury" checked={theme === "luxury"} onChange={handleTheme} />
              <BsFillMoonStarsFill className='mx-1 mr-3' />
              <Selector />
            </div>
          </div>
        </header>

        <main className=''>{children}</main>

        <footer className=''><Footer theme={theme} /></footer>
    </div>
  )
}
