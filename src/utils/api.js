// src/utils/api.js

const BASE_URL = "https://return-backend-8pj9.onrender.com";

/**
 * A reusable function to handle fetch requests and responses.
 */
const fetchApi = async (endpoint, options = {}) => {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  // If the response is NOT okay, handle it as an error
  if (!response.ok) {
    let errorInfo = "An unknown error occurred.";
    try {
      // Try to get detailed error message from the response body
      const errorData = await response.json();
      // Use the 'detail' or 'error' key from the response, or stringify the whole thing
      errorInfo =
        errorData.detail || errorData.error || JSON.stringify(errorData);
    } catch (e) {
      // If the response body isn't JSON, use the status text
      errorInfo = `HTTP error! status: ${response.status} - ${response.statusText}`;
    }
    // Throw an error with the detailed message
    throw new Error(errorInfo);
  }

  // If the response is okay, return the JSON data
  return await response.json();
};

/**
 * Fetches the customer return data from the backend.
 */
export const getReturnData = () => {
  return fetchApi("/get_data");
};

/**
 * Posts the customer return form data to the backend.
 * @param {object} formData - The data from the return form.
 */
export const submitReturnForm = (formData) => {
  return fetchApi("/return", {
    method: "POST",
    body: JSON.stringify(formData),
  });
};
