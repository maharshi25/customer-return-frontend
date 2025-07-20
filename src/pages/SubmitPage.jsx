// src/pages/SubmitPage.jsx
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CustomerForm from "../components/CustomerForm.jsx";

const API_URL = "https://return-backend-8pj9.onrender.com";

function SubmitPage() {
  const navigate = useNavigate();

  const handleFormSubmit = async (formData) => {
    try {
      await axios.post(`${API_URL}/return`, formData);
      alert("Customer data submitted successfully!");
      // Update the redirect to go to /get_data
      navigate("/get_data");
    } catch (err) {
      alert("Failed to submit customer data.");
    }
  };

  return (
    <div className="form-container">
      <h2>
        <i className="fas fa-paper-plane"></i> Submit New Record
      </h2>
      <CustomerForm onSubmit={handleFormSubmit} />
    </div>
  );
}

export default SubmitPage;
