import React, { useState } from "react";
import "../../styles/login.css";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function Login({ onLoginSuccess }) {
    const [form, setForm] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Simulate role detection
        const isAdmin = form.email === "admin@example.com";
        const role = isAdmin ? "admin" : "patient";

        // Call parent to set user type
        onLoginSuccess(role);
    };

    return (
        <div className="container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    value={form.email}
                    required
                />
                <div className="password-wrapper">
                    <input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        onChange={handleChange}
                        value={form.password}
                        required
                    />
                    <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        tabIndex={-1}
                        className="eye-icon"
                    >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </div>
                <button type="submit">Login</button>
            </form>
            <p
                className="link"
                role="button"
                tabIndex={0}
                onClick={() => navigate("/signup")}
                onKeyDown={(e) => e.key === "Enter" && navigate("/signup")}
            >
                Don't have an account? Sign Up
            </p>
        </div>
    );
}
