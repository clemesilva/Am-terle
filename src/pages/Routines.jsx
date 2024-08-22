import React from "react";
import { Link } from "react-router-dom";

const RoutineCard = ({ title, description, imageUrl, to }) => (
  <Link
    to={to}
    className="block relative rounded-lg overflow-hidden bg-gray-800 text-white cursor-pointer transform transition-transform duration-300 hover:scale-105"
  >
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: `url('${imageUrl}')` }}
    ></div>
    <div className="relative p-6 z-10">
      <h2 className="text-2xl font-semibold mb-2">{title}</h2>
      <p>{description}</p>
    </div>
  </Link>
);

function Routines() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 text-white">Rutinas</h1>
      <p className="text-lg mb-8">
        Explora nuestras rutinas de entrenamiento diseñadas para todos los
        niveles y objetivos.
      </p>
      <div className="space-y-6">
        <RoutineCard
          title="PIERNAS"
          description="Desarrolla fuerza y resistencia en tus piernas con estas rutinas."
          imageUrl="https://hips.hearstapps.com/hmg-prod/images/soccer-world-cup-2002-brazil-turkey-roberto-carlos-photo-news-photo-1681206499.jpg"
          to="/piernas"
        />
        <RoutineCard
          title="CORE"
          description="Fortalece tu tronco con estas rutinas de entrenamiento."
          imageUrl="https://album.mediaset.es/eimg/10000/2022/01/05/clipping_bDIChn_28c1.jpg"
          to="/rutinas/core"
        />
        <RoutineCard
          title="Tronco Superior"
          description="Mejora tu fuerza en la parte superior del tronco con estas rutinas."
          imageUrl="https://i.pinimg.com/736x/62/2f/c6/622fc66db29648c3370a26cd01d364dd.jpg"
          to="/rutinas/tronco-superior"
        />
        <RoutineCard
          title="FULL BODY"
          description="Entrenamiento de cuerpo completo"
          imageUrl="/path/to/your/image1.jpg"
          to="/rutinas/full-body"
        />
        <RoutineCard
          title="MOVILIDAD/ACTIVACIÓN"
          description="Una buena rutina para mejorar la movilidad"
          imageUrl="/path/to/your/image1.jpg"
          to="/rutinas/movilidad-activacion"
        />
      </div>
    </div>
  );
}

export default Routines;
