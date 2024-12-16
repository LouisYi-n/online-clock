import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography, IconButton } from '@mui/material';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import Time from './Time.tsx';
import Menu from './menu/Menu.tsx';
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import Timer from "./Timer.tsx";
import AlarmClock from "./AlarmClock.tsx";
import Stopwatch from "./Stopwatch.tsx";

const RootContainer = styled(Box)({
    display: 'flex',
    height: '100vh',
});

const SideContainer = styled(Box)({
    width: '25%',
});

const CenterContainer = styled(Box)({
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
});

const FullscreenButton = styled(IconButton)({
    position: 'absolute',
    top: '16px',
    right: '16px',
});

const TitleContainer = styled(Box)({
    textAlign: 'center',
    marginTop: '30px', // 确保与顶部的距离为30px
    marginBottom: '30px', // 确保与年月日的距离为30px
});

const MainLayout: React.FC = () => {
    const [title, setTitle] = useState('在线时间');
    const [fullScreen, setFullScreen] = useState(false);
    const navigate = useNavigate();

    const handleMenuItemClick = (menuTitle: string, path: string) => {
        setTitle(menuTitle);
        navigate(path); // 跳转到对应路径
    };

    const handleFullscreenClick = () => {
        setFullScreen(!fullScreen);
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    };

    return (
        <RootContainer>
            <SideContainer>
                <Menu onMenuItemClick={handleMenuItemClick} />
            </SideContainer>
            <CenterContainer>
                <TitleContainer>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#595959' }}>
                        {title}
                    </Typography>
                </TitleContainer>
                <Routes>
                    <Route path="/time" element={<Time />} />
                    <Route path="/timer" element={<Timer />} />
                    <Route path="/alarm-clock" element={<AlarmClock />} />
                    <Route path="/stopwatch" element={<Stopwatch />} />
                    <Route path="/" element={<Navigate to="/time" />} />
                </Routes>
            </CenterContainer>
            <SideContainer>
                <FullscreenButton color="inherit" onClick={handleFullscreenClick}>
                    <FullscreenIcon />
                </FullscreenButton>
            </SideContainer>
        </RootContainer>
    );
};

export default MainLayout;
