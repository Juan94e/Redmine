import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTicketById, getTicketUpdates } from '../services/tickets';
import Navbar from '../components/Navbar';

const ViewTicket = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [ticket, setTicket] = useState(null);
    const [updates, setUpdates] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const ticketData = await getTicketById(id);
                const updatesData = await getTicketUpdates(id);
                setTicket(ticketData);
                setUpdates(updatesData);
            } catch (error) {
                console.error("Error fetching ticket details:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    if (loading) return <div>Cargando...</div>;
    if (!ticket) return <div>Ticket no encontrado</div>;

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <Navbar />
            <div className="max-w-4xl mx-auto p-6">
                <button 
                    onClick={() => navigate(-1)}
                    className="mb-4 text-cyan-600 hover:text-cyan-800"
                >
                    ← Volver
                </button>
                
                {/* Sección de Detalles del Ticket */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
                    <h1 className="text-2xl font-bold mb-4 dark:text-white">Ticket #{ticket.id}</h1>
                    <div className="space-y-4">
                        <div>
                            <label className="font-semibold dark:text-gray-300">Título:</label>
                            <p className="dark:text-gray-100">{ticket.titulo}</p>
                        </div>
                        <div>
                            <label className="font-semibold dark:text-gray-300">Descripción:</label>
                            <p className="dark:text-gray-100">{ticket.descripcion}</p>
                        </div>
                        <div>
                            <label className="font-semibold dark:text-gray-300">Estado:</label>
                            <span className={`px-2 py-1 rounded-full text-sm ${
                                ticket.estado === 'abierto' ? 'bg-green-100 text-green-800' :
                                ticket.estado === 'en progreso' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-gray-100 text-gray-800'
                            }`}>
                                {ticket.estado}
                            </span>
                        </div>
                        <div>
                            <label className="font-semibold dark:text-gray-300">Cliente:</label>
                            <p className="dark:text-gray-100">{ticket.cliente?.username || 'No asignado'}</p>
                        </div>
                        <div>
                            <label className="font-semibold dark:text-gray-300">Técnico:</label>
                            <p className="dark:text-gray-100">{ticket.tecnico?.username || 'No asignado'}</p>
                        </div>
                        <div>
                            <label className="font-semibold dark:text-gray-300">Fecha Creación:</label>
                            <p className="dark:text-gray-100">
                                {new Date(ticket.fecha_creacion).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Sección de Actualizaciones */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-bold mb-4 dark:text-white">Historial de Actualizaciones</h2>
                    {updates.length === 0 ? (
                        <p className="dark:text-gray-300">No hay actualizaciones registradas.</p>
                    ) : (
                        <div className="space-y-4">
                            {updates.map((update) => (
                                <div key={update.id} className="border-l-4 border-cyan-600 pl-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="font-medium dark:text-gray-100">{update.usuario?.username}</p>
                                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                                {new Date(update.fecha_creacion).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="mt-2 dark:text-gray-100">{update.contenido}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ViewTicket;