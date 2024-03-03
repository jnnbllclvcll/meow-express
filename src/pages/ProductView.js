import { useState, useEffect, useContext } from 'react';
import { Container, Card, Button, Row, Col, Form } from 'react-bootstrap';
import { useParams, useNavigate, Link } from 'react-router-dom';
import UserContext from '../UserContext';
import Swal from 'sweetalert2';

export default function CourseView() {
	const { productId } = useParams();
	const { user } = useContext(UserContext);
	const navigate = useNavigate();

	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState(0);
	const [quantity, setQuantity] = useState(1);
	const [totalPrice, setTotalPrice] = useState(price);

	const addToCart = (productId) => {
		fetch(`https://meow-express.onrender.com/b3/carts/add-to-cart`, {
			method: 'POST',
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify({
				productId: productId,
				name: name,
				description: description,
				price: totalPrice,
				quantity: quantity
				})
		})
		.then(res => res.json())
		.then(data => {
			console.log(data.message);
			if (data.message === 'Product added to cart successfully') {
				Swal.fire({
					title: 'Successfully Added to Cart',
					icon: 'success',
					text: 'You have successfully added this item to cart.'
				});
				navigate("/products");
			} else {
				Swal.fire({
					title: "Something went wrong",
					icon: "error",
					text: "Please try again"
				});
			}
		})
	}

	useEffect(() => {
		fetch(`https://meow-express.onrender.com/b3/products/${productId}`)
		.then(res => res.json())
		.then(data => {
			setName(data.product.name);
			setDescription(data.product.description);
			setPrice(data.product.price);
			setTotalPrice(data.product.price * quantity);
		})
	}, [productId, quantity]);

	const handleIncrement = () => {
		setQuantity(quantity + 1);
	}

	const handleDecrement = () => {
		if (quantity > 1) {
			setQuantity(quantity - 1);
		}
	}

  	return (
    	<Container className="mt-5">
      		<Row>
        		<Col lg={{ span: 6, offset: 3 }}>
          			<Card>
            			<Card.Body className="text-center">
              				<Card.Title>{name}</Card.Title>
		              		<Card.Subtitle>Description:</Card.Subtitle>
		              		<Card.Text>{description}</Card.Text>
		              		<Card.Subtitle>Price:</Card.Subtitle>
		              		<Card.Text>&#8369;{price}.00</Card.Text>

              				<Form.Group controlId="quantity">
                				<Form.Label>Quantity:</Form.Label>
                					<div className="input-group">
                  						<div className="input-group-prepend">
                    						<Button variant="outline-secondary" onClick={handleDecrement}>-</Button>
                  						</div>
                  						<Form.Control type="number" value={quantity} readOnly className="text-center" />
                  						<div className="input-group-append">
                    						<Button variant="outline-secondary" onClick={handleIncrement}>+</Button>
                  						</div>
                				</div>
              				</Form.Group>
              				<br></br>
              				{user.id !== null ?
                				<Button variant="primary" onClick={() => addToCart(productId)} block="true">Add to cart</Button>
                			:
                				<Link className="btn btn-danger btn-block" to="/login">Log in to continue shopping</Link>
              				}
            			</Card.Body>
          			</Card>
       	 		</Col>
      		</Row>
    	</Container>
  	)
}
