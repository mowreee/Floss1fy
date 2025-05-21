import React, { useState } from "react";
import "../../styles/login.css";
import { IconButton, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function SignUp({ onSwitchToLogin }) {
    const [form, setForm] = useState({
        username: "", lastName: "", firstName: "", middleName: "",
        email: "", password: "", confirmPassword: "", role: "patient"
    });
    const [msg, setMsg] = useState({ error: "", success: "" });
    const [show, setShow] = useState({ pass: false, confirm: false });

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setMsg({ error: "", success: "" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.password !== form.confirmPassword) {
            setMsg({ error: "Passwords do not match", success: "" });
            return;
        }
        try {
            const res = await fetch("http://localhost:5000/api/users/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: form.username,
                    lastname: form.lastName,
                    firstname: form.firstName,
                    middlename: form.middleName,
                    email: form.email,
                    password: form.password,
                    role: form.role
                })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Registration failed");
            setMsg({ error: "", success: "Registration successful! You can now login." });
        } catch (err) {
            setMsg({ error: err.message, success: "" });
        }
    };

    return (
        <div className="container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                {["username", "lastName", "firstName", "middleName", "email"].map(name => (
                    <input key={name} name={name} placeholder={name.replace(/([A-Z])/g, " $1")} value={form[name]} onChange={handleChange} required={name !== "middleName"} />
                ))}
                <FormControl fullWidth margin="normal">
                    <InputLabel id="role-label">Role</InputLabel>
                    <Select
                        labelId="role-label"
                        name="role"
                        value={form.role}
                        label="Role"
                        onChange={handleChange}
                        required
                    >
                        <MenuItem value="patient">Patient</MenuItem>
                        <MenuItem value="admin">Admin</MenuItem>
                    </Select>
                </FormControl>
                {["password", "confirmPassword"].map((name, i) => (
                    <div key={name} className="password-wrapper">
                        <input
                            name={name}
                            type={show[i ? "confirm" : "pass"] ? "text" : "password"}
                            placeholder={name.replace(/([A-Z])/g, " $1")}
                            value={form[name]}
                            onChange={handleChange}
                            required
                        />
                        <IconButton onClick={() => setShow(s => ({ ...s, [i ? "confirm" : "pass"]: !s[i ? "confirm" : "pass"] }))} tabIndex={-1}>
                            {show[i ? "confirm" : "pass"] ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </div>
                ))}
                <button type="submit">Sign Up</button>
                {msg.error && <p className="error">{msg.error}</p>}
                {msg.success && <p style={{ color: "green", textAlign: "center" }}>{msg.success}</p>}
            </form>
            <p className="link" role="button" tabIndex={0} onClick={onSwitchToLogin} onKeyDown={e => e.key === "Enter" && onSwitchToLogin()}>
                Already have an account? Login
            </p>
        </div>
    );
}