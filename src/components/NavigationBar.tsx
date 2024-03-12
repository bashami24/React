import React from 'react';
import { Link } from 'react-router-dom';

const NavigationBar: React.FC = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/sellers">Sellers</Link></li>
                <li><Link to="/products">Products</Link></li>
            </ul>
        </nav>
    );
};

export default NavigationBar;