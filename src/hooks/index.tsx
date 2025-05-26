import { useEffect, useState } from "react";

function useData<T = unknown>(url: string): { data: T | undefined } {
  const [data, setData] = useState<T | undefined>();
  useEffect(() => {
    if (url) {
      let ignore = false;
      fetch(url)
        .then((response) => response.json())
        .then((json) => {
          if (!ignore) {
            setData(json);
          }
        });
      return () => {
        ignore = true;
      };
    }
  }, [url]);
  return { data };
}

function useLocation() {
  const [coords, setCoords] = useState<{
    lat: number | null;
    lon: number | null;
  }>({ lat: null, lon: null });

  const [geolocationPositionError, setGeolocationPositionError] =
    useState<GeolocationPositionError | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoords({ lat: latitude, lon: longitude });
      },
      (error) => {
        setGeolocationPositionError(error);
      }
    );
  }, []);

  return { coords, geolocationPositionError };
}

export { useData, useLocation };
