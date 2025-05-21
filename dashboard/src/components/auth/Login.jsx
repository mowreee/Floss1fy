import React, { useState } from "react";
import "../../styles/login.css";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";

export default function Login({ onLoginSuccess }) {
    const [form, setForm] = useState({ email: "", password: "" });
    const [msg, setMsg] = useState({ error: "", success: "" });
    const [showPassword, setShowPassword] = useState(false);
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

            const profileRes = await fetch(`http://localhost:5000/api/profile?username=${data.username}`);
            const profileData = await profileRes.json();
            if (!profileRes.ok) throw new Error(profileData.message || "Profile fetch failed");

            localStorage.setItem("userProfile", JSON.stringify(profileData));

            if (onLoginSuccess) onLoginSuccess(profileData.role);

            setMsg({ error: "", success: "Login successful! Redirecting..." });

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

                <div style={{ position: "relative" }}>
                    <input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        style={{ paddingRight: "40px" }}
                    />
                    <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                            position: "absolute",
                            right: 5,
                            top: "50%",
                            transform: "translateY(-50%)"
                        }}
                        tabIndex={-1}
                    >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </div>

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
