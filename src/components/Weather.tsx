import { useEffect, useState } from "react";
import { useData, useLocation } from "../hooks";
import { type WeatherData } from "../types";
import { fmtDate, fmtTempToCelsius, metersToKm } from "../utils";
import { Loading } from "./Loading";

function Weather() {
  const { coords, geolocationPositionError } = useLocation();
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const { data } = useData<WeatherData>(url);

  useEffect(() => {
    if (coords.lat !== null && coords.lon !== null) {
      const { lat, lon } = coords;
      setUrl(
        `${
          import.meta.env.VITE_WEATHER_API_BASE_URL
        }/weather?lat=${lat}&lon=${lon}`
      );
    }
  }, [coords]);

  useEffect(() => {
    if (geolocationPositionError) {
      setError(geolocationPositionError.message);
    }
  }, [geolocationPositionError]);

  if (error) return <div>{error}</div>;

  if (coords.lat === null || coords.lon === null) {
    return <Loading />;
  }

  if (!data) return <Loading />;

  return (
    <section className="bg-white p-4 rounded-xl">
      <div>{fmtDate(data.dt)}</div>
      <div className="flex justify-center py-4">
        <div className="px-4">
          <img
            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
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
          <div>
            {/* TODO: display arrow */} {data.wind.speed}{" "}
            <span className="text-xs">m/s</span>
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
}

export { Weather };
