import { useContext } from "react";
import { OrbixContext } from "../context/OrbixContext";

export default function LaunchTable() {
  const { launchData } = useContext(OrbixContext);

  // Verificación de datos
  if (!launchData || !launchData.results) return null;

  return (
    <div className="w-full max-w-6xl mx-auto mt-10 overflow-hidden rounded-xl border border-white/10 bg-slate-900/50 backdrop-blur-md">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-white/10 bg-white/5 text-[10px] uppercase tracking-widest text-slate-400">
            <th className="p-4">Cohete</th>
            <th className="p-4">Fecha</th>
            <th className="p-4">Agencia</th>
            <th className="p-4">Misión</th>
            <th className="p-4 text-center">Estado</th>
          </tr>
        </thead>
        <tbody className="text-sm text-slate-300">
          {launchData.results.slice(0, 10).map((launch) => (
            <tr key={launch.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
              <td className="p-4 font-bold text-white">{launch.rocket.configuration.full_name}</td>
              <td className="p-4 font-mono">{new Date(launch.net).toLocaleDateString()}</td>
              <td className="p-4 text-cyan-400">{launch.launch_service_provider.name}</td>
              <td className="p-4 italic opacity-70">{launch.mission?.name || "Clasificada"}</td>
              <td className="p-4 text-center">
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                  launch.status.abbrev === 'Go' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'
                }`}>
                  {launch.status.name}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}