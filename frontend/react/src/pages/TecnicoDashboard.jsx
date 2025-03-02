import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { getTickets } from "../services/tickets";

const TecnicoDashboard = () => {
  const [tickets, setTickets] = useState([]);
  const username = localStorage.getItem("username");

  useEffect(() => { 
    const fetchTickets = async () => {
      const data = await getTickets();
      setTickets(data);
    };

    fetchTickets();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      {/* Contenido Principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20"> {/* Padding-top para el Navbar fijo */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Panel Técnico</h1>
          <h2 className="text-xl text-cyan-600 mb-6">Hola, {username} 👋</h2>
          
          {/* Estadísticas Rápidas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-cyan-50 p-4 rounded-lg">
              <h3 className="text-cyan-800 font-semibold">Tickets Abiertos</h3>
              <p className="text-2xl text-cyan-600">12</p>
            </div>
            <div className="bg-cyan-50 p-4 rounded-lg">
              <h3 className="text-cyan-800 font-semibold">En Progreso</h3>
              <p className="text-2xl text-cyan-600">4</p>
            </div>
            <div className="bg-cyan-50 p-4 rounded-lg">
              <h3 className="text-cyan-800 font-semibold">Resueltos</h3>
              <p className="text-2xl text-cyan-600">24</p>
            </div>
          </div>

          {/* Lista de Tickets Recientes */}
          <div className="border-t pt-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">All Tickets</h3>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                {tickets.length > 0 ? (
                  tickets.map((ticket) => ( 
                    <div key={ticket.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div  className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium text-gray-900"> {ticket.titulo} </h4>
                          <p className="text-sm text-gray-500"> {ticket.titulo} </p>
                        </div>
                        <span className="px-3 py-1 bg-cyan-100 text-cyan-800 rounded-full text-sm"> {ticket.estado} </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No tickets found.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TecnicoDashboard;