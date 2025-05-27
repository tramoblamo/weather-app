import type { GeoLocationDataWithKey } from "../types";
import { fmtGeolocationName } from "../utils";
import { DeleteBtn } from "./DeleteBtn";
import { SearchBtn } from "./SearchBtn";

const HistoryListItem: React.FC<{
  data: GeoLocationDataWithKey;
  onHistoryUpdate: (hist: GeoLocationDataWithKey[]) => void;
}> = ({ data, onHistoryUpdate }) => {
  return (
    <li>
      <div className="flex justify-between gap-4 py-2">
        <div>{fmtGeolocationName(data)}</div>
        <div className="flex gap-2">
          <SearchBtn data={data} />
          <DeleteBtn data={data} onHistoryUpdate={onHistoryUpdate} />
        </div>
      </div>
    </li>
  );
};

export { HistoryListItem };
