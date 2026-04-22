import { createContext, useState } from "react"; // 1. Importa createContext
import { useFetch } from "../hooks/useFetch";
import { useLocalStorage } from "../hooks/useLocalStorage";

// 2. Crea y EXPORTA el contexto (Esto es lo que buscaba Astronautas.jsx)
export const OrbixContext = createContext();

export function OrbixProvider({ children }) {
  // --- ESTADOS DE BÚSQUEDA (Faltaban aquí) ---
  const [searchTerm, setSearchTerm] = useState("");

  // --- 1. APIS TÉCNICAS ---
  const { data: inOrbitData, loading:loadingInOrbit } = useFetch(
    "https://lldev.thespacedevs.com/2.2.0/astronaut/?in_space=true&status=1"
  );
  const { data: allAstroData, loading: loadingAll, error } = useFetch(
    "https://lldev.thespacedevs.com/2.2.0/astronaut/?limit=100&ordering=name"
  );
  const { data: launchData } = useFetch(
    "https://lldev.thespacedevs.com/2.2.0/launch/upcoming/"
  );

  // --- 2. APIS ESTÉTICAS ---
  const { data: dailyPhoto } = useFetch(
    "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY"
  );

  // --- 3. ESTADOS DE INTERACCIÓN ---
  const [messages, setMessages] = useLocalStorage("orbix_chat", [
    { id: 1, user: "SYSTEM", text: "Bienvenido al centro de control Orbix.", time: "09:00" },
    { id: 2, user: "Ground Control", text: "Todos los sistemas en verde.", time: "09:05" }
  ]);

  // --- 4. LÓGICA DERIVADA ---
/*   const astronautsInSpace = astroData?.results?.filter(
      (a) => a.status.name === "Active" && a.in_space
    ) || []; */

  const nextLaunch = launchData?.results?.[0] || null;

  // 3. PASA TODO AL VALUE (Incluyendo searchTerm y loading)
  const value = {
    inOrbitData,
    loadingInOrbit,
    allAstronauts: allAstroData?.results || [],
    loadingAll,
    error,
    searchTerm,
    setSearchTerm,
/*     astronautsInSpace, */
    nextLaunch,
    dailyPhoto,
    messages,
    sendMessage: (text) =>
      setMessages([
        ...messages,
        { id: Date.now(), user: "Comandante", text, time: new Date().toLocaleTimeString() },
      ]),
  };

  return (
    <OrbixContext.Provider value={value}>{children}</OrbixContext.Provider>
  );
}