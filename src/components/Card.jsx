import { useState } from "react";



export default function Card({ name, img, from, corporation }) {
  const placeholder = "https://images.unsplash.com/photo-1669287731461-bd8ce3126710?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

  const [imageError, setImageError] = useState(img || placeholder);

  const handleImageError = () => {
    setImageError(placeholder);
  };

  return (
    <div className="  group bg-slate-900/40 backdrop-blur-md border border-white/10 p-5 rounded-2xl hover:border-cyan-400/50 transition-all duration-500 flex flex-col justify-center items-center cursor-pointer h-full">
      {/* Contenedor de imagen con efecto de zoom al pasar el ratón */}
      <div className="overflow-hidden   rounded-full border-2 border-cyan-400/30">
        <img 
          src={imageError} 
          alt={name} 
          className="w-52 h-52 object-cover object-center group-hover:scale-110 transition-transform duration-500 grayscale group-hover:grayscale-0" 
          onError={handleImageError}
        />
      </div>

      <div className="mt-4 text-center texto">
        <h3 className="text-white text-lg font-bold tracking-tight">{name}</h3>
        
        <div className="flex items-center justify-center gap-2 mt-1">
          <span className="text-gray-500 text-xs uppercase tracking-widest">{from}</span>
        </div>
        
        {/* Badge de Corporación estilo SpaceX */}
        <div className="mt-4">
          <span className="inline-block px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 text-[10px] font-bold uppercase tracking-widest">
            {corporation}
          </span>
        </div>
      </div>
    </div>
  );
}