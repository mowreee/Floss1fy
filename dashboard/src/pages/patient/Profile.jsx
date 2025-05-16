import React, { useState } from 'react';
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import './Profile.css';

const Profile = () => {
    const [form, setForm] = useState({
        name: 'John Doe',
        email: 'john@example.com',
        phone: '09123456789',
    });

    const [open, setOpen] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setOpen(true); // open modal instead of alert
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirmUpdate = () => {
        // Call API to update profile here

        setOpen(false);
        alert('Profile updated!');
    };

    return (
        <div className="patient-profile">
            <h1>My Profile</h1>
            <form onSubmit={handleSubmit} className="profile-form">
                <TextField
                    label="Name"
                    name="name"
                    value={form.name}
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
                    label="Phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <Button variant="contained" type="submit" sx={{ mt: 2 }}>
                    Update Profile
                </Button>
            </form>

            {/* Modal dialog */}
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
