import { HiOutlineTrash } from "react-icons/hi2";
import { type GeoLocationDataWithKey } from "../types";
import { removeHistoryEntryByKey } from "../utils/locationHistory";

const DeleteBtn: React.FC<{
  data: GeoLocationDataWithKey;
  onHistoryUpdate: (newHistory: GeoLocationDataWithKey[]) => void;
}> = ({ data, onHistoryUpdate }) => {
  const handleDelete = () => onHistoryUpdate(removeHistoryEntryByKey(data.key));
  return (
    <button onClick={handleDelete} className="hover:cursor-pointer">
      <HiOutlineTrash />
    </button>
  );
};

export { DeleteBtn };
