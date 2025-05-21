import React, { useState } from "react";
import "../../styles/login.css";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function Login({ onLoginSuccess }) {
    const [form, setForm] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setMsg("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:5000/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Login failed");
            // Save user info if needed
            // localStorage.setItem("user", JSON.stringify(data));
            onLoginSuccess(data.role);
        } catch (err) {
            setMsg(err.message);
        }
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
                {msg && <p className="error">{msg}</p>}
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