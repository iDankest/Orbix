import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useLocalStorage } from "./hooks/useLocalStorage";
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
import LaunchesPage from "./pages/LaunchesPage";
import CommanderDashboard from "./pages/CommanderDashboard";
// Proveedor de Contexto (Tu requisito de "API en Context")
/* import { OrbixProvider } from "./context/OrbixContext"; */

function App() {
  const [commander, setCommander] = useLocalStorage("orbix_commander", null);

  return (
    <OrbixProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-slate-950">
          <Header commander={commander} />
          <main className="flex-grow">
            <Routes>
              {/* RUTA PRINCIPAL: Aquí pasamos la función a los dos sitios con login */}
              <Route
                path="/"
                element={
                  <>
                    <HeroSection onLoginSuccess={setCommander} /> 
                    <div className="max-w-screen-2xl mx-auto">
                      <LandigStats onLoginSuccess={setCommander} />
                      <ComponetAstronautas />
                    </div>
                  </>
                }
              />

              <Route path="/astronauts" element={<AstroPage />} />
              <Route path="/launches" element={<LaunchesPage />} />

              {/* CORRECCIÓN: Esta ruta debe cargar el Dashboard, no las Stats */}
              <Route 
                path="/commander-dashboard" 
                element={<CommanderDashboard commander={commander} setCommander={setCommander} />} 
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </OrbixProvider>
  );
}

export default App;
