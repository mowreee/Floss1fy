// src/pages/admin/Records.jsx
import React from 'react';
import './Records.css';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

const dummyRecords = [
    { id: 1, patient: 'John Doe', treatment: 'Cleaning', date: '2025-05-01' },
    { id: 2, patient: 'Jane Smith', treatment: 'Filling', date: '2025-05-05' },
];

const Records = () => {
    return (
        <div className="admin-records">
            <h1>Dental Records</h1>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Patient</TableCell>
                        <TableCell>Treatment</TableCell>
                        <TableCell>Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {dummyRecords.map(({ id, patient, treatment, date }) => (
                        <TableRow key={id}>
                            <TableCell>{patient}</TableCell>
                            <TableCell>{treatment}</TableCell>
                            <TableCell>{date}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default Records;
