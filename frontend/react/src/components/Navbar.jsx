import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/auth";
import "./Navbar.css"; // Importar el CSS

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="navbar">
            <h1>Mi Aplicación</h1>
            <button onClick={handleLogout}>Cerrar Sesión</button>
        </nav>
    );
};

export default Navbar;