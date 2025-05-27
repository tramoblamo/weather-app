import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Forecasts } from "../components/Forecasts";
import { Loading } from "../components/Loading";
import { SearchBar } from "../components/SearchBar";
import { Weather } from "../components/Weather";
import { useSearch } from "../context/useSearch";
import { useData } from "../hooks";
import { type ForecastData, type WeatherData } from "../types";
import { constructForecastUrl, constructWeatherUrl } from "../utils";

function HomePage() {
  const {
    location,
    loading: isSearchLoading,
    error,
    setError,
    handleSearch,
  } = useSearch();

  const weatherUrl = location
    ? constructWeatherUrl(location.lat, location.lon)
    : "";
  const forecastUrl = location
    ? constructForecastUrl(location.lat, location.lon)
    : "";

  const { data: weatherData, isLoading: isWeatherLoading } =
    useData<WeatherData>(weatherUrl);

  const { data: forecastData, isLoading: isForecastLoading } =
    useData<ForecastData>(forecastUrl);

  const isLoading = isSearchLoading || isWeatherLoading || isForecastLoading;

  useEffect(() => {
    setError("");
  }, [setError]);

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <div className="text-right pb-4">
        <Link className="text-blue-500 text-sm underline" to="/search">
          Search
        </Link>
      </div>
      {isLoading && <Loading />}
      {error && <p className="text-sm text-red-500">{error}</p>}
      {weatherData && <Weather data={weatherData} />}
      {forecastData && <Forecasts data={forecastData} />}
    </div>
  );
}

export { HomePage };
