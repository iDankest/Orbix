import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const LOCK_KEY = "orbix_dock_locked";

const DOCK_ITEMS = [
  {
    id: "iss-tracker",
    label: "ISS Tracker",
    desc: "Posición de la ISS en tiempo real",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <circle cx="12" cy="12" r="3" />
        <path d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10" />
        <path d="M12 2v20M2 12h20M7 7l10 10M17 7L7 17" />
      </svg>
    ),
  },
  {
    id: "chat",
    label: "Comms Feed",
    desc: "Canal de comunicación con Orbix AI",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        <path d="M8 9h8M8 13h6" />
      </svg>
    ),
  },
  {
    id: "my-missions",
    label: "Missions",
    desc: "Tus misiones guardadas",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path d="M4 13a8 8 0 0 1 7 7a6 6 0 0 0 3 -5a9 9 0 0 0 6 -8a3 3 0 0 0 -3 -3a9 9 0 0 0 -8 6a6 6 0 0 0 -5 3" />
        <path d="M7 14a6 6 0 0 0 -3 6a6 6 0 0 0 6 -3" />
      </svg>
    ),
  },
  {
    id: "quick-stats",
    label: "Stats",
    desc: "Resumen de actividad del dashboard",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path d="M18 20V10M12 20V4M6 20v-6" />
      </svg>
    ),
  },
  {
    id: "space-race",
    label: "Space Race",
    desc: "Dominio por país y agencia espacial",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    id: "astronaut-explorer",
    label: "Astronauts",
    desc: "Busca y explora astronautas activos",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <circle cx="9" cy="7" r="4" />
        <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        <path d="M21 21v-2a4 4 0 0 0-3-3.85" />
      </svg>
    ),
  },
  {
    id: "space-news",
    label: "News",
    desc: "Últimas noticias del espacio",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9" />
        <path d="M10 7h6M10 11h6M10 15h4" />
      </svg>
    ),
  },
];

export default function DashboardDock({ visibleIds, onToggle }) {
  const [hoveredId, setHoveredId] = useState(null);
  const [locked, setLocked] = useState(() => {
    try { return JSON.parse(localStorage.getItem(LOCK_KEY) || "false"); }
    catch { return false; }
  });

  useEffect(() => {
    localStorage.setItem(LOCK_KEY, JSON.stringify(locked));
  }, [locked]);

  const handleToggle = (id) => {
    if (!locked) onToggle(id);
  };

  const getScale = (itemId) => {
    if (!hoveredId) return 1;
    if (hoveredId === itemId) return 1.25;
    const idx = DOCK_ITEMS.findIndex((i) => i.id === itemId);
    const hoverIdx = DOCK_ITEMS.findIndex((i) => i.id === hoveredId);
    const dist = Math.abs(idx - hoverIdx);
    if (dist === 1) return 1.08;
    if (dist === 2) return 1.03;
    return 1;
  };

  return (
    <motion.div
      initial={{ y: 60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="fixed bottom-6 left-0 right-0 flex justify-center z-[100] pointer-events-none"
    >
      <motion.div
        className="pointer-events-auto"
        animate={{ y: [0, -1, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div
          animate={{
            boxShadow: [
              "0 0 0 0 rgba(6, 182, 212, 0)",
              "0 0 35px 0 rgba(6, 182, 212, 0.05)",
              "0 0 0 0 rgba(6, 182, 212, 0)",
            ],
            borderColor: [
              "rgba(255, 255, 255, 0.05)",
              "rgba(6, 182, 212, 0.15)",
              "rgba(255, 255, 255, 0.05)",
            ],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="flex items-center gap-1 px-4 py-2.5 bg-slate-900/80 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl"
        >
          {DOCK_ITEMS.map((item, i) => {
            const isActive = visibleIds.includes(item.id);
            const isHovered = hoveredId === item.id;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20, scale: 0.6 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: i * 0.06, type: "spring", stiffness: 300, damping: 18 }}
                className="relative flex flex-col items-center"
              >
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.9 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      className="absolute bottom-full mb-3 pointer-events-none z-50"
                    >
                      <div className="bg-slate-800/95 border border-white/10 rounded-xl px-3 py-2 shadow-2xl whitespace-nowrap text-center">
                        <p className="text-white text-[10px] font-bold uppercase tracking-wider">{item.label}</p>
                        <p className="text-slate-400 text-[8px] mt-0.5">{item.desc}</p>
                      </div>
                      <div className="mx-auto w-2 h-2 bg-slate-800 border-r border-b border-white/10 rotate-45 -mt-1" />
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.button
                  whileTap={{ scale: 0.85 }}
                  animate={{ scale: getScale(item.id) }}
                  transition={{ type: "spring", stiffness: 500, damping: 20 }}
                  onClick={() => handleToggle(item.id)}
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className={`relative p-3 rounded-xl cursor-pointer transition-colors ${
                    isActive
                      ? "text-cyan-400 bg-cyan-500/10"
                      : "text-slate-600 hover:text-slate-300 hover:bg-white/5"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="dock-active"
                      className="absolute inset-0 rounded-xl bg-cyan-500/10 border border-cyan-500/20"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.icon}</span>
                </motion.button>
              </motion.div>
            );
          })}

            <div className="w-px h-6 bg-white/5 mx-1" />

            <div className="relative flex flex-col items-center">
              <AnimatePresence>
                {hoveredId === "__lock" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="absolute bottom-full mb-3 pointer-events-none z-50"
                  >
                    <div className="bg-slate-800/95 border border-white/10 rounded-xl px-3 py-2 shadow-2xl whitespace-nowrap text-center">
                      <p className="text-white text-[10px] font-bold uppercase tracking-wider">
                        {locked ? "Desbloquear dock" : "Bloquear dock"}
                      </p>
                      <p className="text-slate-400 text-[8px] mt-0.5">
                        {locked ? "Permite editar widgets" : "Evita cambios accidentales"}
                      </p>
                    </div>
                    <div className="mx-auto w-2 h-2 bg-slate-800 border-r border-b border-white/10 rotate-45 -mt-1" />
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                whileTap={{ scale: 0.85 }}
                animate={{ scale: hoveredId === "__lock" ? 1.15 : 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 20 }}
                onClick={() => setLocked((v) => !v)}
                onMouseEnter={() => setHoveredId("__lock")}
                onMouseLeave={() => setHoveredId(null)}
                className={`relative p-3 rounded-xl cursor-pointer transition-colors ${
                  locked ? "text-cyan-400" : "text-slate-600 hover:text-slate-400"
                }`}
              >
                {locked ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    <circle cx="12" cy="16" r="1" fill="currentColor" />
                    <line x1="12" y1="17" x2="12" y2="19.5" />
                  </svg>
                )}
              </motion.button>
            </div>
          </motion.div>
      </motion.div>
    </motion.div>
  );
}
