import React, { useState } from "react";
import '../../styles/login.css';


export default function SignUp({ onSwitchToLogin }) {
    const [form, setForm] = useState({
        username: "",
        password: "",
        confirmPassword: "",
        role: "patient", // default role
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError("");
        setSuccess("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setSuccess("Account created successfully! Please log in.");
        setForm({ username: "", password: "", confirmPassword: "", role: "patient" });
    };

    return (
        <div className="container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <input
                    name="username"
                    placeholder="Username"
                    value={form.username}
                    onChange={handleChange}
                    required
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    required
                />
                <input
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    required
                />
                <select
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    required
                    style={{ padding: "10px", marginBottom: "16px", borderRadius: "4px" }}
                >
                    <option value="patient">Patient</option>
                    <option value="admin">Admin</option>
                </select>
                <button type="submit">Sign Up</button>
                {error && <p className="error">{error}</p>}
                {success && <p style={{ color: "green", textAlign: "center" }}>{success}</p>}
            </form>
            <p
                className="link"
                onClick={onSwitchToLogin}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && onSwitchToLogin()}
            >
                Already have an account? Login
            </p>
        </div>
    );
}
