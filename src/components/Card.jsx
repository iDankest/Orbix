
export default function Card({ title, icon: Icon, children }) {
  return (
    <div className="bg-slate-900/40 backdrop-blur-md border border-white/10 p-6 rounded-2xl">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-white/50 uppercase text-xs tracking-widest font-mono">
          {title}
        </h3>
        {Icon && <Icon className="text-cyan-400 w-5 h-5" />}
      </div>
      {children}
    </div>
  );
}
