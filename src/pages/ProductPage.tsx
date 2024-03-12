
import React, { useEffect, useState } from 'react';
import { Product } from '../models/Product';
import { getAllProductsAPI, addProductAPI, deleteProductAPI, updateProductAPI } from '../services/ProductService';

const ProductPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [showMenuId, setShowMenuId] = useState<number | null>(null);
    const [newProduct, setNewProduct] = useState<{ id:number;name: string; price: number; seller: number }>({
        id: 0,
        name: '',
        price: 0,
        seller: 0
    });

    useEffect(() => {
        getAllProductsAPI().then(response=> response.json()).then(data => setProducts(data));
    }, []);

    const toggleMenu = (productId: number) => {
        setShowMenuId((prevId) => (prevId === productId ? null : productId));
    };

    const handleDeleteProduct = (productId: number) => {
        deleteProductAPI(productId).then(() => {
            getAllProductsAPI().then(response=> response.json()).then(data => setProducts(data));
            setShowMenuId(null);
        });
    };

    const handleUpdateProduct = (id: number, newName: string, newPrice: number, newSeller: number) => {
        updateProductAPI(id, newName, newPrice, newSeller).then(() => {
            getAllProductsAPI().then(response=> response.json()).then(data => setProducts(data));
            setShowMenuId(null);
        });
    };

    const handleAddProduct = async () => {
        await addProductAPI(newProduct.id, newProduct.name,newProduct.price, newProduct.seller);
        setNewProduct({ id:0,name: '', price: 0, seller: 0 });
        getAllProductsAPI().then(response=> response.json()).then(data => setProducts(data));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewProduct(prevState => ({ ...prevState, [name]: name === 'price' || name === 'seller' ? parseInt(value) : value }));
    };

    return (
        <div>
            <h1>Products</h1>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        {product.name} - {product.price} - {product.seller}
                        <button onClick={() => toggleMenu(product.id)}>Toggle Menu</button>
                        {showMenuId === product.id && (
                            <div>
                                <button onClick={() => handleUpdateProduct(product.id, 'New Name', 0, 0)}>Update</button>
                                <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
            <h2>Add Product</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleAddProduct(); }}>
            <label>
                    id:
                    <input type="number" name="id" value={newProduct.id} onChange={handleChange} />
                </label>
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