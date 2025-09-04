import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./view/LoginPage";
import StudentsPage from "./view/StudentsPage";
import Sidebar from "./view/Sidebar";
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
        {!isAuthenticated && (
          <div className="page-footer">
            Made by{" "}
            <a
              href="https://github.com/KnOX-07/StudentManager"
              target="_blank"
              rel="noopener noreferrer"
            >
              _ruP4L
            </a>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;