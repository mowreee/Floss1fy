import React from 'react';
import {
    AppBar, Toolbar, Typography, IconButton, Box, Breadcrumbs, Link, Tooltip
} from '@mui/material';
import { Menu as MenuIcon, AccountCircle, Home as HomeIcon, Logout as LogoutIcon } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';

const Navbar = ({ onSidebarToggle, userType, onLogout }) => {
    const location = useLocation();
    const navigate = useNavigate();

    // Get username from localStorage
    const profile = JSON.parse(localStorage.getItem("userProfile"));
    const displayName = profile?.username || profile?.email || "User";

    const handleLogout = () => {
        localStorage.removeItem('userProfile');
        sessionStorage.clear();
        if (onLogout) onLogout();
        navigate('/login', { replace: true }); // Always go directly to login
    };

    const breadcrumbs = () => {
        const pathnames = location.pathname.split('/').filter(Boolean);
        return (
            <Breadcrumbs aria-label="breadcrumb" sx={{ color: '#fff', ml: 2 }}>
                <Link underline="hover" color="inherit" href="/">
                    <HomeIcon sx={{ verticalAlign: 'middle' }} />
                </Link>
                {pathnames.map((value, i) => {
                    const to = `/${pathnames.slice(0, i + 1).join('/')}`;
                    const label = value[0].toUpperCase() + value.slice(1).replace(/-/g, ' ');
                    return i === pathnames.length - 1 ? (
                        <Typography color="#fff" key={to}>{label}</Typography>
                    ) : (
                        <Link underline="hover" color="inherit" href={to} key={to}>{label}</Link>
                    );
                })}
            </Breadcrumbs>
        );
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: '#2e3e49', zIndex: t => t.zIndex.drawer + 1 }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={onSidebarToggle} sx={{ mr: 2, display: { sm: 'none' } }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{ mr: 2 }}>Flossify</Typography>
                    {(userType === 'patient' || userType === 'admin') && breadcrumbs()}
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body1">{displayName}</Typography>
                    <IconButton color="inherit"><AccountCircle /></IconButton>
                    <Tooltip title="Logout">
                        <IconButton color="inherit" onClick={handleLogout}><LogoutIcon /></IconButton>
                    </Tooltip>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;