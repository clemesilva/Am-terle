import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Importamos useNavigate y useLocation
import { signInAuthWithEmailAndPassword } from "../firebase/firebase"; // Asegúrate de importar correctamente

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate(); // Hook para redirigir
  const location = useLocation(); // Hook para obtener la ubicación original

  // Obtenemos la ruta original desde el estado de la ubicación, si está disponible
  const from = location.state?.from?.pathname || "/"; // Ruta original o la página principal

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Iniciar sesión con Firebase
      const user = await signInAuthWithEmailAndPassword(email, password);
      alert("Inicio de sesión exitoso");
      setError(""); // Limpiar cualquier error si fue exitoso

      // Redirigir al usuario a la página que intentaba acceder originalmente
      navigate(from, { replace: true }); // Redirige a la página original o a "/"
    } catch (error) {
      console.error("Error al iniciar sesión:", error);

      // Manejar diferentes tipos de errores y mostrar mensajes más claros
      if (error.code === "auth/user-not-found") {
        setError("No se encontró ningún usuario con este correo.");
      } else if (error.code === "auth/wrong-password") {
        setError("Contraseña incorrecta.");
      } else if (error.code === "auth/invalid-email") {
        setError("El formato del correo electrónico es inválido.");
      } else {
        setError("Error inesperado. Inténtalo más tarde.");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto bg-neutral-800 p-8 rounded-lg border-2 border-neutral-600 mt-24">
      <h2 className="text-2xl font-semibold text-yellow-100 text-center mb-6">
        Iniciar Sesión
      </h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo Electrónico"
            required
            className="w-full p-2 border-b-2 border-neutral-600 focus:outline-none bg-neutral-700 text-yellow-100 placeholder-yellow-100"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            required
            className="w-full p-2 border-b-2 border-neutral-600 focus:outline-none bg-neutral-700 text-yellow-100 placeholder-yellow-100"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-yellow-100 text-neutral-800 py-2 px-4 rounded-lg hover:bg-yellow-200 transition-all"
        >
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

export default Login;
