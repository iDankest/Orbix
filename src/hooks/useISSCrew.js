import { useState, useEffect } from "react";
import axios from "axios";

export function useISSCrew() {
  const [crew, setCrew] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCrew = async () => {
      try {
        const res = await axios.get("http://api.open-notify.org/astros.json");
        setCrew(res.data.people.filter((p) => p.craft === "ISS"));
      } catch {
        setCrew([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCrew();
    const interval = setInterval(fetchCrew, 30000);
    return () => clearInterval(interval);
  }, []);

  return { crew, count: crew.length, loading };
}
