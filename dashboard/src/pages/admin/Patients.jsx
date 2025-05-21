import React, { useEffect, useState } from 'react';
import './Patients.css';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

const Patients = () => {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/patients');
                const data = await res.json();
                setPatients(data || []);
            } catch (err) {
                // handle error
            } finally {
                setLoading(false);
            }
        };
        fetchPatients();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="admin-patients">
            <h1>Patients</h1>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Contact</TableCell>
                        <TableCell>Age</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {patients.map(({ _id, firstname, lastname, email, contact, age }) => (
                        <TableRow key={_id}>
                            <TableCell>{firstname} {lastname}</TableCell>
                            <TableCell>{email}</TableCell>
                            <TableCell>{contact || '-'}</TableCell>
                            <TableCell>{age || '-'}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default Patients;