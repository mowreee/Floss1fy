import React from 'react';
import DashboardCards from '../../components/Dashboard/DashboardCards';
import PeopleIcon from '@mui/icons-material/People';
import EventIcon from '@mui/icons-material/Event';
import PaymentIcon from '@mui/icons-material/Payments';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { dummyPatients } from './Patients';
import { dummyAppointments } from './Appointments';
import { dummyTransactions } from './Transactions';
import './Dashboard.css';

const COLORS = ['#0088FE', '#00C49F', '#FF8042', '#AA46BE'];

const Dashboard = () => {
    // Compute appointment status counts for pie chart
    const statusCounts = dummyAppointments.reduce((acc, { status }) => {
        acc[status] = (acc[status] || 0) + 1;
        return acc;
    }, {});

    const data = Object.entries(statusCounts).map(([name, value]) => ({ name, value }));

    const totalPayments = dummyTransactions
        .filter(t => t.status === 'Paid')
        .reduce((sum, t) => sum + t.amount, 0);

    // Get recent patients (latest 3)
    const recentPatients = dummyPatients.slice(-3).reverse();

    // Recent transactions (latest 3)
    const recentTransactions = dummyTransactions.slice(-3).reverse();

    return (
        <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>
            <div className="cards-container">
                <DashboardCards title="Total Patients" value={dummyPatients.length} icon={<PeopleIcon color="primary" />} />
                <DashboardCards title="Appointments Today" value={dummyAppointments.length} icon={<EventIcon color="primary" />} />
                <DashboardCards title="Payments Received" value={`₱${totalPayments.toLocaleString()}`} icon={<PaymentIcon color="primary" />} />
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
                            label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
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
                                    {patient} - ₱{amount.toLocaleString()} <br />
                                    <small>{date}</small>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="recent-patients">
                        <h2>Recent Patients</h2>
                        <ul>
                            {recentPatients.map(({ id, name }) => (
                                <li key={id}>
                                    {name}
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
