import { useState, useCallback } from "react";

const LOCK_KEY = "orbix_dock_locked";
const POS_KEY = "orbix_widget_positions";

function load(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key) || "null") ?? fallback; }
  catch { return fallback; }
}

function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function useDashboardLock() {
  const [locked, setLockedState] = useState(() => load(LOCK_KEY, false));
  const [positions, setPositions] = useState(() => load(POS_KEY, {}));

  const toggleLock = useCallback(() => {
    setLockedState((prev) => {
      const next = !prev;
      save(LOCK_KEY, next);
      return next;
    });
  }, []);

  const savePosition = useCallback((id, x, y) => {
    setPositions((prev) => {
      const next = { ...prev, [id]: { x, y } };
      save(POS_KEY, next);
      return next;
    });
  }, []);

  return { locked, toggleLock, positions, savePosition };
}
