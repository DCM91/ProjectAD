import React, { useState } from "react";
import { useRouter } from "next/router";
import en from "@/languages/en";
import es from "@/languages/es";
import fr from "@/languages/fr";
import { Layout } from "@/components/Layout";
import Head from "next/head";

const Contact = () => {
  const router = useRouter();

  // i18n
  let t = en;
  if (router.locale === "es") t = es;
  if (router.locale === "fr") t = fr;

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState(null); // "success" | "error" | null
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      // TODO: conectar con tu API (/api/landing/contact)
      // await fetch("/api/landing/contact", { method: "POST", body: JSON.stringify(form) });

      console.log("Form enviado:", form);
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error(error);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const seoTitle =
    "Contacto | Fotógrafa profesional en Barcelona y Granollers | Aroa Carmona";
  const seoDescription =
    "Contacta con Aroa Carmona, fotógrafa profesional en Barcelona y Granollers. Solicita información para sesiones de fotos, eventos, retratos, fotografía animal y reportajes en la zona de Barcelona y Vallès Oriental.";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: seoTitle,
    description: seoDescription,
    url: "https://byphnix.com/landing/contact",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://byphnix.com/landing/contact",
    },
    about: {
      "@type": "Person",
      name: "Aroa Carmona",
      jobTitle: "Fotógrafa profesional",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Granollers",
        addressRegion: "Barcelona",
        addressCountry: "ES",
      },
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "acarmona@byphnix.com",
      areaServed: ["Barcelona", "Granollers", "Vallès Oriental", "Catalunya"],
      availableLanguage: ["es", "en", "fr"],
    },
  };

  return (
    <Layout title={seoTitle}>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta
          name="keywords"
          content="contacto fotógrafa Barcelona, contacto fotógrafa Granollers, contactar con Aroa Carmona, sesiones de fotos Barcelona, presupuestos fotografía Granollers, fotógrafa Vallès Oriental contacto"
        />

        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://byphnix.com/landing/contact"
        />
        <meta property="og:locale" content="es_ES" />
        <link rel="canonical" href="https://byphnix.com/landing/contact" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <div className="min-h-screen flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-2xl">
          {/* Título SEO claro */}
          <h1 className="text-3xl sm:text-4xl font-bold text-center mb-2 text-white">
            {t?.contactTitle ??
              "Contactar con Aroa Carmona · Fotógrafa en Barcelona y Granollers"}
          </h1>

          <p className="text-center opacity-80 mb-8 text-white" >
            {t?.contactSubtitle ??
              "Cuéntame qué tipo de sesión de fotos necesitas en Barcelona, Granollers o alrededores (eventos, retratos, fotografía animal, familia...) y te responderé lo antes posible."}
          </p>

          {/* Card del formulario */}
          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <form className="space-y-4" onSubmit={handleSubmit}>
                {/* Nombre */}
                <div>
                  <label className="label" htmlFor="name">
                    <span className="label-text">
                      {t?.contactNameLabel ?? "Nombre completo"}
                    </span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className="input input-bordered w-full"
                    placeholder={
                      t?.contactNamePlaceholder ??
                      "Tu nombre o el de la persona de contacto"
                    }
                    value={form.name}
                    onChange={handleChange}
                    required
                    autoComplete="name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="label" htmlFor="email">
                    <span className="label-text">
                      {t?.contactEmailLabel ?? "Correo electrónico"}
                    </span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="input input-bordered w-full"
                    placeholder={
                      t?.contactEmailPlaceholder ?? "tuemail@ejemplo.com"
                    }
                    value={form.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                  />
                </div>

                {/* Asunto */}
                <div>
                  <label className="label" htmlFor="subject">
                    <span className="label-text">
                      {t?.contactSubjectLabel ??
                        "Tipo de sesión o motivo de contacto"}
                    </span>
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    className="input input-bordered w-full"
                    placeholder={
                      t?.contactSubjectPlaceholder ??
                      "Ej: Sesión de pareja en Granollers, evento en Barcelona..."
                    }
                    value={form.subject}
                    onChange={handleChange}
                  />
                </div>

                {/* Mensaje */}
                <div>
                  <label className="label" htmlFor="message">
                    <span className="label-text">
                      {t?.contactMessageLabel ?? "Mensaje"}
                    </span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    className="textarea textarea-bordered w-full min-h-32"
                    placeholder={
                      t?.contactMessagePlaceholder ??
                      "Cuéntame la fecha aproximada, el lugar (Barcelona, Granollers, etc.) y el tipo de sesión que te interesa."
                    }
                    value={form.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Estado / feedback */}
                {status === "success" && (
                  <div className="alert alert-success py-2">
                    <span>
                      {t?.contactSuccess ??
                        "¡Mensaje enviado! Te responderé lo antes posible para ayudarte con tu sesión de fotos."}
                    </span>
                  </div>
                )}
                {status === "error" && (
                  <div className="alert alert-error py-2">
                    <span>
                      {t?.contactError ??
                        "Ha ocurrido un error al enviar el mensaje. Inténtalo de nuevo en unos minutos."}
                    </span>
                  </div>
                )}

                {/* Botón */}
                <div className="card-actions justify-end">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                    aria-label="Enviar mensaje de contacto a Aroa Carmona"
                  >
                    {loading
                      ? t?.contactSending ?? "Enviando..."
                      : t?.contactSubmit ?? "Enviar mensaje"}
                  </button>
                </div>
              </form>

              {/* Info de contacto directa SEO-friendly */}
              <div className="mt-4 text-sm opacity-70">
                <p>
                  {t?.contactDirect ??
                    "Si lo prefieres, también puedes contactar directamente con Aroa Carmona:"}{" "}
                  <span className="font-medium">
                    <a
                      href="mailto:acarmona@byphnix.com"
                      className="underline hover:no-underline"
                    >
                      acarmona@byphnix.com
                    </a>
                  </span>
                </p>
                <p className="mt-1">
                  Barcelona · Granollers · Vallès Oriental · Catalunya
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
