import { useState } from "react";

interface SearchBarProps {
  onSearch: (location: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (trimmed) {
      onSearch(trimmed);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 my-4">
      <input
        type="text"
        placeholder="Enter location..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="border px-3 py-2 rounded-md w-full font-bold"
      />
    </form>
  );
};

export { SearchBar };
