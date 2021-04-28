import { useState, useEffect } from "react";

export const useFetch = (url, options, excutionStatus) => {
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
  }, [excutionStatus]);
  
  return { response, error };
};

export default useFetch;