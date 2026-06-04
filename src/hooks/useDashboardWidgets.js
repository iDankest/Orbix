import { useLocalStorage } from "./useLocalStorage";

export function useDashboardWidgets() {
  const [widgets, setWidgets] = useLocalStorage("orbix_widgets", []);

  const addWidget = (launch) => {
    setWidgets((prev) => {
      if (prev.some((w) => w.id === launch.id)) return prev;
      return [...prev, { id: launch.id, name: launch.name, net: launch.net, provider: launch.launch_service_provider?.name, image: launch.image }];
    });
  };

  const removeWidget = (id) => {
    setWidgets((prev) => prev.filter((w) => w.id !== id));
  };

  const reorderWidgets = (fromIndex, toIndex) => {
    setWidgets((prev) => {
      const copy = [...prev];
      const [moved] = copy.splice(fromIndex, 1);
      copy.splice(toIndex, 0, moved);
      return copy;
    });
  };

  return { widgets, addWidget, removeWidget, reorderWidgets };
}
