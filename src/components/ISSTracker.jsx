import { useISS } from "../hooks/useISS";

export default function ISSTracker() {
  const { position, loading } = useISS();

  if (loading) {
    return (
      <div className="h-56 bg-black/50 rounded-xl flex items-center justify-center border border-white/5">
        <p className="text-[10px] animate-pulse text-slate-500">ADQUIRIENDO SEÑAL GPS...</p>
      </div>
    );
  }

  if (!position) {
    return (
      <div className="h-56 bg-black/50 rounded-xl flex items-center justify-center border border-white/5">
        <p className="text-[10px] text-red-500">SEÑAL PERDIDA</p>
      </div>
    );
  }

  const { lat, lon } = position;
  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${lon - 20},${lat - 20},${lon + 20},${lat + 20}&layer=mapnik&marker=${lat},${lon}`;

  return (
    <div className="space-y-2">
      <div className="h-56 bg-black/50 rounded-xl overflow-hidden border border-white/5 relative">
        <iframe
          src={mapSrc}
          className="w-full h-full opacity-70 hover:opacity-100 transition-opacity"
          title="ISS Location"
          loading="lazy"
        />
        <div className="absolute bottom-2 left-2 right-2 flex justify-between text-[8px] font-mono bg-black/60 px-2 py-1 rounded">
          <span className="text-cyan-400">LAT: {lat.toFixed(4)}°</span>
          <span className="text-cyan-400">LON: {lon.toFixed(4)}°</span>
        </div>
      </div>
    </div>
  );
}
