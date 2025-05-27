import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HistoryListItem } from "../components/HistoryListItem";
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
    <div>
      <SearchBar onSearch={onSearchWithNavigate} />
      <div className="text-right pb-4">
        <Link className="text-blue-500 text-sm underline" to="/">
          Home
        </Link>
      </div>
      {loading && <Loading />}
      {error && <p className="text-sm text-red-500">{error}</p>}
      {history.length > 0 ? (
        <section>
          <header className="py-4 font-semibold">Search History</header>
          <ul className="bg-white p-4 rounded-xl shadow-xl">
            {history.map((entry) => (
              <HistoryListItem
                key={entry.key}
                data={entry}
                onHistoryUpdate={onHistoryUpdate}
              />
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}

export { SearchPage };
