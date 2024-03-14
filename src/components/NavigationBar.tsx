import React from 'react';
import { Link } from 'react-router-dom';

interface NavigationBarProps {
    toggleTheme: () => void;
}
const NavigationBar: React.FC<NavigationBarProps> = ({toggleTheme}) => {
    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/sellers">Sellers</Link></li>
                <li><Link to="/products">Products</Link></li>
            </ul>
            <button onClick={toggleTheme}>Toggle Theme</button>
        </nav>
    );
};

export default NavigationBar;