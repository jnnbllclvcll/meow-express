import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

export default function FeaturedProduct() {

  const [previews, setPreviews] = useState([]);

  useEffect(() => {
    fetch('https://meow-express.onrender.com/b3/products/')
      .then((res) => res.json())
      .then((data) => {
        // Shuffle the data array randomly
        const shuffledData = data.sort(() => Math.random() - 0.5);
        // Select the first three elements of the shuffled array
        const randomThree = shuffledData.slice(0, 3);
        setPreviews(randomThree.map(product => (
          <Col key={product._id} md={12}>
            <Card className="mb-4 cardHighlight">
              <Card.Body className="card-featured-body row">
                <div className="d-flex col-2">
                  <img className="m-auto" width="100" height="100" src={product.src} alt="cat"/>
                </div>
                <div className="card-featured-body-text px-3 my-auto col-8">
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>
                    {product.description}
                  </Card.Text>
                  <div className="card-featured-body-category">
                    <span className="badge text-bg-primary py-2">{product.category}</span>
                  </div>
                </div>
                <div className="ms-auto card-featured-body-Price col-2 my-auto">
                  <div>Price:</div>
                  <div className="card-featured-price fw-bold">&#8369; {product.price}</div>
                  <a href="/products" type="button" className="card-featured-body-btn btn btn-primary">Shop Now!</a>
                </div>
              </Card.Body>
            </Card>
          </Col>
        )));
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <>
      <h2 className="text-center">Featured Products</h2>
      <Container className="my-5">
        <Row className="mt-5">
          {previews}
        </Row>
      </Container>
    </>
  );
}
