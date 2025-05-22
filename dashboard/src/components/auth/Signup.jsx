import React, { useState } from "react";
import "../../styles/login.css";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";

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
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setMsg({ error: "", success: "" });
    };

    const isValidPassword = (password) => {
        const hasUpper = /[A-Z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        return hasUpper && hasNumber && hasSpecial;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isValidPassword(form.password)) {
            return setMsg({
                error: "Password must contain at least 1 uppercase letter, 1 number, and 1 special character.",
                success: "",
            });
        }

        if (form.password !== form.confirmPassword) {
            return setMsg({ error: "Passwords do not match", success: "" });
        }

        try {
            const res = await fetch("http://localhost:5000/api/register", {
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

                <div style={{ position: "relative" }}>
                    <input
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm Password"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        required
                        style={{ paddingRight: "40px" }}
                    />
                    <IconButton
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        style={{
                            position: "absolute",
                            right: 5,
                            top: "50%",
                            transform: "translateY(-50%)"
                        }}
                        tabIndex={-1}
                    >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </div>

                <select name="role" value={form.role} onChange={handleChange} required>
                    <option value="patient">Patient</option>
                    <option value="admin">Admin</option>
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
