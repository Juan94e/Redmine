import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/auth";
import Lottie from "lottie-react";
import logoutAnimation from "../assets/icons/exit.json";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const animationRef = useRef();

  useEffect(() => {
    if (isHovered) {
      animationRef.current.play();
    } else {
      animationRef.current.stop();
    }
  }, [isHovered]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-md relative">
      {/* Logo */}
      <h1 className="text-xl font-bold text-cyan-600 dark:text-cyan-400">RedMine</h1>

      {/* Ícono menú hamburguesa (visible solo en móvil) */}
      <div 
        className="md:hidden cursor-pointer" 
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span className="block w-6 h-0.5 bg-gray-900 dark:bg-white mb-1"></span>
        <span className="block w-6 h-0.5 bg-gray-900 dark:bg-white mb-1"></span>
        <span className="block w-6 h-0.5 bg-gray-900 dark:bg-white"></span>
      </div>

      {/* Menú de navegación */}
      <ul
        className={`absolute top-full left-0 w-full bg-white dark:bg-gray-800 
        md:bg-transparent md:static md:flex md:items-center md:ml-auto md:w-auto 
        md:justify-end transition-all duration-300 ease-in-out 
        ${menuOpen ? "flex flex-col" : "hidden"} md:flex`}
      >
        <li className="md:ml-6">
          <a href="#" className="block px-4 py-2 text-gray-900 dark:text-gray-200 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
            Services
          </a>
        </li>
        <li className="md:ml-6">
          <a href="#" className="block px-4 py-2 text-gray-900 dark:text-gray-200 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
            Projects
          </a>
        </li>
        <li className="md:ml-6">
          <a href="#" className="block px-4 py-2 text-gray-900 dark:text-gray-200 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
            About
          </a>
        </li>
        
        {/* Botón Logout con animación Lottie */}
        <li className="md:ml-6 mt-2 md:mt-0">
          <button 
            className="w-full md:w-auto bg-cyan-600 text-cyan-600 dark:bg-cyan-500 dark:text-cyan-400 px-4 py-2 rounded-full hover:bg-cyan-700 dark:hover:bg-cyan-600 transition-colors flex items-center justify-center gap-2"
            onClick={handleLogout}
            title="Logout"
            onMouseEnter={() => setIsHovered(true)} 
            onMouseLeave={() => setIsHovered(false)}
          >
            Logout
            <Lottie 
              lottieRef={animationRef}
              animationData={logoutAnimation}
              className="w-6 h-6"
              loop={false}
              autoplay={false}
            />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;