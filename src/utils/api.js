// src/utils/api.js

const BASE_URL = "https://return-backend-8pj9.onrender.com";

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
      const errorData = await response.json();
      errorInfo =
        errorData.detail || errorData.error || JSON.stringify(errorData);
    } catch (e) {
      // If the response body isn't JSON, use the status text
      errorInfo = `HTTP error! status: ${response.status} - ${response.statusText}`;
    }
    throw new Error(errorInfo);
  }

  return await response.json();
};

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
