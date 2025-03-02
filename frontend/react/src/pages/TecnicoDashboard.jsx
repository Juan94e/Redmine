import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { getTickets } from "../services/tickets";

const TecnicoDashboard = () => {
    const username = localStorage.getItem("username");
    const [tickets, setTickets] = useState([]);

    // Datos de ejemplo para las estadísticas (puedes reemplazar con datos reales)
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
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            
            {/* Contenido Principal */}
            <div className=" bg-white rounded-lg shadow-md p-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
                {/* Encabezado */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Panel Técnico</h1>
                    <h2 className="text-xl text-cyan-600 mt-2">Hola, {username} 👋</h2>
                </div>

                {/* Estadísticas Rápidas */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-cyan-50 p-4 rounded-lg shadow-sm">
                        <h3 className="text-cyan-800 font-semibold">Tickets Abiertos</h3>
                        <p className="text-2xl text-cyan-600 mt-2">{stats.abiertos}</p>
                    </div>
                    <div className="bg-cyan-50 p-4 rounded-lg shadow-sm">
                        <h3 className="text-cyan-800 font-semibold">En Progreso</h3>
                        <p className="text-2xl text-cyan-600 mt-2">{stats.progreso}</p>
                    </div>
                    <div className="bg-cyan-50 p-4 rounded-lg shadow-sm">
                        <h3 className="text-cyan-800 font-semibold">Resueltos</h3>
                        <p className="text-2xl text-cyan-600 mt-2">{stats.resueltos}</p>
                    </div>
                </div>

                {/* Lista de Tickets */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">Tickets Asignados</h3>
                    
                    {/* Tabla de Tickets */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">Título</th>
                                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">Prioridad</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {tickets.map((ticket) => (
                                    <tr key={ticket.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">#{ticket.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{ticket.titulo}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 text-xs rounded-full ${
                                                ticket.status === 'abierto' 
                                                    ? 'bg-green-100 text-green-800' 
                                                    : ticket.estado === 'En Progreso'
                                                    ? 'bg-cyan-100 text-cyan-800'
                                                    : 'bg-gray-100 text-gray-800'
                                            }`}>
                                                {ticket.estado}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            <span className={`font-medium ${
                                                ticket.priority === 'Alta' 
                                                    ? 'text-red-600' 
                                                    : ticket.priority === 'Media'
                                                    ? 'text-yellow-600'
                                                    : 'text-gray-600'
                                            }`}>
                                                {ticket.priority}
                                            </span>
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