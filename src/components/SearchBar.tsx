import { useSearch } from "../context/useSearch";

interface SearchBarProps {
  onSearch: (location: string) => void;
  isBtnVisible?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  isBtnVisible = false,
}) => {
  const { searchQuery, setSearchQuery } = useSearch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = searchQuery.trim();
    if (trimmed) {
      onSearch(trimmed);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        placeholder="Search country or city here..."
        value={searchQuery}
        onChange={({ target: { value } }) => setSearchQuery(value)}
        className="border px-3 py-2 rounded-md w-full placeholder:opacity-50 placeholder:font-normal font-semibold"
      />
      {isBtnVisible && (
        <button className="hover:cursor-pointer bg-blue-600 text-white rounded-lg p-2 px-3 shadow-sm">
          Search
        </button>
      )}
    </form>
  );
};

export { SearchBar };
