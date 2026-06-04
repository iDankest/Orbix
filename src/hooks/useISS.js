import { useState, useEffect } from "react";
import axios from "axios";

export function useISS() {
  const [position, setPosition] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosition = async () => {
      try {
        const res = await axios.get("http://api.open-notify.org/iss-now.json");
        const { latitude, longitude } = res.data.iss_position;
        setPosition({ lat: parseFloat(latitude), lon: parseFloat(longitude) });
      } catch {
        setPosition(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPosition();
    const interval = setInterval(fetchPosition, 5000);
    return () => clearInterval(interval);
  }, []);

  return { position, loading };
}
