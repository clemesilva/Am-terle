import React, { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { addRutina } from "../firebase/firebase";

function SubirRutina() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [area, setArea] = useState("");
  const [rutinaFile, setRutinaFile] = useState(null);
  const [descripcionRutina, setDescripcionRutina] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const infoPersonal = { nombre, email };
    const rutinaData = { area, rutinaFile, descripcion: descripcionRutina };

    try {
      await addRutina(infoPersonal, rutinaData);
      console.log("Rutina subida exitosamente");

      alert(`RUTINA SUBIDA EXITOSAMENTE, GRACIAS ${infoPersonal.nombre}!`);

      setNombre("");
      setEmail("");
      setArea("");
      setRutinaFile(null);
      setDescripcionRutina("");
    } catch (error) {
      console.error("Error al subir la rutina:", error);
    }
  };

  return (
    <Card
      color="transparent"
      shadow={false}
      className="bg-neutral-800 p-8 rounded-lg border-2 border-yellow-100" // Cambia a un borde sólido
    >
      <Typography variant="h4" color="white" className="text-center">
        Subir Rutina
      </Typography>
      <Typography color="white" className="mt-1 font-normal text-center">
        Ingrese los detalles para registrar su rutina.
      </Typography>
      <form
        onSubmit={handleSubmit}
        className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 mx-auto"
      >
        <div className="mb-1 flex flex-col gap-6">
          <Typography variant="h6" color="white" className="-mb-3">
            Nombre
          </Typography>
          <Input
            type="text"
            required
            size="lg"
            placeholder="Nicolas Pirozzi"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="!border-yellow-100 focus:!border-yellow-100 bg-neutral-700 text-yellow-100" // Borde amarillo sólido
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="white" className="-mb-3">
            Correo Electrónico
          </Typography>
          <Input
            required
            type="email"
            size="lg"
            placeholder="nombre@mail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="!border-yellow-100 focus:!border-yellow-100 text-yellow-100 bg-neutral-700" // Borde amarillo sólido
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="white" className="-mb-3">
            Qué área del cuerpo trabaja tu rutina
          </Typography>
          <select
            required
            size="lg"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className="!border-yellow-100 focus:!border-yellow-100 text-yellow-100 bg-neutral-700" // Borde amarillo sólido
          >
            <option value="">Selecciona área</option>
            <option value="Piernas">Piernas (tronco inferior)</option>
            <option value="Core">Core</option>
            <option value="Tronco Superior">Tronco Superior</option>
            <option value="Full Body">Full Body</option>
            <option value="Movilidad/Activacion">Movilidad/Activación</option>
            <option value="Nutricion">Nutrición</option>
          </select>

          <Typography variant="h6" color="white" className="-mb-3">
            Descripción de la Rutina (incluir tiempo de demora)
          </Typography>
          <textarea
            required
            placeholder="Ej: Rutina dura, tiene artos isquitibial y cardio, me demoré aprox 30 minutos y esta ideal de tiempo"
            value={descripcionRutina}
            onChange={(e) => setDescripcionRutina(e.target.value)}
            className="!border-yellow-100 focus:!border-yellow-100 text-yellow-100 bg-neutral-700 p-2 rounded" // Borde amarillo sólido
          />

          <Typography variant="h6" color="white" className="-mb-3">
            Subir Rutina
          </Typography>

          <Input
            required
            type="file"
            accept="jpg,.jpeg,.png,.pdf"
            size="lg"
            onChange={(e) => {
              const file = e.target.files[0]; // Capturamos el archivo
              console.log(file); // Mostramos el archivo en la consola
              setRutinaFile(file); // Asignamos el archivo a tu estado o lógica
            }}
            className="!border-yellow-100 focus:!border-yellow-100 text-yellow-100 bg-neutral-700" // Borde amarillo sólido
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
        </div>
        <Button
          type="submit"
          className="mt-6 bg-yellow-100 text-neutral-800 hover:bg-yellow-200"
          fullWidth
        >
          Subir Rutina
        </Button>
      </form>
    </Card>
  );
}

export default SubirRutina;
