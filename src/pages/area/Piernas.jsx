import React, { useState, useEffect } from "react";
import { getRutinasPorArea } from "../../firebase/firebase";
import InputBuscador from "../../components/InputBuscador";

function Piernas() {
  const [rutinas, setRutinas] = useState([]); // Estado para las rutinas
  const [searchTerm, setSearchTerm] = useState(""); // Estado para la búsqueda

  // Carga las rutinas de pierna cuando se monta el componente
  const cargarRutinas = async () => {
    const rutinasPierna = await getRutinasPorArea("Piernas");
    setRutinas(rutinasPierna);
  };

  useEffect(() => {
    cargarRutinas();
  }, []);

  // Función que se pasa a InputBuscador, maneja el término de búsqueda
  const handleSearch = (term) => {
    console.log("Valor del input:", term); // Ver el valor en la consola
    setSearchTerm(term); // Actualiza el estado con el término de búsqueda
  };

  // Filtrar las rutinas basado en el término de búsqueda
  const rutinasFiltradas = rutinas.filter((rutina) =>
    rutina.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-neutral-800">
      <h1 className="text-3xl font-bold mb-4 text-yellow-100">
        Rutinas de Piernas
      </h1>
      <p className="text-lg mb-8 text-white">
        Explora las rutinas de Piernas subidas por la comunidad.
      </p>

      {/* Aquí es donde se pasa handleSearch como onSearch */}
      <InputBuscador onSearch={handleSearch} />

      <div className="space-y-6">
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

export default Piernas;
