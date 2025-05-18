import React, { useState } from "react";
import "../../styles/login.css";
import { IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function SignUp({ onSwitchToLogin }) {
    const [form, setForm] = useState({
        username: "", lastName: "", firstName: "", middleName: "", email: "", password: "", confirmPassword: ""
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError(""); setSuccess("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        setSuccess("Account created successfully! Please log in.");
        setForm({ username: "", lastName: "", firstName: "", middleName: "", email: "", password: "", confirmPassword: "" });
    };

    return (
        <div className="container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <input name="username" placeholder="Username" value={form.username} onChange={handleChange} required />
                <input name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} required />
                <input name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} required />
                <input name="middleName" placeholder="Middle Name" value={form.middleName} onChange={handleChange} />
                <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
                <div className="password-wrapper">
                    <input name="password" type={showPassword ? "text" : "password"} placeholder="Password" value={form.password} onChange={handleChange} required />
                    <IconButton onClick={() => setShowPassword(p => !p)} tabIndex={-1} className="eye-icon">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </div>
                <div className="password-wrapper">
                    <input name="confirmPassword" type={showConfirm ? "text" : "password"} placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange} required />
                    <IconButton onClick={() => setShowConfirm(p => !p)} tabIndex={-1} className="eye-icon">
                        {showConfirm ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </div>
                <button type="submit">Sign Up</button>
                {error && <p className="error">{error}</p>}
                {success && <p style={{ color: "green", textAlign: "center" }}>{success}</p>}
            </form>
            <p className="link" onClick={onSwitchToLogin} role="button" tabIndex={0} onKeyDown={(e) => e.key === "Enter" && onSwitchToLogin()}>
                Already have an account? Login
            </p>
        </div>
    );
}
