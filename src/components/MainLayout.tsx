import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography, IconButton } from '@mui/material';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import Time from './Time.tsx';
import Menu from './menu/Menu.tsx';

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

    const handleMenuItemClick = (menuTitle: string) => {
        setTitle(menuTitle);
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
                <Time />
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
