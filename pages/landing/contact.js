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

  const seoTitle = "Contacto | Aroa Carmona Fotografía Barcelona y Granollers";
  const seoDescription = "Contacta con Aroa Carmona. Reserva tu sesión de fotos en Barcelona y Granollers: bodas, retratos y mascotas. Web desarrollada por Daniel Castro.";

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
        <meta name="keywords" content="contacto fotógrafa Barcelona, contacto fotógrafa Granollers, Aroa Carmona contacto, Daniel Castro Martín, sesiones de fotos Barcelona" />
        <meta name="author" content="Daniel Castro Martín" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://byphnix.vercel.app/landing/contact" />
        <meta property="og:locale" content="es_ES" />
        <link rel="canonical" href="https://byphnix.vercel.app/landing/contact" />
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
                            Ya sea en Granollers, Barcelona o cualquier rincón especial.
                        </p>
                    </div>

                    <div className="space-y-6 pt-4">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-neutral-800 rounded-lg text-orange-500">
                                <MdEmail size={24} />
                            </div>
                            <div>
                                <h3 className="text-white font-semibold">Email</h3>
                                <a href="mailto:imaroacarmona@gmail.com" className="text-gray-400 hover:text-white transition-colors">
                                    imaroacarmona@gmail.com
                                </a>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-neutral-800 rounded-lg text-orange-500">
                                <MdLocationOn size={24} />
                            </div>
                            <div>
                                <h3 className="text-white font-semibold">Ubicación</h3>
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
                                <h3 className="text-white font-semibold">Instagram</h3>
                                <a href="https://instagram.com/byphnix" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">
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
                                <label className="label pl-0 text-xs uppercase text-gray-500 font-bold">Nombre</label>
                                <input
                                    name="user_name" 
                                    type="text"
                                    className="input bg-neutral-900 border-neutral-700 focus:border-orange-500 focus:outline-none text-white w-full rounded-lg"
                                    placeholder="Tu nombre"
                                    value={form.user_name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label pl-0 text-xs uppercase text-gray-500 font-bold">Email</label>
                                <input
                                    name="user_email"
                                    type="email"
                                    className="input bg-neutral-900 border-neutral-700 focus:border-orange-500 focus:outline-none text-white w-full rounded-lg"
                                    placeholder="tucorreo@ejemplo.com"
                                    value={form.user_email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label pl-0 text-xs uppercase text-gray-500 font-bold">Asunto</label>
                            <input
                                name="subject"
                                type="text"
                                className="input bg-neutral-900 border-neutral-700 focus:border-orange-500 focus:outline-none text-white w-full rounded-lg"
                                placeholder="Sesión de fotos..."
                                value={form.subject}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-control">
                            <label className="label pl-0 text-xs uppercase text-gray-500 font-bold">Mensaje</label>
                            <textarea
                                name="message"
                                className="textarea bg-neutral-900 border-neutral-700 focus:border-orange-500 focus:outline-none text-white w-full rounded-lg min-h-[150px] text-base"
                                placeholder="Cuéntame sobre tu idea, fechas, lugar..."
                                value={form.message}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {status === "success" && (
                            <div className="alert alert-success bg-green-900/50 border-green-800 text-green-200 text-sm py-2 rounded-lg">
                                <span>¡Mensaje enviado correctamente!</span>
                            </div>
                        )}
                        {status === "error" && (
                            <div className="alert alert-error bg-red-900/50 border-red-800 text-red-200 text-sm py-2 rounded-lg">
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
                        <a href="mailto:imaroacarmona@gmail.com" className="text-orange-500 hover:text-white transition-colors">
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
