import type { ForecastItemData } from "../types";
import { constructIconUrl, fmtTempToCelsius, fmtTime } from "../utils";

const ForecastListItem: React.FC<{ data: ForecastItemData }> = ({ data }) => {
  return (
    <li>
      <div className="flex items-center gap-4 py-2">
        <div className="text-sm">{fmtTime(data.dt)}</div>
        <img
          src={constructIconUrl(data.weather[0].icon)}
          alt=""
          className="w-6 h-6"
        />

        <div className="text-xs text-gray-500">
          {fmtTempToCelsius(data.main.temp_min)} /{" "}
          {fmtTempToCelsius(data.main.temp_max)}
        </div>

        <div className="text-xs text-right flex-1">
          {data.weather[0].description}
        </div>
      </div>
    </li>
  );
};

export { ForecastListItem };
