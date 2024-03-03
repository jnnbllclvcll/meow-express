import { Card, Button, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function ProductCard({ productProp }) {
	const { _id, name, description, price, imageUrl } = productProp;

	const cardStyle = {
		height: '100%',
		width: '100%'
	};

	return (
		<Col md={4} sm={6} className="mb-4 d-flex justify-content-center align-items-center">
			<Card style={cardStyle}>
				<Card.Img variant="top" src={imageUrl} alt={name} />
				<Card.Body className="text-center">
					<Card.Title>{name}</Card.Title>
					<Card.Subtitle>Description:</Card.Subtitle>
					<Card.Text>{description}</Card.Text>
					<Card.Subtitle>Price:</Card.Subtitle>
					<Card.Text>&#8369;{price}.00</Card.Text>
					<Link className="btn btn-primary" to={`/products/${_id}`}>
						Details
					</Link>
				</Card.Body>
			</Card>
		</Col>
	);
}

ProductCard.propTypes = {
	productProp: PropTypes.shape({
		_id: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		price: PropTypes.number.isRequired,
		imageUrl: PropTypes.string.isRequired,
	}),
};
