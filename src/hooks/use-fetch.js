import { useState, useEffect, useCallback } from "react";

export const useFetch = (url, options) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const fetchData = useCallback(async () => {
    if (!url) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const res = await fetch(url, options);
      const json = await res.json();
      setResponse(json);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  
  return { response, error, loading, refetch: fetchData };
};

export default useFetch;