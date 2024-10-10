import React, { useState, useEffect } from "react";
import { getRutinasPorArea, likeRutina } from "../../firebase/firebase";
import InputBuscador from "../../components/InputBuscador";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

function Core() {
  const [rutinas, setRutinas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [likes, setLikes] = useState({}); // Estado para gestionar qué rutinas han sido "likeadas"

  const cargarRutinas = async () => {
    const rutinasCore = await getRutinasPorArea("Core");
    setRutinas(rutinasCore);
  };

  useEffect(() => {
    cargarRutinas();
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleLike = async (rutinaId) => {
    try {
      await likeRutina(rutinaId);
      setLikes({ ...likes, [rutinaId]: true }); // Marca la rutina como "likeada"
      cargarRutinas(); // Recarga las rutinas para actualizar los likes
    } catch (error) {
      console.error("Error al dar like:", error);
    }
  };

  const rutinasFiltradas = rutinas.filter((rutina) =>
    rutina.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-neutral-800">
      <h1 className="text-3xl font-bold mb-4 text-yellow-100">
        Rutinas de Core
      </h1>
      <p className="text-lg mb-8 text-white">
        Explora las rutinas de Core subidas por la comunidad.
      </p>
      <InputBuscador onSearch={handleSearch} />

      <div className="space-y-6 mt-5">
        {rutinasFiltradas.length > 0 ? (
          rutinasFiltradas.map((rutina) => (
            <div
              key={rutina.id}
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

                <div className="mt-4 flex items-center space-x-2">
                  {/* Ícono de corazón y número de likes */}
                  <button
                    onClick={() => handleLike(rutina.id)}
                    className={`focus:outline-none ${
                      likes[rutina.id]
                        ? "text-yellow-100"
                        : "text-neutral-800 hover:text-yellow-100"
                    }`}
                  >
                    <FontAwesomeIcon icon={faHeart} size="2x" />
                  </button>
                  <p className="text-white">{rutina.likes ?? 0}</p>{" "}
                  {/* Mostrar el número de likes */}
                </div>

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
            No hay rutinas disponibles para Core en este momento.
          </p>
        )}
      </div>
    </div>
  );
}

export default Core;
