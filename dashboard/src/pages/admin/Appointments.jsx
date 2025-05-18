import React from 'react';
import './Appointments.css';
import { Table, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material';
import { appointmentsData } from '../patient/PatientAppointments';

export const dummyAppointments = [
    { id: 1, patient: 'John Doe', date: '2025-05-20', time: '10:00 AM', status: 'Confirmed' },
    { id: 2, patient: 'Jane Smith', date: '2025-05-21', time: '1:00 PM', status: 'Pending' },
];

const mappedPatientAppointments = appointmentsData.map(({ id, dentist, date, time, status }) => ({
    id: id + 1000,
    patient: dentist,
    date,
    time,
    status,
}));

const allAppointments = [...dummyAppointments, ...mappedPatientAppointments];

const Appointments = () => {
    return (
        <div className="admin-appointments">
            <h1>Appointments</h1>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Patient / Dentist</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Time</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {allAppointments.map(({ id, patient, date, time, status }) => (
                        <TableRow key={id}>
                            <TableCell>{patient}</TableCell>
                            <TableCell>{date}</TableCell>
                            <TableCell>{time}</TableCell>
                            <TableCell>{status}</TableCell>
                            <TableCell>
                                <Button variant="contained" size="small" color="primary" sx={{ mr: 1 }}>
                                    Confirm
                                </Button>
                                <Button variant="outlined" size="small" color="error">
                                    Cancel
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default Appointments;
