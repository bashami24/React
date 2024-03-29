import React, { useEffect, useState } from 'react';
import { getAllSellersAPI } from '../services/SellerService';
import { Product } from '../models/Product';
import {Seller} from '../models/Seller';
import { getAllProductsAPI, addProductAPI, deleteProductAPI, updateProductAPI } from '../services/ProductService';

const ProductPage: React.FC = () => {
    const[newName, setNewName] = useState<string>('');
    const[newPrice, setNewPrice] = useState<number>();
    const[newSeller, setNewSeller] = useState<number>();
    const [products, setProducts] = useState<Product[]>([]);
    const [sellers, setSellers] = useState<Seller[]>([]);
    const [showMenuId, setShowMenuId] = useState<number | null>(null);
    const [newProduct, setNewProduct] = useState<{ name: string; price: number; seller: number}>({
        name: '',
        price: 0,
        seller: 0
    });
    
    useEffect(() => {
        getAllProductsAPI().then(response => response.json()).then(data => setProducts(data));
    }, []);
    useEffect (() => {
    getAllSellersAPI().then(response => response.json()).then(data => setSellers(data));
    }, []);
    const toggleMenu = (productId: number) => {
        setShowMenuId((prevId) => (prevId === productId ? null : productId));
    };
    const handleDeleteProduct = (productId: number) => { if (productId) {
        deleteProductAPI(productId).then(() => {
            getAllProductsAPI().then(response => response.json()).then(data => setProducts(data));
            setShowMenuId(null);
        });
    }
    };
    /*const handleUpdateProduct = (id: number, newName: string, newPrice: number, newSeller: number) => {
        updateProductAPI(id, newName, newPrice, newSeller).then(() => {
            setProducts(products.map(product => (product.id === id ? { ...product, name: newName, price: newPrice, seller: newSeller } : product)));
            setShowMenuId(null);
        });
    };*/
    const handleUpdateProduct = (id: number, newName: string, newPrice: number, newSeller: number) => {
        if(!newName || newPrice === 0 || newSeller === 0){ 
           
            return;
        }
        if(!sellers.some(seller =>seller.id === newSeller)){
            return;
        }
        updateProductAPI(id, newName, newPrice, newSeller).then(() => {
            const updatedProducts = products.map(product => {
                if (product.id === id) {
                    return { ...product, name: newName, price: newPrice, seller: newSeller };
                }
                return product;
            });
            setProducts(updatedProducts);
            setShowMenuId(null);
        });
    };
    const handleAddProduct = async () => {
        await addProductAPI(newProduct.name, newProduct.price, newProduct.seller);
        setNewProduct({ name: '', price: 0, seller: 0});
        getAllProductsAPI().then(response => response.json()).then(data => setProducts(data));
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewProduct(prevState => ({ ...prevState, [name]: name === 'price' || name === 'seller' ? parseInt(value) : value }));
    };
    return (
        <div>
            <h1>Products</h1>
            <img src="https://cdn.pixabay.com/photo/2016/11/18/12/08/white-male-1834125_1280.jpg" style={{width: '250px', height: 'auto', }}/>
            <h2 style={{fontStyle: 'italic'}}>Product List</h2>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        {product.name} - {product.price} - {product.seller}
                        <button onClick={() => toggleMenu(product.id)}>Please Click here to choose</button>
                        {showMenuId === product.id && (
                            <div>
                           <input type="text" placeholder="New Name" onChange={(e) => setNewName(e.target.value)} />
                                <input type="number" placeholder="New Price" onChange={(e) => setNewPrice(parseInt(e.target.value) || 0)} />
                                <select value={newSeller} onChange={(e) => setNewSeller(parseInt(e.target.value))}>
                                    <option value="">Select Seller</option>
                                    {sellers.map((seller) => (
                                        <option key={seller.id} value={seller.id}>{seller.id}</option>
                                    ))}
                                </select>
                                <input type="number" name="id" value={product.id} onChange={handleChange} />
                                <button onClick={() => handleUpdateProduct(product.id, newName, newPrice || 0, newSeller || 0)}>Update</button>
                                {!newName || newPrice === 0 || newSeller === 0 ?
                                    <p style={{ color: 'red' }}>Cannot Update the product. Please enter valid value for Name, Price, and Seller</p>
                                    : null}
                                <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
            <h2>Add Product</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleAddProduct(); }}>
                <label>
                    Name:
                    <input type="text" name="name" value={newProduct.name} onChange={handleChange} />
                </label>
                <label>
                    Price:
                    <input type="number" name="price" value={newProduct.price} onChange={handleChange} />
                </label>
                <label>
                    Seller ID:
                    <input type="number" name="seller" value={newProduct.seller} onChange={handleChange} />
                </label>
                <button type="submit">Add Product</button>
            </form>
           
        </div>
    );
};
export default ProductPage;