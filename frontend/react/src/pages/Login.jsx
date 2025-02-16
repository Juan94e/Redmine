import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/auth"; // Importa la función login

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const { role } = await login(username, password); // Obtener el rol del usuario
            alert("Login exitoso. Redirigiendo...");

            // Redirigir según el rol
            if (role === "tecnico") {
                navigate("/dashboard");  // Redirigir al dashboard del técnico
            } else if (role === "cliente") {
                navigate("/");  // Redirigir a la página principal del cliente
            } else {
                throw new Error("Rol no válido");
            }
        } catch (error) {
            setError(error.message);
            console.error("Error en el login:", error.message);
        }
    };

    return (
        <div>
            <h1>Login</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;