import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Componente SplashSequence V2 - "Hyper-Zoom Edition"
 * 1. Muestra Logo + "ORBIX"
 * 2. Las letras se desvanecen lateralmente.
 * 3. El logo se centra y ejecuta un zoom expansivo (efecto túnel).
 */
export default function SplashSequence({ onFinished }) {
  const [phase, setPhase] = useState('intro'); // intro, transition, zoom

  useEffect(() => {
    // Fase 1: Mostrar todo (2.5s)
    const transitionTimer = setTimeout(() => {
      setPhase('transition');
    }, 2000);

    // Fase 2: Iniciar el Zoom final (3.2s)
    const zoomTimer = setTimeout(() => {
      setPhase('zoom');
    }, 3200);

    // Fase 3: Terminar y entrar al Dash (4s)
    const finishTimer = setTimeout(() => {
      if (onFinished) onFinished();
    }, 4000);

    return () => {
      clearTimeout(transitionTimer);
      clearTimeout(zoomTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinished]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950 overflow-hidden">
      {/* Fondo de estrellas con movimiento sutil */}
      <motion.div 
        initial={{ scale: 1 }}
        animate={phase === 'zoom' ? { scale: 2, opacity: 0 } : { scale: 1.1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" 
      />

      <motion.div 
        className="flex items-center gap-6"
        animate={phase === 'zoom' ? { scale: 5, opacity: 0 } : { scale: 1 }}
        transition={{ duration: 0.8, ease: "easeIn" }}
      >
        {/* EL LOGO (Símbolo de la Órbita) */}
        <motion.div
          layout
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          className="relative"
        >
          <svg 
            width="100" 
            height="100" 
            viewBox="0 0 24 24" 
            fill="none" 
            className="text-cyan-400 drop-shadow-[0_0_25px_rgba(34,211,238,0.6)]"
          >
            {/* Órbita con trazo que parece brillar */}
            <motion.path 
              d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C15.4323 2 18.467 3.73147 20.25 6.38" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
            {/* El nodo central con pulso constante */}
            <motion.circle 
              cx="12" 
              cy="12" 
              r="3.5" 
              fill="currentColor"
              animate={{ 
                scale: [1, 1.3, 1],
                filter: ["blur(0px)", "blur(1px)", "blur(0px)"]
              }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
          </svg>
        </motion.div>

        {/* LAS LETRAS ORBIX */}
        <AnimatePresence>
          {phase === 'intro' && (
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ 
                opacity: 0, 
                x: 50, 
                width: 0,
                filter: "blur(10px)",
                transition: { duration: 0.6, ease: "easeIn" } 
              }}
              className="overflow-hidden flex items-center"
            >
              <h1 className="text-7xl font-black tracking-tighter text-white">
                ORBIX<span className="text-cyan-400">.</span>
              </h1>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Destello de luz central que se expande en el zoom */}
      <motion.div 
        className="absolute w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px]"
        animate={phase === 'zoom' 
          ? { scale: 10, opacity: 1, backgroundColor: "rgba(34, 211, 238, 0.2)" } 
          : { scale: 1, opacity: 0.4 }
        }
        transition={{ duration: 1 }}
      />
    </div>
  );
}