import { motion } from "framer-motion"; // <--- Importamos motion
import { useState } from "react";

export default function AstroModal({ astro, onClose }) {
  const placeholder = "https://images.unsplash.com/photo-1669287731461-bd8ce3126710?q=80&w=3087&auto=format&fit=crop";
  const [imgSrc, setImgSrc] = useState(astro?.profile_image || placeholder);

  if (!astro) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* 1. El Fondo (Overlay) con Fade In */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/90 backdrop-blur-md"
      />

      {/* 2. El Contenedor con LayoutId (La magia de la transformación) */}
      <motion.div 
        layoutId={`card-${astro.id}`} // <--- Este ID debe coincidir con el de la Card
        className="bg-slate-900 border border-white/10 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl relative z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Usamos un contenedor para animar el contenido interno suavemente */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.2 }}
        >
          {/* Banner */}
          <div className="relative h-48 bg-cyan-900/20">
            <button onClick={onClose} className="absolute top-4 right-4 z-50 bg-black/50 hover:bg-black/80 text-white w-10 h-10 flex items-center justify-center rounded-full border border-white/10">
              ✕
            </button>
            <img src={imgSrc} className="w-full h-full object-cover opacity-30 blur-md" />
          </div>

          {/* Cuerpo del Modal */}
          <div className="p-8 -mt-24 relative text-center">
            <div className="inline-block relative">
              <img 
                src={imgSrc} 
                alt={astro.name}
                onError={() => setImgSrc(placeholder)}
                className="w-44 h-44 rounded-full border-8 border-slate-900 mx-auto object-cover shadow-2xl bg-slate-800"
              />
              <span className="absolute bottom-4 right-4 w-6 h-6 bg-cyan-500 border-4 border-slate-900 rounded-full"></span>
            </div>

            <h2 className="text-4xl font-black text-white mt-6 tracking-tighter uppercase italic">{astro.name}</h2>
            <p className="text-cyan-400 font-mono text-xs uppercase tracking-[0.4em] mt-2 mb-8">
              {astro.agency?.name || "Independent Specialist"}
            </p>
            
            <div className="grid grid-cols-2 gap-4 text-left">
              <div className="bg-white/5 border border-white/5 p-4 rounded-2xl">
                <p className="text-slate-500 text-[10px] uppercase mb-1">Nacionalidad</p>
                <p className="text-white font-bold">{astro.nationality}</p>
              </div>
              <div className="bg-white/5 border border-white/5 p-4 rounded-2xl">
                <p className="text-slate-500 text-[10px] uppercase mb-1">Estado</p>
                <p className="text-cyan-500 font-bold">{astro.status?.name}</p>
              </div>
            </div>

            <div className="mt-8 text-left">
              <h4 className="text-white text-xs uppercase tracking-widest mb-3 opacity-50">Registro Biográfico</h4>
              <p className="text-slate-400 text-sm leading-relaxed max-h-40 overflow-y-auto pr-2 custom-scrollbar">
                {astro.bio || "Sin registros adicionales."}
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}