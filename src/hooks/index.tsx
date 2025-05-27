import { useEffect, useState } from "react";

function useData<T = unknown>(
  url: string
): { data: T | null; isLoading: boolean; isError: boolean } {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (url) {
      setIsLoading(true);
      setIsError(false);

      let ignore = false;

      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error fetching data");
          }
          return response.json();
        })
        .then((json) => {
          if (!ignore) {
            setData(json);
            setIsLoading(false);
          }
        })
        .catch(() => {
          if (!ignore) {
            setData(null);
            setIsError(true);
            setIsLoading(false);
          }
        });

      return () => {
        ignore = true;
      };
    }
  }, [url]);

  return { data, isLoading, isError };
}

export { useData };
