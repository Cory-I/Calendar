/* Month View Page */
import { useState } from "react";
import useAuth from "../Auth/AuthContext";
import "./Month_View.css";
import MonthGrid from "./Sections/MonthGrid";
import "../style.css";
import WeekList from "./Sections/WeekList";
export default function MonthView() {
  const { login, token, getUser } = useAuth();
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1),
  );
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthName = currentDate.toLocaleString("default", { month: "long" });
  const monday = new Date(today);

  monday.setDate(today.getDate() - ((today.getDay() + 6) % 7));

  const [weekStartDate, setWeekStartDate] = useState(monday);
  const weekEndDate = new Date(weekStartDate);

  weekEndDate.setDate(weekEndDate.getDate() + 6);

  const eventCounts = {
    "2026-10-04": 5,
    "2026-10-07": 2,
    "2026-10-15": 4,
    "2026-10-26": 1,
  };
  const events = [
    {
      id: 1,
      name: "Doctor Visit",
      date: "2026-10-19",
    },
    {
      id: 2,
      name: "Team Meeting",
      date: "2026-10-19",
    },
    {
      id: 3,
      name: "Project Review",
      date: "2026-10-20",
    },
  ];
  function previousMonth() {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    );
  }
  function nextMonth() {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
    );
  }
  function previousWeek() {
    const previous = new Date(weekStartDate);

    previous.setDate(previous.getDate() - 7);

    setWeekStartDate(previous);
  }

  function nextWeek() {
    const next = new Date(weekStartDate);

    next.setDate(next.getDate() + 7);

    setWeekStartDate(next);
  }
  return (
    <div className="PageMain">
      <p>MonthView</p>

      <div className="SideBox">
        <button className="week-button" onClick={previousWeek}>
          Previous Week
        </button>
        <p className="week-title">
          {weekStartDate.toLocaleDateString()}
          {" - "}
          {weekEndDate.toLocaleDateString()}
        </p>
        <WeekList weekStartDate={weekStartDate} events={events} />

        <button className="week-button" onClick={nextWeek}>
          Next Week
        </button>
      </div>

      <div className="MainBox">
        <button className="month-button" onClick={previousMonth}>
          Previous Month
        </button>

        <h2 className="month-title">
          {monthName} {year}
        </h2>

        <MonthGrid year={year} month={month} eventCounts={eventCounts} />

        <button className="month-button" onClick={nextMonth}>
          Next Month
        </button>
      </div>
    </div>
  );
}
