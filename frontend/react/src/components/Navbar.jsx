import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/auth";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate("/login");
    };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-[#1e1e1e] text-white shadow-md relative">
      {/* Logo */}
      <h1 className="text-xl font-bold">RedMine</h1>

      {/* Ícono menú hamburguesa (visible solo en móvil) */}
      <div 
        className="md:hidden cursor-pointer" 
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span className="block w-6 h-0.5 bg-white mb-1"></span>
        <span className="block w-6 h-0.5 bg-white mb-1"></span>
        <span className="block w-6 h-0.5 bg-white"></span>
      </div>

      {/* Menú de navegación alineado a la derecha */}
      <ul
        className={`absolute top-full left-0 w-full bg-[#1e1e1e] md:bg-transparent 
        md:static md:flex md:items-center md:ml-auto md:w-auto md:justify-end transition-all duration-300 ease-in-out 
        ${menuOpen ? "flex flex-col" : "hidden"} md:flex`}
      >
        <li className="md:ml-6">
          <a href="#" className="block px-4 py-2 hover:text-teal-400 transition-colors">
            Services
          </a>
        </li>
        <li className="md:ml-6">
          <a href="#" className="block px-4 py-2 hover:text-teal-400 transition-colors">
            Projects
          </a>
        </li>
        <li className="md:ml-6">
          <a href="#" className="block px-4 py-2 hover:text-teal-400 transition-colors">
            About
          </a>
        </li>
        {/* Botón Logout dentro del menú en móviles */}
        <li className="md:ml-6 mt-2 md:mt-0">
          <button className="w-full md:w-auto bg-teal-500 text-white px-4 py-2 rounded-full hover:bg-teal-400 transition-colors" onClick={handleLogout} >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
