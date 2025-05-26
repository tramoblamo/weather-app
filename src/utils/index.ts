function metersToKm(meters: number) {
  return meters / 1000;
}

function fmtDate(
  ts: number,
  options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    year: "numeric",
  }
) {
  const date = new Date(ts * 1000);
  return date.toLocaleDateString("en-US", options);
}

function fmtTempToCelsius(temp: number) {
  return `${Math.trunc(temp)}°C`;
}

export { fmtDate, fmtTempToCelsius, metersToKm };
