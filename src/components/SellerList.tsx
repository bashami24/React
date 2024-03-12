import React from 'react';
import { Seller } from '../models/Seller';

interface SellerListProps {
    sellers: Seller[];
}

const SellerList: React.FC<SellerListProps> = ({ sellers }) => {
    return (
        <div>
            <h2>All Sellers</h2>
            <ul>
                {sellers.map((seller) => (
                    <li key={seller.id}>{seller.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default SellerList;