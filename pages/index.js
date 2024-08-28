import { useRouter } from "next/router"
import { Layout } from "../components/Layout"
import en from "@/languages/en"
import es from "@/languages/es"
import fr from "@/languages/fr"
import { Landing } from "./landing/Landing"


export default function Home() {
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
     <Layout title="ProjectAD - Home">
        <div className='w-full'>
            <Landing/>
        </div>   
      </Layout>
  )
}
