import React, { useState, useEffect, useContext } from 'react';
import { Table, Button, Modal, Form, Container, Row, Col, Card } from 'react-bootstrap';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

export default function Cart() {
  const { user } = useContext(UserContext);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0); // State for total price

  useEffect(() => {
    // Fetch product data
    fetchCarts();
  }, []);

  // Fetch the Data of User Cart and the Cart Product Description
  const fetchCarts = () => {
    // Retrieve the token from local storage
    const token = localStorage.getItem('token');

    // Fetch products from the backend
    fetch('https://meow-express.onrender.com/b3/cart/get-cart', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then(async (data) => {

        // Extracting product IDs from cart items
        const productIds = data.cart.cartItems.map(item => item.productId);

        // Fetching individual product details for each product ID
        const productDetailsPromises = productIds.map(productId => {
          return fetch(`https://meow-express.onrender.com/b3/products/${productId}`)
            .then(response => response.json())
            .then(productData => productData); // Return the product data
        });

        // Wait for all product detail requests to complete
        const productsData = await Promise.all(productDetailsPromises);

        // Extracting image src from each product data
        const imageSrcList = productsData.map(productData => productData.product.src);

        // Merge product details with cart items
        const updatedCartItems = data.cart.cartItems.map((item, index) => {
          return {
            ...item,
            image: imageSrcList[index] // Assign image URL to each cart item
          };
        });

        console.log(data.cart._id);

        setCartItems(updatedCartItems); // Set the cartItems state with updated cart items including image URLs
        setTotalPrice(data.cart.totalPrice); // Set the total price state
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  };

  // Function to handle increasing quantity
  const handleIncrement = (index) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems[index].quantity += 1;
    setCartItems(updatedCartItems);
  };

  // Function to handle decreasing quantity
  const handleDecrement = (index) => {
    const updatedCartItems = [...cartItems];
    if (updatedCartItems[index].quantity > 0) {
      updatedCartItems[index].quantity -= 1;
      setCartItems(updatedCartItems);
    }
  };

  const ClearCart = () => {
    // Retrieve the token from local storage
    const token = localStorage.getItem('token');

    // Options for the fetch request
    const options = {
      method: 'DELETE', // Assuming you want to add to cart via POST request
      headers: {
        'Content-Type': 'application/json', // Specify content type as JSON
        'Authorization': `Bearer ${token}` // Include bearer token in the Authorization header
      }
    };

    fetch('https://meow-express.onrender.com/b3/cart/clear-cart', options)
    .then(response => {
      if (response.ok) {
        Swal.fire({
          title: "Success",
          icon: "success",
          text: "Products Remove to cart successfully!"
        });

        fetchCarts();
        // Additional actions upon successful addition to cart can be added here
      } else {
        console.error('Failed to add product to cart:', response.statusText);
        // Additional error handling can be added here
      }
    })
    .catch(error => {
      console.error('Error adding product to cart:', error);
      // Additional error handling can be added here
    });
  }

  const CheckOut = () => {
    // Retrieve the token from local storage
    const token = localStorage.getItem('token');

    // Options for the fetch request
    const options = {
      method: 'POST', // Assuming you want to add to cart via POST request
      headers: {
        'Content-Type': 'application/json', // Specify content type as JSON
        'Authorization': `Bearer ${token}` // Include bearer token in the Authorization header
      }
    };

    fetch('https://meow-express.onrender.com/b3/orders/checkout', options)
    .then(response => {
      if (response.ok) {
        // Swal.fire({
        //   title: "Success",
        //   icon: "success",
        //   text: "Products Check-Out successfully!"
        // });

        // Redirect to the "/products" section after successful checkout
        window.location.href = "/orders";
        // Additional actions upon successful addition to cart can be added here
      } else {
        console.error('Failed to add product to cart:', response.statusText);
        // Additional error handling can be added here
      }
    })
    .catch(error => {
      console.error('Error adding product to cart:', error);
      // Additional error handling can be added here
    });
  }
  


  return (
    <>
      <div className="container d-flex Page-container p-5">
        <h1 className="mt-5 text-center">Cart</h1>

        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="/">Home</a></li>
            <li className="breadcrumb-item"><a href="/products">Products</a></li>
            <li className="breadcrumb-item active" aria-current="page">Cart</li>
          </ol>
        </nav>

        <div className="check-out-div">
          <h2 className="my-3">Check-Out:</h2>

          <div className="d-flex">
            <h4>Total:</h4>
            <h4 className="Total-Price ms-auto">&#8369; {totalPrice}</h4>
          </div>
          <div className="d-flex ms-auto">
            <a type="button" className="btn btn-danger mx-2" onClick={() => ClearCart()}>Clear Cart</a>
            <a type="button" className="btn btn-primary" onClick={() => CheckOut()}>Check-out</a>
          </div>
          <hr />
        </div>

        <div className="container-fluid row">
          <div className="col-12">
            {cartItems.map((item, index) => (
              <Col md={12} key={index}>
                <Card className="mb-4 cardHighlight">
                  <Card.Body className="card-featured-body row">
                    <div className="d-flex col-2">
                      <img className="m-auto" src={item.image} width="100" height="100" alt="product" />
                    </div>
                    <div className="card-featured-body-text px-3 my-auto col-8">
                      <Card.Title>{item.name}</Card.Title>
                      <Card.Text>
                        Price: {item.price}
                      </Card.Text>
                      <div className="d-flex">
                        <Form.Control className="w-25" type="number" id="quantity" placeholder="quantity" value={item.quantity} disabled required />
                        <button type="button" className="cart-quantity-minus btn btn-primary mx-2" disabled onClick={() => handleDecrement(index)}>-</button>
                        <button type="button" className="cart-quantity-plus btn btn-primary mx-2" disabled onClick={() => handleIncrement(index)}>+</button>
                      </div>

                    </div>
                    <div className="ms-auto card-featured-body-Price col-2 my-auto">
                      <div>Sub-total:</div>
                      <div className="card-featured-price fw-bold">&#8369; {item.subTotal}</div>
                      <div className="gap-2">
                        <a type="button" className="btn btn-primary mx-2">Edit</a>
                        <a type="button" className="btn btn-danger">Remove</a>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
