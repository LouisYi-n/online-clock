import React, { useState } from 'react';
import { IconButton, Menu as MUIMenu, MenuItem, AppBar, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/material/styles';


const StyledIconButton = styled(IconButton)(({ theme }) => ({
    color: '#595959',
    '&:hover': {
        backgroundColor: '#bfbfbf', // 悬停时的背景色
    },
}));

const Menu: React.FC<{ onMenuItemClick: (menuTitle: string) => void }> = ({ onMenuItemClick }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleMenuItemClick = (menuTitle: string) => {
        onMenuItemClick(menuTitle);
        handleMenuClose();
    };

    const renderMenu = (
        <MUIMenu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={() => handleMenuItemClick('在线时间')}>在线时间</MenuItem>
            <MenuItem onClick={() => handleMenuItemClick('闹钟')}>闹钟</MenuItem>
            <MenuItem onClick={() => handleMenuItemClick('计时器')}>计时器</MenuItem>
            <MenuItem onClick={() => handleMenuItemClick('秒表')}>秒表</MenuItem>
        </MUIMenu>
    );

    return (
        <>
                <Toolbar>
                    <StyledIconButton
                        edge="start"
                        aria-label="menu"
                        onClick={handleMenuOpen}
                    >
                        <MenuIcon />
                        <Typography variant="body1" component="span" sx={{ marginLeft: 1 }}>
                            菜单
                        </Typography>
                    </StyledIconButton>
                    {renderMenu}
                </Toolbar>
        </>
    );
};

export default Menu;
