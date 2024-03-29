import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import HomePage from './pages/Homepage';
import SellerPage from './pages/SellerPage';
import ProductPage from './pages/ProductPage';
import PageNotFoundPage from './pages/PageNotFoundPage';
import './App.css';

const App: React.FC = () => {
    const [theme, setTheme] = useState<'dark' | 'light'>('dark');

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    return (
        <Router>
            <div className={theme}>
                <NavigationBar toggleTheme={toggleTheme} />
                <div className="sidebar">
                    <ul>
                    <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/sellers" element={<SellerPage />} />
                    <Route path="/products" element={<ProductPage />} />
                    <Route path="*" element={<PageNotFoundPage />} />
                </Routes>
                    </ul>
                </div>

            </div>
        </Router>
    );
};

export default App;