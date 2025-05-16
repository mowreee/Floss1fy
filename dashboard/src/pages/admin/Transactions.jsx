// src/pages/admin/Transactions.jsx
import React from 'react';
import './Transactions.css';
import { Table, TableHead, TableRow, TableCell, TableBody, Chip } from '@mui/material';

const dummyTransactions = [
    { id: 1, patient: 'John Doe', amount: 1500, date: '2025-05-10', status: 'Paid' },
    { id: 2, patient: 'Jane Smith', amount: 2000, date: '2025-05-12', status: 'Pending' },
];

const Transactions = () => {
    return (
        <div className="admin-transactions">
            <h1>Transactions</h1>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Patient</TableCell>
                        <TableCell>Amount (₱)</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {dummyTransactions.map(({ id, patient, amount, date, status }) => (
                        <TableRow key={id}>
                            <TableCell>{patient}</TableCell>
                            <TableCell>{amount}</TableCell>
                            <TableCell>{date}</TableCell>
                            <TableCell>
                                <Chip
                                    label={status}
                                    color={status === 'Paid' ? 'success' : 'warning'}
                                    size="small"
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default Transactions;
