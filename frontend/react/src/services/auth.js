import axios from "axios";

const API_URL = "http://localhost:8000";  // Cambiado para que coincida con la ruta en Login.jsx

export const login = async (username, password) => {
    try {
        const formData = new URLSearchParams();
        formData.append("username", username);
        formData.append("password", password);

        const response = await axios.post(`${API_URL}/login`, formData, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });

        const token = response.data.access_token;
        const role = response.data.role;  // Obtener el rol del usuario
        const user_id = response.data.user_id;
        localStorage.setItem("token", token);  // Guardar el token en localStorage
        localStorage.setItem("role", role);  // Guardar el rol en localStorage
        localStorage.setItem("username", username); // Guardar el username
        localStorage.setItem("user_id", user_id); // Guardar el username
        return { token, role };  // Devolver el token y el rol
    } catch (error) {
        throw new Error(error.response?.data?.detail || "Error en el login");
    }
};

export const isAuthenticated = () => {
    return !!localStorage.getItem("token");  // Verificar si el usuario está autenticado
};

export const getRole = () => {
    return localStorage.getItem("role");  // Obtener el rol del usuario
};

export const logout = () => {
    localStorage.removeItem("token");  // Eliminar el token al cerrar sesión
    localStorage.removeItem("role");  // Eliminar el rol al cerrar sesión
    localStorage.removeItem("username"); // Eliminar el username
};