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
            await login(username, password); // Usas la función de auth.js
            alert("Login exitoso. Redirigiendo al dashboard...");
            navigate("/");  // Redirige a la página principal
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
