import React, { useState } from "react";
import "../../styles/login.css";
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const [form, setForm] = useState({
        username: "",
        lastname: "",
        firstname: "",
        middlename: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "patient",
    });
    const [msg, setMsg] = useState({ error: "", success: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setMsg({ error: "", success: "" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.password !== form.confirmPassword)
            return setMsg({ error: "Passwords do not match", success: "" });

        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (res.ok) {
                setMsg({ success: "Account created! Redirecting to login...", error: "" });
                setTimeout(() => navigate("/login"), 1500);
            } else {
                setMsg({ error: data.message || "Signup failed", success: "" });
            }
        } catch {
            setMsg({ error: "Server error", success: "" });
        }
    };

    return (
        <div className="container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <input name="username" placeholder="Username" value={form.username} onChange={handleChange} required />
                <input name="lastname" placeholder="Last Name" value={form.lastname} onChange={handleChange} required />
                <input name="firstname" placeholder="First Name" value={form.firstname} onChange={handleChange} required />
                <input name="middlename" placeholder="Middle Name" value={form.middlename} onChange={handleChange} />
                <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
                <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
                <input name="confirmPassword" type="password" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange} required />
                <select name="role" value={form.role} onChange={handleChange}>
                    <option value="patient">Patient</option>
                    <option value="doctor">Doctor</option>
                </select>
                <button type="submit">Sign Up</button>
                {msg.error && <div className="error">{msg.error}</div>}
                {msg.success && <div className="success">{msg.success}</div>}
            </form>
            <p className="link" role="button" tabIndex={0} onClick={() => navigate("/login")}>
                Already have an account? Login
            </p>
        </div>
    );
}