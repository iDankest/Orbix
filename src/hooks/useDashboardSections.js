import { useState } from "react";

const DEFAULT_SECTIONS = [
  { id: "iss-tracker", title: "Orbital Tracking (ISS)", visible: true },
  { id: "chat", title: "Global Communication Feed", visible: true },
  { id: "my-missions", title: "My Missions", visible: true },
  { id: "quick-stats", title: "Quick Stats", visible: true },
  { id: "space-race", title: "Space Race", visible: true },
  { id: "astronaut-explorer", title: "Astronaut Explorer", visible: true },
  { id: "space-news", title: "Space News", visible: true },
];

function initSections() {
  try {
    const raw = localStorage.getItem("orbix_sections");
    if (!raw) return DEFAULT_SECTIONS;
    const saved = JSON.parse(raw);
    const defaultIds = new Set(DEFAULT_SECTIONS.map((s) => s.id));
    const savedIds = new Set(saved.map((s) => s.id));
    const missing = DEFAULT_SECTIONS.filter((s) => !savedIds.has(s.id));
    if (missing.length === 0) return saved;
    return [...saved, ...missing];
  } catch {
    return DEFAULT_SECTIONS;
  }
}

export function useDashboardSections() {
  const [sections, setSections] = useState(initSections);

  const persist = (next) => {
    const value = typeof next === "function" ? next(sections) : next;
    setSections(value);
    localStorage.setItem("orbix_sections", JSON.stringify(value));
  };

  const toggleSection = (id) => {
    persist((prev) =>
      prev.map((s) => (s.id === id ? { ...s, visible: !s.visible } : s))
    );
  };

  const hideSection = (id) => {
    persist((prev) =>
      prev.map((s) => (s.id === id ? { ...s, visible: false } : s))
    );
  };

  const showSection = (id) => {
    persist((prev) =>
      prev.map((s) => (s.id === id ? { ...s, visible: true } : s))
    );
  };

  const resetSections = () => {
    persist(DEFAULT_SECTIONS);
  };

  const visibleSections = sections.filter((s) => s.visible);
  const hiddenSections = sections.filter((s) => !s.visible);

  return { sections, visibleSections, hiddenSections, hideSection, showSection, toggleSection, resetSections };
}
