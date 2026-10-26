/* Week View Page */
import useAuth from "../Auth/AuthContext";
import "./Month_View.css";
import MonthGrid from "./Sections/MonthGrid";
export default function WeekView() {
  const { token, getUser } = useAuth();
  const eventCounts = {
    "2026-10-04": 5,
    "2026-10-07": 2,
    "2026-10-15": 4,
    "2026-10-26": 1,
  };
  return (
    <div className="PageMain">
      <p>MonthView</p>
      <div className="SideBox">
        <MonthGrid year={2026} month={9} eventCounts={eventCounts} />
      </div>
      <div className="MainBox">
        <h3>Calendar Week Box</h3>
        <div>
          <p>Monday</p>
        </div>
        <div>
          <p>Tuesday</p>
        </div>
        <div>
          <p>Wednesday</p>
        </div>
        <div>
          <p>Thursday</p>
        </div>
        <div>
          <p>Friday</p>
        </div>
        <div>
          <p>Saturday</p>
        </div>
        <div>
          <p>Sunday</p>
        </div>
        <div>
          <p>Monday</p>
        </div>
        <div>
          <p>Tuesday</p>
        </div>
        <div>
          <p>Wednesday</p>
        </div>
        <div>
          <p>Thursday</p>
        </div>
        <div>
          <p>Friday</p>
        </div>
        <div>
          <p>Saturday</p>
        </div>
        <div>
          <p>Sunday</p>
        </div>
      </div>
    </div>
  );
}
