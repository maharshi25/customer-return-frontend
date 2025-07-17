import React, { useState } from "react";

const initialFormState = {
  customer_id: "",
  total_orders: "",
  returns: "",
  return_ratio: "",
  product_category_risk_score: "",
  vague_reason_count: "",
  average_return_window: "",
  customer_rating_behavior_score: "",
  mismatch_flag_history: false,
  total_monetary_value_of_returns: "",
  average_order_value: "",
  return_frequency_per_month: "",
  time_since_last_return: "",
  customer_tenure_days: "",
  number_of_different_categories_returned: "",
};

function CustomerForm({ onSubmit }) {
  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "number" ? parseFloat(value) : value;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : val,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData(initialFormState);
  };

  const renderInput = (name, type, placeholder) => (
    <div>
      <label>{name.replace(/_/g, " ")}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={formData[name]}
        onChange={handleChange}
        required
      />
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="customer-form">
      {renderInput("customer_id", "text", "e.g., cust_9aXz21Klm7Tq8Uf4ve")}
      {renderInput("total_orders", "number", "e.g., 25")}
      {renderInput("returns", "number", "e.g., 5")}
      {renderInput("return_ratio", "number", "e.g., 0.2")}
      {renderInput("product_category_risk_score", "number", "e.g., 0.75")}
      {renderInput("vague_reason_count", "number", "e.g., 2")}
      {renderInput("average_return_window", "number", "e.g., 7")}
      {renderInput("customer_rating_behavior_score", "number", "e.g., 2.8")}
      {renderInput(
        "total_monetary_value_of_returns",
        "number",
        "e.g., 1520.45"
      )}
      {renderInput("average_order_value", "number", "e.g., 635.00")}
      {renderInput("return_frequency_per_month", "number", "e.g., 1.25")}
      {renderInput("time_since_last_return", "number", "e.g., 18")}
      {renderInput("customer_tenure_days", "number", "e.g., 420")}
      {renderInput(
        "number_of_different_categories_returned",
        "number",
        "e.g., 4"
      )}
      <div className="checkbox-container">
        <label>Mismatch Flag History</label>
        <input
          type="checkbox"
          name="mismatch_flag_history"
          checked={formData.mismatch_flag_history}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Submit and Analyze</button>
    </form>
  );
}
export default CustomerForm;
