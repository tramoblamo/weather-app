import { Fragment } from "react";
import { type ForecastData } from "../types";
import { groupForecastsByDay, isToday } from "../utils";
import { ForecastListItem } from "./ForecastListItem";

const Forecasts: React.FC<{ data: ForecastData }> = ({ data: { list } }) => {
  return (
    <section>
      <header className="py-4">5-day Forecast (3 Hours)</header>
      <ul className="bg-white p-4 rounded-xl shadow-xl">
        {Object.entries(groupForecastsByDay(list))
          .slice(0, 5)
          .map(([date, entries]) => {
            const [{ dt }] = entries;
            const dateDisplay = isToday(dt)
              ? "Today"
              : new Intl.DateTimeFormat("en-GB", {
                  day: "numeric",
                  month: "long",
                }).format(new Date(dt * 1000));
            return (
              <Fragment key={date}>
                <div className="py-3 text-gray-500 text-sm">{dateDisplay}</div>
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
