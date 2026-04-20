import { useState, useMemo } from 'react';

export function useFilter(data, keysToFilter) {
  const [query, setQuery] = useState("");

  const filteredData = useMemo(() => {
    if (!query) return data;
    
    return data?.filter((item) => 
      keysToFilter.some(key => 
        item[key]?.toString().toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [query, data, keysToFilter]);

  return { query, setQuery, filteredData };
}