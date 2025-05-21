import React, { useState, useEffect } from 'react';
import {
    Table, TableHead, TableRow, TableCell, TableBody, Button,
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, MenuItem
} from '@mui/material';
import './Appointments.css';

const dentists = ['Dr. Smith', 'Dr. Lee', 'Dr. Johnson'];
const purposes = [
    'Consultation',
    'Cleaning',
    'Tooth Extraction',
    'Filling',
    'Braces Adjustment',
    'Root Canal',
    'Dental X-ray',
    'Whitening',
    'Crown/Bridge',
    'Veneers',
    'Implant',
    'Gum Treatment',
    'Other'
];

// Replace this with your actual patient name or ID from auth context or localStorage
const currentPatient = localStorage.getItem('patientName') || 'John Doe';

const PatientAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({ dentist: '', date: '', time: '', purpose: '' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/appointments');
                const data = await res.json();
                // Only show appointments for the current patient
                setAppointments((data || []).filter(a => a.patient === currentPatient));
            } catch (err) {
                // handle error
            } finally {
                setLoading(false);
            }
        };
        fetchAppointments();
        const interval = setInterval(fetchAppointments, 10000); // Poll every 10s
        return () => clearInterval(interval);
    }, []);

    const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

    const handleAdd = async e => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:5000/api/appointments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...form, status: 'Pending', patient: currentPatient })
            });
            const newAppointment = await res.json();
            setAppointments(a => [...a, newAppointment]);
            setOpen(false);
            setForm({ dentist: '', date: '', time: '', purpose: '' });
        } catch (err) {
            // handle error
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="patient-appointments">
            <h1>My Appointments</h1>
            <Button variant="contained" onClick={() => setOpen(true)} sx={{ mb: 2 }}>Add Appointment</Button>
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
                        <TableRow key={a._id}>
                            <TableCell>{a.dentist}</TableCell>
                            <TableCell>{a.date}</TableCell>
                            <TableCell>{a.time}</TableCell>
                            <TableCell>{a.status}</TableCell>
                            <TableCell>{a.purpose}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Add Appointment</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleAdd} id="add-appointment-form">
                        <TextField select label="Dentist" name="dentist" value={form.dentist} onChange={handleChange} fullWidth required margin="normal">
                            {dentists.map(d => <MenuItem key={d} value={d}>{d}</MenuItem>)}
                        </TextField>
                        <TextField label="Date" name="date" type="date" value={form.date} onChange={handleChange} fullWidth required margin="normal" InputLabelProps={{ shrink: true }} />
                        <TextField label="Time" name="time" type="time" value={form.time} onChange={handleChange} fullWidth required margin="normal" InputLabelProps={{ shrink: true }} />
                        <TextField
                            select
                            label="Purpose"
                            name="purpose"
                            value={form.purpose}
                            onChange={handleChange}
                            fullWidth
                            required
                            margin="normal"
                        >
                            {purposes.map(p => <MenuItem key={p} value={p}>{p}</MenuItem>)}
                        </TextField>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button type="submit" form="add-appointment-form" variant="contained">Add</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default PatientAppointments;