import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ReturnFormPage from "./pages/ReturnFormPage.jsx";
import GetDataPage from "./pages/GetDataPage.jsx";
import Navbar from "./components/Navbar.jsx";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="app-header">
          <h1>Customer Return Risk Dashboard</h1>
          <Navbar />
        </header>

        <main className="main-content">
          <Routes>
            <Route path="/return" element={<ReturnFormPage />} />
            <Route path="/get_data" element={<GetDataPage />} />
            <Route path="/" element={<ReturnFormPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
