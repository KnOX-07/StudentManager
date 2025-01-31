import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            localStorage.setItem("isAuthenticated", "true");
            window.location.href = "/students";
        } catch (err) {
            setError("Invalid credentials! Please try again.");
        }
    };

    return (
        <div className="login-page">
            <h2 align="center">Login</h2>
            <center>
                <form onSubmit={handleLogin}>
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required /><br></br>
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required /><br></br>
                    <button type="submit" className="login">Login</button>
                </form>
                {error && <p className="error">{error}</p>}
            </center>
        </div>
    );
};

export default LoginPage;