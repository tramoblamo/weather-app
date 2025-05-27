import { createContext, useState, type FC, type ReactNode } from "react";
import { type GeoLocationData } from "../types";
import { constructGeoUrl } from "../utils";
import { addToLocationHistory } from "../utils/locationHistory";

interface Store {
  location: GeoLocationData | null;
  error: string;
  loading: boolean;
  handleSearch: (query: string, navigateCallback?: () => void) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setLocation: (data: GeoLocationData | null) => void;
  setError: (err: string) => void;
}

const Context = createContext<Store | null>(null);

const AppContext: FC<{ children: ReactNode }> = ({ children }) => {
  const [location, setLocation] = useState<GeoLocationData | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async (query: string, navigateCallback?: () => void) => {
    setSearchQuery(query);
    setLoading(true);
    setError("");
    try {
      const res = await fetch(constructGeoUrl(query));
      const result: GeoLocationData[] = await res.json();

      if (result.length > 0) {
        const [firstMatch] = result;
        const { lat, lon, name, country } = firstMatch;
        setLocation({ lat, lon, name, country });
        addToLocationHistory(firstMatch);

        if (navigateCallback) {
          navigateCallback();
        }
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
    <Context.Provider
      value={{
        location,
        error,
        loading,
        handleSearch,
        searchQuery,
        setSearchQuery,
        setLocation,
        setError,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { AppContext, Context };
