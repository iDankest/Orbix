import { useState } from "react";

export default function AstroModal({ astro, onClose }) {
  // 1. Placeholder más corto y seguro
 const placeholder = "https://images.unsplash.com/photo-1669287731461-bd8ce3126710?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  
  // 2. Estado para manejar la imagen (por si la de la API viene rota)
  const [imgSrc, setImgSrc] = useState(astro?.profile_image || placeholder);

  if (!astro) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div 
        className="bg-slate-900 border border-white/10 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Banner de fondo (Blur) */}
        <div className="relative h-48 bg-cyan-900/20">
            <button 
                onClick={onClose}
                className="absolute top-4 right-4 z-50 bg-black/50 hover:bg-black/80 text-white w-10 h-10 flex items-center justify-center rounded-full transition-all border border-white/10"
            >
                ✕
            </button>
            <img 
                src="https://images.unsplash.com/photo-1517976487492-5750f3195933?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="w-full h-full object-cover opacity-30 blur-md" 
            />
        </div>

        {/* Contenido Central */}
        <div className="p-8 -mt-24 relative text-center">
            {/* Foto de Perfil con detector de error */}
            <div className="inline-block relative">
                <img 
                    src={imgSrc} 
                    alt={astro.name}
                    onError={() => setImgSrc(placeholder)} // Si falla, pone el casco
                    className="w-44 h-44 rounded-full border-8 border-slate-900 mx-auto object-cover shadow-2xl bg-slate-800"
                />
                {/* Indicador de estado online sutil */}
                <span className="absolute bottom-4 right-4 w-6 h-6 bg-cyan-500 border-4 border-slate-900 rounded-full shadow-lg"></span>
            </div>

            <h2 className="text-4xl font-black text-white mt-6 tracking-tighter uppercase italic">
                {astro.name}
            </h2>
            <p className="text-cyan-400 font-mono text-xs uppercase tracking-[0.4em] mt-2 mb-8">
                {astro.agency?.name || "Independent Specialist"}
            </p>
            
            {/* Grid de Información Técnica */}
            <div className="grid grid-cols-2 gap-4 text-left">
                <div className="bg-white/5 border border-white/5 p-4 rounded-2xl">
                    <p className="text-slate-500 text-[10px] uppercase tracking-widest mb-1">Nacionalidad</p>
                    <p className="text-white font-bold">{astro.nationality || "Unknown"}</p>
                </div>
                <div className="bg-white/5 border border-white/5 p-4 rounded-2xl">
                    <p className="text-slate-500 text-[10px] uppercase tracking-widest mb-1">Estado Operativo</p>
                    <p className="text-cyan-500 font-bold">{astro.status?.name || "Active"}</p>
                </div>
            </div>

            {/* Biografía con Scroll si es muy larga */}
            <div className="mt-8 text-left">
                <h4 className="text-white text-xs uppercase tracking-widest mb-3 opacity-50">Registro Biográfico</h4>
                <div className="max-h-40 overflow-y-auto pr-2 custom-scrollbar">
                    <p className="text-slate-400 text-sm leading-relaxed font-light">
                        {astro.bio || "No se han encontrado registros biográficos adicionales en la base de datos central de Orbix."}
                    </p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}