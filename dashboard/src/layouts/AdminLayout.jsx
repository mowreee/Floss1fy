// src/layouts/AdminLayout.jsx
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import AdminSidebar from '../components/Sidebar/AdminSidebar';
import { Box } from '@mui/material';

const AdminLayout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const handleSidebarToggle = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
            {sidebarOpen && <AdminSidebar />}
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Navbar onSidebarToggle={handleSidebarToggle} />
                <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: '#f0f2f5', overflowY: 'auto' }}>
                    {children}
                </Box>
            </Box>
        </Box>
    );
};

export default AdminLayout;
