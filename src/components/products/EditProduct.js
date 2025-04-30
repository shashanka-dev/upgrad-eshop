import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const token='eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBkZW1vLmNvbSIsImlhdCI6MTcyODA1NTYxNiwiZXhwIjoxNzI4MDY0MDE2fQ.oU_svzONjD4uTMlLyHc8uRBOZEDd1WriuonUqrr-LqVCPYLI7IOVSXO1ICJ5aojwAzM43EqcCr-zMVoBpvFZRQ';
   
const EditProduct = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({
        id: '',
        name: '',
        category: '',
        price: '',
        description: '',
        manufacturer: '',
        availableItems: '',
        imageUrl: ''
    });

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`https://dev-project-ecommerce.upgrad.dev/api/products/${id}`, {
                    headers: {
                        'x-auth-token': token, // Replace with your actual token logic
                    }
                });

                if (!response.ok) {
                    throw new Error('Error fetching product');
                }

                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchProduct();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://dev-project-ecommerce.upgrad.dev/api/products/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token // Replace with your actual token logic
                },
                body: JSON.stringify(product)
            });

            if (!response.ok) {
                throw new Error('Error updating product');
            }

            const data = await response.json();
            console.log('Product updated:', data);
            // Optionally redirect or reset form after successful update
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Update Product</h1>
            <input 
                type="text" 
                name="name" 
                value={product.name} 
                onChange={handleChange} 
                placeholder="Product Name" 
                required 
            />
            <input 
                type="text" 
                name="category" 
                value={product.category} 
                onChange={handleChange} 
                placeholder="Category" 
                required 
            />
            <input 
                type="number" 
                name="price" 
                value={product.price} 
                onChange={handleChange} 
                placeholder="Price" 
                required 
            />
            <textarea 
                name="description" 
                value={product.description} 
                onChange={handleChange} 
                placeholder="Description" 
                required 
            />
            <input 
                type="text" 
                name="manufacturer" 
                value={product.manufacturer} 
                onChange={handleChange} 
                placeholder="Manufacturer" 
                required 
            />
            <input 
                type="number" 
                name="availableItems" 
                value={product.availableItems} 
                onChange={handleChange} 
                placeholder="Available Items" 
                required 
            />
             <input 
                type="text" 
                name="imageUrl" 
                value={product.imageUrl} 
                onChange={handleChange} 
                placeholder="Image Url" 
                required 
            />
            <button type="submit">Update Product</button>
        </form>
    );
};

export default EditProduct;