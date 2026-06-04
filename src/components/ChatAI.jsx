import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const KNOWLEDGE = {
  status: ["Todos los sistemas en verde. Presión atmosférica estable. Comunicaciones nominales.", "Módulos operativos al 100%. Navegación inercial sincronizada.", "Sistemas de soporte vital: OK. Propulsión: STANDBY. Comunicaciones: ACTIVE."],
  launch: ["El próximo lanzamiento está programado según el manifiesto Orbix. Consulta la sección de lanzamientos para más detalles.", "Ventana de lanzamiento confirmada. Todos los protocolos activados.", "Los motores están en fase de pre-combustión. T-MINUS en espera."],
  iss: ["La Estación Espacial Internacional orbita a 408 km de altitud. Actualmente sobrevolando el hemisferio sur.", "ISS completando su órbita número {count} desde que activamos el tracking. Velocidad: 7.66 km/s."],
  mission: ["Misiones activas en el manifiesto: varias cápsulas en preparación. Consulta el panel de lanzamientos.", "Recordatorio: toda misión requiere autorización del comandante antes de T-MINUS 24h."],
  weather: ["Radiación solar en niveles seguros. Campo magnético terrestre estable. Sin tormentas solares previstas.", "Actividad solar: BAJA. Ventana EVA disponible."],
  orbit: ["Órbita baja terrestre despejada. No hay colisiones previstas en las próximas 48h.", "Trayectoria nominal. Inclinación orbital: 51.6 grados."],
  help: ["Comandos disponibles: STATUS, LAUNCH, ISS, MISSION, WEATHER, ORBIT, DASHBOARD, CLEAR", "Puedes preguntarme sobre el estado de la estación, lanzamientos, la ISS o el clima espacial."],
  dashboard: ["Tu dashboard tiene {widgets} widgets de misión activos. Puedes añadir más desde la sección de lanzamientos.", "Panel de control configurado. Nivel de autorización: COMANDANTE."],
};

function getBotResponse(input, widgetsCount) {
  const text = input.toLowerCase();
  if (text.includes("status") || text.includes("sistema") || text.includes("estado")) return pick(KNOWLEDGE.status);
  if (text.includes("lanz") || text.includes("launch") || text.includes("cohete")) return pick(KNOWLEDGE.launch);
  if (text.includes("iss") || text.includes("estacion") || text.includes("station")) return pick(KNOWLEDGE.iss).replace("{count}", Math.floor(Math.random() * 90000 + 10000));
  if (text.includes("mission") || text.includes("mision") || text.includes("misiones")) return pick(KNOWLEDGE.mission);
  if (text.includes("weather") || text.includes("solar") || text.includes("radiacion") || text.includes("clima")) return pick(KNOWLEDGE.weather);
  if (text.includes("orbit") || text.includes("orbita") || text.includes("trayectoria")) return pick(KNOWLEDGE.orbit);
  if (text.includes("dashboard") || text.includes("panel") || text.includes("widget")) return pick(KNOWLEDGE.dashboard).replace("{widgets}", widgetsCount);
  if (text.includes("help") || text.includes("ayuda") || text.includes("comando") || text.includes("que puedes")) return pick(KNOWLEDGE.help);
  
  const fallbacks = [
    "Comandante, su mensaje ha sido registrado en la bitácora. Orbix AI procesando...",
    "Mensaje recibido. No se detectan parámetros críticos en su consulta.",
    "Transmisión recibida. ¿Necesita información sobre lanzamientos, estado de la estación o algo más?",
    "Orbix AI en línea. Puede preguntar: STATUS, LAUNCH, ISS, MISSION, WEATHER, ORBIT, HELP.",
    "Señal clara. Su mensaje está siendo archivado en los registros de la misión.",
  ];
  return pick(fallbacks);
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function ChatAI({ messages: contextMessages, sendMessage, widgetsCount }) {
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [localMessages, setLocalMessages] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [contextMessages, localMessages]);

  const handleSend = useCallback(() => {
    if (!input.trim()) return;

    sendMessage(input.trim());
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const reply = getBotResponse(input.trim(), widgetsCount);
      sendMessage(reply);
      setIsTyping(false);
    }, 1000 + Math.random() * 1500);
  }, [input, sendMessage, widgetsCount]);

  const allMessages = [...(contextMessages || [])];

  return (
    <div className="flex flex-col h-full">
      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-3 text-xs pr-2 custom-scrollbar">
        {allMessages.length > 0 ? (
          [...allMessages].reverse().slice(0, 50).map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-3 rounded-xl border ${
                msg.user === "SYSTEM" || msg.user === "Orbix_AI"
                  ? "bg-cyan-500/10 border-cyan-500/20 ml-4"
                  : "bg-white/5 border-white/5 mr-4"
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <p className={`text-[9px] font-black ${msg.user === "Orbix_AI" ? "text-cyan-400" : "text-cyan-600"}`}>
                  [{msg.user}]
                </p>
                {msg.time && <p className="text-[8px] text-slate-600">{msg.time}</p>}
              </div>
              <p className="text-slate-300 text-xs">{msg.text}</p>
            </motion.div>
          ))
        ) : (
          <div className="text-center pt-20">
            <p className="text-slate-500 italic">Canal de comunicaciones abierto.</p>
            <p className="text-[10px] text-slate-600 mt-2">Escribe HELP para ver comandos disponibles.</p>
          </div>
        )}

        <AnimatePresence>
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 p-3 ml-4"
            >
              <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-4 flex gap-2">
        <input
          className="bg-white/5 border border-white/10 rounded-lg p-3 flex-1 text-xs outline-none focus:border-cyan-500 transition-all"
          placeholder="Escribir en la bitácora..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button
          onClick={handleSend}
          className="bg-cyan-500 text-black px-5 py-3 rounded-lg font-bold text-[10px] uppercase hover:bg-cyan-400 transition-all"
        >
          SEND
        </button>
      </div>
    </div>
  );
}
