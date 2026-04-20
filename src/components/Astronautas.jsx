import Card from "./Card";
import { useFetch } from "../hooks/useFetch";
import { useFilter } from "../hooks/useFilter";
import AstronautSkeleton from "./AstronautSkeleton";
import { useState, useEffect } from "react";
import LoadingSpinner from "./LoadigSpinner";

export default function Astronautas() {
  const { data: crew, loading, error } = useFetch("https://api.spacexdata.com/v4/crew");
  const { query, setQuery, filteredData } = useFilter(crew, ["name", "agency"]);

  const [isSearching, setIsSearching] = useState(false);

  // 1. Efecto para la carga falsa al filtrar
  useEffect(() => {
    if (query.length > 0) {
      setIsSearching(true);
      const timer = setTimeout(() => {
        setIsSearching(false);
      }, 500); 
      return () => clearTimeout(timer);
    } else {
      setIsSearching(false);
    }
  }, [query]);

  // 2. Renderizado de Skeletons durante la carga inicial de la API
  if (loading) {
    return (
      <div className="p-8">
        <h2 className="text-2xl font-bold text-white mb-8">Cargando tripulación...</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(n => <AstronautSkeleton key={n} />)}
        </div>
      </div>
    );
  }

  if (error) return <p className="text-red-500 p-8">Error en la telemetría: {error}</p>;

  const firstRow = filteredData?.slice(0, 4);

  return (
    <div className="p-8 flex flex-col gap-4">
      {/* HEADER Y BUSCADOR */}
      <div className="mb-4 w-full h-12 flex justify-between items-center gap-4 max-sm:flex-col max-sm:items-start">
        <div className="ml-4 max-sm:w-full">
          <h2 className="text-2xl font-bold text-white">Astronautas</h2>
          <p className="text-white/70">Explora la lista de astronautas en activo</p>
        </div>

        <label htmlFor="search" className="relative mr-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
          >
            <circle cx="10" cy="10" r="7" />
            <line x1="21" y1="21" x2="15" y2="15" />
          </svg>
          <input 
            type="text"
            id="search"
            value={query}
            placeholder="Filtrar por nombre o agencia..."
            className="block p-4 pl-10 w-64 border border-white/10 rounded-xl leading-5 bg-slate-900/50 text-slate-300 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 sm:text-sm transition-all shadow-2xl"
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
      </div>

      {/* CONTENEDOR DE TARJETAS CON CARGA FALSA */}
      <div className="relative min-h-[400px] mt-8">
        {isSearching && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-slate-950/40 backdrop-blur-sm rounded-2xl transition-all">
            <LoadingSpinner speed="0.8s" />
          </div>
        )}

        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-500 ${isSearching ? 'blur-md scale-95 opacity-50' : 'blur-0 scale-100 opacity-100'}`}>
          {filteredData?.length > 0 ? (
            firstRow?.map((member) => (
              <Card
                key={member.id}
                name={member.name}
                img={member.image}
                corporation={member.agency}
              />
            ))
          ) : (
            <div className="col-span-4 text-center py-20">
              <p className="text-white/70 italic text-lg">No se encontraron resultados para "{query}"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}