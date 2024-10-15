import React, { useState, useEffect } from "react";
import {
  getRutinasPorArea,
  toggleLikeRutina,
  auth,
} from "../../firebase/firebase";
import InputBuscador from "../../components/InputBuscador";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

function AreaComponent({ area, titulo }) {
  const [rutinas, setRutinas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [likes, setLikes] = useState({});
  const [error, setError] = useState("");
  const user = auth.currentUser;

  const cargarRutinas = async () => {
    try {
      const rutinasArea = await getRutinasPorArea(area);

      if (!user) {
        setRutinas(rutinasArea);
        return;
      }

      const likesEstado = {};
      rutinasArea.forEach((rutina) => {
        if (rutina.likesBy && rutina.likesBy.includes(user.uid)) {
          likesEstado[rutina.id] = true;
        }
      });

      setLikes(likesEstado);
      setRutinas(rutinasArea);
    } catch (error) {
      console.error(`Error al cargar rutinas de ${area}:`, error);
      setError(`Hubo un error al cargar las rutinas de ${area}.`);
    }
  };

  useEffect(() => {
    cargarRutinas();
  }, [user]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleLike = async (rutinaId) => {
    try {
      setError("");
      await toggleLikeRutina(rutinaId);

      setLikes((prevLikes) => ({
        ...prevLikes,
        [rutinaId]: !prevLikes[rutinaId],
      }));

      cargarRutinas();
    } catch (error) {
      console.error("Error al dar o quitar like:", error);
      setError(error.message);
    }
  };

  const rutinasFiltradas = rutinas.filter((rutina) =>
    rutina.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-neutral-800 mt-10">
      <h1 className="text-3xl font-bold mb-4 text-yellow-100">{titulo}</h1>
      <p className="text-lg mb-8 text-white">
        Explora las rutinas de {area} subidas por la comunidad.
      </p>
      {error && <p className="text-red-500">{error}</p>}
      <InputBuscador onSearch={handleSearch} />
      <div className="space-y-6 mt-5">
        {rutinasFiltradas.length > 0 ? (
          rutinasFiltradas.map((rutina, index) => (
            <div
              key={rutina.id}
              className="relative rounded-lg overflow-hidden text-yellow-100 cursor-pointer transform transition-transform duration-300 hover:scale-105 border border-yellow-100"
              style={{
                background: "linear-gradient(to right, #3f3f46, #18181b)",
              }}
            >
              <div className="relative p-6 z-10">
                <h2 className="text-2xl font-semibold mb-2 text-yellow-100">
                  {`${index + 1}. ${rutina.nombre}`}
                </h2>
                <p className="text-white">{rutina.descripcion}</p>

                <div className="mt-4 flex items-center space-x-2">
                  <button
                    onClick={() => handleLike(rutina.id)}
                    className={`focus:outline-none transition-transform duration-300 ${
                      likes[rutina.id]
                        ? "text-yellow-100"
                        : "text-neutral-800 hover:scale-105"
                    }`}
                  >
                    <FontAwesomeIcon
                      icon={faHeart}
                      size="2x"
                      style={{
                        stroke: "#fef9c3",
                        strokeWidth: "20px",
                      }}
                    />
                  </button>
                  <p className="text-white">{rutina.likes ?? 0}</p>
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
            No hay rutinas disponibles para {area} en este momento.
          </p>
        )}
      </div>
    </div>
  );
}

export default AreaComponent;
