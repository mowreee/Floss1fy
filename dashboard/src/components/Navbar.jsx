import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';

const Navbar = ({ onSidebarToggle, userType }) => {
    const location = useLocation();

    const generateBreadcrumbs = () => {
        const pathnames = location.pathname.split('/').filter((x) => x);

        return (
            <Breadcrumbs aria-label="breadcrumb" sx={{ color: '#ffffff', ml: 2 }}>
                <Link underline="hover" color="inherit" href="/">
                    <HomeIcon sx={{ verticalAlign: 'middle' }} />
                </Link>
                {pathnames.map((value, index) => {
                    const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                    const label = value.charAt(0).toUpperCase() + value.slice(1).replace(/-/g, ' ');
                    const isLast = index === pathnames.length - 1;
                    return isLast ? (
                        <Typography color="#ffffff" key={to}>
                            {label}
                        </Typography>
                    ) : (
                        <Link underline="hover" color="inherit" href={to} key={to}>
                            {label}
                        </Link>
                    );
                })}
            </Breadcrumbs>
        );
    };

    return (
        <AppBar
            position="static"
            sx={{
                backgroundColor: '#2e3e49',
                zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
        >
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={onSidebarToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{ mr: 2 }}>
                        Flossify
                    </Typography>

                    {/* Show breadcrumbs only for patients */}
                    {userType === 'patient' && generateBreadcrumbs()}
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body1" sx={{ mr: 1 }}>
                        John Doe
                    </Typography>
                    <IconButton color="inherit">
                        <AccountCircle />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
