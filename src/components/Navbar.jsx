import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="app-nav">
      <NavLink to="/return">Add New Customer Data</NavLink>
      <NavLink to="/get_data">Check Customer Scores</NavLink>
    </nav>
  );
};

export default Navbar;
