/* Navbar Page */
import { NavLink } from "react-router";

export default function Navbar() {
  return (
    <nav>
      <NavLink to="/home">Home</NavLink>
      <NavLink to="/Settings">Settings</NavLink>
      <NavLink to="/Month View">View</NavLink>
      <NavLink to="/Week View">View</NavLink>
    </nav>
  );
}
