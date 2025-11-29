import React, { useState } from "react";
import { useRouter } from "next/router";
import en from "@/languages/en";
import es from "@/languages/es";
import fr from "@/languages/fr";
import { Layout } from "@/components/Layout";  // misma ruta que uses en la landing

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
      // Aquí luego puedes llamar a tu API: /api/landing/contact
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

  return (
    <Layout title="Byphnix - Contact">
      <div className="min-h-screen flex items-center justify-center first-letter:px-4 py-10">
        <div className="w-full max-w-2xl">
          {/* Título */}
          <h1 className="text-3xl sm:text-4xl font-bold text-center mb-2">
            {t?.contactTitle ?? "Contact Us"}
          </h1>
          <p className="text-center opacity-80 mb-8">
            {t?.contactSubtitle ??
              "Cuéntame qué necesitas y te responderé lo antes posible."}
          </p>

          {/* Card del formulario */}
          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <form className="space-y-4" onSubmit={handleSubmit}>
                {/* Nombre */}
                <div>
                  <label className="label" htmlFor="name">
                    <span className="label-text">
                      {t?.contactNameLabel ?? "Nombre"}
                    </span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className="input input-bordered w-full"
                    placeholder={t?.contactNamePlaceholder ?? "Tu nombre"}
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="label" htmlFor="email">
                    <span className="label-text">
                      {t?.contactEmailLabel ?? "Email"}
                    </span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="input input-bordered w-full"
                    placeholder={t?.contactEmailPlaceholder ?? "tu@email.com"}
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Asunto */}
                <div>
                  <label className="label" htmlFor="subject">
                    <span className="label-text">
                      {t?.contactSubjectLabel ?? "Asunto"}
                    </span>
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    className="input input-bordered w-full"
                    placeholder={
                      t?.contactSubjectPlaceholder ??
                      "¿Sobre qué quieres hablar?"
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
                      "Cuéntame un poco más de lo que necesitas..."
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
                        "¡Mensaje enviado! Me pondré en contacto contigo pronto."}
                    </span>
                  </div>
                )}
                {status === "error" && (
                  <div className="alert alert-error py-2">
                    <span>
                      {t?.contactError ??
                        "Ha ocurrido un error al enviar el mensaje. Inténtalo de nuevo."}
                    </span>
                  </div>
                )}

                {/* Botón */}
                <div className="card-actions justify-end">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading
                      ? t?.contactSending ?? "Enviando..."
                      : t?.contactSubmit ?? "Enviar mensaje"}
                  </button>
                </div>
              </form>

              {/* Opcional: info de contacto directa */}
              <div className="mt-4 text-sm opacity-70">
                <p>
                  {t?.contactDirect ??
                    "También puedes escribirme directamente a:"}{" "}
                  <span className="font-medium">tucorreo@ejemplo.com</span>
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
