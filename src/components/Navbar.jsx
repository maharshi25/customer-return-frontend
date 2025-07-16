// src/components/Navbar.jsx
import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  // This function will be used by NavLink to apply styles to the active link
  const getLinkClass = ({ isActive }) => {
    return isActive
      ? "bg-indigo-700 text-white px-3 py-2 rounded-md text-sm font-medium" // Style for the active link
      : "text-gray-300 hover:bg-indigo-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium"; // Style for inactive links
  };

  return (
    <nav className="bg-indigo-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            {/* You could put a logo here */}
            <p className="text-white font-bold text-xl">RiskModel UI</p>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavLink to="/" className={getLinkClass} end>
                Submission Form
              </NavLink>
              <NavLink to="/data" className={getLinkClass}>
                View Data
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
