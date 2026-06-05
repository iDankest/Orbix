import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AGENCIES = {
  "NASA": { color: "#0B3D91", domain: "nasa.gov" },
  "SpaceX": { color: "#005288", domain: "spacex.com" },
  "Roscosmos": { color: "#0033A0", domain: "roscosmos.ru" },
  "ESA": { color: "#004C97", domain: "esa.int" },
  "JAXA": { color: "#003DA5", domain: "jaxa.jp" },
  "CNSA": { color: "#DE2910", domain: "cnsa.gov.cn" },
  "ISRO": { color: "#003366", domain: "isro.gov.in" },
  "Axiom Space": { color: "#1A1A2E", domain: "axiomspace.com" },
  "Blue Origin": { color: "#002D62", domain: "blueorigin.com" },
  "Rocket Lab": { color: "#A3C34A", domain: "rocketlabusa.com" },
  "ULA": { color: "#2B5797", domain: "ulalaunch.com" },
  "Virgin Galactic": { color : "#0033A0", domain: "virgingalactic.com" },
};

const TABS = [
  { id: "carrera", label: "Carrera" },
  { id: "personal", label: "Personal" },
  { id: "proyectos", label: "Proyectos" },
];

function agencyInfo(name) {
  const match = Object.keys(AGENCIES).find((k) => name.includes(k));
  if (match) return { ...AGENCIES[match], short: match };
  return { color: "#334155", domain: null, short: name.slice(0, 4).toUpperCase() };
}

function TabBar({ tabs, active, onChange }) {
  return (
    <div className="flex gap-1 bg-white/5 p-0.5 rounded-lg mb-4">
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={`flex-1 py-1.5 text-[8px] font-bold uppercase tracking-wider rounded-md transition-all ${
            active === t.id
              ? "bg-cyan-500/20 text-cyan-400"
              : "text-slate-500 hover:text-slate-300"
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

function LogoImg({ domain, color, short }) {
  const [err, setErr] = useState(false);
  if (err || !domain) {
    return (
      <div className="w-full h-full flex items-center justify-center text-[6px] font-black text-white">
        {short}
      </div>
    );
  }
  return (
    <img
      src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`}
      alt={short}
      className="w-full h-full object-contain p-1"
      onError={() => setErr(true)}
    />
  );
}

function CarreraTab({ launchData }) {
  const stats = useMemo(() => {
    const launchCount = {};
    (launchData?.results || []).forEach((l) => {
      const name = l.launch_service_provider?.name || "Unknown";
      launchCount[name] = (launchCount[name] || 0) + 1;
    });
    const sorted = Object.entries(launchCount).sort((a, b) => b[1] - a[1]).slice(0, 6);
    const maxCount = sorted.length > 0 ? sorted[0][1] : 1;
    return { sorted, maxCount };
  }, [launchData]);

  return (
    <div className="space-y-2">
      {stats.sorted.map(([name, count], i) => {
        const { color, domain, short } = agencyInfo(name);
        return (
          <AgencyBar
            key={name}
            name={name}
            count={count}
            pct={(count / stats.maxCount) * 100}
            color={color}
            domain={domain}
            short={short}
            delay={i * 0.06}
          />
        );
      })}
    </div>
  );
}

function PersonalTab({ allAstronauts }) {
  const groups = useMemo(() => {
    const map = {};
    (allAstronauts || []).forEach((a) => {
      const key = a.nationality || "Unknown";
      if (!map[key]) map[key] = [];
      map[key].push(a);
    });
    return Object.entries(map).sort((a, b) => b[1].length - a[1].length).slice(0, 6);
  }, [allAstronauts]);

  const maxCount = groups.length > 0 ? groups[0][1].length : 1;

  return (
    <div className="space-y-2">
      {groups.length === 0 && <p className="text-[10px] text-slate-500 text-center py-6">Cargando datos...</p>}
      {groups.map(([country, astros], i) => (
        <motion.div
          key={country}
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.06 }}
          className="flex items-center gap-2.5"
        >
          <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 text-xs">
            {getFlag(country)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[9px] text-slate-300 truncate">{country}</span>
              <span className="text-[10px] text-cyan-400 font-black">{astros.length}</span>
            </div>
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(astros.length / maxCount) * 100}%` }}
                transition={{ delay: i * 0.06 + 0.2, duration: 0.6 }}
                className="h-full rounded-full bg-cyan-500/60"
              />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function ProyectosTab({ launchData }) {
  const [selected, setSelected] = useState(null);

  const proyectos = useMemo(() => {
    return (launchData?.results || []).slice(0, 8);
  }, [launchData]);

  return (
    <div className="space-y-1.5 max-h-[380px] overflow-y-auto custom-scrollbar pr-1">
      {proyectos.length === 0 && <p className="text-[10px] text-slate-500 text-center py-6">Cargando misiones...</p>}
      {proyectos.map((p, i) => (
        <motion.button
          key={p.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.04 }}
          onClick={() => setSelected(p)}
          className="w-full text-left bg-white/5 hover:bg-cyan-500/10 border border-white/5 hover:border-cyan-500/30 rounded-xl p-3 transition-all group"
        >
          <div className="flex gap-3">
            {p.image && (
              <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-slate-800">
                <img src={p.image} alt="" className="w-full h-full object-cover" onError={(e) => { e.target.style.display = "none"; }} />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="text-[9px] text-white font-bold leading-tight group-hover:text-cyan-400 transition-colors line-clamp-2">
                {p.name}
              </p>
              <p className="text-[7px] text-slate-500 mt-0.5">
                {p.rocket?.configuration?.full_name || ""} · {p.launch_service_provider?.abbrev || ""}
              </p>
            </div>
          </div>
        </motion.button>
      ))}

      <AnimatePresence>
        {selected && (
          <MissionModal launch={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}

function AgencyBar({ name, count, pct, color, domain, short, delay }) {
  const [imgErr, setImgErr] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, type: "spring", bounce: 0.3 }}
      className="flex items-center gap-2.5"
    >
      <div
        className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden"
        style={{ backgroundColor: color }}
      >
        {domain && !imgErr ? (
          <img
            src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`}
            alt={short}
            className="w-full h-full object-contain p-1"
            onError={() => setImgErr(true)}
          />
        ) : (
          <span className="text-[6px] font-black text-white">{short}</span>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center mb-1">
          <a
            href={`https://${domain}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[9px] text-slate-300 truncate hover:text-cyan-400 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            {name}
          </a>
          <span className="text-[10px] text-cyan-400 font-black ml-2">{count}</span>
        </div>
        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ delay: delay + 0.2, duration: 0.6, ease: "easeOut" }}
            className="h-full rounded-full"
            style={{ backgroundColor: color }}
          />
        </div>
      </div>
    </motion.div>
  );
}

function MissionModal({ launch, onClose }) {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      />
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-slate-900 border border-white/10 w-full max-w-md rounded-2xl overflow-hidden relative z-10 shadow-2xl"
      >
        {launch.image && (
          <img src={launch.image} alt="" className="w-full h-36 object-cover opacity-50" onError={(e) => { e.target.style.display = "none"; }} />
        )}
        <div className="p-5">
          <h3 className="text-lg font-black text-white uppercase italic mb-1">{launch.name}</h3>
          <p className="text-[10px] text-slate-400 mb-4 leading-relaxed">
            {launch.mission?.description || "No hay descripción disponible para esta misión."}
          </p>
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="bg-white/5 p-2 rounded-xl">
              <p className="text-[7px] text-slate-500 uppercase">Cohete</p>
              <p className="text-[10px] text-white font-bold">{launch.rocket?.configuration?.full_name}</p>
            </div>
            <div className="bg-white/5 p-2 rounded-xl">
              <p className="text-[7px] text-slate-500 uppercase">Agencia</p>
              <p className="text-[10px] text-white font-bold">{launch.launch_service_provider?.abbrev}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={onClose} className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-[9px] font-bold transition-all">
              CERRAR
            </button>
            {launch.url && (
              <a
                href={launch.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 rounded-xl text-[9px] font-bold text-center transition-all"
              >
                VER MÁS →
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function getFlag(country) {
  const flags = {
    "American": "🇺🇸", "United States": "🇺🇸", "Russian": "🇷🇺", "Chinese": "🇨🇳",
    "Japanese": "🇯🇵", "French": "🇫🇷", "German": "🇩🇪", "Italian": "🇮🇹",
    "Canadian": "🇨🇦", "British": "🇬🇧", "Australian": "🇦🇺", "Indian": "🇮🇳",
    "Spanish": "🇪🇸", "Belgian": "🇧🇪", "Swedish": "🇸🇪", "Danish": "🇩🇰",
    "Dutch": "🇳🇱", "Israeli": "🇮🇱", "Brazilian": "🇧🇷", "South African": "🇿🇦",
    "Mexican": "🇲🇽", "Polish": "🇵🇱", "South Korean": "🇰🇷", "Malaysian": "🇲🇾",
    "Emirati": "🇦🇪", "Saudi": "🇸🇦",
  };
  return flags[country] || "🌍";
}

export default function SpaceRaceWidget({ allAstronauts, launchData }) {
  const [tab, setTab] = useState("carrera");

  return (
    <div>
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="bg-white/5 rounded-xl p-2.5 text-center">
          <p className="text-lg font-black text-white">{allAstronauts?.length || 0}</p>
          <p className="text-[7px] text-slate-500 uppercase mt-0.5">Astronautas</p>
        </div>
        <div className="bg-white/5 rounded-xl p-2.5 text-center">
          <p className="text-lg font-black text-white">{launchData?.results?.length || 0}</p>
          <p className="text-[7px] text-slate-500 uppercase mt-0.5">Misiones</p>
        </div>
        <div className="bg-white/5 rounded-xl p-2.5 text-center">
          <p className="text-lg font-black text-white">
            {new Set((allAstronauts || []).map((a) => a.nationality)).size}
          </p>
          <p className="text-[7px] text-slate-500 uppercase mt-0.5">Países</p>
        </div>
      </div>

      <TabBar tabs={TABS} active={tab} onChange={setTab} />

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {tab === "carrera" && <CarreraTab launchData={launchData} />}
          {tab === "personal" && <PersonalTab allAstronauts={allAstronauts} />}
          {tab === "proyectos" && <ProyectosTab launchData={launchData} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
