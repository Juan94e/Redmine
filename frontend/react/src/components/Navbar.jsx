import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/auth";
import "./Navbar.css";

const Navbar = () => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="navbar">
            <h1 className="logo">LOGOBAKERY</h1>

            {/* Botón menú hamburguesa */}
            <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
                <div className={`bar ${menuOpen ? "open" : ""}`}></div>
                <div className={`bar ${menuOpen ? "open" : ""}`}></div>
                <div className={`bar ${menuOpen ? "open" : ""}`}></div>
            </div>

            <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
                <li><a href="#">Services</a></li>
                <li><a href="#">Projects</a></li>
                <li><a href="#">About</a></li>
            </ul>

            <button className="contact-btn" onClick={handleLogout}>Contact</button>
        </nav>
    );
};

export default Navbar;
