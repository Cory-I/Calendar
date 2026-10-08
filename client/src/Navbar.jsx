/* Navbar Page */
import { NavLink, useLocation } from "react-router";

export default function Navbar() {
  const location = useLocation();
  const onMonthView = location.pathname === "/MonthView";
  /*   const onWeekView = location.pathname === "/WeekView"; */
  return (
    <nav>
      <NavLink to="/home">Home</NavLink>
      <NavLink to="/Settings">Settings</NavLink>
      {onMonthView ? (
        <NavLink to="/WeekView">View</NavLink>
      ) : (
        <NavLink to="/MonthView">View</NavLink>
      )}
    </nav>
  );
}
