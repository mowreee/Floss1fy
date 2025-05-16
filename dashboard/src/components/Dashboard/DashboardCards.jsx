import React from 'react';
import './DashboardCards.css';
import { Card, CardContent, Typography } from '@mui/material';

const DashboardCards = ({ title, value, icon }) => {
    return (
        <Card className="dashboard-card">
            <CardContent>
                <div className="card-header">
                    {icon}
                    <Typography variant="h6">{title}</Typography>
                </div>
                <Typography variant="h4" className="card-value">
                    {value}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default DashboardCards;
