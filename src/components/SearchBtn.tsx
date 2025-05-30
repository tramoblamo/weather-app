import { HiMagnifyingGlass } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../context/useSearch";
import type { GeoLocationDataWithKey } from "../types";
import { fmtGeolocationName } from "../utils";

const SearchBtn: React.FC<{ data: GeoLocationDataWithKey }> = ({ data }) => {
  const navigate = useNavigate();
  const { setLocation, setSearchQuery } = useSearch();

  return (
    <button
      className="hover:cursor-pointer"
      onClick={() => {
        setLocation(data);
        setSearchQuery(fmtGeolocationName(data));
        navigate("/");
      }}
    >
      <HiMagnifyingGlass className="w-4 h-4 md:w-5 md:h-5" />
    </button>
  );
};

export { SearchBtn };
