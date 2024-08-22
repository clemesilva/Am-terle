import React from "react";
import { Link } from "react-router-dom";

function Piernas() {
  // Ejemplo de datos de rutinas
  const rutinas = [
    {
      id: 1,
      nombre: "Potencia y Resistencia",
      descripcion:
        "Rutina para desarrollar potencia y resistencia en las piernas",
      archivo:
        "https://www.fcbarcelona.com/fcbarcelona/photo/2022/08/02/ae5252d1-b79b-4950-9e34-6e67fac09bb0/LeoMessi20092010_pic_fcb-arsenal62.jpg",
    },
    {
      id: 2,
      nombre: "Fuerza Explosiva",
      descripcion: "Rutina para aumentar la fuerza explosiva en las piernas",
      archivo: "/path/to/pdf2.pdf",
    },
    {
      id: 3,
      nombre: "Resistencia Duradera",
      descripcion: "Rutina para mejorar la resistencia a largo plazo",
      archivo: "/path/to/pdf3.pdf",
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Rutinas de Piernas</h1>
      <p className="text-lg mb-8">
        Explora las rutinas de piernas subidas por la comunidad.
      </p>
      <div className="space-y-6">
        {rutinas.map((rutina) => (
          <div
            key={rutina.id}
            className="relative rounded-lg overflow-hidden bg-gray-800 text-white cursor-pointer transform transition-transform duration-300 hover:scale-105"
          >
            <div className="relative p-6 z-10">
              <h2 className="text-2xl font-semibold mb-2">{rutina.nombre}</h2>
              <p>{rutina.descripcion}</p>
              <a
                href={rutina.archivo}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-blue-400 hover:underline"
              >
                Ver Rutina
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Piernas;
