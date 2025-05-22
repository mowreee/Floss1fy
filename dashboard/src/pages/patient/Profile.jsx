import React, { useState, useEffect } from "react";
import "./Profile.css";

const defaultProfile = {
    username: "",
    lastname: "",
    firstname: "",
    middlename: "",
    email: "",
};

const Profile = () => {
    const [form, setForm] = useState(defaultProfile);
    const [msg, setMsg] = useState({ error: "", success: "" });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const storedProfile = localStorage.getItem("userProfile");
        if (storedProfile) {
            // Merge with defaultProfile to avoid missing fields
            const { role, ...profile } = JSON.parse(storedProfile);
            setForm({ ...defaultProfile, ...profile });
        }
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleEdit = () => {
        setIsEditing(true);
        setMsg({ error: "", success: "" });
    };

    const handleCancel = () => {
        const storedProfile = localStorage.getItem("userProfile");
        if (storedProfile) {
            const { role, ...profile } = JSON.parse(storedProfile);
            setForm({ ...defaultProfile, ...profile });
        }
        setIsEditing(false);
        setMsg({ error: "", success: "" });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setMsg({ error: "", success: "" });

        try {
            // Replace with your actual API endpoint
            const res = await fetch("http://localhost:5000/api/profile", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Update failed");

            // Update localStorage (keep role if present)
            const storedProfile = localStorage.getItem("userProfile");
            let updatedProfile = { ...form };
            if (storedProfile) {
                const { role } = JSON.parse(storedProfile);
                if (role) updatedProfile.role = role;
            }
            localStorage.setItem("userProfile", JSON.stringify(updatedProfile));
            setMsg({ error: "", success: "Profile updated!" });
            setIsEditing(false);
        } catch (err) {
            setMsg({ error: err.message, success: "" });
        }
    };

    return (
        <div className="patient-profile">
            <form className="profile-form" onSubmit={handleUpdate}>
                <h2>Edit Profile</h2>
                <input name="username" placeholder="Username" value={form.username} disabled />
                <input name="lastname" placeholder="Last Name" value={form.lastname} onChange={handleChange} disabled={!isEditing} required />
                <input name="firstname" placeholder="First Name" value={form.firstname} onChange={handleChange} disabled={!isEditing} required />
                <input name="middlename" placeholder="Middle Name" value={form.middlename} onChange={handleChange} disabled={!isEditing} />
                <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} disabled={!isEditing} required />

                {!isEditing ? (
                    <button type="button" onClick={handleEdit}>
                        Edit
                    </button>
                ) : (
                    <div style={{ display: "flex", gap: "8px" }}>
                        <button type="submit">Update</button>
                        <button type="button" onClick={handleCancel} style={{ background: "#ccc", color: "#333" }}>
                            Cancel
                        </button>
                    </div>
                )}

                {msg.error && <div style={{ color: "red" }}>{msg.error}</div>}
                {msg.success && <div style={{ color: "green" }}>{msg.success}</div>}
            </form>
        </div>
    );
};

export default Profile;