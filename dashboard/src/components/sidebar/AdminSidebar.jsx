import React from 'react';
import { NavLink } from 'react-router-dom';
import './AdminSidebar.css';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EventIcon from '@mui/icons-material/Event';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PaymentsIcon from '@mui/icons-material/Payments';

const AdminSidebar = () => {
    return (
        <div className="admin-sidebar">
            <h2>Admin Panel</h2>
            <ul>
                <li>
                    <NavLink to="/admin/dashboard" className="sidebar-link">
                        <DashboardIcon /> <span>Dashboard</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/admin/appointments" className="sidebar-link">
                        <EventIcon /> <span>Appointments</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/admin/patients" className="sidebar-link">
                        <PeopleIcon /> <span>Patients</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/admin/records" className="sidebar-link">
                        <AssignmentIcon /> <span>Records</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/admin/transactions" className="sidebar-link">
                        <PaymentsIcon /> <span>Transactions</span>
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};

export default AdminSidebar;
