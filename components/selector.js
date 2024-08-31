import { useRouter } from "next/router"
import en from "@/languages/en"
import es from "@/languages/es"
import fr from "@/languages/fr"

export const Selector = () => {
    const router = useRouter()
    let t
    if (router.locale === 'en') {
      t = en
    } else if (router.locale === 'es') {
      t = es
    } else if (router.locale === 'fr') {
      t = fr
    }    
    const changeLanguage = (e) => {
      router.push(router.pathname, router.pathname, { locale: e.target.value })

      };
      return (
        <select value={router.locale} onChange={changeLanguage} className="h-8 w- p-1 text-base bg-transparent " >
          <option className="bg-transparent" value="en">English</option>
          <option className="bg-transparent" value="es">Español</option>
          <option className="bg-transparent" value="fr">Français</option>
        </select>
      )
    }
