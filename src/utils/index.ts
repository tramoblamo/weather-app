import type {
  ForecastItemData,
  GeoLocationData,
  GroupedForecast,
  OpenWeatherIconSize,
} from "../types";

function metersToKm(meters: number) {
  return meters / 1000;
}

function fmtDate(ts: number, options: Intl.DateTimeFormatOptions) {
  const date = new Date(ts * 1000);
  return date.toLocaleDateString("en-US", options);
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
  return `${
    import.meta.env.VITE_WEATHER_API_BASE_URL
  }/weather?lat=${lat}&lon=${lon}`;
}

function constructForecastUrl(lat: number, lon: number) {
  return `${
    import.meta.env.VITE_WEATHER_API_BASE_URL
  }/forecast?lat=${lat}&lon=${lon}`;
}

function constructGeoUrl(query: string) {
  return `${import.meta.env.VITE_WEATHER_API_BASE_URL}/geo?q=${query}`;
}

function constructIconUrl(iconStr: string, size?: OpenWeatherIconSize) {
  if (!size) return `https://openweathermap.org/img/wn/${iconStr}.png`;
  return `https://openweathermap.org/img/wn/${iconStr}${size}.png`;
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

function fmtGeolocationName(data: GeoLocationData) {
  return `${data.name}, ${data.country}`;
}

export {
  constructForecastUrl,
  constructGeoUrl, constructIconUrl,
  constructWeatherUrl,
  fmtDate, fmtGeolocationName, fmtTempToCelsius,
  fmtTime,
  getWindDegreeOffset,
  groupForecastsByDay,
  metersToKm
};

