import React, { useState, useEffect } from "react";
import "./GetDataPage.css"; // We will create this CSS file next

const GetDataPage = () => {
  const [allCustomers, setAllCustomers] = useState([]);
  const [customerScore, setCustomerScore] = useState(null);
  const [searchId, setSearchId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch all customers when the component mounts
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const response = await fetch(
          "https://return-backend-8pj9.onrender.com/get_data"
        );
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setAllCustomers(data);
      } catch (err) {
        console.error("Failed to fetch all customers:", err);
      }
    };
    fetchAllData();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchId) return;

    setLoading(true);
    setError("");
    setCustomerScore(null);

    try {
      const response = await fetch(
        `https://return-backend-8pj9.onrender.com/get_data/${searchId}`
      );
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Customer not found");
      }
      const data = await response.json();
      setCustomerScore(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="get-data-container">
      <div className="search-section">
        <h2>Check Single Customer Score</h2>
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="Enter Customer ID"
            className="search-input"
          />
          <button type="submit" disabled={loading} className="search-button">
            {loading ? "Searching..." : "Search"}
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
        {customerScore && (
          <div className="score-result">
            <h3>Score for {customerScore.customer_id}</h3>
            <p>{customerScore.score?.toFixed(2) ?? "N/A"}</p>
          </div>
        )}
      </div>

      <div className="all-customers-section">
        <h2>All Customer Scores</h2>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Customer ID</th>
                <th>Risk Score</th>
              </tr>
            </thead>
            <tbody>
              {allCustomers.length > 0 ? (
                allCustomers.map((customer) => (
                  <tr key={customer.customer_id}>
                    <td>{customer.customer_id}</td>
                    <td>{customer.score?.toFixed(2) ?? "N/A"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2">No customer data available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GetDataPage;
