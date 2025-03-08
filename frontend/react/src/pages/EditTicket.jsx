import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTicketById, updateTicket } from '../services/tickets';
import Navbar from '../components/Navbar';
import { getTecnicos } from "../services/users";

const EditTicket = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [ticket, setTicket] = useState({
        titulo: '',
        descripcion: '',
        estado: 'abierto',
        tecnico_id: null
    });
    const [tecnicos, setTecnicos] = useState([]);
    const [nuevaActualizacion, setNuevaActualizacion] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const ticketData = await getTicketById(id);
                setTicket(ticketData);
                
                const tecnicosData = await getTecnicos();
                setTecnicos(tecnicosData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateTicket(id, ticket);
            navigate('/cliente/dashboard');
        } catch (error) {
            setError('Error al actualizar el ticket');
        }
    };

    const handleAddUpdate = async () => {
        if (nuevaActualizacion.trim()) {
            try {
                // Aquí deberías implementar la llamada a add_ticket_update
                setNuevaActualizacion('');
            } catch (error) {
                setError('Error al agregar la actualización');
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <Navbar />
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 max-w-7xl mx-auto mt-12">
                <h1 className="text-3xl font-bold mb-6 dark:text-white">Editar Ticket #{id}</h1>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Campos editables */}
                    <div>
                        <label className="block text-sm font-medium dark:text-gray-300">Título</label>
                        <input
                            type="text"
                            value={ticket.titulo}
                            onChange={(e) => setTicket({...ticket, titulo: e.target.value})}
                            className="mt-1 block w-full rounded-lg border-gray-300 dark:bg-gray-700"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium dark:text-gray-300">Estado</label>
                        <select
                            value={ticket.estado}
                            onChange={(e) => setTicket({...ticket, estado: e.target.value})}
                            className="mt-1 block w-full rounded-lg border-gray-300 dark:bg-gray-700"
                        >
                            <option value="abierto">Abierto</option>
                            <option value="en progreso">En Progreso</option>
                            <option value="resuelto">Resuelto</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium dark:text-gray-300">Asignar a técnico</label>
                        <select
                            value={ticket.tecnico_id || ''}
                            onChange={(e) => setTicket({...ticket, tecnico_id: e.target.value || null})}
                            className="mt-1 block w-full rounded-lg border-gray-300 dark:bg-gray-700"
                        >
                            <option value="">Sin asignar</option>
                            {tecnicos.map(tecnico => (
                                <option key={tecnico.id} value={tecnico.id}>{tecnico.username}</option>
                            ))}
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700"
                    >
                        Guardar Cambios
                    </button>
                </form>

                {/* Sección para agregar actualizaciones */}
                <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-4 dark:text-white">Agregar Actualización</h3>
                    <textarea
                        value={nuevaActualizacion}
                        onChange={(e) => setNuevaActualizacion(e.target.value)}
                        className="w-full rounded-lg border-gray-300 dark:bg-gray-700"
                        rows="3"
                    />
                    <button
                        onClick={handleAddUpdate}
                        className="mt-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                    >
                        Agregar Comentario
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditTicket;