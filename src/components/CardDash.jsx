export default function CardDash() {
  return (
    <div className="bg-slate-900/40 border border-slate-700 hover:border-cyan-400 transition-all duration-300 p-6 rounded-2xl w-72 relative shadow-sm cursor-pointer">
      <h2 className="texto uppercase">Personas en el espacio</h2>
      <span className="text-cyan-400 w-5 h-5 absolute top-7 right-5">🚀</span>
      <h1 className="texto text-4xl font-bold">8</h1>
      <span className="texto uppercase">Astronautas activos</span>
    </div>
  );
}