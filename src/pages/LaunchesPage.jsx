import { useRef, useState, useContext, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { OrbixContext } from "../context/OrbixContext";
import { useCountdown } from "../hooks/useCountdown";
const placeholder =
  "https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=6097&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

// --- SUB-COMPONENTE: EL TOGGLE (Solo los botones) ---
const LaunchToggle = ({ view, setView }) => (
  <div className="flex items-center gap-4 bg-slate-900/50 p-1 rounded-full w-fit border border-white/10">
    {["upcoming", "previous"].map((v) => (
      <button
        key={v}
        onClick={() => setView(v)}
        className={`relative px-6 py-2 text-[10px] font-black uppercase tracking-widest z-10 transition-colors ${view === v ? "text-black" : "text-slate-400"}`}
      >
        {v === "upcoming" ? "Próximos" : "Historial"}
        {view === v && (
          <motion.div
            layoutId="toggle-bg"
            className="absolute inset-0 bg-cyan-400 rounded-full -z-10"
          />
        )}
      </button>
    ))}
  </div>
);

// --- COMPONENTE PRINCIPAL ---
export default function LaunchesPage() {
  const [activeLive, setActiveLive] = useState(null);
  const [selectedLaunch, setSelectedLaunch] = useState(null);
  const [view, setView] = useState("upcoming");
  const [historyData, setHistoryData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { launchData } = useContext(OrbixContext);

  // FETCH PARA EL HISTORIAL
  useEffect(() => {
    if (view === "previous" && historyData.length === 0) {
      fetch(
        "https://lldev.thespacedevs.com/2.2.0/launch/previous/?limit=20&ordering=net",
      )
        .then((res) => res.json())
        .then((data) => setHistoryData(data.results));
    }
  }, [view, historyData.length]);

  // Filtrado para el historial
  const filteredHistory = historyData.filter(
    (l) =>
      l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.rocket?.configuration?.full_name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
  );

  if (!launchData)
    return (
      <div className="p-20 text-cyan-500 animate-pulse font-mono">
        INICIALIZANDO SISTEMAS...
      </div>
    );

  return (
    <div className="relative pt-20 overflow-hidden bg-slate-950 text-white md:p-10  max-w-screen-2xl mx-auto">
      {/*    <div className="stars-container absolute inset-0 z-0 h-full"></div> */}
      <div className="max-w-7xl mx-auto pt-20">
        {/* 1. SECCIÓN MISSION CONTROL */}
        <AnimatePresence mode="wait">
          {activeLive && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-12"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
                  <h2 className="text-xl font-bold uppercase italic">
                    Live Feed: {activeLive.name}
                  </h2>
                </div>
                <button
                  onClick={() => setActiveLive(null)}
                  className="text-xs text-slate-500 hover:text-white uppercase font-bold"
                >
                  Cerrar ✕
                </button>
              </div>
              <div className="flex flex-col lg:flex-row gap-4 h-[500px] bg-black rounded-3xl overflow-hidden border border-white/10">
                <div className="flex-[3] bg-slate-900">
                  {/* Comprobamos si existe la URL del video, si no, mostramos el placeholder */}
                  {activeLive.vidURLs && activeLive.vidURLs.length > 0 ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${activeLive.vidURLs[0].url.split("v=")[1]}`}
                      className="w-full h-full border-0"
                      allowFullScreen
                    />
                  ) : (
                    <NoSignalFeed />
                  )}
                </div>
                <div className="flex-1 bg-slate-950/50 p-4 border-l border-white/10 hidden lg:block font-mono">
                  <p className="text-[10px] text-cyan-500 mb-4 animate-pulse">
                    COMS_LINK_ACTIVE
                  </p>
                  <div className="space-y-2 text-[10px] uppercase text-slate-400">
                    <p className="text-red-500/50">
                      {">"} ENCRYPTED_STREAM_FAILED
                    </p>
                    <p>{">"} RECOGNIZING_LOCATION...</p>
                    <p>
                      {">"} PAD: {activeLive.pad?.name || "UNKNOWN"}
                    </p>
                    <p>
                      {">"} STATUS: {activeLive.status?.name}
                    </p>
                    <motion.p
                      animate={{ opacity: [0, 1] }}
                      transition={{ repeat: Infinity, duration: 0.8 }}
                      className="text-cyan-500"
                    >
                      _WAITING_FOR_UPLINK
                    </motion.p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 2. CABECERA Y BUSCADOR */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter mb-4">
              Manifiesto <span className="text-cyan-500">Orbix</span>
            </h1>
            <LaunchToggle view={view} setView={setView} />
          </div>

          {view === "previous" && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-full md:w-96"
            >
              <input
                type="text"
                placeholder="Buscar en el archivo..."
                className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white focus:border-cyan-500 outline-none font-mono text-xs transition-all"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </motion.div>
          )}
        </div>

        {/* 3. RENDERIZADO CONDICIONAL DE CONTENIDO */}
        <AnimatePresence mode="wait">
          {view === "upcoming" ? (
            <motion.div
              key="table"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full overflow-x-auto rounded-3xl border border-white/10 bg-slate-950/50 backdrop-blur-xl"
            >
              <table className="w-full text-left min-w-[700px]">
                <thead>
                  <tr className="bg-white/5 border-b border-white/10 text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">
                    <th className="px-8 py-6">Misión</th>
                    <th className="px-8 py-6">Cohete</th>
                    <th className="px-8 py-6">Fecha / T-Minus</th>
                    <th className="px-8 py-6 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {launchData.results.map((launch) => (
                    <tr
                      key={launch.id}
                      className="group hover:bg-cyan-500/5 transition-all"
                    >
                      <td className="px-8 py-6">
                        <div className="font-bold text-white group-hover:text-cyan-400 transition-colors">
                          {launch.name}
                        </div>
                        <div className="text-[10px] text-slate-500 uppercase">
                          {launch.launch_service_provider.name}
                        </div>
                      </td>
                      <td className="px-8 py-6 font-mono text-sm text-slate-400">
                        {launch.rocket?.configuration?.full_name}
                      </td>
                      <td className="px-8 py-6 font-mono text-sm">
                        <TimerCell date={launch.net} />
                      </td>
                      <td className="px-8 py-6 text-right flex justify-end gap-3">
                        <button
                          onClick={() => setSelectedLaunch(launch)}
                          className="p-3 rounded-xl bg-white/5 text-white text-[10px] font-bold border border-white/5"
                        >
                          DETALLES
                        </button>
                        <button
                          onClick={() => setActiveLive(launch)}
                          className="px-5 py-3 rounded-xl bg-cyan-500 text-black font-black uppercase text-[10px]"
                        >
                          LIVE FEED
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          ) : (
            <motion.div
              key="history"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {filteredHistory.map((launch) => (
                <HistoryCard
                  key={launch.id}
                  launch={launch}
                  onOpenInfo={setSelectedLaunch}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {selectedLaunch && (
          <LaunchDetailModal
            launch={selectedLaunch}
            onClose={() => setSelectedLaunch(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// --- SUB-COMPONENTE: MODAL DE DETALLES ---
function LaunchDetailModal({
  launch,
  onClose,
  placeholderImage = placeholder,
}) {
  const [imgSrc, setImgSrc] = useState(launch?.image || placeholderImage);
  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
      />
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-slate-900 border border-white/10 w-full max-w-2xl rounded-3xl overflow-hidden relative z-10 shadow-2xl"
      >
        <img
          src={imgSrc}
          onError={() => setImgSrc(placeholderImage)}
          className="w-full h-48 object-cover opacity-50"
        />
        <div className="p-8">
          <h2 className="text-3xl font-black uppercase italic text-cyan-400 mb-2">
            {launch.name}
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed mb-6">
            {launch.mission?.description ||
              "Esta misión tiene parámetros confidenciales. No hay descripción pública disponible."}
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 p-4 rounded-2xl">
              <span className="text-[10px] uppercase text-slate-500 block mb-1">
                Configuración Cohete
              </span>
              <span className="text-white font-bold">
                {launch.rocket?.configuration?.full_name}
              </span>
            </div>
            <div className="bg-white/5 p-4 rounded-2xl">
              <span className="text-[10px] uppercase text-slate-500 block mb-1">
                Lugar de Despegue
              </span>
              <span className="text-white font-bold">{launch.pad?.name}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="mt-8 w-full py-4 bg-white/5 hover:bg-white/10 rounded-2xl font-bold transition-all"
          >
            CERRAR REGISTRO
          </button>
        </div>
      </motion.div>
    </div>
  );
}
const TimerCell = ({ date }) => {
  const { days, hours, minutes, seconds, isOver } = useCountdown(date);

  if (isOver) return <span className="text-red-500 font-bold">LANZADO</span>;

  return (
    <span className="text-cyan-400 font-black">
      {days}d {String(hours).padStart(2, "0")}h{" "}
      {String(minutes).padStart(2, "0")}m {String(seconds).padStart(2, "0")}s
    </span>
  );
};

const HistoryCard = ({
  launch,
  onOpenInfo,
  placeholderImage = placeholder,
}) => {
  const [imgSrc, setImgSrc] = useState(launch?.image || placeholderImage);
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="group flex flex-col md:flex-row bg-slate-900/40 border border-white/5 rounded-3xl overflow-hidden hover:border-cyan-500/30 transition-all mb-6 backdrop-blur-sm"
    >
      {/* Foto a la Izquierda */}
      <div className="w-full md:w-80 h-64 md:h-auto overflow-hidden relative">
        <img
          src={imgSrc}
          onError={() => setImgSrc(placeholderImage)}
          className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/20 to-transparent" />
      </div>

      {/* Info a la Derecha */}
      <div className="flex-1 p-8 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-2">
            <span className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.3em]">
              Registro Histórico
            </span>
            <span className="font-mono text-xs text-slate-500">
              #{launch.id.split("-")[0]}
            </span>
          </div>
          <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-2 group-hover:text-cyan-400 transition-colors">
            {launch.name}
          </h3>
          <p className="text-slate-400 text-sm line-clamp-2 mb-4 max-w-xl">
            {launch.mission?.description ||
              "Misión histórica documentada en los archivos de Orbix."}
          </p>

          <div className="flex gap-6 mb-4 justify-between mr-4 ml-4">
            <div>
              <p className="text-[9px] uppercase text-slate-500 font-bold">
                Cohete
              </p>
              <p className="text-white text-sm font-mono">
                {launch.rocket?.configuration?.full_name}
              </p>
            </div>
            <div>
              <p className="text-[12px] uppercase text-slate-500 font-bold">
                Fecha de Éxito
              </p>
              <p className="text-white text-sm font-mono">
                {new Date(launch.net).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => onOpenInfo(launch)}
          className="w-fit px-8 py-3 bg-white/5 hover:bg-cyan-500 hover:text-black rounded-xl font-bold text-xs transition-all uppercase tracking-widest border border-white/10"
        >
          Expandir Archivo +
        </button>
      </div>
    </motion.div>
  );
};
const NoSignalFeed = () => (
  <div className="relative w-full h-full bg-black flex items-center justify-center overflow-hidden">
    {/* Efecto de ruido/estática de fondo */}
    <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://media.giphy.com/media/oEI9uWUicKgPUK4S8f/giphy.gif')]" />

    <div className="text-center z-10 p-6">
      <motion.div
        animate={{ opacity: [1, 0.4, 1] }}
        transition={{ duration: 0.2, repeat: Infinity }}
        className="text-red-500 mb-4 flex justify-center"
      >
        <svg
          width="60"
          height="60"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01" />
        </svg>
      </motion.div>

      <h3 className="text-white font-mono text-xl font-black tracking-tighter uppercase mb-2">
        SIGNAL_LOSS: NO_VIDEO_FEED
      </h3>
      <p className="text-slate-500 font-mono text-xs uppercase tracking-widest animate-pulse">
        Intentando reestablecer enlace con la estación de{" "}
        {Math.floor(Math.random() * 100)}...
      </p>
    </div>

    {/* Líneas de escaneo (Scanlines) */}
    <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,118,0.06))] bg-[length:100%_4px,3px_100%]" />
  </div>
);
