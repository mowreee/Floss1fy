// src/pages/patient/Transactions.jsx
import React from 'react';
import './Transactions.css';
import { Table, TableHead, TableRow, TableCell, TableBody, Chip } from '@mui/material';

const dummyTransactions = [
    { id: 1, amount: 1200, date: '2025-02-10', status: 'Paid' },
    { id: 2, amount: 2000, date: '2025-03-15', status: 'Pending' },
];

const Transactions = () => {
    return (
        <div className="patient-transactions">
            <h1>My Transactions</h1>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Amount (₱)</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {dummyTransactions.map(({ id, amount, date, status }) => (
                        <TableRow key={id}>
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
