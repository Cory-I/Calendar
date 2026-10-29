import { useMemo, useState, useEffect } from "react";
import EventPopup from "./EventPopUp.jsx";
import axios from "axios";
import useAuth from "../../Auth/AuthContext.jsx";
export default function MonthGrid({ year, month }) {
  const { token, getUser } = useAuth();
  //popup
  const [selectedDate, setSelectedDate] = useState(null);
  const [showEventPopup, setShowEventPopup] = useState(false);
  const [types, setTypes] = useState([]);
  const [groups, setGroups] = useState([]);
  const [events, setEvents] = useState([]);
  //popup
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
      });
    }
    while (dateBox.length % 7 !== 0) {
      dateBox.push(null);
    }
    return dateBox;
  }, [year, month]);
  //popup
  const handleDayClick = (day) => {
    setSelectedDate(day);
    setShowEventPopup(true);
  };
  const createEventHandler = async (eventData) => {
    try {
      await axios.post("/api/events", eventData);

      await loadEvents();
    } catch (error) {
      console.error("Failed to create event", error);
    }
  };
  useEffect(() => {
    const loadData = async () => {
      try {
        const [typesResponse, groupsResponse] = await Promise.all([
          axios.get("/api/types"),
          axios.get("/api/groups"),
        ]);

        setTypes(typesResponse.data);
        setGroups(groupsResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    loadData();
  }, []);
  //popup
  const loadEvents = async () => {
    const { data } = await axios.get("/api/events");

    setEvents(data);
  };
  useEffect(() => {
    loadEvents();
  }, []);
  return (
    <div className="calendar">
      <div className="calendar-header">Sun</div>
      <div className="calendar-header">Mon</div>
      <div className="calendar-header">Tue</div>
      <div className="calendar-header">Wed</div>
      <div className="calendar-header">Thu</div>
      <div className="calendar-header">Fri</div>
      <div className="calendar-header">Sat</div>

      {showEventPopup && (
        <EventPopup
          date={selectedDate}
          types={types}
          groups={groups}
          onClose={() => setShowEventPopup(false)}
          onCreateEvent={createEventHandler}
        />
      )}
      {calendarDays.map((day, index) => {
        if (!day) {
          return <div key={`empty-${index}`} className="calendar-cell empty" />;
        }

        const dayEvents = events.filter((event) => {
          const eventDate = new Date(event.start_time)
            .toISOString()
            .split("T")[0];

          return eventDate === day.dateString;
        });

        return (
          <div key={day.dateString} className="calendar-cell">
            <div className="day-number" onClick={() => handleDayClick(day)}>
              {day.day}
            </div>

            <div className="event-list">
              {dayEvents.length === 0
                ? "No Events"
                : dayEvents.map((event) => (
                    <div key={event.id} className="calendar-event">
                      {event.name}
                    </div>
                  ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
