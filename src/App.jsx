import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// Componentes Globales
import Header from "./components/Header";
import Footer from "./components/Footer";

// Vistas / Páginas
import HeroSection from "./components/HeroSection";
import LandigStats from "./components/LandigStats";
import ComponetAstronautas from "./components/ComponetAstronautas";
import { OrbixProvider } from "./context/OrbixContext";
import AstroPage from "./pages/AstroPage";

// Proveedor de Contexto (Tu requisito de "API en Context")
/* import { OrbixProvider } from "./context/OrbixContext"; */

function App() {
  return (
    <OrbixProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-slate-950">
          <Header />

          <main className="flex-grow">
            {" "}
            {/* pt-20 para que el Header fixed no tape el contenido */}
            <Routes>
              {/* RUTA PRINCIPAL (Home) */}
              <Route
                path="/"
                element={
                  <>
                    <HeroSection />
                    <div className="max-w-screen-2xl mx-auto">
                      <LandigStats />
                      <ComponetAstronautas />
                    </div>
                  </>
                }
              />
              <Route path="/astronauts" element={<AstroPage />} />

              {/* RUTA DE DETALLE (Requisito: Params ID) */}
              {/* <Route path="/astronaut/:id" element={<AstronautDetail />} /> */}

              {/* Puedes añadir más rutas aquí, como /launches */}
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </OrbixProvider>
  );
}

export default App;
