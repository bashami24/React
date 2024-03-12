import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import HomePage from './pages/Homepage';
import SellerPage from './pages/SellerPage';
import ProductPage from './pages/ProductPage';
import PageNotFoundPage from './pages/PageNotFoundPage';

const App: React.FC = () => {
    return (
        <Router>
            <div>
                <NavigationBar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/sellers" element={<SellerPage />} />
                    <Route path="/products" element={<ProductPage />} />
                    <Route path="*" element={<PageNotFoundPage />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;