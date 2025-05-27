import { Fragment } from "react";
import { type ForecastData } from "../types";
import { fmtDate, groupForecastsByDay } from "../utils";
import { ForecastListItem } from "./ForecastListItem";

const Forecasts: React.FC<{ data: ForecastData }> = ({ data }) => {
  return (
    <section>
      <header className="py-4">5-day Forecast (3 Hours)</header>
      <ul className="bg-white p-4 rounded-xl shadow-xl">
        {Object.entries(groupForecastsByDay(data.list))
          .slice(0, 5)
          .map(([date, entries]) => {
            return (
              <Fragment key={date}>
                <div className="py-3 text-gray-500 text-sm">
                  {fmtDate(entries[0].dt, { day: "numeric", month: "long" })
                    .split(" ")
                    .reverse()
                    .join(" ")}
                </div>
                {entries.map((entry) => (
                  <ForecastListItem key={entry.dt} data={entry} />
                ))}
              </Fragment>
            );
          })}
      </ul>
    </section>
  );
};

export { Forecasts };
