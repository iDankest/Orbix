import React from 'react';
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
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-black/40 backdrop-blur-md">
      <motion.div
        layoutId={layoutId}
        className="bg-slate-900 border border-white/10 p-10 rounded-[3rem] w-full max-w-md shadow-2xl relative"
      >
        <h2 className="text-2xl font-black text-white italic mb-6">IDENTIFICACIÓN REQUERIDA</h2>
        
        <input 
          autoFocus
          type="text" 
          placeholder="NOMBRE DEL COMANDANTE..." 
          className="w-full bg-white/5 border border-white/10 p-4 rounded-xl mb-4 text-cyan-400 font-mono outline-none focus:border-cyan-500"
          onChange={(e) => setName(e.target.value)}
        />
        
        <button 
          onClick={handleLocalSubmit}
          className="w-full bg-cyan-500 py-4 rounded-xl text-black font-black uppercase font-bold hover:bg-cyan-400 transition-colors"
        >
          INICIAR SECUENCIA
        </button>

        {/* Botón para cerrar */}
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