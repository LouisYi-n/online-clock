import React from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import MainLayout from './components/MainLayout';

const App: React.FC = () => {
    return (
        <Router basename="/online">
            <Routes>
                <Route path="/" element={<Navigate replace to="/time" />} />
                <Route path="/*" element={<MainLayout />} />
            </Routes>
        </Router>
    );
};

export default App;
