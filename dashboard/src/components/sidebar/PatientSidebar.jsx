// src/components/Sidebar/PatientSidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import './PatientSidebar.css';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import HistoryIcon from '@mui/icons-material/History';
import PersonIcon from '@mui/icons-material/Person';
import PaymentsIcon from '@mui/icons-material/Payments';

const PatientSidebar = () => {
    return (
        <div className="patient-sidebar">
            <h2>My Account</h2>
            <ul>
                <li>
                    <NavLink to="/patient/dashboard" className="sidebar-link">
                        <DashboardIcon /> <span>Dashboard</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/patient/appointments" className="sidebar-link">
                        <EventAvailableIcon /> <span>Appointments</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/patient/medical-history" className="sidebar-link">
                        <HistoryIcon /> <span>Medical History</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/patient/profile" className="sidebar-link">
                        <PersonIcon /> <span>Profile</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/patient/transactions" className="sidebar-link">
                        <PaymentsIcon /> <span>Transactions</span>
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};

export default PatientSidebar;
