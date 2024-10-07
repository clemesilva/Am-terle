import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider"; // Importamos el hook useAuth

const RequireAuth = ({ children }) => {
  const { user } = useAuth(); // Extraemos el usuario autenticado del contexto

  if (!user) {
    // Si no hay usuario autenticado, redirige a la página de login
    return <Navigate to="/login" />;
  }

  // Si el usuario está autenticado, renderiza el contenido protegido
  return children;
};

export default RequireAuth;
