import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

export default function Highlights(){
	return (
        <Container className="my-5">
            <h2 className="text-center">Explore Our Cat Pet Shop</h2>
            <Row className="mt-5">

                {/* Highlight 1: Expert Advice */}

                <Col md={4}>
                    <Card className="mb-4 card">
                        <Card.Body className="card-highlights-body">
                            <div className="card-img">
                                <img width="100" height="100" src="https://img.icons8.com/plasticine/100/cat.png" alt="cat"/>
                            </div>
                            <Card.Title>Expert Advice</Card.Title>
                            <Card.Text>
                                Our knowledgeable staff is here to provide expert advice on choosing the right products for your cat's specific needs.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                
                {/* Highlight 2: Wide Selection */}
                <Col md={4}>
                    <Card className="mb-4 card">
                        <Card.Body className="card-highlights-body">
                            <div className="card-img">
                                <img width="100" height="100" src="https://img.icons8.com/bubbles/100/cat.png" alt="cat"/>
                            </div>
                            <Card.Title>Wide Selection of Products</Card.Title>
                            <Card.Text>
                                Explore a variety of cat foods, toys, grooming products, and more to keep your furry friend happy and healthy.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Highlight 3: Exclusive Deals */}
                <Col md={4}>
                    <Card className="mb-4 card">
                        <Card.Body className="card-highlights-body">
                            <div className="card-img">
                                <img width="100" height="100" src="https://img.icons8.com/clouds/100/cat.png" alt="cat"/>
                            </div>
                            <Card.Title>Exclusive Deals</Card.Title>
                            <Card.Text className="text-start">
                                Enjoy special discounts and exclusive deals on premium cat products. Find quality items at affordable prices.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}