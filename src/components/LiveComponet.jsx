export default function LiveComponent({ videoId, isLive }) {
  return (
    <div id="live-zone" className="w-full max-w-6xl mx-auto mt-20 p-6 bg-black rounded-3xl border border-white/10">
      <div className="flex flex-col lg:flex-row gap-4 h-[500px]">
        {/* VIDEO */}
        <div className="flex-[2] bg-slate-900 rounded-xl overflow-hidden relative">
          {isLive ? (
            <iframe 
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              allowFullScreen
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-10">
              <div className="text-6xl mb-4">📡</div>
              <h3 className="text-2xl font-bold text-white uppercase tracking-tighter">Status: Disconnected</h3>
              <p className="text-slate-500">No hay transmisiones activas en este momento. Vuelve cuando la cuenta atrás llegue a cero.</p>
            </div>
          )}
        </div>

        {/* CHAT */}
        <div className="flex-1 bg-slate-800/50 rounded-xl overflow-hidden border border-white/5">
          <div className="p-3 bg-white/5 text-xs font-bold uppercase tracking-widest text-slate-400">Canal de Misión</div>
          {isLive ? (
            <iframe 
              className="w-full h-full"
              src={`https://www.youtube.com/live_chat?v=${videoId}&embed_domain=${window.location.hostname}`}
            />
          ) : (
            <div className="p-10 text-center text-slate-600 italic text-sm">Chat offline...</div>
          )}
        </div>
      </div>
    </div>
  );
};

