import React, { useState } from "react";

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../firebase/firebase";

const SignUpForm = () => {
  const [formFields, setFormFields] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { displayName, email, password, confirmPassword } = formFields;
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      // Registro de usuario en Firebase
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      // Crear el documento del usuario en Firestore
      await createUserDocumentFromAuth(user, { displayName });

      // Reinicia el formulario
      setFormFields({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setError("");
    } catch (error) {
      console.error("Error al registrar usuario", error);
      setError(error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-neutral-800 p-8 rounded-lg border-2 border-neutral-600">
      <h2 className="text-2xl font-semibold text-yellow-100 text-center mb-6">
        Registrarse
      </h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            name="displayName"
            value={displayName}
            onChange={handleChange}
            placeholder="Nombre Completo"
            required
            className="w-full p-2 border-b-2 border-neutral-600 focus:outline-none bg-neutral-700 text-yellow-100 placeholder-yellow-100"
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
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
            onChange={handleChange}
            placeholder="Contraseña"
            required
            className="w-full p-2 border-b-2 border-neutral-600 focus:outline-none bg-neutral-700 text-yellow-100 placeholder-yellow-100"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
            placeholder="Confirmar Contraseña"
            required
            className="w-full p-2 border-b-2 border-neutral-600 focus:outline-none bg-neutral-700 text-yellow-100 placeholder-yellow-100"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-yellow-100 text-neutral-800 py-2 px-4 rounded-lg hover:bg-yellow-200 transition-all"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
