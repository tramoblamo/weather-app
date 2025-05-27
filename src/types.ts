interface WeatherDetail {
  description: string;
  icon: string;
}

interface MainDetail {
  temp: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
}

interface WeatherData {
  dt: number;
  main: MainDetail;
  weather: WeatherDetail[];
  wind: {
    speed: number;
    deg: number;
  };
  visibility: number;
}

interface ForecastItemData {
  dt: number;
  main: MainDetail;
  weather: WeatherDetail[];
  dt_txt: string;
}

interface ForecastData {
  list: ForecastItemData[];
}

type GroupedForecast = Record<string, ForecastItemData[]>;

type OpenWeatherIconSize = "@2x" | "@3x";

interface GeoLocationData {
  lat: number;
  lon: number;
  name: string;
  country: string;
}

interface GeoLocationDataWithKey extends GeoLocationData {
  key: string;
}

export type {
  ForecastData,
  ForecastItemData,
  GeoLocationData,
  GeoLocationDataWithKey,
  GroupedForecast,
  OpenWeatherIconSize,
  WeatherData,
};
