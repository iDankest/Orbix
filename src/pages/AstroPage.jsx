import { useContext, useState, useEffect } from "react";
import { OrbixContext } from "../context/OrbixContext";
import Card from "../components/Card";
import AstronautSkeleton from "../components/AstronautSkeleton";
import LoadingSpinner from "../components/LoadigSpinner";
import { useFilter } from "../hooks/useFilter";
import AstroModal from "../components/AstroModal";
import { motion, AnimatePresence } from "framer-motion";

export default function AstronautasPage() {
  // Traemos la lista completa del contexto
  const { allAstronauts, loadingAll, error, searchTerm, setSearchTerm } =
    useContext(OrbixContext);
  const [isSearching, setIsSearching] = useState(false);
  // Definimos las llaves que queremos rastrear (incluyendo las anidadas)
  const keys = ["name", "nationality", "agency.name", "agency.abbrev"];
 

  // Usamos el hook pasándole los 3 ingredientes
  const { filteredData } = useFilter(allAstronauts, keys, searchTerm);
 const closeModal = () => setSelectedAstro(null);
  // Efecto visual de carga al buscar
  useEffect(() => {
    if (searchTerm.length > 0) {
      setIsSearching(true);
      const timer = setTimeout(() => setIsSearching(false), 300);
      return () => clearTimeout(timer);
    }
  }, [searchTerm]);

  if (loadingAll) {
    return (
      <div className="p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <AstronautSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error)
    return (
      <div className="p-10 text-red-500 font-mono">
        ERROR_CARGA_SISTEMA: {error}
      </div>
    );

    // Dentro de tu función Astronautas()
const [selectedAstro, setSelectedAstro] = useState(null);


  return (
    
    <div className="relative bg-slate-950 p-10 max-w-screen-2xl mx-auto">
      <div className="astro-header">
        <div className="stars-container"></div>
      </div>
      
      {/* HEADER DE LA PÁGINA */}
      <header className=" min-h-[30vh] flex flex-col  justify-between overflow-hidden pt-20 gap-8" >
        <div className=" relative border-l-4 border-cyan-500 pl-6">
          <h1 className="text-4xl font-black text-white uppercase tracking-tighter">
            Archivo <span className="text-cyan-500">Tripulación</span>
          </h1>
          <p className="text-slate-400 mt-2 font-medium">
            Explora la base de datos completa de astronautas en activo y
            misiones históricas.
          </p>
        </div>

        {/* BUSCADOR POTENTE */}
        <div className="ml-6 mb-10 relative max-w-md">
          <input
            type="text"
            placeholder="Buscar por nombre, país o agencia (NASA, ESA...)"
            className="w-full bg-slate-900/50 border border-white/10 p-4 pl-12 rounded-2xl text-white outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all shadow-2xl"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="absolute left-4 top-5 text-slate-500">🔍</span>
        </div>
      </header>
      {/* GRID DE RESULTADOS */}
      <div className="relative">
        {isSearching && (
          <div className="absolute inset-0 z-10 flex justify-center pt-20 bg-slate-950/20 backdrop-blur-sm">
            <LoadingSpinner />
          </div>
        )}

        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 transition-all ${isSearching ? "opacity-20 blur-sm" : "opacity-100"}`}
        >
          {filteredData?.length > 0 ? (
            filteredData.map((astro) => (
             <motion.div
    layoutId={`card-${astro.id}`} // <--- ID único para la transición
    key={astro.id}
    onClick={() => setSelectedAstro(astro)}
    className="cursor-pointer"
  >
              <Card
                id={astro.id}
                name={astro.name}
                img={astro.profile_image}
                corporation={astro.agency?.abbrev || "Independiente"}
                from={astro.nationality}
              />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <p className="text-slate-500 italic text-lg">
                No se han encontrado astronautas con esos criterios.
              </p>
            </div>
          )}
        </div>
      </div>
      {selectedAstro && (
        <AnimatePresence>
          {selectedAstro && (
            <AstroModal astro={selectedAstro} onClose={closeModal} />
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
