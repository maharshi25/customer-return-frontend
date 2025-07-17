// src/components/Navbar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <span className="navbar-brand">Customer Risk Tool</span>
        <div className="nav-links">
          {/* Updated link to /get_data */}
          <NavLink
            to="/get_data"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            View & Search Data
          </NavLink>
          {/* Updated link to /return */}
          <NavLink
            to="/return"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Submit New Record
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
