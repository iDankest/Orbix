import { Link, useLocation } from "react-router-dom";

export default function Header({ commander }) {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div className="mx-auto mt-4 max-w-6xl">
        <div className="mx-4 px-6 py-3 flex justify-between items-center bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl">
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2 group">
            <h1 className="text-xl font-bold tracking-tighter text-white">
              ORBIX<span className="text-cyan-400">.</span>
            </h1>
          </Link>

          {/* NAVEGACIÓN */}
          <nav>
            <ul className="flex items-center space-x-1">
              {[
                { name: "Home", path: "/" },
                { name: "Astronauts", path: "/astronauts" },
                { name: "Launches", path: "/launches" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                      isActive(link.path)
                        ? "bg-cyan-500/10 text-cyan-400"
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* ÁREA DE ESTADO / COMANDANTE */}
          <div className="flex items-center gap-3 pl-6 border-l border-white/10">
            <div className="flex flex-col items-end">
              <span className="text-[10px] text-slate-500 font-mono leading-none">
                {commander ? "AUTHORIZED" : "SYSTEM"}
              </span>
              <Link
                to={commander ? "/commander-dashboard" : "/"}
                className={`text-[10px] font-mono leading-none uppercase ${commander ? "text-cyan-400 hover:underline" : "text-emerald-400"}`}
              >
                {commander ? commander : "ONLINE"}
              </Link>
            </div>
            <div
              className={`w-2 h-2 rounded-full ${commander ? "bg-cyan-500 shadow-[0_0_8px_#06b6d4]" : "bg-emerald-500 animate-pulse"}`}
            ></div>
          </div>
        </div>
      </div>
    </header>
  );
}
