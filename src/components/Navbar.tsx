import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import logoMovil from "../assets/Path-2.svg";
import logo from "../assets/Shape.svg";
import { FaSignOutAlt, FaSun, FaMoon } from "react-icons/fa";

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    navigate("/"); 
  };

  const linkClass = (path: string) =>
    location.pathname === path ? "text-[#D6F379] font-semibold" : "text-white";

  return (
    <header className="w-full max-w-[1512px] bg-[#222222] text-white">
      <div className="md:hidden flex items-center justify-between p-6 h-[60px]">
        <img src={logoMovil} alt="Logo" className="w-[24px] h-[24px]" />
        <nav className="flex items-center space-x-4">
          <NavLink to="/search" className={linkClass("/search")}>Buscar</NavLink>
          <NavLink to="/albums" className={linkClass("/albums")}>My albums</NavLink>
          <span className="text-gray-500">|</span>
          <FaSignOutAlt className="cursor-pointer" onClick={handleLogout} />
          {darkMode ? (
            <FaSun className="cursor-pointer" onClick={() => setDarkMode(false)} />
          ) : (
            <FaMoon className="cursor-pointer" onClick={() => setDarkMode(true)} />
          )}
        </nav>
      </div>

      <div className="hidden md:flex items-center justify-between px-[80px] py-[24px] h-[87px]">
        <img src={logo} alt="Logo" className="w-[133px] h-[24px]" />
        <nav className="flex space-x-6">
          <NavLink to="/search" className={linkClass("/search")}>Buscar</NavLink>
          <NavLink to="/albums" className={linkClass("/albums")}>Mis álbumes</NavLink>
          <span className="text-white-500">|</span>
          <button onClick={handleLogout} className="transition-colors duration-300 hover:text-[#D6F379]">
            Cerrar sesión
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
