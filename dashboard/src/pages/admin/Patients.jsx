// src/pages/admin/Patients.jsx
import React from 'react';
import './Patients.css';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

const dummyPatients = [
    { id: 1, name: 'John Doe', age: 30, contact: '09123456789' },
    { id: 2, name: 'Jane Smith', age: 25, contact: '09987654321' },
];

const Patients = () => {
    return (
        <div className="admin-patients">
            <h1>Patients</h1>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Age</TableCell>
                        <TableCell>Contact</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {dummyPatients.map(({ id, name, age, contact }) => (
                        <TableRow key={id}>
                            <TableCell>{name}</TableCell>
                            <TableCell>{age}</TableCell>
                            <TableCell>{contact}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default Patients;
