import React, { useEffect, useState } from 'react';
import DashboardCards from '../../components/Dashboard/DashboardCards';
import EventIcon from '@mui/icons-material/EventAvailable';
import PeopleIcon from '@mui/icons-material/People';
import PaymentIcon from '@mui/icons-material/Payments';
import './Dashboard.css';

const PatientDashboard = () => {
    const [appointments, setAppointments] = useState([]);
    const [medicalRecords, setMedicalRecords] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/dashboard');
                const data = await res.json();
                setAppointments(data.appointments || []);
                setMedicalRecords(data.medicalRecords || []);
                setTransactions(data.transactions || []);
            } catch (err) {
                // handle error
            } finally {
                setLoading(false);
            }
        };
        fetchDashboard();
    }, []);

    if (loading) return <div>Loading...</div>;

    const today = new Date().toISOString().split('T')[0];
    const upcomingCount = appointments.filter(app => app.date >= today).length;
    const medicalRecordsCount = medicalRecords.length;
    const totalTransactions = transactions.reduce((acc, curr) => acc + (curr.amount || 0), 0);

    return (
        <div className="patient-dashboard">
            <h1>Patient Dashboard</h1>
            <div className="cards-container">
                <DashboardCards title="Upcoming Appointments" value={upcomingCount.toString()} icon={<EventIcon color="primary" />} />
                <DashboardCards title="Medical Records" value={medicalRecordsCount.toString()} icon={<PeopleIcon color="primary" />} />
                <DashboardCards title="Transactions" value={`₱${totalTransactions.toLocaleString()}`} icon={<PaymentIcon color="primary" />} />
            </div>

            <div className="patient-dashboard-lists">
                <div className="recent-appointments">
                    <h2>Recent Appointments</h2>
                    <ul>
                        {appointments.map(({ _id, dentist, date, time, status }) => (
                            <li key={_id}>
                                {date} at {time} with {dentist} - <strong>{status}</strong>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="recent-medical-records">
                    <h2>Recent Medical Records</h2>
                    <ul>
                        {medicalRecords.map(({ _id, treatment, dentist, date }) => (
                            <li key={_id}>
                                {treatment} by {dentist} — {date}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="recent-transactions">
                    <h2>Recent Transactions</h2>
                    <ul>
                        {transactions.map(({ _id, amount, date }) => (
                            <li key={_id}>
                                ₱{amount?.toLocaleString()} — {date}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default PatientDashboard;