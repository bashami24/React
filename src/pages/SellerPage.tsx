import React, { useEffect, useState } from 'react';
import SellerList from '../components/SellerList';
import { getAllSellersAPI, addSellerAPI } from '../services/SellerService';
import { Seller } from '../models/Seller';

const SellerPage: React.FC = () => {
    const [sellers, setSellers] = useState<Seller[]>([]);
    const [showAddSellerForm, setShowAddSellerForm] = useState(false);
    const [newSellerId, setNewSellerId] = useState(0);
    const [newSellerName, setNewSellerName] = useState('');
   

    useEffect(() => {
        getAllSellersAPI().then(response => response.json()).then(data => setSellers(data));
    }, []);

    const handleAddSeller = () => {
        addSellerAPI(newSellerId,newSellerName).then(() => {
            getAllSellersAPI().then(response => response.json()).then(data => {
                setSellers(data);
                setShowAddSellerForm(false);
                setNewSellerId(0);
                setNewSellerName('');
                
            });
        });
    };

    return (
        <div>
            <h1>Sellers</h1>
            <img src= "https://cdn.pixabay.com/photo/2017/08/07/19/46/shop-2607121_1280.jpg" style={{width: '350px', height: 'auto', margin: '10px'}}/>
            <SellerList sellers={sellers} />
            {showAddSellerForm ? (
                <div>
                    <input
                    type="number"
                    placeholder='Enter Seller Id'
                    value={newSellerId}
                    onChange={(e) => setNewSellerId(parseInt(e.target.value))}/>
                    
                    <input
                        type="text"
                        placeholder="Enter seller name"
                        value={newSellerName}
                        onChange={(e) => setNewSellerName(e.target.value)}/>
                        <button onClick={handleAddSeller}>Add Seller</button>
                    
                </div>
            ) : (
                <button onClick={() => setShowAddSellerForm(true)}>Add New Seller</button>
            )}

            

            
        </div>
    );
};

export default SellerPage;