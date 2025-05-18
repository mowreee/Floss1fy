import React, { useState } from 'react';
import {
    Table, TableHead, TableRow, TableCell, TableBody, Button,
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, MenuItem
} from '@mui/material';
import './Appointments.css';

const dentists = ['Dr. Smith', 'Dr. Lee', 'Dr. Johnson'];

export const appointmentsData = [
    { id: 1, dentist: 'Dr. Smith', date: '2025-06-01', time: '10:00', status: 'Confirmed', medicalRecord: 'Teeth cleaning' },
    { id: 2, dentist: 'Dr. Lee', date: '2025-06-15', time: '14:00', status: 'Pending', medicalRecord: 'Cavity filling' },
];

const PatientAppointments = () => {
    const [appointments, setAppointments] = useState(appointmentsData);
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({ dentist: '', date: '', time: '', medicalRecord: '' });

    const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    const handleAdd = e => {
        e.preventDefault();
        setAppointments(a => [...a, { ...form, id: a.length + 1, status: 'Pending' }]);
        setOpen(false);
        setForm({ dentist: '', date: '', time: '', medicalRecord: '' });
    };

    return (
        <div className="patient-appointments">
            <h1>My Appointments</h1>
            <Button variant="contained" onClick={() => setOpen(true)} sx={{ mb: 2 }}>Add Appointment</Button>
            <Table>
                <TableHead>
                    <TableRow>{['Dentist', 'Date', 'Time', 'Status', 'Purpose'].map(h => <TableCell key={h}>{h}</TableCell>)}</TableRow>
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

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Add Appointment</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleAdd} id="add-appointment-form">
                        <TextField select label="Dentist" name="dentist" value={form.dentist} onChange={handleChange} fullWidth required margin="normal">
                            {dentists.map(d => <MenuItem key={d} value={d}>{d}</MenuItem>)}
                        </TextField>
                        <TextField label="Date" name="date" type="date" value={form.date} onChange={handleChange} fullWidth required margin="normal" InputLabelProps={{ shrink: true }} />
                        <TextField label="Time" name="time" type="time" value={form.time} onChange={handleChange} fullWidth required margin="normal" InputLabelProps={{ shrink: true }} />
                        <TextField label="Purpose" name="medicalRecord" value={form.medicalRecord} onChange={handleChange} fullWidth required margin="normal" multiline rows={2} />
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
