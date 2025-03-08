import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { getClientTickets, createTicket, getTickets } from "../services/tickets";
import { getTecnicos } from "../services/users"; // Nueva importación
import { useNavigate } from "react-router-dom";


const ClienteDashboard = () => {
    const navigate = useNavigate(); 
    const username = localStorage.getItem("username");
    const user_id = localStorage.getItem("user_id"); 
    const [tecnicos, setTecnicos] = useState([]);
    const [tickets, setTickets] = useState([]);
    const [newTicket, setNewTicket] = useState({
        titulo: "",
        descripcion: "",
        tecnico_id: null // Nuevo campo agregado
    });
    const [error, setError] = useState("");

    // Obtener tickets del cliente y técnicos
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Obtener tickets
                const ticketsData = await getTickets();
                setTickets(ticketsData);
                
                // Obtener técnicos
                const tecnicosData = await getTecnicos();
                setTecnicos(tecnicosData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    // Crear nuevo ticket
    const handleCreateTicket = async (e) => {
        e.preventDefault();
        try {
            await createTicket({
                ...newTicket,
                cliente_id: parseInt(user_id),
                estado: "abierto"
            });
            
            // Resetear formulario incluyendo tecnico_id
            setNewTicket({ 
                titulo: "", 
                descripcion: "", 
                tecnico_id: null 
            });
            
            // Actualizar lista de tickets
            const updatedTickets = await getTickets();
            setTickets(updatedTickets);
        } catch (error) {
            setError("Error al crear el ticket");
            console.error("Error:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <Navbar />
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 max-w-7xl mx-auto mt-12 px-4 sm:px-6 lg:px-8">
                {/* Encabezado */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Panel del Cliente</h1>
                    <h2 className="text-xl text-cyan-600 dark:text-cyan-400 mt-2">Hola, {username} 👋</h2>
                </div>

                {/* Formulario para nuevos tickets */}
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg mb-8">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                        Crear Nuevo Ticket
                    </h3>
                    {error && <div className="text-red-500 mb-4">{error}</div>}
                    <form onSubmit={handleCreateTicket}>
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="Título del ticket"
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg mb-4 dark:bg-gray-600 dark:text-white"
                                value={newTicket.titulo}
                                onChange={(e) => setNewTicket({...newTicket, titulo: e.target.value})}
                                required
                            />
                        </div>
                        
                        {/* Nuevo dropdown para técnicos */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Asignar a técnico (opcional)
                            </label>
                            <select
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-cyan-500 focus:border-cyan-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                value={newTicket.tecnico_id || ""}
                                onChange={(e) => 
                                    setNewTicket({
                                        ...newTicket,
                                        tecnico_id: e.target.value ? parseInt(e.target.value) : null
                                    })
                                }
                            >
                                <option value="">Seleccionar técnico...</option>
                                {tecnicos.map((tecnico) => (
                                    <option key={tecnico.id} value={tecnico.id}>
                                        {tecnico.username}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-4">
                            <textarea
                                placeholder="Descripción del problema"
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg h-32 dark:bg-gray-600 dark:text-white"
                                value={newTicket.descripcion}
                                onChange={(e) => setNewTicket({...newTicket, descripcion: e.target.value})}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded-lg transition-colors"
                        >
                            Crear Ticket
                        </button>
                    </form>
                </div>

                {/* Lista de Tickets (se mantiene igual) */}
                <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                        Mis Tickets
                    </h3>
                    
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                            <thead className="bg-gray-50 dark:bg-gray-600">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Título</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Estado</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Fecha</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-600 divide-y divide-gray-200 dark:divide-gray-500">
                                {tickets.map((ticket) => (
                                    <tr key={ticket.id} className="hover:bg-gray-50 dark:hover:bg-gray-500 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">#{ticket.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{ticket.titulo}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 text-xs rounded-full ${
                                                ticket.estado === 'abierto' 
                                                    ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' 
                                                    : ticket.estado === 'en progreso'
                                                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'
                                                    : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100'
                                            }`}>
                                                {ticket.estado}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                            {new Date(ticket.fecha_creacion).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <button 
                                                onClick={() => navigate(`/edit-ticket/${ticket.id}`)}
                                                className="text-cyan-600 hover:text-cyan-800"
                                            >
                                                Editar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClienteDashboard;