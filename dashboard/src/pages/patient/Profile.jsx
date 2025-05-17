import React, { useState } from 'react';
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import './Profile.css';

const Profile = () => {
    const [form, setForm] = useState({
        username: 'johndoe123',
        lastname: 'Doe',
        firstname: 'John',
        middlename: 'Michael',
        email: 'john@example.com',
        phone: '09123456789',
    });

    const [editMode, setEditMode] = useState(false);
    const [open, setOpen] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleEditClick = () => {
        setEditMode(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirmUpdate = () => {
        // Call API to update profile here
        setOpen(false);
        setEditMode(false);
        alert('Profile updated!');
    };

    return (
        <div className="patient-profile">
            <h1>My Profile</h1>

            {!editMode ? (
                <div className="profile-view">
                    <p><strong>Username:</strong> {form.username}</p>
                    <p><strong>Last Name:</strong> {form.lastname}</p>
                    <p><strong>First Name:</strong> {form.firstname}</p>
                    <p><strong>Middle Name:</strong> {form.middlename}</p>
                    <p><strong>Email:</strong> {form.email}</p>
                    <p><strong>Phone Number:</strong> {form.phone}</p>
                    <Button variant="contained" onClick={handleEditClick} sx={{ mt: 2 }}>
                        Edit Profile
                    </Button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="profile-form">
                    <TextField
                        label="Username"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Last Name"
                        name="lastname"
                        value={form.lastname}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="First Name"
                        name="firstname"
                        value={form.firstname}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Middle Name"
                        name="middlename"
                        value={form.middlename}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        type="email"
                    />
                    <TextField
                        label="Phone Number"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <Button variant="contained" type="submit" sx={{ mt: 2 }}>
                        Save Changes
                    </Button>
                </form>
            )}

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Confirm Update</DialogTitle>
                <DialogContent>
                    Are you sure you want to update your profile information?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button variant="contained" onClick={handleConfirmUpdate}>
                        Yes, Update
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Profile;
