import React, { useEffect, useState } from 'react';
import SellerList from '../components/SellerList';
import { getAllSellersAPI, addSellerAPI } from '../services/SellerService';
import { Seller } from '../models/Seller';

const SellerPage: React.FC = () => {
    const [sellers, setSellers] = useState<Seller[]>([]);
    const [showAddSellerForm, setShowAddSellerForm] = useState(false);
    const [newSellerName, setNewSellerName] = useState('');
    const [newSellerId, setNewSellerId] = useState(0);

    useEffect(() => {
        getAllSellersAPI().then(response => response.json()).then(data => setSellers(data));
    }, []);

    const handleAddSeller = () => {
        addSellerAPI(newSellerName,newSellerId).then(() => {
            getAllSellersAPI().then(response => response.json()).then(data => {
                setSellers(data);
                setShowAddSellerForm(false);
                setNewSellerName('');
                setNewSellerId(0);
            });
        });
    };

    return (
        <div>
            <h1>Sellers</h1>
            <SellerList sellers={sellers} />
            {showAddSellerForm ? (
                <div>
                    <input
                        type="text"
                        placeholder="Enter seller name"
                        value={newSellerName}
                        onChange={(e) => setNewSellerName(e.target.value)}
                    />
                    <input
                    type="number"
                    placeholder='Enter Seller Id'
                    value={newSellerId}
                    onChange={(e) => setNewSellerId(parseInt(e.target.value))}/>
                    <button onClick={handleAddSeller}>Add Seller</button>
                </div>
            ) : (
                <button onClick={() => setShowAddSellerForm(true)}>Add New Seller</button>
            )}
        </div>
    );
};

export default SellerPage;