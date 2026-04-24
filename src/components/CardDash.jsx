// CardDash.jsx
import React from 'react';
export default function CardDash({
  title,
  value,
  subtitle,
  icon,
  color = "text-cyan-400",
  isAction = false,
}) {
  // Si es una tarjeta de acción (Ver más), devolvemos un diseño ligeramente distinto
  if (isAction) {
    return (
      <div className="group bg-cyan-500/10 border-2 border-dashed border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-500/20 transition-all duration-300 p-6 rounded-2xl w-full flex flex-col items-center justify-between cursor-pointer min-h-[160px]">
        <span
          className={`${color} text-3xl mb-2 group-hover:scale-125 transition-transform duration-500`}
        >
          {icon || "➡️"}
        </span>
        <h2 className="text-cyan-400 uppercase text-sm font-bold tracking-widest">
          {title || "Ver todas las misiones"}
        </h2>
        <p className="text-cyan-400/60 text-xs mt-1 italic">
          Explorar base de datos
        </p>
      </div>
    );
  }

  // Si no es acción, devolvemos la tarjeta normal que ya tenías
  return (
    <div className="bg-slate-900/40 border border-slate-700 hover:border-cyan-400/50 transition-all duration-300 p-6 rounded-2xl w-full relative group cursor-pointer flex flex-col justify-between">
      <h2 className="text-slate-500 uppercase text-xs tracking-widest font-semibold mb-2">
        {title}
      </h2>
      <span
        className={`${color} absolute top-6 right-6 text-xl group-hover:rotate-12 transition-transform`}
      >
        {icon}
      </span>
      <h1 className="text-white text-4xl font-bold my-1 tracking-tight">
        {value}
      </h1>
      <span className="text-slate-400 text-xs uppercase tracking-wider font-medium">
        {subtitle}
      </span>
    </div>
  );
}
