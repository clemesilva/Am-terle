// Importamos las funciones necesarias de Firebase SDK
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  doc,
  setDoc,
  collection,
  getFirestore,
  getDoc,
  query,
  where,
  getDocs,
  updateDoc,
  increment,
  arrayUnion,
} from "firebase/firestore";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

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
export const storage = getStorage(app);
export const auth = getAuth(app);

// Configuramos Google Auth Provider
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

// Autenticación con Google Popup y Redirect
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

// Función para crear un usuario en Firestore
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.error("Error al crear el usuario", error.message);
    }
  }

  return userDocRef;
};

//función para likear rutina
export const likeRutina = async (rutinaId) => {
  const user = auth.currentUser; // Obtiene el usuario autenticado
  if (!user) {
    throw new Error("Debe iniciar sesión para dar like");
  }

  const rutinaRef = doc(db, "rutinas", rutinaId);
  const rutinaSnapshot = await getDoc(rutinaRef);

  if (rutinaSnapshot.exists()) {
    const rutinaData = rutinaSnapshot.data();

    // Verificar si el UID del usuario ya está en la lista de "likesBy"
    if (rutinaData.likesBy && rutinaData.likesBy.includes(user.uid)) {
      throw console.log("Ya has dado like a esta rutina");
    }

    // Si el usuario no ha dado like aún, incrementamos el número de likes y añadimos su UID
    await updateDoc(rutinaRef, {
      likes: increment(1), // Incrementa en 1
      likesBy: arrayUnion(user.uid), // Agrega el UID del usuario al array likesBy
    });
  } else {
    throw new Error("Rutina no encontrada");
  }
};

// Función para registrar usuario con email y contraseña
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth, // La instancia de autenticación de Firebase
      email, // Correo electrónico del usuario
      password // Contraseña del usuario
    );
    return userCredential.user; // Devuelve el usuario autenticado
  } catch (error) {
    console.error("Error al autenticar:", error);
    throw error; // Propaga el error para manejarlo en el componente
  }
};

// Función para agregar una rutina a Firestore
export const addRutina = async (infoPersonal, rutinaData) => {
  try {
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

    // Guardamos la rutina en Firestore
    const docRef = doc(collection(db, "rutinas"));

    // Guardamos la rutina en Firestore junto con el ID del documento y el array likesBy
    await setDoc(docRef, {
      ...infoPersonal,
      area: rutinaData.area,
      fileURL: downloadURL,
      descripcion: rutinaData.descripcion,
      nombre: infoPersonal.nombre,
      id: docRef.id,
      likes: 0, // Inicializamos los likes en 0
      likesBy: [], // Inicializamos el array de likesBy vacío
    });

    console.log("Rutina guardada con éxito en Firestore.");
  } catch (error) {
    console.error("Error al agregar la rutina:", error);
    throw error;
  }
};

// Función para obtener rutinas filtradas por área
export const getRutinasPorArea = async (area) => {
  try {
    const rutinasRef = collection(db, "rutinas");
    const q = query(rutinasRef, where("area", "==", area));

    const querySnapshot = await getDocs(q);
    const rutinas = querySnapshot.docs.map((doc) => doc.data());

    console.log(`Rutinas del área ${area}:`, rutinas);
    return rutinas;
  } catch (error) {
    console.error("Error al obtener las rutinas:", error);
    return [];
  }
};
