export default function AstronautSkeleton({speed = "2s"}) {
  return (
    <div className="bg-slate-900/40 border border-white/5 p-5 rounded-2xl animate-pulse">
      {/* Círculo de la foto */}
      <div className="w-24 h-24 rounded-full bg-slate-800 mx-auto mb-4"></div>
      {/* Línea del nombre */}
      <div className="h-4 bg-slate-800 rounded-full w-3/4 mx-auto mb-2"></div>
      {/* Línea de la agencia */}
      <div className="h-3 bg-slate-800 rounded-full w-1/2 mx-auto"></div>
      {/* El badge de abajo */}
      <div className="mt-4 h-6 bg-slate-800 rounded-full w-20 mx-auto opacity-50"></div>
    </div>
  );
}