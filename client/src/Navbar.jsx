/* Navbar Page */
import { NavLink, useLocation } from "react-router";

export default function Navbar({ token }) {
  const location = useLocation();
  const onMonthView = location.pathname === "/MonthView";

  return (
    <nav>
      {token ? (
        <>
          <NavLink to="/home">Home</NavLink>
          <NavLink to="/Settings">Settings</NavLink>

          {onMonthView ? (
            <NavLink to="/WeekView">View</NavLink>
          ) : (
            <NavLink to="/MonthView">View</NavLink>
          )}
        </>
      ) : (
        <>
          <NavLink to="/Login">Login</NavLink>
          <NavLink to="/Register">Register</NavLink>
        </>
      )}
    </nav>
  );
}
