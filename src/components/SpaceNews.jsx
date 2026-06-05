import { motion } from "framer-motion";
import { useSpaceNews } from "../hooks/useSpaceNews";

export default function SpaceNews() {
  const { articles, loading } = useSpaceNews();

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((n) => (
          <div key={n} className="animate-pulse bg-white/5 rounded-xl p-3">
            <div className="h-3 bg-slate-800 rounded w-3/4 mb-2" />
            <div className="h-2 bg-slate-800 rounded w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (articles.length === 0) {
    return <p className="text-[10px] text-slate-500 text-center py-6">No se pudieron cargar las noticias</p>;
  }

  return (
    <div className="space-y-2 max-h-[400px] overflow-y-auto custom-scrollbar pr-1">
      {articles.map((article, i) => (
        <motion.a
          key={article.id}
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.05 }}
          className="block bg-white/5 hover:bg-cyan-500/10 border border-white/5 hover:border-cyan-500/30 rounded-xl p-3 transition-all group"
        >
          <div className="flex gap-3">
            {article.image_url && (
              <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-slate-800">
                <img
                  src={article.image_url}
                  alt=""
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.style.display = "none"; }}
                />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="text-[9px] text-white font-bold leading-tight group-hover:text-cyan-400 transition-colors line-clamp-2">
                {article.title}
              </p>
              <p className="text-[7px] text-slate-500 mt-1">
                {article.news_site} · {new Date(article.published_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        </motion.a>
      ))}
    </div>
  );
}
