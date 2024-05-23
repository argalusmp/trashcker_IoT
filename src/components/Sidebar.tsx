"use client";
import { FaUserSecret } from "react-icons/fa6";
import { BsTrash2Fill } from "react-icons/bs";
import { BiSolidReport, BiSolidDashboard } from "react-icons/bi";

export default function SidebarComponent() {
  return (
    <aside
      id="logo-sidebar"
      className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-primary-color-theme">
        <a href="#" className="flex items-center ps-2.5 mb-5">
          <img
            src="trashcker_logo.png"
            className="h-24 me-3 sm:h-10"
            alt="Flowbite Logo"
          />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            Trashcker
          </span>
        </a>
        <ul className="space-y-2 font-medium">
          <p className="text-white">Discover</p>
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <BiSolidDashboard />
              <span className="ms-3">Dashboard</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <BiSolidReport />
              <span className="flex-1 ms-3 whitespace-nowrap">Laporan</span>
              <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300"></span>
            </a>
          </li>

          <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
            <p className="text-white">Manajemen</p>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <FaUserSecret />
                <span className="flex-1 ms-3 whitespace-nowrap">User</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <BsTrash2Fill />
                <span className="flex-1 ms-3 whitespace-nowrap">Sampah</span>
                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                  3
                </span>
              </a>
            </li>
          </ul>
        </ul>
      </div>
    </aside>
  );
}
