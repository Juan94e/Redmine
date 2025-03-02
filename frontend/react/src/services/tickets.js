import axios from 'axios';

const API_URL = "http://127.0.0.1:8000";  // URL de tu backend FastAPI

export const getTickets = async () => {
    try {
        const response = await axios.get(`${API_URL}/tickets`);  // Llamar al endpoint /api/users
        return response.data;  // Devuelve la lista de tickets
    } catch (error) {
        console.error('Error fetching users:', error);
        return [];  // Devuelve un array vacío en caso de error
    }
};