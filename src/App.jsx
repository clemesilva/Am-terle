import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar1 from "./components/Navbar";
import Home from "./pages/Home";
import Routines from "./pages/Routines";
import Nutrition from "./pages/Nutrition";
import Calendar from "./pages/Calendar";
import Sensations from "./pages/Sensations";
import Footer1 from "./components/Footer";
import Piernas from "./pages/area/Piernas.jsx";
import SubirRutina from "./pages/SubirRutina.jsx";
import Core from "./pages/area/Core.jsx";
import FullBody from "./pages/area/FullBody.jsx";
import MovilidadActivacion from "./pages/area/MovilidadActivacion.jsx";
import TroncoSuperior from "./pages/area/TroncoSuperior.jsx";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import Login from "./authentication/Login.jsx";
import SignUpForm from "./authentication/SignUpForm.jsx";

function App() {
  return (
    <Router>
      <div className="bg-neutral-800 min-h-screen ">
        <Navbar1 />
        <Card
          color="transparent"
          shadow={false}
          className="bg-neutral-800 p-8 rounded-lg border-2 border-yellow-100 flex-grow"
        >
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/routines" element={<Routines />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/nutrition" element={<Nutrition />} />
              <Route path="/sensations" element={<Sensations />} />
              <Route path="/piernas" element={<Piernas />} />
              <Route path="/subirRutina" element={<SubirRutina />} />
              <Route path="/core" element={<Core />} />
              <Route path="/fullbody" element={<FullBody />} />
              <Route
                path="/movilidadActivacion"
                element={<MovilidadActivacion />}
              />
              <Route path="/troncoSuperior" element={<TroncoSuperior />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUpForm />} />
            </Routes>
          </div>
        </Card>
        <Footer1 />
      </div>
    </Router>
  );
}

export default App;
