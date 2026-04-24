import { motion } from "framer-motion";
import { useContext } from "react";
import { OrbixContext } from "../context/OrbixContext";

export default function CommanderDashboard({ commander, setCommander }) {
  const { dailyPhoto } = useContext(OrbixContext); // Foto de la NASA
  const handleLogout = () => {
    setCommander(null); // Borra el nombre del LocalStorage y del estado
    window.location.href = "/"; // Volvemos al inicio
  };

  if (!commander) return <div className="p-20 text-red-500">ACCESO DENEGADO: NO SE DETECTA CREDENCIALES</div>;

  return (
    <div 
      className=" mt-20 min-h-screen bg-slate-950 text-cyan-400 font-mono p-4 md:p-8 relative overflow-hidden"
      style={{
        backgroundImage: `url(${dailyPhoto?.url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Overlay de cristal oscuro */}
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md z-0" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* HEADER */}
        <header className="flex justify-between items-end border-b border-cyan-500/30 pb-6 mb-8">
          <div>
            <p className="text-[10px] tracking-[0.5em] text-cyan-500/60 uppercase">System Status: Nominal</p>
            <h1 className="text-4xl font-black italic text-white">
              WELCOME, <span className="text-cyan-400 uppercase">{commander || 'STRANGER'}</span>
            </h1>
          </div>
          <div className="text-right hidden md:block">
            <p className="text-xs">STATION TIME: {new Date().toUTCString()}</p>
            <p className="text-[10px] text-slate-500 uppercase">Authorization Level: Commander</p>
          </div>
          <button 
            onClick={handleLogout}
            className="px-4 py-2 border border-red-500/50 text-red-500 text-[10px] font-bold rounded-lg hover:bg-red-500 hover:text-black transition-all"
          >
            TERMINAR SESIÓN [ESC]
          </button>
        </header>

        {/* GRID DE WIDGETS */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Columna Izquierda: Telemetría ISS */}
          <div className="md:col-span-4 space-y-6">
            <Widget title="Orbital Tracking (ISS)">
               <div className="h-48 bg-black/50 rounded-xl flex items-center justify-center border border-white/5">
                 {/* Aquí iría tu Mapa */}
                 <span className="text-[10px] animate-pulse text-slate-500">CARGANDO MAPA DE ÓRBITA...</span>
               </div>
               <div className="grid grid-cols-2 gap-2 mt-4 text-[10px]">
                 <div className="bg-white/5 p-2 rounded">ALT: 408 KM</div>
                 <div className="bg-white/5 p-2 rounded">VEL: 7.66 KM/S</div>
               </div>
            </Widget>

            <Widget title="Solar Weather">
               <p className="text-xs text-green-500">● LOW RADIATION RISK</p>
               <p className="text-[9px] text-slate-400 mt-2">Next window for extravehicular activity: OPEN</p>
            </Widget>
          </div>

          {/* Columna Central: Chat / Feed */}
          <div className="md:col-span-5">
            <Widget title="Global Communication Feed" className="h-[500px] flex flex-col">
              <div className="flex-1 overflow-y-auto space-y-4 text-xs pr-2">
                <Message user="Ground_Control" text="Sistemas listos para el despliegue del Falcon 9." />
                <Message user="Mars_Rover" text="Transmitiendo paquetes de datos de la unidad Curiosity..." />
                <Message user="Orbix_AI" text="Bienvenido a bordo, Comandante." color="text-cyan-400" />
              </div>
              <div className="mt-4 flex gap-2">
                <input className="bg-white/5 border border-white/10 rounded-lg p-2 flex-1 text-xs outline-none focus:border-cyan-500" placeholder="Escribir en la bitácora..." />
                <button className="bg-cyan-500 text-black px-4 py-2 rounded-lg font-bold text-[10px]">SEND</button>
              </div>
            </Widget>
          </div>

          {/* Columna Derecha: Misiones Seguidas */}
          <div className="md:col-span-3 space-y-6">
            <Widget title="Mission Watchlist">
               <div className="space-y-4">
                 <div className="border-l-2 border-cyan-500 pl-3">
                   <p className="text-white text-xs font-bold">Crew-8 Dragon</p>
                   <p className="text-[9px] text-slate-500">T-MINUS: 02:14:05</p>
                 </div>
                 <button className="text-[9px] text-cyan-500 underline hover:text-white transition-colors">+ AGREGAR MISIÓN</button>
               </div>
            </Widget>
          </div>

        </div>
      </div>
    </div>
  );
}

// Sub-componentes internos para limpiar el código
function Widget({ title, children, className = "" }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-slate-900/40 border border-white/10 backdrop-blur-xl p-6 rounded-3xl shadow-2xl ${className}`}
    >
      <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-500/80 mb-4 border-b border-white/5 pb-2">{title}</h3>
      {children}
    </motion.div>
  );
}

function Message({ user, text, color="text-slate-300" }) {
  return (
    <div className="bg-white/5 p-3 rounded-xl border border-white/5">
      <p className="text-[9px] font-black text-cyan-600 mb-1">[{user}]</p>
      <p className={`${color}`}>{text}</p>
    </div>
  );
}