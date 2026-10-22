/* Navbar Page */
import { NavLink, useLocation } from "react-router";
import useAuth from "./Auth/AuthContext";
export default function Navbar() {
  const { token } = useAuth();
  const location = useLocation();
  const onMonthView = location.pathname === "/MonthView";

  return (
    <nav>
      {token ? (
        <>
          <NavLink to="/Home">Home</NavLink>
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
