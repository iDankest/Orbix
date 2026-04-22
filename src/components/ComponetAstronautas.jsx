import { useContext, useState, useEffect } from "react";
import { OrbixContext } from "../context/OrbixContext";
import { useFilter } from "../hooks/useFilter";
import Card from "./Card";
import AstronautSkeleton from "./AstronautSkeleton";
import LoadingSpinner from "./LoadigSpinner";

export default function Astronautas() {
  // EXTRAEMOS DEL CONTEXTO: Ya no usamos useFetch aquí
  const {
    loading,
    error,
    searchTerm,
    setSearchTerm,
    inOrbitData,
    loadingInOrbit,
    loadingAll,
  } = useContext(OrbixContext);

  // Adaptamos el filtro para que use los campos de la nueva API
  // La nueva API usa: name, nationality, agency.name
  // Filtro manual ultra-potente
  const filteredData = inOrbitData?.results?.filter((astro) => {
    const search = searchTerm.toLowerCase();

    // 1. Datos directos
    const matchName = astro.name?.toLowerCase().includes(search);
    const matchFrom = astro.nationality?.toLowerCase().includes(search);

    // 2. Datos dentro del objeto agency (NASA, ESA, Roscosmos...)
    const matchAgencyName = astro.agency?.name?.toLowerCase().includes(search);
    const matchAgencyAbbrev = astro.agency?.abbrev
      ?.toLowerCase()
      .includes(search);

    return matchName || matchFrom || matchAgencyName || matchAgencyAbbrev;
  });

  const [isSearching, setIsSearching] = useState(false);
  const [limit, setLimit] = useState(4);
  // Efecto visual de "escaneando" al escribir
  useEffect(() => {
    if (searchTerm.length > 0) {
      setIsSearching(true);
      const timer = setTimeout(() => setIsSearching(false), 500);
      return () => clearTimeout(timer);
    }
  }, [searchTerm]);

  if (loading || loadingInOrbit || loadingAll) {
    return (
      <div className="p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((n) => (
            <AstronautSkeleton key={n} />
          ))}
        </div>
      </div>
    );
  }

  if (error)
    return <p className="text-red-500 p-8 font-mono">SYSTEM_ERROR: {error}</p>;

  return (
    <div className="p-8 flex flex-col gap-4">
      {/* HEADER ADAPTADO */}
      <div className="mb-4 w-full flex justify-between items-end gap-4 max-sm:flex-col max-sm:items-start border-b border-white/5 pb-6">
        <div className="ml-4 max-sm:w-full space-y-1">
          <h2 className="text-xs font-black text-cyan-500 uppercase tracking-[0.3em] flex items-center gap-2">
            <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></span>
            Crew Manifest
          </h2>
          <h3 className="text-3xl font-bold text-white tracking-tighter">
            Astronautas{" "}
            <span className="font-light text-slate-500">en activo</span>
          </h3>
          <p className="text-sm text-slate-400 font-medium">
            Personal verificado de la misión{" "}
            <span className="text-slate-200">Orbix Control</span>.
          </p>
        </div>

        {/* INPUT CONECTADO AL CONTEXTO */}
        <div className="relative mr-4 flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              placeholder="Buscar por nombre o agencia..."
              className="block p-4 pl-10 w-64 border border-white/10 rounded-xl bg-slate-900/50 text-slate-300 focus:ring-2 focus:ring-cyan-500/50 outline-none transition-all shadow-2xl"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="absolute left-4 top-5 text-slate-500">🔍</span>
          </div>{" "}
          {filteredData?.length > 4 && (
            <button
              className="ml-auto text-cyan-500 hover:text-cyan-400 transition-colors w-24 h-10 flex items-center justify-center"
              onClick={() =>
                setLimit((prev) => (prev === 4 ? filteredData.length : 4))
              }
            >
              {limit === 4 ? "Ver todos" : "Ver menos"}
            </button>
          )}
        </div>
      </div>

      {/* GRID DE TARJETAS */}
      <div className="relative min-h-[400px] mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-500">
          {/* SI ESTÁ BUSCANDO: Mostramos una cuadrícula de esqueletos */}
          {isSearching ? (
            [...Array(limit)].map((_, i) => <AstronautSkeleton key={i} />)
          ) : (
            /* SI NO ESTÁ BUSCANDO: Mostramos los datos filtrados */
            <>
              {filteredData?.length > 0 ? (
                filteredData
                  .slice(0, limit)
                  .map((astro) => (
                    <Card
                      key={astro.id}
                      id={astro.id}
                      name={astro.name}
                      img={astro.profile_image}
                      corporation={astro.agency?.abbrev || "Independent"}
                      from={astro.nationality}
                    />
                  ))
              ) : (
                /* SI NO HAY RESULTADOS */
                <div className="col-span-full text-center py-20 text-slate-500 italic">
                  Sin coincidencias en los archivos estelares.
                </div>
              )}
            </>
          )}
        </div>

        {/* SPINNER OPCIONAL: Solo si quieres un detalle extra encima */}
        {isSearching && (
          <div className="absolute inset-0 z-10 flex items-start justify-center pt-20 pointer-events-none">
            <LoadingSpinner />
          </div>
        )}
      </div>
    </div>
  );
}
