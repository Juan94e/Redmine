import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../services/auth";

const ProtectedRoute = () => {
    const isAuth = isAuthenticated(); // Verifica si el token existe

    return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;