import React, {useEffect, useState} from 'react';
import {styled} from '@mui/material/styles';
import {Box, Typography, IconButton} from '@mui/material';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import Time from './Time.tsx';
import Menu from './menu/Menu.tsx';
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import Timer from "./Timer.tsx";
import AlarmClock from "./AlarmClock.tsx";
import Stopwatch from "./Stopwatch.tsx";
import Footer from "./footer/Footer.tsx";

const RootContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
});

const ContentWrapper = styled(Box)(({fullScreen}) => ({
    display: 'flex',
    flexGrow: fullScreen ? 'column' : 'row',
}));

const SideContainer = styled(Box)(({fullScreen}) => ({
    width: fullScreen ? 0 : '25%',
    display: fullScreen ? 'none' : 'block',
}));

const CenterContainer = styled(Box)(({fullScreen}) => ({
    width: fullScreen ? '100%' : '50%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexGrow: 1,
}));

const FullscreenButton = styled(IconButton)({
    position: 'absolute',
    top: '16px',
    right: '16px',
    zIndex: 1000, // 确保按钮在所有内容之上
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

    // 监听全屏状态变化
    useEffect(() => {
        const handleFullscreenChange = () => {
            setFullScreen(!!document.fullscreenElement);
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
        };
    }, []);

    const handleMenuItemClick = (menuTitle: string, path: string) => {
        setTitle(menuTitle);
        navigate(path); // 跳转到对应路径
    };

    const handleFullscreenClick = () => {
        if (!fullScreen) {
            document.documentElement.requestFullscreen().catch((err) => {
                console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
            });
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen().catch((err) => {
                    console.error(`Error attempting to exit full-screen mode: ${err.message} (${err.name})`);
                });
            }
        }
    };

    return (
        <RootContainer>
            <FullscreenButton color="inherit" onClick={handleFullscreenClick}>
                <FullscreenIcon/>
            </FullscreenButton>
            <ContentWrapper fullScreen={fullScreen}>
                <SideContainer fullScreen={fullScreen}>
                    <Menu onMenuItemClick={handleMenuItemClick}/>
                </SideContainer>
                <CenterContainer fullScreen={fullScreen}>
                    <TitleContainer>
                        <Typography variant="h4" sx={{fontWeight: 'bold', color: '#595959'}}>
                            {title}
                        </Typography>
                    </TitleContainer>
                    <Routes>
                        <Route path="/time" element={<Time/>}/>
                        <Route path="/timer" element={<Timer/>}/>
                        <Route path="/alarm-clock" element={<AlarmClock/>}/>
                        <Route path="/stopwatch" element={<Stopwatch/>}/>
                        <Route path="/" element={<Navigate to="/time"/>}/>
                    </Routes>
                </CenterContainer>
                <SideContainer fullScreen={fullScreen}>
                    {/*这里留空，是为了保持 1:2:1 的布局*/}
                </SideContainer>
            </ContentWrapper>
            {!fullScreen && <Footer />}
        </RootContainer>
    );
};

export default MainLayout;
