import axios from "axios";

const API_URL = "http://localhost:8000";  

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
        localStorage.setItem("token", token);  // Guardar el token en localStorage
        return token;
    } catch (error) {
        throw new Error(error.response?.data?.detail || "Error en el login");
    }
};

export const isAuthenticated = () => {
    return !!localStorage.getItem("token");  // Verificar si el usuario está autenticado
};

export const logout = () => {
    localStorage.removeItem("token");  // Eliminar el token al cerrar sesión
};