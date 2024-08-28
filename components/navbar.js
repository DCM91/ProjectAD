import { Selector } from "./selector"

export const Navbar = ({theme}) => {

  return (
      <div data-theme={theme} className="w-full navbar bg-neutral text-neutral-content">
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl">ProjectAD</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal">
            <li tabIndex={0}>
              <a>
                ACTIVIDADES  
                <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>
              </a>
              <ul className="p-2 bg-neutral text-neutral-content z-10">
                <li><a>AIRE</a></li>
                <li><a>MONTANYA</a></li>
                <li><a>AGUA</a></li>
                <li><a>NIEVE</a></li>
                <li><a>OTROS</a></li>
              </ul>
            </li>
          </ul>
          <Selector />
      </div>
    </div>

  )
}
