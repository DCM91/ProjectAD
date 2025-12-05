import React from "react";
import { BsInstagram } from "react-icons/bs";
import { MdEmail } from "react-icons/md";

import en from "@/languages/en";
import es from "@/languages/es";
import fr from "@/languages/fr";
import { useRouter } from "next/router";

export const Footer = ({ theme }) => {
  const router = useRouter();

  let t = es; // español por defecto
  if (router.locale === "en") t = en;
  if (router.locale === "fr") t = fr;

  const currentYear = new Date().getFullYear();

  return (
    <div data-theme={theme}>
      <footer
        className="footer p-4 px-8 bg-accent text-accent-content"
        aria-label="Pie de página de By Phnix, fotografía de Aroa Carmona en Barcelona y Granollers"
      >
        {/* Bloque de texto / info rápida */}
        <section
          className="max-w-xl"
          aria-labelledby="footer-contact-heading"
        >
          <h2
            id="footer-contact-heading"
            className="font-body text-lg sm:text-xl font-semibold mb-2"
          >
            ¿Tienes dudas sobre tu sesión de fotos en Barcelona o Granollers?
          </h2>
          <p className="font-body text-sm sm:text-base leading-relaxed">
            Escríbeme y te ayudaré a planificar tu sesión de fotos en{" "}
            <strong>Granollers, Barcelona o Vallès Oriental</strong>: eventos,
            retratos, fotografía animal o reportajes familiares.
            <br />
            <br />
            También puedes seguir mi trabajo y ver ejemplos de sesiones en mis
            redes sociales.
          </p>
        </section>

        {/* Redes sociales / contacto rápido */}
        <section
          className="ml-auto"
          aria-label="Redes sociales y contacto directo de Aroa Carmona"
        >
          <h3 className="footer-title text-base sm:text-lg mb-2">
            Sígueme · <span className="font-semibold">@byphnix</span>
          </h3>
          <div className="grid grid-flow-col gap-4 items-center">
            <a
              href="https://www.instagram.com/byphnix"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Ver el perfil de Instagram de Aroa Carmona, fotógrafa en Barcelona y Granollers"
            >
              <BsInstagram className="w-10 h-10 sm:w-12 sm:h-12" />
            </a>

            <a
              href="/landing/contact"
              aria-label="Ir a la página de contacto de Aroa Carmona"
            >
              <MdEmail className="w-10 h-10 sm:w-12 sm:h-12" />
            </a>
          </div>
        </section>

        {/* Línea legal / SEO local */}
        <div className="w-full col-span-full mt-4 border-t border-base-100 pt-2 text-xs opacity-80">
          <p className="font-body">
            © {currentYear} By Phnix · Fotografía by Aroa Carmona · Fotógrafa
            profesional en Barcelona, Granollers y Vallès Oriental.
          </p>
        </div>
      </footer>
    </div>
  );
};
