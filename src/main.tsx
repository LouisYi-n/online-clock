import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';

const theme = createTheme({
    palette: {
        background: {
            default: '#f9f0ff', // 设置全局背景色为绿色
        },
    },
});
// 获取根元素的容器
const container = document.getElementById('root');
if (container) {
    const root = ReactDOM.createRoot(container);

    // 使用 createRoot 渲染元素
    root.render(
        <React.StrictMode>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <App />
            </ThemeProvider>
        </React.StrictMode>
    );
} else {
    console.error("根容器 'root' 未找到");
}
