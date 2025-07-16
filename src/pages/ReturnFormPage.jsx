// src/pages/ReturnFormPage.jsx
import React, { useState } from "react";
import { submitReturnForm } from "../utils/api";
import toast from "react-hot-toast"; // 1. Import toast

// Keep the initial state object
const initialFormState = {
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

function ReturnFormPage() {
  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // 2. We no longer need the 'responseMessage' state, so it has been removed.

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const loadingToastId = toast.loading("Submitting your data..."); // 3. Show a loading toast

    const numericFields = [
      "total_orders",
      "returns",
      "return_ratio",
      "product_category_risk_score",
      "vague_reason_count",
      "average_return_window",
      "customer_rating_behavior_score",
      "mismatch_flag_history",
      "total_monetary_value_of_returns",
      "average_order_value",
      "return_frequency_per_month",
      "time_since_last_return",
      "customer_tenure_days",
      "number_of_different_categories_returned",
    ];

    const processedData = { ...formData };
    numericFields.forEach((field) => {
      if (processedData[field] !== "") {
        processedData[field] = Number(processedData[field]);
      }
    });

    try {
      await submitReturnForm(processedData);
      toast.success("Form submitted successfully!", { id: loadingToastId }); // 4. Show success
      setFormData(initialFormState);
    } catch (error) {
      toast.error(`Submission failed: ${error.message}`, {
        id: loadingToastId,
      }); // 5. Show error
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto my-8">
      <h1 className="text-3xl font-semibold text-gray-900 mb-2 text-center">
        Customer Return Risk Prediction
      </h1>
      <p className="text-gray-600 text-center mb-8">
        Enter the details below to get a risk prediction score.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.keys(initialFormState).map((key) => (
            <div key={key}>
              <label
                htmlFor={key}
                className="block text-sm font-medium text-gray-700 capitalize"
              >
                {key.replace(/_/g, " ")}
              </label>
              <input
                type={key === "customer_id" ? "text" : "number"}
                name={key}
                id={key}
                value={formData[key]}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex justify-center py-2 px-8 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>

      {/* 6. The old message div has been removed from here. */}
    </div>
  );
}

export default ReturnFormPage;
