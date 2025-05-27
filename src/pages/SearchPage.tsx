import { Link, useNavigate } from "react-router-dom";
import { SearchBar } from "../components/SearchBar";
import { useSearch } from "../context/useSearch";
import { Loading } from "../components/Loading";

function SearchPage() {
  const navigate = useNavigate();
  const { handleSearch, error, loading } = useSearch();
  const onSearchWithNavigate = (q: string) =>
    handleSearch(q, () => navigate("/"));

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
    </div>
  );
}

export { SearchPage };
