export default function LoadingSpinner({ speed = "2s" }) {
  return (
    <div className="flex flex-col items-center justify-center p-10">
      <div className="relative w-20 h-20">
        {/* Anillo exterior estático */}
        <div className="absolute inset-0 rounded-full border-4 border-slate-800"></div>
        {/* Anillo de carga animado */}
        <div
          className="absolute inset-0 rounded-full border-4 border-t-cyan-500 border-r-transparent border-b-transparent border-l-transparent animate-spin"
          style={{ animationDuration: speed }}
        ></div>
        {/* Punto central que pulsa */}
        <div className="absolute inset-0 m-auto w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
      </div>
      <p className="mt-4 text-cyan-500/60 text-xs font-mono uppercase tracking-[0.3em] animate-pulse">
        Estableciendo conexión...
      </p>
    </div>
  );
}
