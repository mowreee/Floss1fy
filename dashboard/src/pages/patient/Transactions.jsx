import React, { useEffect, useState } from 'react';
import './Transactions.css';
import { Table, TableHead, TableRow, TableCell, TableBody, Chip, Button, MenuItem, Select, Box } from '@mui/material';

const PURPOSES = [
    { label: "Consultation", amount: 500 },
    { label: "Cleaning", amount: 800 },
    { label: "Tooth Extraction", amount: 1200 },
    { label: "Filling", amount: 1000 },
    { label: "Braces Adjustment", amount: 2000 },
    { label: "Root Canal", amount: 2500 },
    { label: "Dental X-ray", amount: 600 },
    { label: "Whitening", amount: 3000 },
    { label: "Crown/Bridge", amount: 4000 },
    { label: "Veneers", amount: 5000 },
    { label: "Implant", amount: 15000 },
    { label: "Gum Treatment", amount: 1800 },
    { label: "Other", amount: 0 }
];

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [purpose, setPurpose] = useState(PURPOSES[0].label);
    const [amount, setAmount] = useState(PURPOSES[0].amount);
    const [confirming, setConfirming] = useState(false);
    const [msg, setMsg] = useState("");

    const profile = JSON.parse(localStorage.getItem("userProfile"));

    const fetchTransactions = async () => {
        setLoading(true);
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

    const handlePurposeChange = (e) => {
        const selected = PURPOSES.find(p => p.label === e.target.value);
        setPurpose(selected.label);
        setAmount(selected.amount);
    };

    const handleConfirm = async () => {
        setConfirming(true);
        setMsg("");
        try {
            const res = await fetch("http://localhost:5000/api/transactions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    patient: profile?.username || "Unknown",
                    purpose,
                    amount,
                    date: new Date().toISOString().split("T")[0],
                    status: "Pending"
                }),
            });
            if (!res.ok) throw new Error("Transaction failed");
            setMsg("Transaction submitted! Awaiting admin confirmation.");
            setConfirming(false);
            fetchTransactions(); // Refresh table
        } catch (err) {
            setMsg(err.message);
            setConfirming(false);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="patient-transactions">
            <h1>My Transactions</h1>
            <Box sx={{ mb: 3, display: 'flex', gap: 2, alignItems: 'center' }}>
                <Select value={purpose} onChange={handlePurposeChange} size="small">
                    {PURPOSES.map(p => (
                        <MenuItem key={p.label} value={p.label}>{p.label}</MenuItem>
                    ))}
                </Select>
                <span>Amount: <b>₱{amount}</b></span>
                <Button variant="contained" onClick={handleConfirm} disabled={confirming}>
                    {confirming ? "Submitting..." : "Confirm"}
                </Button>
                {msg && <span style={{ marginLeft: 16, color: "#1976d2" }}>{msg}</span>}
            </Box>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Purpose</TableCell>
                        <TableCell>Amount (₱)</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {transactions
                        .filter(t => t.patient === profile?.username)
                        .map(({ _id, purpose, amount, date, status }) => (
                            <TableRow key={_id}>
                                <TableCell>{purpose}</TableCell>
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