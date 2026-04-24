import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"; // Importante para la animación
import AuthGate from "./AuthGate";

export default function HeroSection() {
  const [days, setDays] = useState(1240);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  // Función para manejar el login exitoso
  const handleLogin = (name) => {
    if(name) {
      console.log("Comandante identificado:", name);
      window.location.href = "/commander-dashboard";
    }
  };

  return (
    <section className="relative min-h-[60vh] flex flex-col items-center justify-center overflow-hidden bg-slate-950 pt-20">
      
      {/* --- MODAL DE LOGIN (AUTHGATE) --- */}
      <AnimatePresence>
        {isLoginOpen && (
          <AuthGate 
            layoutId="hero-card"
            onClose={() => setIsLoginOpen(false)} 
            onLogin={handleLogin} 
          />
        )}
      </AnimatePresence>

      <div className="absolute inset-0 z-0 opacity-30 hero-bg">
        <div className="stars-container"></div>
      </div>

      <div className="absolute w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full z-0"></div>

      <div className="container relative z-10 mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono uppercase tracking-widest animate-pulse">
          <span className="w-2 h-2 rounded-full bg-blue-500"></span>
          Deep Space Network Active
        </div>

        <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-500 drop-shadow-2xl">
          ORBIX
        </h1>

        <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-slate-400 font-light leading-relaxed">
          The ultimate interface for{" "}
          <span className="text-white">real-time orbital intelligence</span>.
          Bridging the gap between NASA's telemetry and SpaceX's ambition.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
          
          {/* BOTÓN CON SHARED LAYOUT */}
          <div className="relative h-14 w-64 flex justify-center items-center">
            {!isLoginOpen ? (
              <motion.button 
                layoutId="hero-card" // EL MISMO ID QUE EN AUTHGATE
                onClick={() => setIsLoginOpen(true)}
                className="px-8 py-4 bg-white text-black font-black uppercase text-xs tracking-widest rounded-full hover:bg-cyan-400 transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
              >
                Commander Access
              </motion.button>
            ) : (
              // Placeholder invisible para que el layout no salte al desaparecer el botón
              <div className="px-8 py-4 opacity-0">Commander Access</div>
            )}
          </div>

          <Link to="/launches">
            <button 
              className="px-8 py-4 bg-transparent border border-white/10 text-white font-black uppercase text-xs tracking-widest rounded-full hover:bg-white/5 transition-all"
            >
              Manifest & Telemetry
            </button>
          </Link>
        </div>
      </div>

      <div className="flex justify-around w-full">
        <div className="hidden lg:block text-[10px] font-mono text-slate-600">
          LAT: 28.5729° N <br /> LONG: 80.6490° W
        </div>
        <div className="hidden lg:block text-[10px] font-mono text-slate-600 text-right">
          MISSION DAY: {days} <br /> STATUS: STABLE
        </div>
      </div>
    </section>
  );
}