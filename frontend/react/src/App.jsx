import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";  // Importar el componente Login
import UsersPage from "./pages/UsersPage";  // Importar el componente UsersPage
import Dashboard from "./pages/Dashboard";

const App = () => {
    return (
        <Router>
            <Routes>
                {/* Ruta para la página de inicio (lista de usuarios) */}
                <Route path="/" element={<UsersPage />} />

                {/* Ruta para la página de login */}
                <Route path="/login" element={<Login />} />

                <Route path="/dashboard" element={<Dashboard />} />

                {/* Otras rutas pueden ir aquí */}
            </Routes>
        </Router>
    );
};

export default App;