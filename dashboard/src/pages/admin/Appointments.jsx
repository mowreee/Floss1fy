import React, { useEffect, useState } from 'react';
import './Appointments.css';
import { Table, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material';

const Appointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchAppointments = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/appointments');
            const data = await res.json();
            setAppointments(data || []);
        } catch (err) {
            // handle error
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    const updateStatus = async (id, status) => {
        try {
            const res = await fetch(`http://localhost:5000/api/appointments/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status })
            });
            if (res.ok) {
                await fetchAppointments(); // Refresh list for dashboard sync
            } else {
                const errData = await res.json();
                alert(errData.message || 'Failed to update status');
            }
        } catch (err) {
            alert('Error updating status');
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="admin-appointments">
            <h1>Appointments</h1>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Dentist</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Time</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {appointments.map(({ _id, dentist, date, time, status }) => (
                        <TableRow key={_id}>
                            <TableCell>{dentist}</TableCell>
                            <TableCell>{date}</TableCell>
                            <TableCell>{time}</TableCell>
                            <TableCell>{status}</TableCell>
                            <TableCell>
                                <Button
                                    variant="contained"
                                    size="small"
                                    color="primary"
                                    sx={{ mr: 1 }}
                                    onClick={() => updateStatus(_id, 'Confirmed')}
                                    disabled={status === 'Confirmed'}
                                >
                                    Confirm
                                </Button>
                                <Button
                                    variant="outlined"
                                    size="small"
                                    color="error"
                                    onClick={() => updateStatus(_id, 'Cancelled')}
                                    disabled={status === 'Cancelled'}
                                >
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