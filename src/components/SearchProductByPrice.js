import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Form, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';
import ProductCard from './ProductCard';

export default function SearchProductByPrice() {
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [products, setProducts] = useState({ data: [] });

    const handleSearchProducts = async () => {
        try {
            // Input validation
            if (!minPrice || !maxPrice || isNaN(minPrice) || isNaN(maxPrice)) {
                Swal.fire('Error', 'Please enter valid min and max prices', 'error');
                return;
            }

            const response = await fetch('https://meow-express.onrender.com/b3/products/products/searchByPrice', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({
                    minPrice: parseFloat(minPrice), // Convert to float
                    maxPrice: parseFloat(maxPrice), // Convert to float
                }),
            });

            if (response.ok) {
                const productData = await response.json();
                
                // Check if products were found
                if (productData.data.length === 0) {
                    Swal.fire('No Results', 'No products found within the specified price range', 'info');
                }

                setProducts(productData);
            } else {
                // Handle different types of errors
                const errorData = await response.json();
                Swal.fire('Error', errorData.message || 'Failed to fetch products', 'error');
            }
        } catch (error) {
            console.error('Error searching products:', error);
        }
    };

    return (
        <div>
            <Form>
                <Form.Group controlId="formMinPrice">
                    <Form.Label>Minimum Price</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter min price"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formMaxPrice">
                    <Form.Label>Maximum Price</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter max price"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                    />
                </Form.Group>
                <br></br>
                <Button variant="primary" onClick={handleSearchProducts}>
                    Search Products
                </Button>
                <ul>
                    {products.data.map(product => (
                        <ProductCard productProp={product} key={product._id} />
                    ))}
                </ul>
            </Form>
        </div>
    );
};
