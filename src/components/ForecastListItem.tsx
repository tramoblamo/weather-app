import type { ForecastItemData } from "../types";
import { constructIconUrl, fmtTempToCelsius, fmtTime } from "../utils";

const ForecastListItem: React.FC<{ data: ForecastItemData }> = ({
  data: {
    dt,
    weather: [entry],
    main,
  },
}) => {
  return (
    <li>
      <div className="flex items-center gap-4 py-2">
        <div className="text-sm">{fmtTime(dt)}</div>
        <img src={constructIconUrl(entry.icon)} alt="" className="w-6 h-6" />

        <div className="text-xs text-gray-500">
          {fmtTempToCelsius(main.temp_min)} / {fmtTempToCelsius(main.temp_max)}
        </div>

        <div className="text-xs text-right flex-1">{entry.description}</div>
      </div>
    </li>
  );
};

export { ForecastListItem };
