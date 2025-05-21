import React, { useEffect, useState } from 'react';
import DashboardCards from '../../components/Dashboard/DashboardCards';
import PeopleIcon from '@mui/icons-material/People';
import EventIcon from '@mui/icons-material/Event';
import PaymentIcon from '@mui/icons-material/Payments';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import './Dashboard.css';

// Map status to color
const STATUS_COLORS = {
    Confirmed: '#4caf50', // green
    Cancelled: '#f44336', // red
    Pending: '#ff9800',   // orange
    // fallback for any other status
    default: '#0088FE'
};

const Dashboard = () => {
    const [appointments, setAppointments] = useState([]);
    const [patients, setPatients] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const [appointmentsRes, patientsRes, transactionsRes] = await Promise.all([
                fetch('http://localhost:5000/api/appointments'),
                fetch('http://localhost:5000/api/patients'),
                fetch('http://localhost:5000/api/transactions')
            ]);
            setAppointments(await appointmentsRes.json());
            setPatients(await patientsRes.json());
            setTransactions(await transactionsRes.json());
        } catch (err) {
            // handle error
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;

    // Compute appointment status counts for pie chart
    const statusCounts = appointments.reduce((acc, { status }) => {
        acc[status] = (acc[status] || 0) + 1;
        return acc;
    }, {});

    const data = Object.entries(statusCounts).map(([name, value]) => ({ name, value }));

    const totalPayments = transactions
        .filter(t => t.status === 'Paid')
        .reduce((sum, t) => sum + t.amount, 0);

    // Get recent patients (latest 3)
    const recentPatients = patients.slice(-3).reverse();

    // Recent transactions (latest 3)
    const recentTransactions = transactions.slice(-3).reverse();

    return (
        <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>
            <div className="cards-container">
                <DashboardCards title="Total Patients" value={patients.length} icon={<PeopleIcon color="primary" />} />
                <DashboardCards title="Appointments Today" value={appointments.length} icon={<EventIcon color="primary" />} />
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
                            {data.map((entry) => (
                                <Cell
                                    key={`cell-${entry.name}`}
                                    fill={STATUS_COLORS[entry.name] || STATUS_COLORS.default}
                                />
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
                            {recentTransactions.map(({ _id, patient, amount, date }) => (
                                <li key={_id}>
                                    {patient} - ₱{amount.toLocaleString()} <br />
                                    <small>{date}</small>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="recent-patients">
                        <h2>Recent Patients</h2>
                        <ul>
                            {recentPatients.map(({ _id, firstname, lastname }) => (
                                <li key={_id}>
                                    {firstname} {lastname}
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