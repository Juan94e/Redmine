import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/auth";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const { role } = await login(username, password);
            if (role === "tecnico") {
                navigate("/tecnico/dashboard");
            } else if (role === "cliente") {
                navigate("/cliente/dashboard");
            } else {
                throw new Error("Rol no válido");
            }
        } catch (error) {
            setError(error.message);
            console.error("Error en el login:", error.message);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            {/* Contenedor del Formulario */}
            <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
                {/* Título */}
                <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                    Iniciar Sesión
                </h1>
    
                {/* Mensaje de Error */}
                {error && (
                    <div className="bg-red-50 p-3 rounded-md text-red-600 text-sm mb-4">
                        {error}
                    </div>
                )}
    
                {/* Campo de Usuario */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Usuario
                    </label>
                    <input
                        type="text"
                        placeholder="Ingresa tu usuario"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-gray-900 placeholder-gray-400" // Añadido text-gray-900 y placeholder-gray-400
                    />
                </div>
    
                {/* Campo de Contraseña */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Contraseña
                    </label>
                    <input
                        type="password"
                        placeholder="Ingresa tu contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-gray-900 placeholder-gray-400" // Añadido text-gray-900 y placeholder-gray-400
                    />
                </div>
    
                {/* Botón de Login */}
                <button
                    onClick={handleLogin}
                    className="w-full bg-grey-6000 text-dark dark:text-white py-2 px-4 rounded-lg hover:bg-cyan-700 dark:hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                >
                    Iniciar Sesión
                </button>
            </div>
        </div>
    );
};

export default Login;