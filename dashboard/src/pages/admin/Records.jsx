import React, { useEffect, useState } from 'react';
import './Records.css';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

const Records = () => {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecords = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/medical-records');
                const data = await res.json();
                setRecords(data || []);
            } catch (err) {
                // handle error
            } finally {
                setLoading(false);
            }
        };
        fetchRecords();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="admin-records">
            <h1>Dental Records</h1>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Patient</TableCell>
                        <TableCell>Treatment</TableCell>
                        <TableCell>Dentist</TableCell>
                        <TableCell>Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {records.map(({ _id, patient, treatment, dentist, date }) => (
                        <TableRow key={_id}>
                            <TableCell>{patient}</TableCell>
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

export default Records;