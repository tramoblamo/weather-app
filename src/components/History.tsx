import type { GeoLocationDataWithKey } from "../types";
import { HistoryListItem } from "./HistoryListItem";

const History: React.FC<{
  data: { history: GeoLocationDataWithKey[] };
  onHistoryUpdate: (history: GeoLocationDataWithKey[]) => void;
}> = ({ data, onHistoryUpdate }) => {
  return (
    <section>
      <header className="py-4 font-semibold">Search History</header>
      <ul className="bg-white p-4 rounded-xl shadow-xl">
        {data.history.map((entry) => (
          <HistoryListItem
            key={entry.key}
            data={entry}
            onHistoryUpdate={onHistoryUpdate}
          />
        ))}
      </ul>
    </section>
  );
};

export { History };
