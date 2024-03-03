import React, { useState, useEffect, useContext } from 'react';
import { Table, Button, Modal, Form, Container, Row, Col, Card } from 'react-bootstrap';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

export default function Cart() {
  const { user } = useContext(UserContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    const token = localStorage.getItem('token');
    fetch('https://meow-express.onrender.com/b3/orders/my-orders', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setOrders(data.orders); // Set fetched orders in state
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
      });
  };

  return (
    <>
      <div className="container d-flex Page-container p-5">
        <h1 className="mt-5 text-center">Orders</h1>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="/">Home</a></li>
            <li className="breadcrumb-item"><a href="/products">Products</a></li>
            <li className="breadcrumb-item"><a href="/cart">Carts</a></li>
            <li className="breadcrumb-item active" aria-current="page">Orders</li>
          </ol>
        </nav>
        <div className="container-fluid row">
          {orders.map(order => (
            <div className="col-12 my-3" key={order._id}>
              <h3 className="mb-2">Purchase Date: {order.purchasedOn}</h3>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th className="th-product">Product</th>
                    <th className="th-price">Price</th>
                    <th className="th-quantity">Quantity</th>
                    <th className="th-sub-total">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {order.cartItems.map(item => (
                    <tr key={item._id}>
                      <td>{item.name}</td>
                      <td className="text-center">{item.price}</td>
                      <td className="text-center">{item.quantity}</td>
                      <td className="text-center">{item.subTotal}</td>
                    </tr>
                  ))}
                  <tr>
                    <td ></td>
                    <td colSpan="3"><strong>Order Total: {order.totalAmount}</strong></td>
                  </tr>
                </tbody>
              </Table>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
