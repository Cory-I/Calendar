/* Week View Page */
import { useState } from "react";
import useAuth from "../Auth/AuthContext";
import "./Month_View.css";
import MonthGrid from "./Sections/MonthGrid";
import "../style.css";
import WeekList from "./Sections/WeekList";
export default function WeekView() {
  const { login, token, getUser } = useAuth();
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1),
  );
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthName = currentDate.toLocaleString("default", { month: "long" });
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
  return (
    <div className="PageMain">
      <p>MonthView</p>
      <div className="SideBox">
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
      <div className="MainBox">
        <WeekList weekStartDate={currentDate} events={events} />
      </div>
    </div>
  );
}
