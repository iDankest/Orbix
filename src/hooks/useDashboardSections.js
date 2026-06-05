import { useLocalStorage } from "./useLocalStorage";

const DEFAULT_SECTIONS = [
  { id: "iss-tracker", title: "Orbital Tracking (ISS)", visible: true },
  { id: "chat", title: "Global Communication Feed", visible: true },
  { id: "my-missions", title: "My Missions", visible: true },
  { id: "quick-stats", title: "Quick Stats", visible: true },
  { id: "space-race", title: "Space Race", visible: true },
  { id: "astronaut-explorer", title: "Astronaut Explorer", visible: true },
  { id: "space-news", title: "Space News", visible: true },
];

export function useDashboardSections() {
  const [sections, setSections] = useLocalStorage("orbix_sections", DEFAULT_SECTIONS);

  const toggleSection = (id) => {
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, visible: !s.visible } : s))
    );
  };

  const hideSection = (id) => {
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, visible: false } : s))
    );
  };

  const showSection = (id) => {
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, visible: true } : s))
    );
  };

  const resetSections = () => {
    setSections(DEFAULT_SECTIONS);
  };

  const visibleSections = sections.filter((s) => s.visible);
  const hiddenSections = sections.filter((s) => !s.visible);

  return { sections, visibleSections, hiddenSections, hideSection, showSection, toggleSection, resetSections };
}
