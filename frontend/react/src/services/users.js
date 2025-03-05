export const getTecnicos = async () => {
    try {
        const response = await axios.get(`${API_URL}/tecnicos`);
        return response.data;
    } catch (error) {
        console.error('Error fetching technicians:', error);
        return [];
    }
};