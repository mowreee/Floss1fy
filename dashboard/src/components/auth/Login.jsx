import React, { useState } from "react";
import '../../styles/login.css';
import { useNavigate } from "react-router-dom";

export default function Login({ onLoginSuccess }) {
    const [form, setForm] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError("");
    };

    const users = [
        { username: "admin", password: "admin123", role: "admin" },
        { username: "patient1", password: "patient123", role: "patient" },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = users.find(
            (u) => u.username === form.username && u.password === form.password
        );
        if (user) {
            onLoginSuccess(user.role);
            navigate(`/${user.role}/dashboard`);
        } else {
            setError("Invalid username or password");
        }
    };

    const handleSwitchToSignUp = () => {
        navigate("/signup");
    };

    return (
        <div className="container">
            <h2>Login</h2>
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
                <button type="submit">Login</button>
                {error && <p className="error">{error}</p>}
            </form>
            <p
                className="link"
                onClick={handleSwitchToSignUp}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && handleSwitchToSignUp()}
            >
                Don't have an account? Sign Up
            </p>
        </div>
    );
}
