import { createContext, useState, type FC, type ReactNode } from "react";
import { type GeoLocationData } from "../types";
import { constructGeoUrl } from "../utils";

interface Store {
  location: GeoLocationData | null;
  error: string;
  loading: boolean;
  handleSearch: (queryString: string) => void;
}

const Context = createContext<Store | null>(null);

const AppContext: FC<{ children: ReactNode }> = ({ children }) => {
  const [location, setLocation] = useState<GeoLocationData | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(constructGeoUrl(query));
      const result: GeoLocationData[] = await res.json();

      if (result.length > 0) {
        const { lat, lon, name, country } = result[0];
        setLocation({ lat, lon, name, country });
      } else {
        setLocation(null);
        setError("Invalid country or city");
      }
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
      setLocation(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Context.Provider value={{ location, error, loading, handleSearch }}>
      {children}
    </Context.Provider>
  );
};

export { AppContext, Context };
