import React, { useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import ProductCard from './ProductCard';

export default function ProductSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch('https://meow-express.onrender.com/b3/products/products/searchByName', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: searchQuery })
      });
      const data = await response.json();
      console.log(data);
      setSearchResults(data);
      setSearchQuery('');
    } catch (error) {
      console.error('Error searching for products:', error);
    }
  };
  return (
    <div>
      <div className="form-group">
        <label htmlFor="productName">Product Name:</label>
        <input
          type="text"
          id="productName"
          className="form-control"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
      </div>
      <br></br>
      <Button className="btn btn-primary" onClick={handleSearch}>
        Search
      </Button>
        {searchResults.map((product) => (
          <Row key={product._id} className="mb-4">
            <ProductCard productProp={product} />
          </Row>
        ))}
    </div>
  );
}
