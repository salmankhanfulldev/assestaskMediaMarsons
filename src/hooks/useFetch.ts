// src/hooks/useFetch.ts

import { useEffect, useState } from "react";

export const useFetch = <T>(fetchFn: () => Promise<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFn()
      .then((res) => setData(res))
      .catch(() => setError("Something went wrong"))
      .finally(() => setLoading(false));
  }, [fetchFn]);

  return { data, loading, error };
};