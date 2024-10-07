import React, { useEffect, useState, createContext, useContext } from "react";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

// Crear el contexto de autenticación
const AuthContext = createContext(null);

// Componente `AuthProvider` que envuelve toda la aplicación
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Observador de cambios en la autenticación
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // Usuario autenticado
        setUser(currentUser); // Actualiza el estado con el usuario autenticado
      } else {
        // Usuario no autenticado
        setUser(null); // Resetea el usuario a null si no está autenticado
      }
    });

    // Limpia el observador cuando el componente se desmonta
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth); // Cierra la sesión
      alert("Sesión cerrada");
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, handleLogout }}>
      {children} {/* Renderiza los hijos dentro del contexto */}
    </AuthContext.Provider>
  );
};

// Hook personalizado para acceder al estado de autenticación
export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
