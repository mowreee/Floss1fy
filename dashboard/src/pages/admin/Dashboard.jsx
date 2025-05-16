import React from 'react';
import DashboardCards from '../../components/Dashboard/DashboardCards';
import PeopleIcon from '@mui/icons-material/People';
import EventIcon from '@mui/icons-material/Event';
import PaymentIcon from '@mui/icons-material/Payments';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import './Dashboard.css';

const data = [
    { name: 'Confirmed', value: 40 },
    { name: 'Pending', value: 20 },
    { name: 'Cancelled', value: 10 },
    { name: 'Completed', value: 30 },
];

const COLORS = ['#0088FE', '#00C49F', '#FF8042', '#AA46BE'];

const recentTransactions = [
    { id: 1, patient: 'John Doe', amount: '₱1,200', date: '2025-05-14' },
    { id: 2, patient: 'Jane Smith', amount: '₱850', date: '2025-05-13' },
    { id: 3, patient: 'Robert Brown', amount: '₱2,400', date: '2025-05-12' },
];

const recentPatients = [
    { id: 1, name: 'Anna Lee', registered: '2025-05-10' },
    { id: 2, name: 'Mark Wilson', registered: '2025-05-09' },
    { id: 3, name: 'Susan Taylor', registered: '2025-05-08' },
];

const Dashboard = () => {
    return (
        <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>
            <div className="cards-container">
                <DashboardCards title="Total Patients" value="145" icon={<PeopleIcon color="primary" />} />
                <DashboardCards title="Appointments Today" value="23" icon={<EventIcon color="primary" />} />
                <DashboardCards title="Payments Received" value="₱25,000" icon={<PaymentIcon color="primary" />} />
            </div>

            <div className="dashboard-bottom">
                <div className="pie-chart-container">
                    <h2>Appointment Status</h2>
                    <PieChart width={300} height={300}>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </div>

                <div className="recent-container">
                    <div className="recent-transactions">
                        <h2>Recent Transactions</h2>
                        <ul>
                            {recentTransactions.map(({ id, patient, amount, date }) => (
                                <li key={id}>
                                    {patient} - {amount} <br />
                                    <small>{date}</small>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="recent-patients">
                        <h2>Recent Patients</h2>
                        <ul>
                            {recentPatients.map(({ id, name, registered }) => (
                                <li key={id}>
                                    {name} <br />
                                    <small>Registered: {registered}</small>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
