import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider"; // Importamos el hook useAuth

const RequireAuth = ({ children }) => {
  const { user } = useAuth(); // Extraemos el usuario autenticado del contexto
  const location = useLocation(); // Hook para obtener la ubicación actual

  if (!user) {
    // Si no hay usuario autenticado, redirige a la página de login
    // Guardamos la ruta original a la que el usuario intentaba acceder
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Si el usuario está autenticado, renderiza el contenido protegido
  return children;
};

export default RequireAuth;
