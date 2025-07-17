import React, { useState, useEffect } from "react";
import "./CustomerData.css";

const CustomerData = () => {
  const [customerData, setCustomerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://return-backend-8pj9.onrender.com/get_data"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCustomerData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load customer data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="data-container">
        <p>Loading customer data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="data-container">
        <p className="error-message">{error}</p>
      </div>
    );
  }

  return (
    <div className="data-container">
      <h2>Existing Customer Scores</h2>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Customer ID</th>
              <th>Risk Score</th>
            </tr>
          </thead>
          <tbody>
            {customerData.length > 0 ? (
              customerData.map((customer) => (
                <tr key={customer.customer_id}>
                  <td>{customer.customer_id}</td>
                  {/* Formats score to 2 decimal places */}
                  <td>{customer.score?.toFixed(2) ?? "N/A"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">No customer data available at the moment.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerData;
