import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import en from "@/languages/en";
import es from "@/languages/es";
import fr from "@/languages/fr";
import { Layout } from "@/components/Layout";
import Head from "next/head";
import { MdEmail, MdLocationOn, MdCameraAlt } from "react-icons/md";
import { BsInstagram } from "react-icons/bs";
import emailjs from '@emailjs/browser';

const Contact = () => {
  const router = useRouter();
  const formRef = useRef();

  // i18n
  let t = en;
  if (router.locale === "es") t = es;
  if (router.locale === "fr") t = fr;

  const [form, setForm] = useState({
    user_name: "",
    user_email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState(null); // "success" | "error" | null
  const [loading, setLoading] = useState(false);

  // Animation effect on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      document.getElementById("contact-container")?.classList.remove("opacity-0", "translate-y-10");
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const YOUR_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID; 
    const YOUR_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const YOUR_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC;

    emailjs.sendForm(YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, formRef.current, YOUR_PUBLIC_KEY)
      .then((result) => {
          console.log(result.text);
          setStatus("success");
          setForm({ user_name: "", user_email: "", subject: "", message: "" });
      }, (error) => {
          console.log(error.text);
          setStatus("error");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const seoTitle = "Contacto | Fotógrafa de Bodas Granollers — Aroa Carmona";
  const seoDescription = "Contacta con Aroa Carmona, fotógrafa de bodas en Granollers, Les Franqueses y Barcelona. Reserva tu sesión de fotos para bodas, retratos, ceremonias y eventos en Vallès Oriental.";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: seoTitle,
    description: seoDescription,
    url: "https://byphnix.vercel.app/landing/contact",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://byphnix.vercel.app/landing/contact",
    },
    author: {
       "@type": "Person",
       name: "Daniel Castro Martín"
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "imaroacarmona@gmail.com",
      areaServed: ["Barcelona", "Granollers", "Vallès Oriental", "Catalunya"],
      availableLanguage: ["es", "en", "fr"],
    },
  };

  return (
    <Layout title={seoTitle}>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content="contacto fotógrafa bodas Granollers, fotógrafa Les Franqueses, Aroa Carmona contacto, fotógrafa bodas Barcelona, reservar sesión fotos Granollers, fotógrafa Vallès Oriental, sesiones de fotos Barcelona, reportaje bodas Granollers" />
        <meta name="author" content="Daniel Castro Martín" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://byphnix.vercel.app/landing/contact" />
        <meta property="og:locale" content="es_ES" />
        <link rel="canonical" href="https://byphnix.vercel.app/landing/contact" />
        <link rel="alternate" hreflang="es" href="https://byphnix.vercel.app/landing/contact" />
        <link rel="alternate" hreflang="en" href="https://byphnix.vercel.app/en/landing/contact" />
        <link rel="alternate" hreflang="fr" href="https://byphnix.vercel.app/fr/landing/contact" />
        <link rel="alternate" hreflang="x-default" href="https://byphnix.vercel.app/landing/contact" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </Head>

      <div className="min-h-screen bg-neutral-900 pt-24 pb-12 px-4 md:px-8 selection:bg-orange-500 selection:text-white">
        
        <div 
            id="contact-container" 
            className="max-w-6xl mx-auto opacity-0 translate-y-10 transition-all duration-1000 ease-out"
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                
                {/* Left Column: Information */}
                <div className="space-y-8 flex flex-col justify-center">
                    <div>
                        <span className="text-orange-500 font-bold tracking-widest text-xs md:text-sm uppercase mb-2 block">
                            Estamos en contacto
                        </span>
                        <h1 className="font-title text-4xl md:text-6xl text-white leading-tight mb-6">
                            ¿Hablamos de tu <br/> Próxima Sesión?
                        </h1>
                        <p className="text-gray-400 font-light text-lg leading-relaxed max-w-md">
                            Estoy aquí para resolver tus dudas y planificar juntos una sesión que capture exactamente lo que buscas.
                            Ya sea en Granollers, Les Franqueses, Barcelona o cualquier rincón del Vallès Oriental.
                        </p>
                    </div>

                    <div className="space-y-6 pt-4">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-neutral-800 rounded-lg text-orange-500">
                                <MdEmail size={24} />
                            </div>
                            <div>
                                <h2 className="text-white font-semibold text-lg">Email</h2>
                                <a href="mailto:imaroacarmona@gmail.com" className="text-gray-400 hover:text-white transition-colors underline decoration-gray-600/50 underline-offset-2">
                                    imaroacarmona@gmail.com
                                </a>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-neutral-800 rounded-lg text-orange-500">
                                <MdLocationOn size={24} />
                            </div>
                            <div>
                                <h2 className="text-white font-semibold text-lg">Ubicación</h2>
                                <p className="text-gray-400">
                                    Granollers · Barcelona · Vallès Oriental
                                </p>
                            </div>
                        </div>

                         <div className="flex items-start gap-4">
                            <div className="p-3 bg-neutral-800 rounded-lg text-orange-500">
                                <BsInstagram size={24} />
                            </div>
                            <div>
                                <h2 className="text-white font-semibold text-lg">Instagram</h2>
                                <a href="https://instagram.com/byphnix" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors underline decoration-gray-600/50 underline-offset-2">
                                    @byphnix
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-neutral-800/40 p-8 md:p-12 rounded-3xl border border-white/5 backdrop-blur-sm">
                    <h2 className="text-2xl font-title text-white mb-6">Envíame un mensaje</h2>
                    
                    <form ref={formRef} onSubmit={sendEmail} className="space-y-5">
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="form-control">
                                <label htmlFor="user_name" className="label pl-0 text-xs uppercase text-gray-300 font-bold">Nombre</label>
                                <input
                                    id="user_name"
                                    name="user_name" 
                                    type="text"
                                    autoComplete="name"
                                    className="input bg-neutral-900 border-neutral-700 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 text-white w-full rounded-lg"
                                    placeholder="Tu nombre"
                                    value={form.user_name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label htmlFor="user_email" className="label pl-0 text-xs uppercase text-gray-300 font-bold">Email</label>
                                <input
                                    id="user_email"
                                    name="user_email"
                                    type="email"
                                    autoComplete="email"
                                    className="input bg-neutral-900 border-neutral-700 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 text-white w-full rounded-lg"
                                    placeholder="tucorreo@ejemplo.com"
                                    value={form.user_email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-control">
                            <label htmlFor="subject" className="label pl-0 text-xs uppercase text-gray-300 font-bold">Asunto</label>
                            <input
                                id="subject"
                                name="subject"
                                type="text"
                                autoComplete="off"
                                className="input bg-neutral-900 border-neutral-700 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 text-white w-full rounded-lg"
                                placeholder="Sesión de fotos..."
                                value={form.subject}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-control">
                            <label htmlFor="message" className="label pl-0 text-xs uppercase text-gray-300 font-bold">Mensaje</label>
                            <textarea
                                id="message"
                                name="message"
                                className="textarea bg-neutral-900 border-neutral-700 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 text-white w-full rounded-lg min-h-[150px] text-base"
                                placeholder="Cuéntame sobre tu idea, fechas, lugar..."
                                value={form.message}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {status === "success" && (
                            <div role="alert" className="alert alert-success bg-green-900/50 border-green-800 text-green-200 text-sm py-2 rounded-lg">
                                <span>¡Mensaje enviado correctamente!</span>
                            </div>
                        )}
                        {status === "error" && (
                            <div role="alert" className="alert alert-error bg-red-900/50 border-red-800 text-red-200 text-sm py-2 rounded-lg">
                                <span>Hubo un error. Por favor inténtalo de nuevo.</span>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="btn btn-primary w-full bg-orange-700 hover:bg-orange-800 border-none text-white normal-case text-lg font-normal rounded-xl mt-4"
                            disabled={loading}
                        >
                            {loading ? "Enviando..." : "Enviar Mensaje"}
                        </button>
                    </form>
                    
                    <p className="mt-8 text-center text-gray-400 text-sm">
                        O si lo prefieres, puedes contactar conmigo escribiendo directamente a {" "}
                        <a href="mailto:imaroacarmona@gmail.com" className="text-orange-500 hover:text-white transition-colors underline decoration-orange-500/50 underline-offset-2">
                            imaroacarmona@gmail.com
                        </a>
                        .
                    </p>
                </div>

            </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
