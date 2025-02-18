import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated, getRole } from "../services/auth";

const ProtectedRoute = ({ allowedRoles }) => {
    const isAuth = isAuthenticated();
    const userRole = getRole();

    // Si no está autenticado: redirige a login
    if (!isAuth) return <Navigate to="/login" replace />;

    // Si hay roles definidos y el usuario no tiene permiso: redirige a home
    if (allowedRoles && !allowedRoles.includes(userRole)) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;