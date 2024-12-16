import React, {useEffect, useState} from 'react';
import {Box, Typography} from '@mui/material';

const Time: React.FC = () => {
    const [now, setNow] = useState(new Date());

    useEffect(() => {
        const timerId = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(timerId); // Cleanup interval on component unmount
    }, []);

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
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Typography variant="h5" sx={{marginBottom: '30px', color: '#595959'}}>
                {formatDate(now)}
            </Typography>
            <Typography variant="h1" sx={{color: '#595959'}}>
                {formatTime(now)}
            </Typography>
        </Box>
    );
};

export default Time;
