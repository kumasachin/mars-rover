import { useState, useEffect } from "react";

export const useFetch = (url, options, triggerFetch) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const fetchData = async () => {
    try {
      const res = await fetch(url, options);
      const json = await res.json();
      setResponse(json);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [triggerFetch]);
  
  return { response, error };
};

export default useFetch;