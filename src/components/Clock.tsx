import React from 'react';
import { Box, Typography } from '@mui/material';

const Clock: React.FC = () => {
    const now = new Date();

    const formatDate = (date: Date) => {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long',
        };
        return new Intl.DateTimeFormat('zh-CN', options).format(date);
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('zh-CN');
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h5" sx={{ marginBottom: '30px' }}>
                {formatDate(now)}
            </Typography>
            <Typography variant="h1">
                {formatTime(now)}
            </Typography>
        </Box>
    );
};

export default Clock;
