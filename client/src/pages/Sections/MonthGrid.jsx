import { useMemo } from "react";

export default function MonthGrid({ year, month, eventCounts = {} }) {
  const calendarDays = useMemo(() => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const startOffset = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

    const dateBox = [];

    // Empty boxes before day 1
    for (let i = 0; i < startOffset; i++) {
      dateBox.push(null);
    }

    // Actual days
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

      dateBox.push({
        day,
        dateString,
        count: eventCounts[dateString] || 0,
      });
    }
    while (dateBox.length % 7 !== 0) {
      dateBox.push(null);
    }
    return dateBox;
  }, [year, month, eventCounts]);

  return (
    <div className="calendar">
      <div className="calendar-header">Sun</div>
      <div className="calendar-header">Mon</div>
      <div className="calendar-header">Tue</div>
      <div className="calendar-header">Wed</div>
      <div className="calendar-header">Thu</div>
      <div className="calendar-header">Fri</div>
      <div className="calendar-header">Sat</div>

      {calendarDays.map((day, index) =>
        day ? (
          <div key={day.dateString} className="calendar-cell">
            <div className="day-number">{day.day}</div>

            <div className="event-count">
              {day.count === 0
                ? "No Events"
                : `${day.count} Event${day.count > 1 ? "s" : ""}`}
            </div>
          </div>
        ) : (
          <div key={`empty-${index}`} className="calendar-cell empty" />
        ),
      )}
    </div>
  );
}
