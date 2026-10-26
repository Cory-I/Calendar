import { useMemo } from "react";
export default function WeekList({ weekStartDate, events = [] }) {
  const weekDays = useMemo(() => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const current = new Date(weekStartDate);
      current.setDate(current.getDate() + i);
      const dateString = current.toISOString().split("T")[0];
      const dayEvents = events.filter((event) => event.date === dateString);
      days.push({
        date: current,
        events: dayEvents,
      });
    }
    return days;
  }, [weekStartDate, events]);
  return (
    <div className="week-list">
      {weekDays.map((day) => (
        <div key={day.date.toISOString()} className="week-day">
          <h3>
            {day.date.toLocaleDateString("en-US", {
              weekday: "long",
              month: "short",
              day: "numeric",
            })}
          </h3>

          {day.events.length === 0 ? (
            <p>No Events</p>
          ) : (
            day.events.map((event) => (
              <div key={event.id} className="week-event">
                {event.name}
              </div>
            ))
          )}
        </div>
      ))}
    </div>
  );
}
