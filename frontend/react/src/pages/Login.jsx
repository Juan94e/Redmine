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
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-md">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                    Iniciar Sesión
                </h1>

                {error && (
                    <div className="bg-red-50 dark:bg-red-900 p-3 rounded-md text-red-600 dark:text-red-400 text-sm mb-4">
                        {error}
                    </div>
                )}

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Usuario
                    </label>
                    <input
                        type="text"
                        placeholder="Ingresa tu usuario"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-700"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Contraseña
                    </label>
                    <input
                        type="password"
                        placeholder="Ingresa tu contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-700"
                    />
                </div>

                <button
                    onClick={handleLogin}
                    className="w-full bg-white text-gray-900 dark:bg-cyan-500 dark:text-white py-2 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-cyan-600 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                >
                    Iniciar Sesión
                </button>
            </div>
        </div>
    );
};

export default Login;