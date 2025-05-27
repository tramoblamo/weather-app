import { type WeatherData } from "../types";
import {
  constructIconUrl,
  fmtDate,
  fmtTempToCelsius,
  metersToKm,
} from "../utils";
import { WindIcon } from "./WindIcon";

const Weather: React.FC<{ data: WeatherData }> = ({ data }) => {
  return (
    <section className="bg-white p-4 rounded-xl shadow-xl">
      <div>
        {fmtDate(data.dt, {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </div>
      <div className="flex justify-center py-4">
        <div className="px-4">
          <img
            src={constructIconUrl(data.weather[0].icon, "@2x")}
            alt={data.weather[0].description}
          />
        </div>
        <div className="px-4 flex flex-col justify-center">
          <div className="text-4xl">{fmtTempToCelsius(data.main.temp)}</div>
          <div className="capitalize text-sm">
            {data.weather[0].description}
          </div>
        </div>
      </div>
      <div className="flex justify-around">
        <div className="text-center">
          <div className="text-gray-400 capitalize text-sm pb-1">humidity</div>
          <div>
            {data.main.humidity} <span className="text-xs">%</span>
          </div>
        </div>
        <div className="text-center">
          <div className="text-gray-400 capitalize text-sm pb-1">winds</div>
          <div className="flex gap-1 items-center">
            <WindIcon deg={data.wind.deg} />
            <span>
              {data.wind.speed} <span className="text-xs">m/s</span>
            </span>
          </div>
        </div>
        <div className="text-center">
          <div className="text-gray-400 capitalize text-sm pb-1">
            visibility
          </div>
          <div>
            {metersToKm(data.visibility)} <span className="text-xs">km</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Weather };
