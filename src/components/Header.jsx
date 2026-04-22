import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();

  // Función para saber si el link está activo (para estilos)
  const isActive = (path) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* El contenedor con Glassmorphism */}
      <div className="mx-auto mt-4 max-w-6xl">
        <div className="mx-4 px-6 py-3 flex justify-between items-center bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl">
          {/* Logo con efecto de brillo */}
          <Link to="/" className="flex items-center gap-2 group">
            <h1 className="text-xl font-bold tracking-tighter text-white">
              ORBIX<span className="text-cyan-400">.</span>
            </h1>
          </Link>

          {/* Navegación */}
          <nav>
            <ul className="flex items-center space-x-1">
              {[
                { name: "Home", path: "/" },
                { name: "Astronauts", path: "/astronauts" },
                { name: "Launches", path: "/launches" },
                { name: "About", path: "/about" },
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

          {/* Botón de estado de conexión (Estético) */}
          <div className="hidden md:flex items-center gap-3 pl-6 border-l border-white/10">
            <div className="flex flex-col items-end">
              <span className="text-[10px] text-slate-500 font-mono leading-none">
                SYSTEM
              </span>
              <span className="text-[10px] text-emerald-400 font-mono leading-none">
                ONLINE
              </span>
            </div>
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          </div>
        </div>
      </div>
    </header>
  );
}
