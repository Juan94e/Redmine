import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import UsersPage from "./pages/UsersPage";
import TecnicoDashboard from "./pages/TecnicoDashboard";
import ClienteDashboard from "./pages/ClienteDashboard";
import ProtectedRoute from "./components/ProtectedRoute"; 

const App = () => {
    return (
        <Router>
            <Routes>
                {/* Ruta pública */}
                <Route path="/login" element={<Login />} />

                {/* Ruta para clientes */}
                <Route element={<ProtectedRoute allowedRoles={["cliente"]} />}>
                    <Route path="/cliente/dashboard" element={<ClienteDashboard />} />
                </Route>

                {/* Ruta para técnicos */}
                <Route element={<ProtectedRoute allowedRoles={["tecnico"]} />}>
                    <Route path="/tecnico/dashboard" element={<TecnicoDashboard />} />
                </Route>

                {/* Ruta para admin/otros (opcional)
                <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
                    <Route path="/users" element={<UsersPage />} />
                </Route> */}

                {/* Redirección para rutas no definidas */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
};

export default App;