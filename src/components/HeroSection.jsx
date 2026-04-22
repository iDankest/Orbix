import { useEffect, useState } from "react";

export default function HeroSection() {
  // Estado para un contador de "misión" (solo estético para el feeling espacial)
  const [days, setDays] = useState(1240);

  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-slate-950 pt-20 ">
      {/* 1. Fondo de Estrellas (Inyección de CSS/Efecto visual) */}
      <div className="absolute inset-0 z-0 opacity-30 hero-bg">
        <div className="stars-container"></div>
      </div>

      {/* 2. Resplandor detrás del título */}
      <div className="absolute w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full z-0"></div>

      <div className="container relative z-10 mx-auto px-4 text-center">
        {/* Badge superior */}
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono uppercase tracking-widest animate-pulse">
          <span className="w-2 h-2 rounded-full bg-blue-500"></span>
          Deep Space Network Active
        </div>

        {/* Título con gradiente mejorado */}
        <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-500 drop-shadow-2xl">
          ORBIX
        </h1>

        <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-slate-400 font-light leading-relaxed">
          The ultimate interface for{" "}
          <span className="text-white">real-time orbital intelligence</span>.
          Bridging the gap between NASA's telemetry and SpaceX's ambition.
        </p>

        {/* 3. Botones de Acción (Cumpliendo el Router próximamente) */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-cyan-400 transition-all hover:scale-105 active:scale-95">
            Launch Dashboard
          </button>
          <button className="px-8 py-3 bg-transparent border border-white/10 text-white font-medium rounded-full hover:bg-white/5 transition-all">
            Live Telemetry
          </button>
        </div>
      </div>
      <div className="flex w-full justify-evenly absolute bottom-16 ">
        {/* 4. Decoración de coordenadas (Feeling Dashboard) */}
        <div className="hidden lg:block text-[10px] font-mono text-slate-600 ">
          LAT: 28.5729° N <br /> LONG: 80.6490° W
        </div>
        <div className="hidden lg:block text-[10px] font-mono text-slate-600 text-right">
          MISSION DAY: {days} <br /> STATUS: STABLE
        </div>
      </div>
    </section>
  );
}
