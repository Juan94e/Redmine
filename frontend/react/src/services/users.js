import axios from 'axios';

const API_URL = "http://127.0.0.1:8000";

export const getTecnicos = async () => {
    try {
        const response = await axios.get(`${API_URL}/tecnicos`);
        return response.data;
    } catch (error) {
        console.error('Error fetching technicians:', error);
        return [];
    }
};