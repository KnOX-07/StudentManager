import React from "react";

const Sidebar = () => {
    const handleLogout = () => {
        localStorage.removeItem("isAuthenticated");
        window.location.href = "/";
    };

    return (
        <div className="sidebar">
            <ul>
                <li><a href="/students">Students Page</a></li>
                <li><button onClick={handleLogout}>Logout</button></li>
            </ul>
        </div>
    );
};

export default Sidebar;