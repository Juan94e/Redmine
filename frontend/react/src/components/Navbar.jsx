import React, { useState } from "react";

const Navbar = () => {
  // Estado para abrir/cerrar el menú en móviles
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-gray-900 text-white shadow-md relative">
      {/* Logo */}
      <h1 className="text-xl font-bold">RedMine</h1>

      {/* Ícono menú hamburguesa (solo visible en móvil) */}
      <div 
        className="md:hidden cursor-pointer" 
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span className="block w-6 h-0.5 bg-white mb-1"></span>
        <span className="block w-6 h-0.5 bg-white mb-1"></span>
        <span className="block w-6 h-0.5 bg-white"></span>
      </div>

      {/* Lista de links (versión escritorio y móvil) */}
      <ul
        className={`
          md:flex md:items-center md:static 
          absolute top-full left-0 w-full bg-gray-900
          transition-all duration-300 ease-in-out 
          ${menuOpen ? "flex flex-col" : "hidden"} 
        `}
      >
        <li className="md:ml-6">
          <a
            href="#"
            className="block px-4 py-2 hover:text-teal-400 transition-colors"
          >
            Services
          </a>
        </li>
        <li className="md:ml-6">
          <a
            href="#"
            className="block px-4 py-2 hover:text-teal-400 transition-colors"
          >
            Projects
          </a>
        </li>
        <li className="md:ml-6">
          <a
            href="#"
            className="block px-4 py-2 hover:text-teal-400 transition-colors"
          >
            About
          </a>
        </li>
      </ul>

      {/* Botón Contact (solo visible en escritorio) */}
      <button className="hidden md:block bg-teal-500 text-white px-4 py-2 rounded-full hover:bg-teal-400 transition-colors ml-4">
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
