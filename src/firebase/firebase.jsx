// Importamos las funciones necesarias de Firebase SDK
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  doc,
  setDoc,
  collection,
  getFirestore,
  query,
  where,
  getDocs,
} from "firebase/firestore";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCGV_BWJ4F5SGCayBq35AtXRJVTZcrSFgA",
  authDomain: "ameterle.firebaseapp.com",
  projectId: "ameterle",
  storageBucket: "ameterle.appspot.com",
  messagingSenderId: "795301336365",
  appId: "1:795301336365:web:417c3a655639ce1c85afa4",
};

// Inicializamos Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app); // Inicializamos Firebase Storage

// Función para agregar una rutina
export const addRutina = async (infoPersonal, rutinaData) => {
  try {
    // Generamos un ID de documento para la nueva rutina
    const docRef = doc(collection(db, "rutinas"));

    // Verificamos si el archivo de rutina existe
    if (!rutinaData.rutinaFile) {
      throw new Error("No se ha proporcionado ningún archivo.");
    }

    // Subimos el archivo a Firebase Storage
    const storageRef = ref(storage, `rutinas/${rutinaData.rutinaFile.name}`);
    const snapshot = await uploadBytes(storageRef, rutinaData.rutinaFile);
    console.log("Archivo subido con éxito:", snapshot);

    // Obtenemos la URL de descarga del archivo
    const downloadURL = await getDownloadURL(storageRef);
    console.log("URL de descarga obtenida:", downloadURL);

    // Guardamos los datos en Firestore junto con la URL del archivo
    await setDoc(docRef, {
      ...infoPersonal,
      area: rutinaData.area,
      fileURL: downloadURL, // Guardamos la URL del archivo
      descripcion: rutinaData.descripcion,
    });

    console.log("Rutina guardada con éxito en Firestore.");
  } catch (error) {
    console.error("Error al agregar la rutina:", error);
  }
};

// Función para obtener rutinas filtradas por área
export const getRutinasPorArea = async (area) => {
  try {
    // Creamos una consulta para filtrar por área
    const rutinasRef = collection(db, "rutinas");
    const q = query(rutinasRef, where("area", "==", area));

    // Ejecutamos la consulta
    const querySnapshot = await getDocs(q);
    const rutinas = querySnapshot.docs.map((doc) => doc.data());

    console.log(`Rutinas de la área ${area}:`, rutinas);
    return rutinas;
  } catch (error) {
    console.error("Error al obtener las rutinas:", error);
    return [];
  }
};
