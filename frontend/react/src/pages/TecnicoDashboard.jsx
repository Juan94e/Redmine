import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { getTickets } from "../services/tickets";
import { useNavigate, Link } from "react-router-dom";

const TecnicoDashboard = () => {
    const navigate = useNavigate(); 
    const username = localStorage.getItem("username");
    const [tickets, setTickets] = useState([]);
    const [stats] = useState({
        abiertos: 12,
        progreso: 4,
        resueltos: 24
    });

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const data = await getTickets(username);
                setTickets(data);
            } catch (error) {
                console.error("Error fetching tickets:", error);
            }
        };
        fetchTickets();
    }, [username]);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <Navbar />
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 max-w-7xl mx-auto mt-12 px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Panel Técnico</h1>
                    <h2 className="text-xl text-cyan-600 dark:text-cyan-400 mt-2">Hola, {username} 👋</h2>
                </div>
                
                {/* Estadísticas Rápidas */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-cyan-50 dark:bg-gray-700 p-4 rounded-lg shadow-sm">
                        <h3 className="text-cyan-800 dark:text-cyan-400 font-semibold">Tickets Abiertos</h3>
                        <p className="text-2xl text-cyan-600 dark:text-cyan-400 mt-2">{stats.abiertos}</p>
                    </div>
                    <div className="bg-cyan-50 dark:bg-gray-700 p-4 rounded-lg shadow-sm">
                        <h3 className="text-cyan-800 dark:text-cyan-400 font-semibold">En Progreso</h3>
                        <p className="text-2xl text-cyan-600 dark:text-cyan-400 mt-2">{stats.progreso}</p>
                    </div>
                    <div className="bg-cyan-50 dark:bg-gray-700 p-4 rounded-lg shadow-sm">
                        <h3 className="text-cyan-800 dark:text-cyan-400 font-semibold">Resueltos</h3>
                        <p className="text-2xl text-cyan-600 dark:text-cyan-400 mt-2">{stats.resueltos}</p>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Tickets Asignados</h3>
                    
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                            <thead className="bg-gray-50 dark:bg-gray-600">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Título</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Estado</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Prioridad</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-600 divide-y divide-gray-200 dark:divide-gray-500">
                                {tickets.map((ticket) => (
                                    <tr key={ticket.id} className="hover:bg-gray-50 dark:hover:bg-gray-500 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">#{ticket.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                            <Link 
                                                to={`/tecnico/view-ticket/${ticket.id}`}
                                                className="text-cyan-400 hover:text-cyan-800 !important" 
                                            > 
                                                {ticket.titulo}
                                            </Link>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 text-xs rounded-full ${
                                                ticket.estado === 'abierto' 
                                                    ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' 
                                                    : ticket.estado === 'en progreso'
                                                    ? 'bg-cyan-100 text-cyan-800 dark:bg-cyan-800 dark:text-cyan-100'
                                                    : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100'
                                            }`}>
                                                {ticket.estado}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <span className={`font-medium ${
                                                ticket.prioridad === 'Alta' 
                                                    ? 'text-red-600 dark:text-red-400' 
                                                    : ticket.prioridad === 'Media'
                                                    ? 'text-yellow-600 dark:text-yellow-400'
                                                    : 'text-gray-600 dark:text-gray-400'
                                            }`}>
                                                {ticket.prioridad || 'Sin prioridad'} 
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <button 
                                                onClick={() => navigate(`/tecnico/edit-ticket/${ticket.id}`)}
                                                className="text-cyan-600 hover:text-cyan-800 dark:text-cyan-400 dark:hover:text-cyan-300"
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

export default TecnicoDashboard;