import React from 'react';
import Menu from './components/menu/Menu.tsx';
import { Container } from '@mui/material';
import './App.css';

const App: React.FC = () => {
    return (
        <div className="App">
            <Menu />
            <Container>
                <header className="App-header">
                    <h1>在线时钟</h1>
                </header>
            </Container>
        </div>
    );
};

export default App;