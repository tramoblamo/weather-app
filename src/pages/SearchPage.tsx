import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { History } from "../components/History";
import { Loading } from "../components/Loading";
import { SearchBar } from "../components/SearchBar";
import { useSearch } from "../context/useSearch";
import type { GeoLocationDataWithKey } from "../types";
import { readLocationHistory } from "../utils/locationHistory";

function SearchPage() {
  const [history, setHistory] = useState<GeoLocationDataWithKey[]>([]);
  const navigate = useNavigate();
  const { handleSearch, error, setError, loading } = useSearch();

  const onSearchWithNavigate = (q: string) =>
    handleSearch(q, () => navigate("/"));

  const onHistoryUpdate = (newHistory: GeoLocationDataWithKey[]) =>
    setHistory(newHistory);

  useEffect(() => {
    const hist = readLocationHistory();
    setHistory(hist);
  }, []);

  useEffect(() => {
    setError("");
  }, [setError]);

  return (
    <div className="flex flex-col gap-3">
      <SearchBar onSearch={onSearchWithNavigate} isBtnVisible={true} />
      <div className="text-right">
        <Link className="text-blue-500 text-sm underline" to="/">
          Home
        </Link>
      </div>
      {loading && <Loading />}
      {error && <p className="text-sm text-red-500">{error}</p>}
      {history.length > 0 ? (
        <History data={{ history }} onHistoryUpdate={onHistoryUpdate} />
      ) : null}
    </div>
  );
}

export { SearchPage };
