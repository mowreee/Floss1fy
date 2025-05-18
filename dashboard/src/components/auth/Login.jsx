import React, { useState } from "react";
import '../../styles/login.css';
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const users = [
    { username: "admin", password: "admin123", role: "admin" },
    { username: "patient1", password: "patient123", role: "patient" },
];

export default function Login({ onLoginSuccess }) {
    const [form, setForm] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = e => {
        setForm(f => ({ ...f, [e.target.name]: e.target.value }));
        setError("");
    };

    const handleSubmit = e => {
        e.preventDefault();
        const user = users.find(u => u.username === form.username && u.password === form.password);
        if (user) {
            onLoginSuccess(user.role);
            navigate(`/${user.role}/dashboard`);
        } else setError("Invalid username or password");
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

                <div className="password-wrapper">
                    <input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />
                    <IconButton
                        onClick={() => setShowPassword((prev) => !prev)}
                        tabIndex={-1}
                        className="eye-icon"
                    >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </div>

                <button type="submit">Login</button>
                {error && <p className="error">{error}</p>}
            </form>
            <p
                className="link"
                role="button"
                tabIndex={0}
                onClick={() => navigate("/signup")}
                onKeyDown={e => e.key === "Enter" && navigate("/signup")}
            >
                Don't have an account? Sign Up
            </p>
        </div>
    );
}
