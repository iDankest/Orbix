import { useState, useEffect } from 'react';
import axios from 'axios';

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
    try {
        const response = await axios.get(url, { signal: controller.signal });
        setData(response.data);
    } catch (error) {
      setError(error.message || "Wiustons tenemos un problema");
    } finally {
      setLoading(false);
    }
  };
  if (url) fetchData();
  return () => controller.abort();
}, [url]);
  
  return { data, loading, error };
}