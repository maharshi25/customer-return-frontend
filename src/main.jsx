// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // Import our main App component
import "./index.css"; // Import our main CSS file (where Tailwind directives are)
import "@fontsource/inter"; // Import the Inter font (we installed this package)

// ReactDOM.createRoot is the entry point for rendering our React application
ReactDOM.createRoot(document.getElementById("root")).render(
  // React.StrictMode helps identify potential problems in an application
  <React.StrictMode>
    <App /> {/* Render our App component */}
  </React.StrictMode>
);
