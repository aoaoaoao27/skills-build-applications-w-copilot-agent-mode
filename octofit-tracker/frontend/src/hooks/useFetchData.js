import { useEffect, useState } from 'react';

// Normalizes API responses that are either a plain array or a paginated
// object shaped like { results: [...], count, next, previous }.
function normalizeResponse(data) {
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.results)) return data.results;
  return [];
}

export function useFetchData(url) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    setLoading(true);
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request to ${url} failed with status ${response.status}`);
        }
        return response.json();
      })
      .then((json) => {
        if (isMounted) {
          setData(normalizeResponse(json));
          setError(null);
        }
      })
      .catch((err) => {
        if (isMounted) setError(err.message);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [url]);

  return { data, error, loading };
}
