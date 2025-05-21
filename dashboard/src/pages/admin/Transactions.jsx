import React, { useEffect, useState } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Chip } from '@mui/material';

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/transactions');
                const data = await res.json();
                setTransactions(data || []);
            } catch (err) {
                // handle error
            } finally {
                setLoading(false);
            }
        };
        fetchTransactions();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="admin-transactions">
            <h1>Transactions</h1>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Patient</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {transactions.map(({ _id, patient, amount, date, status }) => (
                        <TableRow key={_id}>
                            <TableCell>{patient}</TableCell>
                            <TableCell>₱{amount?.toLocaleString()}</TableCell>
                            <TableCell>{date}</TableCell>
                            <TableCell>
                                <Chip label={status} color={status === 'Paid' ? 'success' : 'warning'} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default Transactions;