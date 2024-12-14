import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledToolbar = styled(Toolbar)({
    display: 'flex',
    justifyContent: 'space-between',
});

const StyledTypography = styled(Typography)({
    flexGrow: 1,
});

const Menu: React.FC = () => {
    return (
        <AppBar position="static">
            <StyledToolbar>
                <StyledTypography variant="h6">
                    时间管理工具
                </StyledTypography>
                <Button color="inherit" href="/">时钟</Button>
                <Button color="inherit" href="/alarm">闹钟</Button>
                <Button color="inherit" href="/timer">计时器</Button>
                <Button color="inherit" href="/stopwatch">秒表</Button>
            </StyledToolbar>
        </AppBar>
    );
};

export default Menu;