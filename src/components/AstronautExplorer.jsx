import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AstroModal from "./AstroModal";
import AstronautSkeleton from "./AstronautSkeleton";

const PLACEHOLDER = "https://images.unsplash.com/photo-1669287731461-bd8ce3126710?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export default function AstronautExplorer({ allAstronauts }) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [imgErrors, setImgErrors] = useState({});

  const filtered = useMemo(() => {
    if (!allAstronauts) return [];
    const q = search.toLowerCase();
    if (!q) return showAll ? allAstronauts.slice(0, 20) : allAstronauts.slice(0, 6);
    return allAstronauts.filter(
      (a) =>
        a.name?.toLowerCase().includes(q) ||
        a.nationality?.toLowerCase().includes(q) ||
        a.agency?.abbrev?.toLowerCase().includes(q)
    ).slice(0, 20);
  }, [allAstronauts, search, showAll]);

  if (!allAstronauts) {
    return (
      <div className="grid grid-cols-2 gap-3">
        {[1, 2, 3, 4].map((n) => <AstronautSkeleton key={n} />)}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="relative">
        <input
          type="text"
          placeholder="Buscar astronauta..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setShowAll(true); }}
          className="w-full bg-white/5 border border-white/10 rounded-xl p-3 pl-9 text-[10px] text-white outline-none focus:border-cyan-500/50 placeholder:text-slate-600"
        />
        <span className="absolute left-3 top-2.5 text-slate-600 text-[10px]">🔍</span>
      </div>

      <div className="grid grid-cols-2 gap-2 max-h-[340px] overflow-y-auto custom-scrollbar pr-1">
        {filtered.map((astro, i) => (
          <motion.button
            key={astro.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            onClick={() => setSelected(astro)}
            className="bg-white/5 hover:bg-cyan-500/10 border border-white/5 hover:border-cyan-500/30 rounded-xl p-2.5 text-left transition-all group"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-slate-800 overflow-hidden flex-shrink-0 border border-white/5">
                <img
                  src={imgErrors[astro.id] ? PLACEHOLDER : (astro.profile_image || PLACEHOLDER)}
                  alt={astro.name}
                  className="w-full h-full object-cover"
                  onError={() => setImgErrors(prev => ({ ...prev, [astro.id]: true }))}
                />
              </div>
              <div className="min-w-0">
                <p className="text-[9px] text-white font-bold truncate group-hover:text-cyan-400 transition-colors">
                  {astro.name}
                </p>
                <p className="text-[7px] text-slate-500 truncate">{astro.agency?.abbrev || astro.nationality}</p>
              </div>
            </div>
          </motion.button>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-2 text-center py-6">
            <p className="text-[10px] text-slate-500">Sin resultados</p>
          </div>
        )}
      </div>

      {!search && !showAll && allAstronauts?.length > 6 && (
        <button
          onClick={() => setShowAll(true)}
          className="w-full text-[9px] text-cyan-500 hover:text-cyan-400 py-2 transition-colors uppercase tracking-wider font-bold"
        >
          + Ver todos ({allAstronauts.length})
        </button>
      )}

      <AnimatePresence>
        {selected && <AstroModal astro={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </div>
  );
}
