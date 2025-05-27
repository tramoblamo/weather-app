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
        <div className="text-sm md:text-base">{fmtTime(dt)}</div>
        <img
          src={constructIconUrl(entry.icon)}
          alt={entry.description}
          className="w-6 h-6 md:w-10 md:h-10"
        />

        <div className="text-xs md:text-sm text-gray-500">
          {fmtTempToCelsius(main.temp_min)} / {fmtTempToCelsius(main.temp_max)}
        </div>

        <div className="text-xs md:text-sm text-right flex-1">
          {entry.description}
        </div>
      </div>
    </li>
  );
};

export { ForecastListItem };
