import React, { useState, useEffect } from "react";
import { getRutinasPorArea } from "../../firebase/firebase";
import InputBuscador from "../../components/InputBuscador";

function TroncoSuperior() {
  const [rutinas, setRutinas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const cargarRutinas = async () => {
    const rutinasTroncoSuperior = await getRutinasPorArea("Tronco Superior");
    setRutinas(rutinasTroncoSuperior);
  };

  useEffect(() => {
    cargarRutinas();
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const rutinasFiltradas = rutinas.filter((rutina) =>
    rutina.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-neutral-800">
      <h1 className="text-3xl font-bold mb-4 text-yellow-100">
        Rutinas de Tronco Superior
      </h1>
      <p className="text-lg mb-8 text-white">
        Explora las rutinas de Tronco Superior subidas por la comunidad.
      </p>
      <InputBuscador onSearch={handleSearch} />

      <div className="space-y-6 mt-5">
        {rutinasFiltradas.length > 0 ? (
          rutinasFiltradas.map((rutina, index) => (
            <div
              key={index}
              className="relative rounded-lg overflow-hidden text-yellow-100 cursor-pointer transform transition-transform duration-300 hover:scale-105 border border-yellow-100"
              style={{
                background: "linear-gradient(to right, #3f3f46, #18181b)",
              }}
            >
              <div className="relative p-6 z-10">
                <h2 className="text-2xl font-semibold mb-2 text-yellow-100">
                  {index + 1}. {rutina.nombre}
                </h2>
                <p className="text-white">{rutina.descripcion}</p>
                <a
                  href={rutina.fileURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block bg-yellow-100 text-neutral-800 font-bold py-2 px-4 rounded-lg border border-yellow-100 transition duration-300 hover:bg-yellow-200"
                >
                  Ver Rutina
                </a>
              </div>
            </div>
          ))
        ) : (
          <p className="text-white">
            No hay rutinas disponibles para Tronco Superior en este momento.
          </p>
        )}
      </div>
    </div>
  );
}

export default TroncoSuperior;
