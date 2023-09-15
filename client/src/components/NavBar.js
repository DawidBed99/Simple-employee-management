import { NavLink } from "react-router-dom";
import "./Navbar.css";
export default function Navbar() {
  return (
    <div>
      <nav className="navbar">
        <NavLink className="navbar-brand" to="/">
          Lista pracowników
        </NavLink>
        <NavLink className="navbar-create" to="/create">
          Stwórz pracownika
        </NavLink>
      </nav>
    </div>
  );
}
