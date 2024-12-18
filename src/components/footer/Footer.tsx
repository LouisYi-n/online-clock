import React from "react";
import { Box, Typography } from '@mui/material';

const Footer: React.FC = () => {
    const year = new Date().getFullYear();
    return (
    <Box component="footer" sx={{ py: 2, textAlign: 'center', width: '100%', backgroundColor: '#e6f4ff', marginTop: 'auto' }}>
        <Typography variant="body2" color="textSecondary">
            Copyright © {year} 打一张南风
        </Typography>
        <Typography variant="body2" color="textSecondary">
            鄂ICP备2024086359号-1
        </Typography>
    </Box>
    )
}

export default Footer;
