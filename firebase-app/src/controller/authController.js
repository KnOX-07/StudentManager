import { loginUser, logoutUser } from "../model/authModel";

export const handleLogin = async (email, password, setError) => {
    try {
        await loginUser(email, password);
        localStorage.setItem("isAuthenticated", "true");
        window.location.href = "/students";
    } catch (err) {
        setError("Invalid email or password! Please try again.");
    }
};

export const handleLogout = () => {
    logoutUser();
};