import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomerList from "../components/CustomerList.jsx";
import SearchBar from "../components/SearchBar.jsx";

const API_URL = "https://return-backend-8pj9.onrender.com";

function GetDataPage() {
  const [allCustomers, setAllCustomers] = useState([]);
  const [displayedCustomers, setDisplayedCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllCustomerData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/get_data`);
        setAllCustomers(response.data);
        setDisplayedCustomers(response.data);
        setError(null);
      } catch (err) {
        setError("Error fetching data. Please refresh in a moment.");
      } finally {
        setLoading(false);
      }
    };
    fetchAllCustomerData();
  }, []);

  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      setDisplayedCustomers(allCustomers);
    } else {
      const filtered = allCustomers.filter((customer) =>
        customer.customer_id.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setDisplayedCustomers(filtered);
    }
  };

  return (
    <div className="data-container">
      <h2>
        <i className="fas fa-users"></i> Customer Risk Scores
      </h2>
      <SearchBar onSearch={handleSearch} />
      {loading && <p>Loading customers...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && <CustomerList customers={displayedCustomers} />}
    </div>
  );
}

export default GetDataPage;
