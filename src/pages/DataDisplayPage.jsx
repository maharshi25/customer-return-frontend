// src/pages/DataDisplayPage.jsx
import React, { useState, useEffect } from "react";
import { getReturnData } from "../utils/api";

function DataDisplayPage() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getReturnData();
        // It's good practice to ensure the API returns an array
        setData(Array.isArray(result) ? result : []);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Show a loading message while fetching
  if (isLoading) {
    return (
      <div className="text-center p-8">
        <p className="text-lg text-gray-600">Loading data, please wait...</p>
      </div>
    );
  }

  // Show an error message if the fetch failed
  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md text-center max-w-5xl mx-auto my-8">
        <strong className="font-bold">Error:</strong>
        <span className="block sm:inline"> Could not fetch data. {error}</span>
      </div>
    );
  }

  // THIS IS THE FIX: Prepare the table content in a variable
  let tableContent;
  if (data.length > 0) {
    tableContent = data.map(({ customer_id, score }) => (
      <tr key={customer_id || Math.random()}>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          {customer_id || "N/A"}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {typeof score === "number" ? score.toFixed(2) : "N/A"}
        </td>
      </tr>
    ));
  } else {
    tableContent = (
      <tr>
        <td colSpan="2" className="px-6 py-4 text-center text-sm text-gray-500">
          No data available.
        </td>
      </tr>
    );
  }

  // Now, render the main component
  return (
    <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md max-w-5xl mx-auto my-8">
      <h1 className="text-3xl font-semibold text-gray-900 mb-6 text-center">
        Customer Return Risk Scores
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Customer ID
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Risk Score
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {/* We simply render the prepared variable here */}
            {tableContent}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataDisplayPage;
