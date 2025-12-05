import React from "react";
import Link from "next/link";
import { BsInstagram } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { useRouter } from "next/router";

export const Footer = ({ theme }) => {
  const router = useRouter();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-neutral-content border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 text-center md:text-left">
          
          {/* Column 1: Brand & Desc */}
          <div className="space-y-4">
            <h2 className="font-title text-3xl text-white tracking-wide">
              BY PHNIX
            </h2>
            <p className="text-gray-400 font-light text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
              Capturando momentos efímeros para convertirlos en recuerdos eternos. 
              Fotografía profesional en Barcelona y Granollers.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div className="flex flex-col space-y-3">
            <h3 className="font-title text-lg text-white mb-2 uppercase tracking-widest">Explorar</h3>
            <Link href="/" className="text-gray-400 hover:text-orange-400 transition-colors text-sm">
              Inicio
            </Link>
            <Link href="/#servicios" className="text-gray-400 hover:text-orange-400 transition-colors text-sm">
              Servicios
            </Link>
            <Link href="/#gallery" className="text-gray-400 hover:text-orange-400 transition-colors text-sm">
              Galería
            </Link>
            <Link href="/landing/contact" className="text-gray-400 hover:text-orange-400 transition-colors text-sm">
              Contacto
            </Link>
          </div>

          {/* Column 3: Contact & Social */}
          <div className="space-y-4">
            <h3 className="font-title text-lg text-white mb-2 uppercase tracking-widest">Conecta</h3>
             <div className="flex justify-center md:justify-start gap-4">
                <a
                  href="https://www.instagram.com/byphnix"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="p-3 rounded-full bg-neutral-900 border border-neutral-800 text-gray-400 hover:text-white hover:border-orange-500 hover:bg-orange-500/10 transition-all duration-300"
                  aria-label="Instagram"
                >
                  <BsInstagram size={20} />
                </a>
                <Link
                  href="/landing/contact"
                  className="p-3 rounded-full bg-neutral-900 border border-neutral-800 text-gray-400 hover:text-white hover:border-orange-500 hover:bg-orange-500/10 transition-all duration-300"
                  aria-label="Email"
                >
                  <MdEmail size={20} />
                </Link>
             </div>
             <p className="text-xs text-gray-500 mt-4">
               acarmona@byphnix.com
             </p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-neutral-800 to-transparent my-10" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-4">
          <p>
            &copy; {currentYear} Aroa Carmona. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-1">
            <span>Desarrollado por</span>
            <a href="#" className="hover:text-orange-400 transition-colors">
              Daniel Castro Martín
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
