import { motion } from "framer-motion";

const LaunchToggle = ({ view, setView }) => {
  return (
    <div className="flex items-center gap-4 mb-8 bg-slate-900/50 p-1 rounded-full w-fit border border-white/10">
      <button 
        onClick={() => setView('upcoming')}
        className={`relative px-6 py-2 text-xs font-bold uppercase tracking-widest z-10 transition-colors ${view === 'upcoming' ? 'text-black' : 'text-slate-400'}`}
      >
        Próximos
        {view === 'upcoming' && (
          <motion.div 
            layoutId="toggle-bg" 
            className="absolute inset-0 bg-cyan-400 rounded-full -z-10"
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}
      </button>
      <button 
        onClick={() => setView('all')}
        className={`relative px-6 py-2 text-xs font-bold uppercase tracking-widest z-10 transition-colors ${view === 'all' ? 'text-black' : 'text-slate-400'}`}
      >
        Historial
        {view === 'all' && (
          <motion.div 
            layoutId="toggle-bg" 
            className="absolute inset-0 bg-cyan-400 rounded-full -z-10"
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}
      </button>
    </div>
  );
};

export default LaunchToggle;