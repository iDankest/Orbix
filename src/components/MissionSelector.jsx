import { useState, useContext, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { OrbixContext } from "../context/OrbixContext";

export default function MissionSelector({ onAdd, widgetIds }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { launchData } = useContext(OrbixContext);

  const filtered = useMemo(() => {
    if (!launchData?.results) return [];
    const q = search.toLowerCase();
    return launchData.results.filter(
      (l) =>
        !widgetIds.includes(l.id) &&
        (l.name.toLowerCase().includes(q) ||
          l.rocket?.configuration?.full_name?.toLowerCase().includes(q) ||
          l.launch_service_provider?.name?.toLowerCase().includes(q))
    );
  }, [launchData, search, widgetIds]);

  const handleSelect = (launch) => {
    onAdd(launch);
    setOpen(false);
    setSearch("");
  };

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setOpen((prev) => !prev)}
        className="w-full py-3 px-4 bg-white/5 hover:bg-cyan-500/10 border border-dashed border-white/10 hover:border-cyan-500/40 rounded-xl text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-cyan-400 transition-all flex items-center justify-center gap-2"
      >
        {open ? "─ CERRAR" : "+ AÑADIR MISIÓN"}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="mt-2 bg-slate-800/80 border border-white/10 rounded-xl backdrop-blur-xl overflow-hidden">
              <div className="p-2 border-b border-white/5">
                <input
                  autoFocus
                  type="text"
                  placeholder="Buscar misión..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-[10px] text-white outline-none focus:border-cyan-500/50 placeholder:text-slate-600"
                />
              </div>

              <div className="max-h-48 overflow-y-auto custom-scrollbar">
                {filtered.length > 0 ? (
                  filtered.slice(0, 10).map((launch, i) => (
                    <motion.button
                      key={launch.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.03 }}
                      onClick={() => handleSelect(launch)}
                      className="w-full text-left px-3 py-2.5 hover:bg-cyan-500/10 transition-colors border-b border-white/5 last:border-0 group"
                    >
                      <p className="text-white text-[10px] font-bold truncate group-hover:text-cyan-400 transition-colors">
                        {launch.name}
                      </p>
                      <p className="text-[8px] text-slate-500 mt-0.5">
                        {launch.rocket?.configuration?.full_name} · {launch.launch_service_provider?.name}
                      </p>
                    </motion.button>
                  ))
                ) : (
                  <div className="text-center py-6">
                    <p className="text-[10px] text-slate-600">
                      {search ? "Sin resultados" : "No hay más misiones disponibles"}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
