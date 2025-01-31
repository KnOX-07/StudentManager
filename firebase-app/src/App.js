import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import StudentsPage from "./pages/StudentsPage";
import Sidebar from "./components/Sidebar";
import "./styles.css";
import "./App.css";

function App() {
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  return (
    <Router>
      <div className="app">
        {isAuthenticated && <Sidebar />}
        <Routes>
          <Route path="/" element={isAuthenticated ? <Navigate to="/students" /> : <LoginPage />} />
          <Route path="/students" element={isAuthenticated ? <StudentsPage /> : <Navigate to="/" />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;