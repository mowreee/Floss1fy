import React, { useState, useEffect } from 'react';
import DashboardCards from '../../components/Dashboard/DashboardCards';
import PeopleIcon from '@mui/icons-material/People';
import EventIcon from '@mui/icons-material/EventAvailable';
import PaymentIcon from '@mui/icons-material/Payments';
import './Dashboard.css';

const recentAppointments = [
    { id: 1, doctor: 'Dr. Smith', date: '2025-05-20', time: '10:00 AM', status: 'Confirmed' },
    { id: 2, doctor: 'Dr. Lee', date: '2025-05-25', time: '2:00 PM', status: 'Pending' },
];

const recentMedicalRecords = [
    { id: 1, type: 'X-Ray', date: '2025-04-20' },
    { id: 2, type: 'Blood Test', date: '2025-03-15' },
];

const recentTransactions = [
    { id: 1, amount: '₱1,200', date: '2025-05-10' },
    { id: 2, amount: '₱850', date: '2025-04-25' },
];

const Dashboard = () => {
    const [showWelcome, setShowWelcome] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setShowWelcome(false), 3500);
        return () => clearTimeout(timer);
    }, []);

    if (showWelcome) {
        return (
            <div className="welcome-screen">
                <h1>Welcome to Flossify</h1>
                <p>
                    Your all-in-one dental health management system to schedule appointments,
                    manage medical records, and keep track of transactions effortlessly.
                </p>
            </div>
        );
    }

    return (
        <div className="patient-dashboard">
            <h1>Patient Dashboard</h1>
            <div className="cards-container">
                <DashboardCards title="Upcoming Appointments" value="2" icon={<EventIcon color="primary" />} />
                <DashboardCards title="Medical Records" value="5" icon={<PeopleIcon color="primary" />} />
                <DashboardCards title="Transactions" value="₱4,500" icon={<PaymentIcon color="primary" />} />
            </div>

            <div className="patient-dashboard-lists">
                <div className="recent-appointments">
                    <h2>Recent Appointments</h2>
                    <ul>
                        {recentAppointments.map(({ id, doctor, date, time, status }) => (
                            <li key={id}>
                                {date} at {time} with {doctor} - <strong>{status}</strong>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="recent-medical-records">
                    <h2>Recent Medical Records</h2>
                    <ul>
                        {recentMedicalRecords.map(({ id, type, date }) => (
                            <li key={id}>
                                {type} — {date}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="recent-transactions">
                    <h2>Recent Transactions</h2>
                    <ul>
                        {recentTransactions.map(({ id, amount, date }) => (
                            <li key={id}>
                                {amount} — {date}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
