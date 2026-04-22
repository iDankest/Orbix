import { useMemo } from "react";

/**
 * @param {Array} data - El array de astronautas
 * @param {Array} keysToFilter - Ejemplo: ["name", "nationality", "agency.name", "agency.abbrev"]
 * @param {string} externalQuery - El searchTerm que viene del Contexto
 */
export function useFilter(data, keysToFilter, externalQuery) {
  const filteredData = useMemo(() => {
    // Si no hay datos, devolvemos array vacío
    if (!data) return [];
    // Si no hay búsqueda, devolvemos todo
    if (!externalQuery) return data;

    const query = externalQuery.toLowerCase();

    return data.filter((item) => {
      return keysToFilter.some((key) => {
        // Función para obtener valor en rutas anidadas (ej: "agency.name")
        const value = key.split(".").reduce((obj, i) => obj?.[i], item);

        return value?.toString().toLowerCase().includes(query);
      });
    });
  }, [externalQuery, data, keysToFilter]);

  return { filteredData };
}
