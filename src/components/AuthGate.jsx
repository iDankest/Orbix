import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function AuthGate({ onLogin, onClose, layoutId }) {
  const [name, setName] = useState("");
  const handleLocalSubmit = () => {
    if (name.trim()) {
      onLogin(name); // 2. Usamos la prop que recibimos
    }
  };

  return (
    // Contenedor fijo para centrar el modal sobre toda la pantalla
    <div className="   fixed inset-0 z-[500] flex items-center justify-center p-4 bg-black/40 backdrop-blur-md">
 <motion.div
        layoutId={layoutId} // Magia del Shared Element
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.3 } }}
        className="bg-slate-900 border border-white/10 p-10 rounded-[3rem] w-full max-w-md shadow-2xl relative overflow-hidden"
      >
        <h2 className="text-2xl font-black text-white italic mb-6 text-center">
          IDENTIFICACIÓN REQUERIDA
        </h2>

        <div className="flex flex-col items-center justify-center mb-8">
          {/* Contenedor del Logo con animación de salida personalizada */}
          <motion.div
            layoutId={`${layoutId}-icon`}
            className="mb-4"
          >
            <svg
              width="80"
              height="80"
              viewBox="0 0 24 24"
              fill="none"
              className="text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.4)]"
            >
              {/* Órbita que se "borra" al salir */}
              <motion.path
                d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C15.4323 2 18.467 3.73147 20.25 6.38"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 1 }}
                exit={{ 
                  pathLength: 0, 
                  opacity: 0,
                  transition: { duration: 0.4, ease: "easeInOut" } 
                }}
              />
              {/* Círculo central que se encoge al salir */}
              <motion.circle
                cx="12"
                cy="12"
                r="3"
                fill="currentColor"
                initial={{ opacity: 0.5, scale: 1 }}
                animate={{ opacity: 1, scale: [1, 1.1, 1] }}
                exit={{ 
                  scale: 0, 
                  opacity: 0,
                  transition: { duration: 0.3 } 
                }}
                transition={{ 
                  animate: { repeat: Infinity, duration: 2 },
                  exit: { duration: 0.2 }
                }}
              />
            </svg>
          </motion.div>
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        <input
          autoFocus
          type="text"
          placeholder="NOMBRE DEL COMANDANTE..."
          className="w-full bg-white/5 border border-white/10 p-4 rounded-xl mb-4 text-cyan-400 font-mono outline-none focus:border-cyan-500 placeholder:text-slate-600"
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleLocalSubmit()}
        />

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleLocalSubmit}
          className="w-full bg-cyan-500 py-4 rounded-xl text-black font-black uppercase hover:bg-cyan-400 transition-colors shadow-[0_0_20px_rgba(6,182,212,0.3)]"
        >
          INICIAR SECUENCIA
        </motion.button>

        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors"
        >
          ✕
        </button>
      </motion.div>
    </div>
  );
}
