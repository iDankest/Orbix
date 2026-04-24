import CardDash from "./CardDash";
import { useFetch} from "../hooks/useFetch";
import { useCountdown } from "../hooks/useCountdown";
import { OrbixContext } from "../context/OrbixContext";
import { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AuthGate from "./AuthGate";
import { useNavigate } from "react-router-dom";



export default function LandingStats({onLoginSuccess}) {
  // Aquí llamarías a la API de los astronautas
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [commanderName, setCommanderName] = useState("");
  const navigate = useNavigate();
  
  // Supongamos que tienes una función para guardar el login
const handleFinalLogin = (name) => {
    if (name) {
      // Ahora esta función sí existe porque la recibimos arriba
      onLoginSuccess(name); 
      navigate("/commander-dashboard"); 
    }
  };
  const {
    data: nextLaunchData,
    loading,
    error,
  } = useFetch("https://fdo.rocketlaunch.live/json/launches/next/1");
  const nextLaunch = nextLaunchData?.result?.[0];
  const { days, hours, minutes, seconds, isOver } = useCountdown(
    nextLaunch?.sort_date * 1000,
  );
  const { data: events } = useFetch(
    "https://ll.thespacedevs.com/2.2.0/event/upcoming/",
  );

  const { inOrbitData } = useContext(OrbixContext);

  const countdownText = isOver
    ? "Misión Completada ✅"
    : `T-MINUS: ${days}d ${hours}h ${minutes}m ${seconds}s`;
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-10">
      {/* Tarjeta de Astronautas - Datos de la API */}
      <CardDash
        title="Personas en el espacio"
        value={inOrbitData?.results.length || "..."}
        subtitle="Astronautas activos"
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="icon icon-tabler icons-tabler-outline icon-tabler-users"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
            <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
          </svg>
        }
      />

      {/* Tarjeta de Próximo Lanzamiento - Estático por ahora */}
      <CardDash
        title="Próximo Lanzamiento"
        value={nextLaunch ? nextLaunch.name.split("|")[0] : "Buscando..."}
        subtitle={countdownText}
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="icon icon-tabler icons-tabler-outline icon-tabler-alarm"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M5 13a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
            <path d="M12 10l0 3l2 0" />
            <path d="M7 4l-2.75 2" />
            <path d="M17 4l2.75 2" />
          </svg>
        }
        color="text-orange-400"
      />

      {/* Tarjeta de Misiones - Otro ejemplo */}
      <CardDash
        title="Misiones Activas"
        value={events ? events.count : "..."}
        subtitle="Órbita baja"
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="icon icon-tabler icons-tabler-outline icon-tabler-rocket"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4 13a8 8 0 0 1 7 7a6 6 0 0 0 3 -5a9 9 0 0 0 6 -8a3 3 0 0 0 -3 -3a9 9 0 0 0 -8 6a6 6 0 0 0 -5 3" />
            <path d="M7 14a6 6 0 0 0 -3 6a6 6 0 0 0 6 -3" />
            <path d="M15 9l-3 3l3 3l-3 3" />
          </svg>
        }
        color="text-purple-400"
      />
<div className="relative">
  <AnimatePresence>
    {isLoginOpen && (
      <AuthGate 
        layoutId="auth-card"
        onClose={() => setIsLoginOpen(false)} 
        onLogin={handleFinalLogin}
      />
    )}
  </AnimatePresence>

  {/* Si el login está cerrado, mostramos la tarjeta original */}
  {!isLoginOpen && (
    <motion.div
      layoutId="auth-card" // MATCH con el de AuthGate
      onClick={() => setIsLoginOpen(true)}
      className="cursor-pointer h-full"
    >
      <CardDash
        isAction={true}
        title="Explorar Misiones"
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-square-plus-2"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12.5 21h-7.5a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v7.5" />
            <path d="M16 19h6" />
            <path d="M19 16v6" />
          </svg>
        }
        color="text-cyan-400"
      />
    </motion.div>
  )}
</div>
  </section>
  );
}
