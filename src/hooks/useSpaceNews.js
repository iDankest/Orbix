import { useState, useEffect } from "react";
import axios from "axios";

export function useSpaceNews() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get(
          "https://api.spaceflightnewsapi.net/v4/articles/?limit=8&ordering=-published_at"
        );
        setArticles(res.data.results || []);
      } catch {
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
    const interval = setInterval(fetchNews, 120000);
    return () => clearInterval(interval);
  }, []);

  return { articles, loading };
}
