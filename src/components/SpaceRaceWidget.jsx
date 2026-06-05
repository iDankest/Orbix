import { useMemo } from "react";
import { motion } from "framer-motion";

const FLAGS = {
  "American": "🇺🇸", "Russian": "🇷🇺", "Chinese": "🇨🇳",
  "Japanese": "🇯🇵", "French": "🇫🇷", "German": "🇩🇪",
  "Italian": "🇮🇹", "Canadian": "🇨🇦", "British": "🇬🇧",
  "Australian": "🇦🇺", "Indian": "🇮🇳", "Spanish": "🇪🇸",
  "Belgian": "🇧🇪", "Swedish": "🇸🇪", "Danish": "🇩🇰",
  "Dutch": "🇳🇱", "Israeli": "🇮🇱", "UAE": "🇦🇪",
  "South African": "🇿🇦", "Brazilian": "🇧🇷", "Malaysian": "🇲🇾",
  "Mexican": "🇲🇽", "Polish": "🇵🇱", "South Korean": "🇰🇷",
};

const AGENCY_FLAGS = {
  "NASA": "🇺🇸", "Roscosmos": "🇷🇺", "CNSA": "🇨🇳",
  "ESA": "🇪🇺", "JAXA": "🇯🇵", "SpaceX": "🇺🇸",
  "Axiom Space": "🇺🇸", "Blue Origin": "🇺🇸", "Rocket Lab": "🇺🇸",
  "ISRO": "🇮🇳", "Virgin Galactic": "🇺🇸",
};

function getFlag(label) {
  return FLAGS[label] || AGENCY_FLAGS[label] || "";
}

export default function SpaceRaceWidget({ allAstronauts, launchData }) {
  const stats = useMemo(() => {
    const astroCount = {};
    const launchCount = {};

    (allAstronauts || []).forEach((a) => {
      const key = a.nationality || "Unknown";
      astroCount[key] = (astroCount[key] || 0) + 1;
    });

    (launchData?.results || []).forEach((l) => {
      const name = l.launch_service_provider?.name || "Unknown";
      const abbrev = l.launch_service_provider?.abbrev || name;
      launchCount[abbrev] = (launchCount[abbrev] || 0) + 1;
    });

    const sortedAstro = Object.entries(astroCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4);

    const sortedLaunch = Object.entries(launchCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4);

    return { sortedAstro, sortedLaunch };
  }, [allAstronauts, launchData]);

  return (
    <div className="space-y-4">
      <div>
        <p className="text-[8px] text-slate-500 uppercase tracking-widest mb-2">Astronautas por país</p>
        <div className="space-y-1.5">
          {stats.sortedAstro.map(([key, count], i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-2 bg-white/5 rounded-lg px-2.5 py-1.5"
            >
              <span className="text-xs">{getFlag(key) || "🌍"}</span>
              <span className="text-[9px] text-slate-300 flex-1 truncate">{key}</span>
              <span className="text-[10px] text-cyan-400 font-black">{count}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <div>
        <p className="text-[8px] text-slate-500 uppercase tracking-widest mb-2">Lanzamientos por agencia</p>
        <div className="space-y-1.5">
          {stats.sortedLaunch.map(([key, count], i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-2 bg-white/5 rounded-lg px-2.5 py-1.5"
            >
              <span className="text-xs">{getFlag(key) || "🚀"}</span>
              <span className="text-[9px] text-slate-300 flex-1 truncate">{key}</span>
              <span className="text-[10px] text-cyan-400 font-black">{count}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
