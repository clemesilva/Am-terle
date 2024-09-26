import React, { useState, useEffect } from "react";
import { getRutinasPorArea } from "../../firebase/firebase";

function TroncoSuperior() {
  const [rutinas, setRutinas] = useState([]);

  const cargarRutinas = async () => {
    const rutinasPierna = await getRutinasPorArea("Tronco Superior");
    setRutinas(rutinasPierna);
  };

  useEffect(() => {
    cargarRutinas();
  }, []);

  return (
    <div className="p-6 bg-neutral-800">
      <h1 className="text-3xl font-bold mb-4 text-yellow-100">
        Rutinas de Piernas
      </h1>
      <p className="text-lg mb-8 text-white">
        Explora las rutinas de Piernas subidas por la comunidad.
      </p>
      <div className="space-y-6">
        {rutinas.length > 0 ? (
          rutinas.map((rutina, index) => (
            <div
              key={index}
              className="relative rounded-lg overflow-hidden text-yellow-100 cursor-pointer transform transition-transform duration-300 hover:scale-105 border border-yellow-100"
              style={{
                background: "linear-gradient(to right, #3f3f46, #18181b)", // Degradado de bg-neutral-700 a bg-neutral-900
              }}
            >
              <div className="relative p-6 z-10">
                <h2 className="text-2xl font-semibold mb-2 text-yellow-100">
                  {rutina.nombre}
                </h2>
                <p className="text-white">{rutina.descripcion}</p>
                <a
                  href={rutina.fileURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-yellow-100 hover:text-yellow-200"
                >
                  Ver Rutina
                </a>
              </div>
            </div>
          ))
        ) : (
          <p className="text-white">
            No hay rutinas disponibles para Piernas en este momento.
          </p>
        )}
      </div>
    </div>
  );
}

export default TroncoSuperior;
