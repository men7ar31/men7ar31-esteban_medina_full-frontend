import React from "react";
import logoMovil from "../assets/Path-2.svg";
import { FaSignOutAlt, FaSun } from "react-icons/fa";

const Navbar: React.FC = () => {
  return (
    <header className="w-full max-w-[1512px] h-[60px] flex items-center justify-between p-6 bg-[#222222] text-white md:hidden">
      <img src={logoMovil} alt="Logo" className="w-[24px] h-[24px]" />
      <nav className="flex items-center space-x-4 text-white">
        <a href="#" className="text-[#D6F379] font-semibold">Buscar</a>
        <a href="#" className="text-white">My albums</a>
        <span className="text-gray-500">|</span>
        <FaSignOutAlt className="text-white cursor-pointer" />
        <FaSun className="text-white cursor-pointer" />
      </nav>
    </header>
  );
};

export default Navbar;
