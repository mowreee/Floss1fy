// src/layouts/PatientLayout.jsx
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import PatientSidebar from '../components/Sidebar/PatientSidebar';
import { Box } from '@mui/material';

const PatientLayout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const handleSidebarToggle = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
            {sidebarOpen && <PatientSidebar />}
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Navbar onSidebarToggle={handleSidebarToggle} userType="patient" />
                <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: '#f4f8fb', overflowY: 'auto' }}>
                    {children}
                </Box>
            </Box>
        </Box>
    );
};

export default PatientLayout;
