import React, { useState, useEffect } from 'react';
import DashboardCards from '../../components/Dashboard/DashboardCards';
import PeopleIcon from '@mui/icons-material/People';
import EventIcon from '@mui/icons-material/EventAvailable';
import PaymentIcon from '@mui/icons-material/Payments';
import './Dashboard.css';
import logo from '../../assets/dental.jpg';

const Dashboard = () => {
    const [showWelcome, setShowWelcome] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setShowWelcome(false), 3500);
        return () => clearTimeout(timer);
    }, []);

    const today = new Date().toISOString().split('T')[0];
    const upcomingCount = appointmentsData.filter(app => app.date >= today).length;
    const medicalRecordsCount = medicalRecordsData.length;
    const totalTransactions = transactionsData.reduce((acc, curr) => acc + curr.amount, 0);

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
                        {appointmentsData.map(({ id, dentist, date, time, status }) => (
                            <li key={id}>
                                {date} at {time} with {dentist} - <strong>{status}</strong>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="recent-medical-records">
                    <h2>Recent Medical Records</h2>
                    <ul>
                        {medicalRecordsData.map(({ id, type, date }) => (
                            <li key={id}>
                                {type} — {date}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="recent-transactions">
                    <h2>Recent Transactions</h2>
                    <ul>
                        {transactionsData.map(({ id, amount, date }) => (
                            <li key={id}>
                                ₱{amount.toLocaleString()} — {date}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
