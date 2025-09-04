import React from "react";
import { handleLogout } from "../controller/authController";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/logo192.png";

const Sidebar = () => {

    return (
        <div className="sidebar">
            <div className="header">
                <a href="/students" className="title">
                    <img src={logo} alt="App Logo" className="navbar-logo" />
                    Student Management System
                </a>
                <button onClick={handleLogout} className="logout-btn">
                    <FontAwesomeIcon icon={faPowerOff} style={{ color: "white", marginRight: "6px" }} />
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Sidebar;