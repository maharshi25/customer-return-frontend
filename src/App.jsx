// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom"; // Import Navigate
import Navbar from "./components/Navbar";
import GetDataPage from "./pages/GetDataPage";
import SubmitPage from "./pages/SubmitPage";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <main className="main-content">
        <Routes>
          {/* Redirect base URL to /get_data */}
          <Route path="/" element={<Navigate replace to="/get_data" />} />

          {/* Define the page routes */}
          <Route path="/get_data" element={<GetDataPage />} />
          <Route path="/return" element={<SubmitPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
