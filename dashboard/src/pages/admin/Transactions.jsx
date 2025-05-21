import React, { useEffect, useState } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Chip, Button } from '@mui/material';
import './Transactions.css';

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

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

    useEffect(() => {
        fetchTransactions();
    }, []);

    const handleConfirm = async (id) => {
        await fetch(`http://localhost:5000/api/transactions/${id}/confirm`, { method: "PUT" });
        setTransactions(transactions.map(t => t._id === id ? { ...t, status: "Paid" } : t));
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="admin-transactions">
            <h1>Transactions</h1>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Patient</TableCell>
                        <TableCell>Purpose</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {transactions.map(({ _id, patient, purpose, amount, date, status }) => (
                        <TableRow key={_id}>
                            <TableCell>{patient}</TableCell>
                            <TableCell>{purpose}</TableCell>
                            <TableCell>₱{amount}</TableCell>
                            <TableCell>{date}</TableCell>
                            <TableCell>
                                <Chip label={status} color={status === 'Paid' ? 'success' : 'warning'} />
                            </TableCell>
                            <TableCell>
                                {status !== "Paid" && (
                                    <Button variant="contained" color="success" size="small" onClick={() => handleConfirm(_id)}>
                                        Confirm
                                    </Button>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default Transactions;