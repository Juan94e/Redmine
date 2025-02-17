import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import UsersPage from "./pages/UsersPage";
import Dashboard from "./pages/Dashboard";
//import Home from "./pages/Home"; // Crea este componente
import ProtectedRoute from "./components/ProtectedRoute"; // Crea este componente

const App = () => {
    return (
        <Router>
            <Routes>
                {/* Ruta pública */}
                <Route path="/login" element={<Login />} />

                {/* Rutas protegidas */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<UsersPage />} />
                    {/*<Route path="/users" element={<UsersPage />} />*/}
                    <Route path="/dashboard" element={<Dashboard />} />
                </Route>

                {/* Redirección para rutas no definidas */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
};

export default App;