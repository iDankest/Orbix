import { useMemo, useState } from "react";
import { motion } from "framer-motion";

const AGENCIES = {
  "NASA": { color: "#0B3D91", short: "NASA", logo: "https://logo.clearbit.com/nasa.gov" },
  "SpaceX": { color: "#005288", short: "SPX", logo: "https://logo.clearbit.com/spacex.com" },
  "Roscosmos": { color: "#0033A0", short: "ROSC", logo: "https://logo.clearbit.com/roscosmos.ru" },
  "ESA": { color: "#004C97", short: "ESA", logo: "https://logo.clearbit.com/esa.int" },
  "JAXA": { color: "#003DA5", short: "JAXA", logo: "https://logo.clearbit.com/jaxa.jp" },
  "CNSA": { color: "#DE2910", short: "CNSA", logo: "https://logo.clearbit.com/cnsa.gov.cn" },
  "ISRO": { color: "#003366", short: "ISRO", logo: "https://logo.clearbit.com/isro.gov.in" },
  "Axiom Space": { color: "#1A1A2E", short: "AXM", logo: "https://logo.clearbit.com/axiomspace.com" },
  "Blue Origin": { color: "#002D62", short: "BLUE", logo: "https://logo.clearbit.com/blueorigin.com" },
  "Rocket Lab": { color: "#A3C34A", short: "RKLB", logo: "https://logo.clearbit.com/rocketlabusa.com" },
  "ULA": { color: "#2B5797", short: "ULA", logo: "https://logo.clearbit.com/ulalaunch.com" },
  "Virgin Galactic": { color: "#0033A0", short: "VG", logo: "https://logo.clearbit.com/virgingalactic.com" },
};

function agencyStyle(name) {
  const match = Object.keys(AGENCIES).find((k) => name.includes(k));
  return match ? AGENCIES[match] : { color: "#334155", short: name.slice(0, 4).toUpperCase() };
}

function AgencyBadge({ name }) {
  const { color, short, logo } = agencyStyle(name);
  const [imgErr, setImgErr] = useState(false);

  return (
    <div
      className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden"
      style={{ backgroundColor: color }}
    >
      {logo && !imgErr ? (
        <img
          src={logo}
          alt={short}
          className="w-full h-full object-contain p-1"
          onError={() => setImgErr(true)}
        />
      ) : (
        <span className="text-[7px] font-black text-white">{short}</span>
      )}
    </div>
  );
}

function AgencyRow({ name, count, pct, delay }) {
  const { color } = agencyStyle(name);
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, type: "spring", bounce: 0.3 }}
      className="flex items-center gap-2.5"
    >
      <AgencyBadge name={name} />
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center mb-1">
          <span className="text-[9px] text-slate-300 truncate">{name}</span>
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

export default function SpaceRaceWidget({ allAstronauts, launchData }) {
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
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-white/5 rounded-xl p-3 text-center">
          <p className="text-2xl font-black text-white">{allAstronauts?.length || 0}</p>
          <p className="text-[8px] text-slate-500 uppercase tracking-wider mt-1">Astronautas activos</p>
        </div>
        <div className="bg-white/5 rounded-xl p-3 text-center">
          <p className="text-2xl font-black text-white">{stats.sorted.reduce((a, b) => a + b[1], 0)}</p>
          <p className="text-[8px] text-slate-500 uppercase tracking-wider mt-1">Lanzamientos próximos</p>
        </div>
      </div>

      <p className="text-[8px] text-slate-500 uppercase tracking-widest mb-2">Lanzamientos por agencia</p>
      <div className="space-y-2">
        {stats.sorted.map(([name, count], i) => (
          <AgencyRow key={name} name={name} count={count} pct={(count / stats.maxCount) * 100} delay={i * 0.06} />
        ))}
      </div>
    </div>
  );
}
