import { motion, AnimatePresence } from "framer-motion";
import { useContext, useRef } from "react";
import { OrbixContext } from "../context/OrbixContext";
import { useDashboardWidgets } from "../hooks/useDashboardWidgets";
import { useDashboardSections } from "../hooks/useDashboardSections";
import { useCountdown } from "../hooks/useCountdown";
import ISSTracker from "../components/ISSTracker";
import ChatAI from "../components/ChatAI";
import DashboardDock from "../components/DashboardDock";
import MissionSelector from "../components/MissionSelector";
import SpaceRaceWidget from "../components/SpaceRaceWidget";

export default function CommanderDashboard({ commander, setCommander }) {
  const { dailyPhoto, messages, sendMessage, inOrbitData, allAstronauts, launchData } = useContext(OrbixContext);
  const { widgets, addWidget, removeWidget } = useDashboardWidgets();
  const { visibleSections, toggleSection } = useDashboardSections();
  const constraintsRef = useRef(null);

  const handleLogout = () => {
    setCommander(null);
    window.location.href = "/";
  };

  if (!commander) return <div className="p-20 text-red-500">ACCESO DENEGADO: NO SE DETECTA CREDENCIALES</div>;

  const visibleIds = visibleSections.map((s) => s.id);
  const inOrbitCount = inOrbitData?.results?.length || 0;

  return (
    <div
      className="min-h-screen bg-slate-950 text-cyan-400 font-mono p-4 md:p-8 relative overflow-hidden pb-24"
      style={{
        backgroundImage: `url(${dailyPhoto?.url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md z-0" />

      <div ref={constraintsRef} className="relative z-10 max-w-7xl mx-auto">
        <header className="flex justify-between items-end border-b border-cyan-500/30 pb-6 mb-8 pt-20">
          <div>
            <p className="text-[10px] tracking-[0.5em] text-cyan-500/60 uppercase">System Status: Nominal</p>
            <h1 className="text-4xl font-black italic text-white">
              WELCOME, <span className="text-cyan-400 uppercase">{commander}</span>
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right hidden md:block">
              <p className="text-xs">STATION TIME: {new Date().toUTCString()}</p>
              <p className="text-[10px] text-slate-500 uppercase">Authorization Level: Commander</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 border border-red-500/50 text-red-500 text-[10px] font-bold rounded-lg hover:bg-red-500 hover:text-black transition-all"
            >
              TERMINAR SESIÓN [ESC]
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

          {visibleSections.find((s) => s.id === "iss-tracker") && (
            <SectionWrapper key="iss-tracker" className="md:col-span-4">
              <DraggableWidget title="Orbital Tracking (ISS)" constraintsRef={constraintsRef}>
                <ISSTracker inOrbitCount={inOrbitCount} />
                <div className="mt-2 text-[8px] text-slate-600 text-center">ALT: 408 KM · VEL: 7.66 KM/S</div>
              </DraggableWidget>
            </SectionWrapper>
          )}

          {visibleSections.find((s) => s.id === "solar-weather") && (
            <SectionWrapper key="solar-weather" className="md:col-span-4">
              <DraggableWidget title="Solar Weather" constraintsRef={constraintsRef}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <p className="text-xs text-green-500">RADIATION LEVEL: NOMINAL</p>
                </div>
                <p className="text-[9px] text-slate-400 mt-2">Next EVA window: <span className="text-cyan-400">OPEN</span></p>
                <div className="mt-3 grid grid-cols-2 gap-2 text-[9px]">
                  <div className="bg-white/5 p-2 rounded">SOLAR WIND: 450 KM/S</div>
                  <div className="bg-white/5 p-2 rounded">MAGNETOSPHERE: STABLE</div>
                </div>
              </DraggableWidget>
            </SectionWrapper>
          )}

          {visibleSections.find((s) => s.id === "system-modules") && (
            <SectionWrapper key="system-modules" className="md:col-span-4">
              <DraggableWidget title="System Modules" constraintsRef={constraintsRef}>
                <div className="space-y-2 text-[10px]">
                  <ModuleRow label="Life Support" status="NOMINAL" color="text-green-500" />
                  <ModuleRow label="Propulsion" status="STANDBY" color="text-yellow-500" />
                  <ModuleRow label="Communications" status="ACTIVE" color="text-cyan-400" />
                  <ModuleRow label="Navigation" status="LOCKED" color="text-green-500" />
                </div>
              </DraggableWidget>
            </SectionWrapper>
          )}

          {visibleSections.find((s) => s.id === "chat") && (
            <SectionWrapper key="chat" className="md:col-span-6">
              <DraggableWidget title="Global Communication Feed" className="h-[560px] flex flex-col" constraintsRef={constraintsRef}>
                <ChatAI messages={messages} sendMessage={sendMessage} widgetsCount={visibleIds.length} />
              </DraggableWidget>
            </SectionWrapper>
          )}

          {visibleSections.find((s) => s.id === "my-missions") && (
            <SectionWrapper key="my-missions" className="md:col-span-3">
              <DraggableWidget title="My Missions" constraintsRef={constraintsRef}>
                <div className="space-y-3 max-h-[260px] overflow-y-auto custom-scrollbar pr-1">
                  {widgets.map((w) => (
                    <MissionWidgetCard key={w.id} widget={w} onRemove={removeWidget} />
                  ))}
                  {widgets.length === 0 && (
                    <div className="text-center py-4">
                      <p className="text-[10px] text-slate-500">No hay misiones</p>
                    </div>
                  )}
                </div>
                <div className="mt-3">
                  <MissionSelector onAdd={addWidget} widgetIds={widgets.map((w) => w.id)} />
                </div>
              </DraggableWidget>
            </SectionWrapper>
          )}

          {visibleSections.find((s) => s.id === "quick-stats") && (
            <SectionWrapper key="quick-stats" className="md:col-span-3">
              <DraggableWidget title="Quick Stats" constraintsRef={constraintsRef}>
                <div className="space-y-3 text-[10px]">
                  <StatRow label="Widgets visibles" value={visibleIds.length} />
                  <StatRow label="Misiones guardadas" value={widgets.length} />
                  <StatRow label="Mensajes hoy" value={messages?.length || 0} />
                  <StatRow label="En órbita" value={inOrbitCount} />
                  <StatRow label="Astronautas activos" value={allAstronauts?.length || 0} />
                </div>
              </DraggableWidget>
            </SectionWrapper>
          )}

          {visibleSections.find((s) => s.id === "space-race") && (
            <SectionWrapper key="space-race" className="md:col-span-4">
              <DraggableWidget title="Space Race Dominance" constraintsRef={constraintsRef}>
                <SpaceRaceWidget allAstronauts={allAstronauts} launchData={launchData} />
              </DraggableWidget>
            </SectionWrapper>
          )}

        </div>
      </div>

      <DashboardDock visibleIds={visibleIds} onToggle={toggleSection} />
    </div>
  );
}

function SectionWrapper({ children, className }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function DraggableWidget({ title, children, className = "", constraintsRef }) {
  return (
    <motion.div
      drag
      dragConstraints={constraintsRef}
      dragElastic={0.08}
      whileDrag={{ scale: 1.03, zIndex: 50, boxShadow: "0 0 40px rgba(6,182,212,0.2)" }}
      className={`bg-slate-900/40 border border-white/10 backdrop-blur-xl p-6 rounded-3xl shadow-2xl cursor-grab active:cursor-grabbing select-none ${className}`}
    >
      <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-500/80 mb-4 border-b border-white/5 pb-2">{title}</h3>
      {children}
    </motion.div>
  );
}

function MissionWidgetCard({ widget, onRemove }) {
  const { days, hours, minutes, seconds, isOver } = useCountdown(widget.net);

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="group bg-white/5 border border-white/5 hover:border-cyan-500/30 rounded-xl p-3 transition-all"
    >
      <div className="flex justify-between items-start">
        <div className="flex-1 min-w-0">
          <p className="text-white text-xs font-bold truncate">{widget.name}</p>
          <p className="text-[8px] text-slate-500 mt-0.5">{widget.provider || "Unknown"}</p>
        </div>
        <button
          onClick={() => onRemove(widget.id)}
          className="text-slate-600 hover:text-red-400 transition-colors text-[10px] ml-2 cursor-pointer"
        >
          ✕
        </button>
      </div>
      <div className="mt-2">
        {isOver ? (
          <span className="text-[9px] text-red-500 font-bold">MISIÓN COMPLETADA</span>
        ) : (
          <p className="text-[10px] text-cyan-400 font-mono font-bold">
            T-MINUS: {days}d {String(hours).padStart(2, "0")}h {String(minutes).padStart(2, "0")}m {String(seconds).padStart(2, "0")}s
          </p>
        )}
      </div>
    </motion.div>
  );
}

function ModuleRow({ label, status, color }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-slate-400">{label}</span>
      <span className={`${color}`}>● {status}</span>
    </div>
  );
}

function StatRow({ label, value }) {
  return (
    <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl">
      <span className="text-slate-400">{label}</span>
      <span className="text-cyan-400 font-black">{value}</span>
    </div>
  );
}
