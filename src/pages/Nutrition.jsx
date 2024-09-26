import React, { useState, useEffect } from "react";
import { getRutinasPorArea } from "../firebase/firebase";

function Nutrition() {
  const [rutinas, setRutinas] = useState([]);

  // Función para cargar las rutinas de FullBody
  const cargarRutinas = async () => {
    const rutinasFullBody = await getRutinasPorArea("Nutricion");
    setRutinas(rutinasFullBody);
  };

  // Cargar las rutinas cuando el componente se monta
  useEffect(() => {
    cargarRutinas();
  }, []);

  return (
    <div className="p-6 bg-neutral-800">
      <h1 className="text-3xl font-bold mb-4 text-yellow-100">
        Guías de Nutrición a tu alcance
      </h1>
      <p className="text-lg mb-8 text-white">
        Cada persona es diferente, por lo que no existe una única forma de
        alimentarse correctamente. Sin embargo, podemos aprender de las guías
        nutricionales de otros para encontrar lo que mejor funciona para
        nosotros. Aquí encontrarás algunos consejos y snacks que podrían
        ayudarte a descubrir lo que mejor se adapta a ti.{" "}
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
            No hay rutinas disponibles para FullBody en este momento.
          </p>
        )}
      </div>
    </div>
  );
}

export default Nutrition;
