import { HiOutlineTrash } from "react-icons/hi2";
import { type GeoLocationDataWithKey } from "../types";
import { removeHistoryEntryByKey } from "../utils/locationHistory";

const DeleteBtn: React.FC<{
  data: GeoLocationDataWithKey;
  onHistoryUpdate: (newHistory: GeoLocationDataWithKey[]) => void;
}> = ({ data: { key }, onHistoryUpdate }) => {
  const handleDelete = () => onHistoryUpdate(removeHistoryEntryByKey(key));
  return (
    <button onClick={handleDelete} className="hover:cursor-pointer">
      <HiOutlineTrash className="w-4 h-4 md:w-5 md:h-5" />
    </button>
  );
};

export { DeleteBtn };
