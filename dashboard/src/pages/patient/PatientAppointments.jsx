import React, { useState } from 'react';
import {
    Table, TableHead, TableRow, TableCell, TableBody,
    Button, Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, MenuItem,
} from '@mui/material';
import './Appointments.css';

const dentists = [
    { id: 1, name: 'Dr. Smith' },
    { id: 2, name: 'Dr. Lee' },
    { id: 3, name: 'Dr. Johnson' },
];

const initialAppointments = [
    { id: 1, dentist: 'Dr. Smith', date: '2025-06-01', time: '10:00', status: 'Confirmed', medicalRecord: 'Teeth cleaning' },
    { id: 2, dentist: 'Dr. Lee', date: '2025-06-15', time: '14:00', status: 'Pending', medicalRecord: 'Cavity filling' },
];

export const appointmentsData = [...initialAppointments];

const PatientAppointments = () => {
    const [appointments, setAppointments] = useState(initialAppointments);
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({ dentist: '', date: '', time: '', medicalRecord: '' });

    const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    const handleClose = () => { setOpen(false); setForm({ dentist: '', date: '', time: '', medicalRecord: '' }); };
    const handleAdd = e => {
        e.preventDefault();
        setAppointments(a => [
            ...a,
            { ...form, id: a.length + 1, status: 'Pending' }
        ]);
        handleClose();
    };

    return (
        <div className="patient-appointments">
            <h1>My Appointments</h1>
            <Button variant="contained" onClick={() => setOpen(true)} sx={{ mb: 2 }}>
                Add Appointment
            </Button>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Dentist</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Time</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Purpose</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {appointments.map(a => (
                        <TableRow key={a.id}>
                            <TableCell>{a.dentist}</TableCell>
                            <TableCell>{a.date}</TableCell>
                            <TableCell>{a.time}</TableCell>
                            <TableCell>{a.status}</TableCell>
                            <TableCell>{a.medicalRecord}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add New Appointment</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleAdd} id="add-appointment-form">
                        <TextField
                            select label="Select Dentist" name="dentist"
                            value={form.dentist} onChange={handleChange}
                            fullWidth margin="normal" required
                        >
                            {dentists.map(d => (
                                <MenuItem key={d.id} value={d.name}>{d.name}</MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            label="Select Date" name="date" type="date"
                            value={form.date} onChange={handleChange}
                            fullWidth margin="normal" InputLabelProps={{ shrink: true }} required
                        />
                        <TextField
                            label="Select Time" name="time" type="time"
                            value={form.time} onChange={handleChange}
                            fullWidth margin="normal" InputLabelProps={{ shrink: true }} required
                        />
                        <TextField
                            label="Purpose / Medical Record" name="medicalRecord"
                            value={form.medicalRecord} onChange={handleChange}
                            fullWidth margin="normal" multiline rows={3} required
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit" form="add-appointment-form" variant="contained">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default PatientAppointments;
