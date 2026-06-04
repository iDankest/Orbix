import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

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
    id: "solar-weather",
    label: "Solar Weather",
    desc: "Clima espacial y radiación",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M17.66 6.34l1.41-1.41" />
      </svg>
    ),
  },
  {
    id: "system-modules",
    label: "Modules",
    desc: "Estado de los sistemas de a bordo",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
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
];

export default function DashboardDock({ visibleIds, onToggle }) {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <motion.div
      initial={{ y: 60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex justify-center"
    >
      <div className="inline-flex items-center gap-1 px-3 py-2 bg-slate-900/80 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl">
        {DOCK_ITEMS.map((item) => {
          const isActive = visibleIds.includes(item.id);
          const isHovered = hoveredId === item.id;
          return (
            <div className="relative flex flex-col items-center">
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.12 }}
                    className="absolute bottom-full mb-2 pointer-events-none z-50"
                  >
                    <div className="bg-slate-800 border border-white/10 rounded-xl px-3 py-2 shadow-2xl whitespace-nowrap text-center">
                      <p className="text-white text-[10px] font-bold uppercase tracking-wider">{item.label}</p>
                      <p className="text-slate-400 text-[8px] mt-0.5">{item.desc}</p>
                    </div>
                    <div className="mx-auto w-2 h-2 bg-slate-800 border-r border-b border-white/10 rotate-45 -mt-1" />
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                key={item.id}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onToggle(item.id)}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`relative p-3 rounded-xl transition-all cursor-pointer ${
                  isActive
                    ? "text-cyan-400 bg-cyan-500/10 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
                    : "text-slate-600 hover:text-slate-300 hover:bg-white/5"
                }`}
              >
                {item.icon}
                {isActive && (
                  <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-cyan-400 rounded-full" />
                )}
              </motion.button>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
