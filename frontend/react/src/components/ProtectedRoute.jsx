import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated, getRole } from "../services/auth";

const ProtectedRoute = ({ allowedRoles }) => {
    // 1. Verificar si el usuario está autenticado
    const isAuth = isAuthenticated();
    
    // 2. Obtener el rol del usuario desde localStorage
    const userRole = getRole();

    // 3. Si NO está autenticado: redirigir a /login
    if (!isAuth) return <Navigate to="/login" replace />;

    // 4. Si el usuario tiene un rol pero NO está en los permitidos:
    if (allowedRoles && !allowedRoles.includes(userRole)) {
        // 5. Determinar la ruta base según el rol
        const baseRoute = userRole === "tecnico" ? "/tecnico/dashboard" : "/cliente/dashboard";
        
        // 6. Redirigir a la ruta correspondiente
        return <Navigate to={baseRoute} replace />;
    }

    // 7. Si todo está bien: renderizar la ruta protegida
    return <Outlet />;
};

export default ProtectedRoute;