import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import { Link, NavLink } from 'react-router-dom';
import { useState, useContext } from 'react';
import UserContext from '../UserContext';

export default function AppNavbar(){
	const { user } = useContext(UserContext);

	return (
		<Navbar className="Navbar" expand="lg fixed-top">
			<Container fluid>
				<Navbar.Brand as={Link} to="/">MeowExpress</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav"/>
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto">
						<Nav.Link as={NavLink} to="/" exact="true">Home</Nav.Link>
						<Nav.Link as={NavLink} to="/products" exact="true">Products</Nav.Link>
						{(user.id !== null) ? 
							user.isAdmin 
							?
							<>
								<Nav.Link as={Link} to="/addProduct" exact="true">Add Product</Nav.Link>
								<Nav.Link as={Link} to="/logout">Logout</Nav.Link>
							</>
							:
							<>

								<Nav.Link as={NavLink} to="/cart" exact="true">Cart</Nav.Link>
								<Nav.Link as={NavLink} to="/orders" exact="true">Orders</Nav.Link>
								<Nav.Link as={Link} to="/profile">Profile</Nav.Link>
								<Nav.Link as={Link} to="/logout">Logout</Nav.Link>
							</>
							: 
							<>
								<Nav.Link as={Link} to="/register" exact="true">Register</Nav.Link>
								<Nav.Link as={Link} to="/login" exact="true">Login</Nav.Link>
							</>
							}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}