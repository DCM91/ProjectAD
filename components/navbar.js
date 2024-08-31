import { useState } from "react";
import { Selector } from "./selector";

export const Navbar = ({ theme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div data-theme={theme} className="w-full navbar bg-neutral text-neutral-content">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">ProjectAD</a>
      </div>
      <div className="flex-none pr-2">
        <ul className="menu menu-horizontal text-sm ">
          <li tabIndex={0} onClick={toggleMenu}>
            <a>
              Actividades
              <svg
                className="fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
              </svg>
            </a>
            {isMenuOpen && (
              <ul className="p-1 bg-neutral text-sm text-neutral-content text-end z-10">
                <li><a>Aire</a></li>
                <li><a>Montaña</a></li>
                <li><a>Agua</a></li>
                <li><a>Nieve</a></li>
                <li><a>Motor</a></li>
              </ul>
            )}
          </li>
        </ul>
        <Selector />
      </div>
    </div>
  );
};
