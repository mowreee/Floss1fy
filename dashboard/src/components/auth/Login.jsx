import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    TextField,
    Button,
    IconButton,
    InputAdornment,
    Typography,
    Box,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

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
                navigate(profileData.role === "admin" ? "/admin/dashboard" : "/patient/dashboard");
            }, 1000);
        } catch (err) {
            setMsg({ error: err.message, success: "" });
        }
    };

    return (
        <Box className="container" component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: "auto", mt: 8 }}>
            <Typography variant="h4" gutterBottom>Login</Typography>

            <TextField
                fullWidth
                label="Email"
                name="email"
                value={form.email}
                onChange={handleChange}
                margin="normal"
                required
            />

            <TextField
                fullWidth
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                margin="normal"
                required
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                onClick={() => setShowPassword(!showPassword)}
                                edge="end"
                                aria-label="toggle password visibility"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />

            {msg.error && <Typography color="error">{msg.error}</Typography>}
            {msg.success && <Typography color="primary">{msg.success}</Typography>}

            <Button fullWidth type="submit" variant="contained" sx={{ mt: 2 }}>
                Login
            </Button>

            <Typography
                className="link"
                role="button"
                tabIndex={0}
                onClick={() => navigate("/signup")}
                sx={{ mt: 2, cursor: "pointer", textAlign: "center", color: "blue" }}
            >
                Don't have an account? Sign Up
            </Typography>
        </Box>
    );
}
