import { NavLink, useLocation } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";

import { GiHamburgerMenu } from "react-icons/gi";

function BtnHamburgerMenu() {
  return (
    <button
      data-drawer-target="logo-sidebar"
      data-drawer-toggle="logo-sidebar"
      aria-controls="logo-sidebar"
      type="button"
      className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
    >
      <span className="sr-only">Open sidebar</span>
      <GiHamburgerMenu />
    </button>
  );
}

function NavbarText() {
  const location = useLocation();

  let linkText = "Dashboard";
  if (location.pathname === "/laporan") {
    linkText = "Laporan";
  } else if (location.pathname === "/users") {
    linkText = "Users";
  } else if (location.pathname === "/sampah") {
    linkText = "Sampah";
  }
  return (
    <a className="block px-4 py-2 text-2xl text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
      {linkText}
    </a>
  );
}

function MenuProfileNavbar() {
  return (
    <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
      <button
        type="button"
        className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
        id="user-menu-button"
        aria-expanded="false"
        data-dropdown-toggle="user-dropdown"
        data-dropdown-placement="bottom"
      >
        <span className="sr-only">Open user menu</span>
        <img className="w-8 h-8 rounded-full" src="16.jpeg" alt="user photo" />
      </button>
      {/* <!-- Dropdown menu --> */}
      <div
        className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
        id="user-dropdown"
      >
        <div className="px-4 py-3">
          <span className="block text-sm text-gray-900 dark:text-white">
            Bonnie Green
          </span>
          <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
            name@flowbite.com
          </span>
        </div>
        <ul className="py-2" aria-labelledby="user-menu-button">
          <li>
            <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
              Dashboard
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Settings
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Earnings
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Sign out
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default function Navbar() {
  return (
    <div className=" sm:ml-64 dark:bg-slate-300">
      <nav className="bg-white border-gray-200 dark:bg-background-color-theme">
        <div className="flex flex-wrap items-center justify-between mx-auto p-4">
          <BtnHamburgerMenu />

          <NavbarText />

          <div className="flex flex-wrap items-center justify-end pl-4">
            {/* <NavLink
              className=" rounded border bg-primary-color-theme border-white px-8 py-1 text-sm font-medium text-white  dark:hover:bg-opacity-80 hover:text-secondary-color-theme focus:outline-none focus:ring hover:scale-110 hover:shadow-xl hidden lg:block"
              to="/"
            >
              Share
            </NavLink> */}
            <DarkModeToggle />
            <MenuProfileNavbar />
          </div>
        </div>
      </nav>
    </div>
  );
}
