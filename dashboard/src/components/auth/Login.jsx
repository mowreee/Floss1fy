import React, { useState } from "react";
import "../../styles/login.css";
import { useNavigate } from "react-router-dom";

export default function Login({ onLoginSuccess }) {
    const [form, setForm] = useState({ email: "", password: "" });
    const [msg, setMsg] = useState({ error: "", success: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setMsg({ error: "", success: "" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMsg({ error: "", success: "" });

        try {
            const res = await fetch("http://localhost:5000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Login failed");

            // Fetch user profile after login using username from login response
            const profileRes = await fetch(`http://localhost:5000/api/profile?username=${data.username}`);
            const profileData = await profileRes.json();
            if (!profileRes.ok) throw new Error(profileData.message || "Profile fetch failed");

            // Save profile to localStorage with correct keys
            localStorage.setItem("userProfile", JSON.stringify(profileData));

            // Set userType in App.jsx (if you use this for layout switching)
            if (onLoginSuccess) onLoginSuccess(profileData.role);

            setMsg({ error: "", success: "Login successful! Redirecting..." });

            // Redirect based on role
            setTimeout(() => {
                if (profileData.role === "admin") {
                    navigate("/admin/dashboard");
                } else {
                    navigate("/patient/dashboard");
                }
            }, 1000);
        } catch (err) {
            setMsg({ error: err.message, success: "" });
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
                <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
                <button type="submit">Login</button>
                {msg.error && <div className="error">{msg.error}</div>}
                {msg.success && <div className="success">{msg.success}</div>}
            </form>
            <p className="link" role="button" tabIndex={0} onClick={() => navigate("/signup")}>
                Don't have an account? Sign Up
            </p>
        </div>
    );
}