import React from 'react';
import './MedicalHistory.css';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

export const medicalRecordsData = [
    { id: 1, treatment: 'X-Ray', dentist: 'Dr. Smith', date: '2025-04-20' },
    { id: 2, treatment: 'Blood Test', dentist: 'Dr. Lee', date: '2025-03-15' },
];

const MedicalHistory = () => {
    return (
        <div className="patient-medical-history">
            <h1>Medical History</h1>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Treatment</TableCell>
                        <TableCell>Dentist</TableCell>
                        <TableCell>Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {medicalRecordsData.map(({ id, treatment, dentist, date }) => (
                        <TableRow key={id}>
                            <TableCell>{treatment}</TableCell>
                            <TableCell>{dentist}</TableCell>
                            <TableCell>{date}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default MedicalHistory;
