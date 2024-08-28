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

            <div className='w-full h-16 flex justify-between items-center'>

              <div>
                <label class="input input-bordered flex items-center w-64 gap-2">
                <input type="text" class="grow" placeholder="Search" />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  class="h-4 w-4 opacity-70">
                  <path
                    fill-rule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clip-rule="evenodd" />
                </svg>
                </label>
              </div>

              <div className='flex items-center justify-end pr-4'>          
                  <BsFillSunFill className='text-lg mx-1'/>
                  <input type="checkbox" className="toggle toggle-md" id="luxury" checked={theme === "luxury"} onChange={handleTheme} />
                  <BsFillMoonStarsFill className='mx-1 mr-3' />
              </div>
            </div>

          </div>
        </header>

        <main className=''>{children}</main>

        <footer className=''><Footer theme={theme} /></footer>
    </div>
  )
}
