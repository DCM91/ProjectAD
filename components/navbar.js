import { useState } from "react";
import { Selector } from "./selector";

export const Navbar = ({ theme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isProfileOpen) setIsProfileOpen(false); // Cierra el otro menú si está abierto
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
    if (isMenuOpen) setIsMenuOpen(false); // Cierra el otro menú si está abierto
  };

  return (

    <div data-theme={theme} className="navbar bg-transparent text-neutral-content border-b-2 border-b-orange-500">
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle"
            onClick={toggleMenu}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="4"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          {isMenuOpen && (
            <ul
              className="menu menu-sm dropdown-content bg-neutral text-neutral-content rounded-b-box z-[1] mt-2 w-52 "
            >
              <li className="border-b-2"><a href="/"> Home</a></li>
              <li className="border-b-2 "><a href="#servicios">Servicios</a></li>
              <li className="border-b-2"><a href="/landing/contact"> Contacto</a></li>

            </ul>
          )}
        </div>
      </div>
      <div className="navbar-center">
        <a href="/" className="btn btn-ghost font-title font-bold text-4xl">Byphnix</a>
      </div>
      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
            onClick={toggleProfile}
          >
            <div className="w-10 rounded-full">
              <img
                alt="image Navbar component"
                src="/assets/TTs.webp"
              />
            </div>
          </div>
          {/* {isProfileOpen && (
            <ul
              className="menu menu-sm dropdown-content bg-transparent text-neutral-content rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Perfil
                  <span className="badge">New</span>
                </a>
              </li>
              <li><a>Ajustes</a></li>
              <li><a>Logout</a></li>
            </ul>
          )} */}
        </div>
      </div>
    </div>
  );
};
