/* Week View Page */
import { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../Auth/AuthContext";
import "./Month_View.css";
import MonthGrid from "./Sections/MonthGrid";
import "../style.css";
import WeekList from "./Sections/WeekList";
export default function WeekView() {
  const { login, token, getUser } = useAuth();
  const [events, setEvents] = useState([]);
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
  const loadEvents = async () => {
    try {
      const { data } = await axios.get("/api/events");

      setEvents(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    loadEvents();
  }, []);
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

        <MonthGrid year={year} month={month} />

        <button className="month-button" onClick={nextMonth}>
          Next Month
        </button>
      </div>
      <div className="MainBox">
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
    </div>
  );
}
