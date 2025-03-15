import axios from 'axios';

//const API_URL = "http://127.0.0.1:8000";  // URL de tu backend FastAPI
const API_URL = import.meta.env.VITE_API_URL;

export const getTickets = async () => {
    try {
        const response = await axios.get(`${API_URL}/tickets`);  
        return response.data;  // Devuelve la lista de tickets
    } catch (error) {
        console.error('Error fetching users:', error);
        return [];  // Devuelve un array vacío en caso de error
    }
};

export const getClientTickets = async (cliente_id) => {
    try {
        const response = await axios.get(`${API_URL}/tickets/cliente/${cliente_id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching tickets:', error);
        return [];
    }
};

export const createTicket = async (ticketData) => {
    try {
        const response = await axios.post(`${API_URL}/tickets`, ticketData);
        return response.data;
    } catch (error) {
        console.error('Error creating ticket:', error);
        throw error;
    }
};

export const updateTicketOld = async (ticketId, updateData) => {
    try {
        const response = await axios.put(
            `${API_URL}/tickets/${ticketId}/asignar`,
            { tecnico_id: updateData }
        );
        return response.data;
    } catch (error) {
        console.error('Error updating ticket:', error.response?.data);
        throw error;
    }
};

export const getTicketById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/tickets/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching ticket:', error);
        throw error;
    }
};

export const updateTicket = async (id, ticketData) => {
    try {
        const response = await axios.put(`${API_URL}/tickets/${id}`, ticketData);
        return response.data;
    } catch (error) {
        console.error('Error updating ticket:', error);
        throw error;
    }
};

export const addTicketUpdate = async (ticketId, updateData) => {
    try {
        const response = await axios.post(
            `${API_URL}/tickets/${ticketId}/updates`,
            updateData
        );
        return response.data;
    } catch (error) {
        console.error('Error adding ticket update:', error);
        throw error;
    }
};

export const getTicketUpdates = async (ticketId) => {
    try {
        const response = await axios.get(`${API_URL}/tickets/${ticketId}/updates`); 
        return response.data;  // Devuelve la lista de las actualizaciones
    } catch (error) {
        console.error('Error fetching users:', error);
        return [];  // Devuelve un array vacío en caso de error
    }
};