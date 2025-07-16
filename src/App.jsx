// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast"; // 1. Import Toaster
import ReturnFormPage from "./pages/ReturnFormPage";
import DataDisplayPage from "./pages/DataDisplayPage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      {/* 2. Add the Toaster component here. It can go anywhere, but top-level is best. */}
      <Toaster position="top-center" reverseOrder={false} />
      <div className="min-h-screen bg-gray-100 font-inter">
        <Navbar />
        <main className="container mx-auto p-4 sm:p-6 lg:p-8">
          <Routes>
            <Route path="/" element={<ReturnFormPage />} />
            <Route path="/data" element={<DataDisplayPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
