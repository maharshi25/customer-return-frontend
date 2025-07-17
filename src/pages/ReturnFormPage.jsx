import React, { useState } from "react";
import "./ReturnFormPage.css";

const ReturnFormPage = () => {
  const initialFormData = {
    customer_id: "",
    total_orders: "",
    returns: "",
    return_ratio: "",
    product_category_risk_score: "",
    vague_reason_count: "",
    average_return_window: "",
    customer_rating_behavior_score: "",
    mismatch_flag_history: "",
    total_monetary_value_of_returns: "",
    average_order_value: "",
    return_frequency_per_month: "",
    time_since_last_return: "",
    customer_tenure_days: "",
    number_of_different_categories_returned: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Submitting...");
    setIsError(false);

    try {
      const response = await fetch(
        "https://return-backend-8pj9.onrender.com/return",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (response.ok) {
        setMessage(
          `✅ Success! The calculated risk score is: ${result.risk_score}`
        );
        setFormData(initialFormData);
      } else {
        setIsError(true);
        setMessage(`❌ Error: ${result.message || "Something went wrong."}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsError(true);
      setMessage("❌ Error: Could not connect to the server.");
    }
  };

  return (
    <div className="form-container">
      <h2>Calculate New Risk Score</h2>
      <p>
        Fill out the form below to submit new customer data and calculate a risk
        score.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          {Object.keys(formData).map((key) => (
            <div className="form-group" key={key}>
              <label htmlFor={key}>{key.replace(/_/g, " ")}</label>
              <input
                type="text"
                id={key}
                name={key}
                value={formData[key]}
                onChange={handleChange}
                placeholder={`e.g., 10, 0.5, cust_123...`}
                required
              />
            </div>
          ))}
        </div>
        <button type="submit" className="submit-btn">
          Calculate Risk Score
        </button>
      </form>
      {message && (
        <p className={`message ${isError ? "error" : "success"}`}>{message}</p>
      )}
    </div>
  );
};

export default ReturnFormPage;
