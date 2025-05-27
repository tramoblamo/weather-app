import type {
  ForecastItemData,
  GeoLocationData,
  GroupedForecast,
  OpenWeatherIconSize,
} from "../types";

const BASE_URL = import.meta.env.VITE_WEATHER_API_BASE_URL;
const OPEN_WEATHER_ICON_URL = "https://openweathermap.org/img/wn";

function convertMetersToKm(meters: number) {
  return meters / 1000;
}

function fmtTempToCelsius(temp: number) {
  return `${Math.trunc(temp)}°C`;
}

function fmtTime(
  ts: number,
  options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }
) {
  return new Date(ts * 1000).toLocaleTimeString("en-US", options);
}

function groupForecastsByDay(entries: ForecastItemData[]): GroupedForecast {
  return entries.reduce((acc, entry) => {
    const date = entry.dt_txt.slice(0, 10);
    if (!acc[date]) acc[date] = [];
    acc[date].push(entry);
    return acc;
  }, {} as GroupedForecast);
}

function constructWeatherUrl(lat: number, lon: number) {
  return `${BASE_URL}/weather?lat=${lat}&lon=${lon}`;
}

function constructForecastUrl(lat: number, lon: number) {
  return `${BASE_URL}/forecast?lat=${lat}&lon=${lon}`;
}

function constructGeoUrl(query: string) {
  return `${BASE_URL}/geo?q=${query}`;
}

function constructIconUrl(iconStr: string, size?: OpenWeatherIconSize) {
  if (!size) return `${OPEN_WEATHER_ICON_URL}/${iconStr}.png`;
  return `${OPEN_WEATHER_ICON_URL}/${iconStr}${size}.png`;
}

/**
 * `deg` indicates where the wind is _coming from_ (0deg = north)
 * however, we need the arrow to point where the wind it _going to_
 * thus, an offset of 180 is required
 */
function getWindDegreeOffset(deg: number): number {
  const offset = 180;
  return deg + offset;
}

function fmtGeolocationName({ name, country }: GeoLocationData) {
  return `${name}, ${country}`;
}

function isToday(ts: number) {
  const today = new Date();
  const date = new Date(ts * 1000);
  return (
    today.getFullYear() === date.getFullYear() &&
    today.getMonth() === date.getMonth() &&
    today.getDate() === date.getDate()
  );
}

export {
  constructForecastUrl,
  constructGeoUrl,
  constructIconUrl,
  constructWeatherUrl,
  fmtGeolocationName,
  fmtTempToCelsius,
  fmtTime,
  getWindDegreeOffset,
  groupForecastsByDay,
  isToday,
  convertMetersToKm,
};
