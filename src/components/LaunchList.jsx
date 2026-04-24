import { useContext } from "react";
import { OrbixContext } from "../context/OrbixContext";

export default function LaunchList({ onWatchLive, onOpenInfo }) {
  const { launchData } = useContext(OrbixContext);

  // Verificación de datos
  if (!launchData || !launchData.results) return null;

  return (
    <div className="w-full overflow-hidden rounded-3xl border border-white/10 bg-slate-950/50 backdrop-blur-xl shadow-2xl">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-white/5 border-b border-white/10 text-[11px] font-black uppercase tracking-[0.2em] text-cyan-500/50">
            <th className="px-8 py-6">Misión / Cohete</th>
            <th className="px-8 py-6">Fecha y Hora</th>
            <th className="px-8 py-6">Agencia</th>
            <th className="px-8 py-6 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {launchData.results.slice(0, 8).map((launch) => (
            <tr key={launch.id} className="group hover:bg-cyan-500/5 transition-all">
              <td className="px-8 py-8">
                <div className="flex items-center gap-4">
                  <img src={launch.image || "/placeholder.jpg"} className="w-12 h-12 rounded-xl object-cover border border-white/10" />
                  <div>
                    <div className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">{launch.name}</div>
                    <div className="text-xs text-slate-500 font-mono uppercase">{launch.rocket.configuration.full_name}</div>
                  </div>
                </div>
              </td>
              <td className="px-8 py-8 font-mono">
                <div className="text-white text-base">{new Date(launch.net).toLocaleDateString()}</div>
                <div className="text-cyan-500/60 text-xs">{new Date(launch.net).toLocaleTimeString()} UTC</div>
              </td>
              <td className="px-8 py-8 text-slate-400 font-medium">
                {launch.launch_service_provider.name}
              </td>
              <td className="px-8 py-8">
                <div className="flex justify-end gap-3">
                  <button 
                    onClick={() => onOpenInfo(launch)}
                    className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-all border border-white/5"
                  >
                    🔍 Info
                  </button>
                  <button 
                    onClick={() => onWatchLive(launch)}
                    className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-black uppercase text-xs tracking-tighter transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                  >
                    Live Feed
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}