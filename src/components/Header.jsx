import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header({ commander }) {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const links = [
    { name: "Astronauts", path: "/astronauts" },
    { name: "Launches", path: "/launches" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div className="mx-auto mt-4 max-w-6xl">
        <div className="mx-4 px-4 md:px-6 py-3 flex justify-between items-center bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl">
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2 group">
            <h1 className="text-lg md:text-xl font-bold tracking-tighter text-white">
              ORBIX<span className="text-cyan-400">.</span>
            </h1>
          </Link>

          {/* HAMBURGUESA - Centro en mobile */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all"
          >
            <div className="w-5 h-4 relative flex flex-col justify-between">
              <span className={`block h-0.5 w-full bg-current rounded-full transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
              <span className={`block h-0.5 w-full bg-current rounded-full transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 w-full bg-current rounded-full transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
            </div>
          </button>

          {/* NAVEGACIÓN - Desktop */}
          <nav className="hidden md:block">
            <ul className="flex items-center space-x-1">
              {links.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                      isActive(link.path)
                        ? "bg-cyan-500/10 text-cyan-400"
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* ÁREA DE ESTADO / COMANDANTE */}
          <div className="flex items-center gap-2 md:gap-3 pl-0 md:pl-6 border-l-0 md:border-l border-white/10">
            <div className="flex flex-col items-end">
              <span className="text-[8px] md:text-[10px] text-slate-500 font-mono leading-none">
                {commander ? "AUTHORIZED" : "SYSTEM"}
              </span>
              <Link
                to={commander ? "/commander-dashboard" : "/"}
                className={`text-[8px] md:text-[10px] font-mono leading-none uppercase ${commander ? "text-cyan-400 hover:underline" : "text-emerald-400"}`}
              >
                {commander ? commander : "ONLINE"}
              </Link>
            </div>
            <div
              className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${commander ? "bg-cyan-500 shadow-[0_0_8px_#06b6d4]" : "bg-emerald-500 animate-pulse"}`}
            />
          </div>
        </div>
      </div>

      {/* OVERLAY MÓVIL */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm md:hidden z-40"
            />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="absolute top-full left-4 right-4 mt-3 md:hidden z-50"
            >
              <div className="bg-slate-900/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
                {links.map((link, i) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMenuOpen(false)}
                    className={`block px-6 py-4 text-sm font-bold transition-all ${
                      isActive(link.path)
                        ? "bg-cyan-500/10 text-cyan-400 border-l-2 border-cyan-400"
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                    } ${i < links.length - 1 ? "border-b border-white/5" : ""}`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
