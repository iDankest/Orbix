import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCountdown } from "../hooks/useCountdown";

const TABS = [
  { id: "agencias", label: "Agencias" },
  { id: "misiones", label: "Misiones" },
  { id: "inversion", label: "Inversión" },
];

const AGENCIAS = [
  { name: "NASA", country: "USA", domain: "nasa.gov", color: "#0B3D91", focus: ["Lunar", "Marte", "Telescopios"], budget: "25.4B" },
  { name: "SpaceX", country: "USA", domain: "spacex.com", color: "#005288", focus: ["Reutilizable", "Marte", "Lunar"], budget: "—" },
  { name: "CNSA", country: "China", domain: "cnsa.gov.cn", color: "#DE2910", focus: ["Lunar", "Marte", "Estación"], budget: "~15B" },
  { name: "ESA", country: "Europa", domain: "esa.int", color: "#004C97", focus: ["Lunar", "Marte", "Ariane"], budget: "7.8B" },
  { name: "Roscosmos", country: "Rusia", domain: "roscosmos.ru", color: "#0033A0", focus: ["Lunar", "Soyuz", "Estación"], budget: "~4B" },
  { name: "ISRO", country: "India", domain: "isro.gov.in", color: "#003366", focus: ["Lunar", "Marte", "Satélites"], budget: "~1.8B" },
  { name: "JAXA", country: "Japón", domain: "jaxa.jp", color: "#003DA5", focus: ["Lunar", "Asteroides", "ISS"], budget: "~2.5B" },
  { name: "Blue Origin", country: "USA", domain: "blueorigin.com", color: "#002D62", focus: ["Reutilizable", "Lunar"], budget: "—" },
  { name: "Rocket Lab", country: "USA/NZ", domain: "rocketlabusa.com", color: "#A3C34A", focus: ["Pequeños", "Interplanetario"], budget: "—" },
];

const GRANDES_MISIONES = [
  { name: "Artemis II", agency: "NASA", date: "2025-09-01", desc: "Tripulación lunar — sobrevuelo", flag: "🇺🇸", type: "Lunar" },
  { name: "Artemis III", agency: "NASA", date: "2027-06-01", desc: "Regreso humano a la Luna", flag: "🇺🇸", type: "Lunar" },
  { name: "Starship HLS", agency: "SpaceX", date: "2026-09-01", desc: "Aterrizador lunar para Artemis", flag: "🇺🇸", type: "Lunar" },
  { name: "Chang'e 7", agency: "CNSA", date: "2026-03-01", desc: "Exploración polo sur lunar", flag: "🇨🇳", type: "Lunar" },
  { name: "Tianwen-3", agency: "CNSA", date: "2028-06-01", desc: "Recogida de muestras de Marte", flag: "🇨🇳", type: "Marte" },
  { name: "Gateway PPE", agency: "NASA", date: "2025-12-01", desc: "Módulo de propulsión estación lunar", flag: "🇺🇸", type: "Lunar" },
  { name: "VIPER", agency: "NASA", date: "2025-11-01", desc: "Rover lunar búsqueda de agua", flag: "🇺🇸", type: "Lunar" },
  { name: "Dream Chaser", agency: "Sierra Space", date: "2025-07-01", desc: "Avión espacial reutilizable", flag: "🇺🇸", type: "Reutilizable" },
  { name: "Starliner Crew", agency: "Boeing", date: "2025-05-01", desc: "Cápsula tripulada a la ISS", flag: "🇺🇸", type: "Tripulado" },
  { name: "Luna-27", agency: "Roscosmos", date: "2026-06-01", desc: "Aterrizador lunar polo sur", flag: "🇷🇺", type: "Lunar" },
  { name: "Chandrayaan-4", agency: "ISRO", date: "2027-03-01", desc: "Retorno de muestras lunares", flag: "🇮🇳", type: "Lunar" },
  { name: "MMX", agency: "JAXA", date: "2026-08-01", desc: "Muestras de Fobos (luna de Marte)", flag: "🇯🇵", type: "Marte" },
  { name: "New Glenn", agency: "Blue Origin", date: "2025-06-01", desc: "Cohete reutilizable pesado", flag: "🇺🇸", type: "Reutilizable" },
  { name: "Neutron", agency: "Rocket Lab", date: "2026-03-01", desc: "Cohete reutilizable mediano", flag: "🇺🇸", type: "Reutilizable" },
  { name: "Ariane 6", agency: "ESA", date: "2025-07-01", desc: "Lanzador pesado europeo", flag: "🇪🇺", type: "Lanzador" },
  { name: "Dream Chaser CRS", agency: "Sierra Space", date: "2025-09-01", desc: "Carga reutilizable a la ISS", flag: "🇺🇸", type: "Reutilizable" },
  { name: "Sample Retrieval Lander", agency: "NASA/ESA", date: "2028-06-01", desc: "Recogida muestras Marte", flag: "🇺🇸", type: "Marte" },
  { name: "HLS Option B", agency: "Blue Origin", date: "2027-09-01", desc: "Segundo aterrizador lunar Artemis", flag: "🇺🇸", type: "Lunar" },
].sort((a, b) => new Date(a.date) - new Date(b.date));

const INVERSIONES = [
  { programa: "Artemis (NASA)", cantidad: "93B", desc: "Programa de retorno a la Luna", year: "2021-2027" },
  { programa: "ISS", cantidad: "150B", desc: "Estación Espacial Internacional (total)", year: "1998-presente" },
  { programa: "Programa Lunar Chino", cantidad: "~30B", desc: "Chang'e + estación lunar", year: "2004-2030" },
  { programa: "Starship (SpaceX)", cantidad: "~10B", desc: "Desarrollo del sistema Starship", year: "2019-presente" },
  { programa: "JWST", cantidad: "10B", desc: "Telescopio Espacial James Webb", year: "1996-2021" },
  { programa: "Mars Sample Return", cantidad: "~11B", desc: "Traer muestras de Marte a Tierra", year: "2025-2030" },
  { programa: "Commercial Crew", cantidad: "~8B", desc: "Programa de tripulación comercial", year: "2010-presente" },
  { programa: "SLS/Orion", cantidad: "~50B", desc: "Cohete SLS + cápsula Orion", year: "2011-presente" },
  { programa: "Gateway", cantidad: "~5B", desc: "Estación orbital lunar", year: "2022-2030" },
];

function TabBar({ tabs, active, onChange }) {
  return (
    <div className="flex gap-1 bg-white/5 p-0.5 rounded-lg mb-4">
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={`flex-1 py-1.5 text-[8px] font-bold uppercase tracking-wider rounded-md transition-all ${
            active === t.id ? "bg-cyan-500/20 text-cyan-400" : "text-slate-500 hover:text-slate-300"
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

function Logo({ domain, color, name }) {
  const [err, setErr] = useState(false);
  return (
    <div className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0" style={{ backgroundColor: color }}>
      {!err ? (
        <img
          src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`}
          alt={name}
          className="w-full h-full object-contain p-1"
          onError={() => setErr(true)}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-[6px] font-black text-white">
          {name.slice(0, 3).toUpperCase()}
        </div>
      )}
    </div>
  );
}

function AgenciasTab() {
  return (
    <div className="space-y-2 max-h-[420px] overflow-y-auto custom-scrollbar pr-1">
      {AGENCIAS.map((a, i) => (
        <motion.a
          key={a.name}
          href={`https://${a.domain}`}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="block bg-white/5 hover:bg-cyan-500/10 border border-white/5 hover:border-cyan-500/30 rounded-xl p-3 transition-all group"
        >
          <div className="flex items-center gap-3">
            <Logo domain={a.domain} color={a.color} name={a.name} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-[10px] text-white font-bold group-hover:text-cyan-400 transition-colors">{a.name}</p>
                <span className="text-xs">{a.country === "USA" ? "🇺🇸" : a.country === "China" ? "🇨🇳" : a.country === "Europa" ? "🇪🇺" : a.country === "Rusia" ? "🇷🇺" : a.country === "India" ? "🇮🇳" : a.country === "Japón" ? "🇯🇵" : a.country === "USA/NZ" ? "🇺🇸🇳🇿" : "🌍"}</span>
              </div>
              <div className="flex gap-1.5 mt-1 flex-wrap">
                {a.focus.map((f) => (
                  <span key={f} className="text-[7px] bg-white/5 px-1.5 py-0.5 rounded text-slate-400">{f}</span>
                ))}
              </div>
            </div>
            {a.budget !== "—" && (
              <div className="text-right">
                <p className="text-[9px] text-cyan-400 font-black">${a.budget}</p>
                <p className="text-[6px] text-slate-600 uppercase">Presupuesto</p>
              </div>
            )}
          </div>
        </motion.a>
      ))}
    </div>
  );
}

function MisionesTab() {
  const [selected, setSelected] = useState(null);
  const typeFilter = ["Todas", "Lunar", "Marte", "Reutilizable", "Tripulado"];

  return (
    <div className="max-h-[420px] overflow-y-auto custom-scrollbar pr-1">
      <div className="space-y-2">
        {GRANDES_MISIONES.map((m, i) => (
          <MissionRow key={m.name} mission={m} delay={i * 0.04} onClick={() => setSelected(m)} />
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <MissionDetailModal mission={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}

function MissionRow({ mission, delay, onClick }) {
  const { days, hours, minutes, seconds, isOver } = useCountdown(mission.date);
  return (
    <motion.button
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      onClick={onClick}
      className="w-full text-left bg-white/5 hover:bg-cyan-500/10 border border-white/5 hover:border-cyan-500/30 rounded-xl p-3 transition-all group"
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 text-base">
          {mission.type === "Lunar" ? "🌙" : mission.type === "Marte" ? "🔴" : mission.type === "Reutilizable" ? "🔄" : mission.type === "Tripulado" ? "👨‍🚀" : "🚀"}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-xs">{mission.flag}</span>
            <p className="text-[10px] text-white font-bold truncate group-hover:text-cyan-400 transition-colors">{mission.name}</p>
          </div>
          <p className="text-[8px] text-slate-500 mt-0.5">{mission.agency} · {mission.desc}</p>
        </div>
        <div className="text-right flex-shrink-0">
          {isOver ? (
            <span className="text-[8px] text-red-500 font-bold">LANZADA</span>
          ) : (
            <>
              <p className="text-[9px] text-cyan-400 font-black font-mono leading-tight">
                {days}d {String(hours).padStart(2, "0")}h
              </p>
              <p className="text-[9px] text-cyan-400 font-black font-mono leading-tight">
                {String(minutes).padStart(2, "0")}m {String(seconds).padStart(2, "0")}s
              </p>
            </>
          )}
        </div>
      </div>
    </motion.button>
  );
}

function InversionTab() {
  const maxAmount = useMemo(() => {
    const nums = INVERSIONES.map((i) => parseFloat(i.cantidad.replace(/[^0-9.]/g, "")));
    return Math.max(...nums);
  }, []);

  return (
    <div className="space-y-2 max-h-[420px] overflow-y-auto custom-scrollbar pr-1">
      {INVERSIONES.map((inv, i) => {
        const num = parseFloat(inv.cantidad.replace(/[^0-9.]/g, ""));
        const multiplier = inv.cantidad.includes("B") ? 1 : 0.1;
        return (
          <motion.div
            key={inv.programa}
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06 }}
            className="bg-white/5 border border-white/5 rounded-xl p-3"
          >
            <div className="flex justify-between items-start mb-1.5">
              <div className="min-w-0 flex-1">
                <p className="text-[10px] text-white font-bold truncate">{inv.programa}</p>
                <p className="text-[8px] text-slate-500">{inv.desc}</p>
              </div>
              <div className="text-right ml-3 flex-shrink-0">
                <p className="text-[11px] text-cyan-400 font-black">${inv.cantidad}</p>
                <p className="text-[6px] text-slate-600">{inv.year}</p>
              </div>
            </div>
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(num / maxAmount) * 100}%` }}
                transition={{ delay: i * 0.06 + 0.3, duration: 0.8, ease: "easeOut" }}
                className="h-full rounded-full"
                style={{
                  backgroundColor: i < 3 ? "#06b6d4" : i < 6 ? "#0ea5e9" : "#64748b",
                }}
              />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

function MissionDetailModal({ mission, onClose }) {
  const { days, hours, minutes, seconds, isOver } = useCountdown(mission.date);
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" onClick={onClose}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-slate-900 border border-white/10 w-full max-w-sm rounded-2xl overflow-hidden relative z-10 shadow-2xl p-6"
      >
        <div className="text-center mb-4">
          <span className="text-4xl block mb-2">
            {mission.type === "Lunar" ? "🌙" : mission.type === "Marte" ? "🔴" : mission.type === "Reutilizable" ? "🔄" : "🚀"}
          </span>
          <span className="text-2xl">{mission.flag}</span>
          <h3 className="text-lg font-black text-white uppercase italic mt-2">{mission.name}</h3>
          <p className="text-[10px] text-cyan-400 font-bold mt-1">{mission.agency}</p>
        </div>

        <p className="text-[11px] text-slate-400 text-center leading-relaxed mb-5">{mission.desc}</p>

        <div className="bg-black/40 rounded-xl p-4 text-center mb-5">
          <p className="text-[8px] text-slate-500 uppercase tracking-widest mb-1">
            {isOver ? "LANZAMIENTO COMPLETADO" : "T-MINUS"}
          </p>
          {isOver ? (
            <p className="text-red-500 font-black text-lg">✓ COMPLETADO</p>
          ) : (
            <p className="text-cyan-400 font-black text-2xl font-mono tracking-tighter">
              {days}d {String(hours).padStart(2, "0")}h {String(minutes).padStart(2, "0")}m {String(seconds).padStart(2, "0")}s
            </p>
          )}
          <p className="text-[8px] text-slate-600 mt-1">{new Date(mission.date).toLocaleDateString("es", { year: "numeric", month: "long" })}</p>
        </div>

        <div className="flex gap-2">
          <button onClick={onClose} className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-[9px] font-bold transition-all">
            CERRAR
          </button>
          <a
            href={`https://www.google.com/search?q=${encodeURIComponent(mission.name + " " + mission.agency)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2.5 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 rounded-xl text-[9px] font-bold text-center transition-all"
          >
            BUSCAR →
          </a>
        </div>
      </motion.div>
    </div>
  );
}

export default function SpaceRaceWidget({ allAstronauts, launchData }) {
  const [tab, setTab] = useState("agencias");

  return (
    <div>
      <TabBar tabs={TABS} active={tab} onChange={setTab} />

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {tab === "agencias" && <AgenciasTab />}
          {tab === "misiones" && <MisionesTab />}
          {tab === "inversion" && <InversionTab />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
