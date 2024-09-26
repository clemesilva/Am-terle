import React from "react";
import ComponentCalendar from "../components/ComponentCalendar";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="relative h-screen p-6 bg-neutral-800 text-white">
      <h1 className="text-3xl font-bold mb-4">Bienvenido AmèTerle</h1>
      <p className="text-lg mb-8">
        Tu fuente de entrenamiento, nutrición y más.
      </p>

      <div className="flex justify-between items-start mb-6">
        <div className="flex flex-col space-y-4 w-1/4">
          <Link
            to="/routines"
            className="bg-yellow-100 text-gray-800 px-6 py-3 rounded-full text-lg font-semibold shadow-md hover:bg-yellow-200 transition duration-300"
          >
            Encuentra tu Rutina
          </Link>
          <Link
            to="/subirRutina"
            className="bg-gray-600 text-yellow-100 px-6 py-3 rounded-full text-lg font-semibold shadow-md hover:bg-gray-500 transition duration-300"
          >
            Subir Rutina
          </Link>
        </div>

        {/* Calendario */}
        <div className="absolute top-8 right-24 p-4">
          <ComponentCalendar />
        </div>
      </div>

      <hr className="mt-32 border-t border-yellow-100" />

      {/* Aqui abajo de esto me gustaría que haya un slider con las rutinas que han estado mejor calificadas, obviamente primero tengo que hacer un componente que tenga un form, con que la gente pueda subir su rutina, ese form podria ser, nombre apellido, tiene que especificar si es tronco inferior, core, superior, o movilidad, y si es pdf o foto, no ambas y listo */}
    </div>
  );
}

export default Home;
