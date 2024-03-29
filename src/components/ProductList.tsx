import React, { useEffect, useState } from 'react';
import { Product } from '../models/Product';
import { getAllProductsAPI, deleteProductAPI, addProductAPI } from '../services/ProductService';

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [showMenuId, setShowMenuId] = useState<number | null>(null);
    const [newProduct, setNewProduct] = useState<{  name: string; price: number; seller: number }>({
        name: '', price: 0,seller: 0
    });

    useEffect(() => {
        getAllProductsAPI().then(response=> response.json()).then(data => setProducts(data));
    }, []);

    const toggleMenu = (id: number) => {
        setShowMenuId((prevId) => (prevId === id ? null : id));
    };

    const handleDeleteProduct = async (productId: number) => {
        await deleteProductAPI(productId);
        getAllProductsAPI().then(response=> response.json()).then(data => setProducts(data));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewProduct(prevState => ({ ...prevState, [name]: name === 'price' || name === 'seller' || name === 'id' ? parseInt(value) ||'': value }));
    };

    const handleAddProduct = async () => {
        await addProductAPI( newProduct.name, newProduct.price, newProduct.seller);
        setNewProduct({ name: '', price: 0, seller: 0 });
        getAllProductsAPI().then(response=> response.json()).then(data => setProducts(data));
    };

    return (
        <div>
            <h2>Product</h2>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        {product.name} - {product.price} - {product.seller}
                        <button onClick={() => toggleMenu(product.id)}>Toggle Menu</button>
                        {showMenuId === product.id && (
                            <div>
                                <button onClick={() => console.log(`Update product ${product.id}`)}>Update</button>
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
                    <input type="number" name="price" value={newProduct.price||''} onChange={handleChange} />
                </label>
                <label>
                    Seller ID:
                    <input type="number" name="seller" value={newProduct.seller||''} onChange={handleChange} />
                </label>
                <button type="submit">Add Product</button>
            </form>
        </div>
    );
};

export default ProductList;