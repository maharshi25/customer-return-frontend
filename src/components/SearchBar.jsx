import React from "react";

function SearchBar({ onSearch }) {
  const handleChange = (event) => {
    onSearch(event.target.value);
  };

  return (
    <input
      type="text"
      className="search-input"
      placeholder="🔍 Search by Customer ID..."
      onChange={handleChange}
    />
  );
}

export default SearchBar;
