import React, { useState } from "react";
import '../../styles/login.css';
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function Login({ onLoginSuccess }) {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        });
        const data = await res.json();
        if (res.ok) {
            onLoginSuccess?.(data.role);
            navigate(`/${data.role}/dashboard`);
        } else {
            setError(data.message || "Invalid credentials");
        }
    };

    return (
        <div className="container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input name="email" placeholder="Email" onChange={handleChange} required />
                <div className="password-wrapper">
                    <input name="password" type={showPassword ? "text" : "password"} placeholder="Password" onChange={handleChange} required />
                    <IconButton onClick={() => setShowPassword(!showPassword)} tabIndex={-1} className="eye-icon">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </div>
                <button type="submit">Login</button>
                {error && <p className="error">{error}</p>}
            </form>
            <p className="link" role="button" tabIndex={0} onClick={() => navigate("/signup")} onKeyDown={e => e.key === "Enter" && navigate("/signup")}>
                Don't have an account? Sign Up
            </p>
        </div>
    );
}
