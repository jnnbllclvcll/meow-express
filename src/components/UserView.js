import { useState, useEffect, useContext } from 'react';
import { Modal, Button, Form } from 'react-bootstrap'; // Import Modal and Button
import UserContext from '../UserContext';
import Swal from 'sweetalert2';

export default function UserView() {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [selectedProduct, setSelectedProduct] = useState(null); // State to store selected product
  const { user } = useContext(UserContext);
  const [quantity, setQuantity] = useState(1); // Default quantity is set to 1

  useEffect(() => {
    // Fetch product data
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    // Fetch products from the backend
    fetch('https://meow-express.onrender.com/b3/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        // console.log(data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  };

  const selectToAddCart = (productId, src, name, description, price) => {
    // Store the selected product details
    setSelectedProduct({ productId, src, name, description, price });
    setShowModal(true); // Open the modal
  };

  const AddtoCart = (productId, quantity, totalPrice) => {
    // Prepare the data to be sent in the request body
    const data = {
      productId: productId,
      quantity: quantity.toString() // Ensure quantity is converted to string
    };

    // Retrieve the token from local storage
    const token = localStorage.getItem('token');

    // Options for the fetch request
    const options = {
      method: 'POST', // Assuming you want to add to cart via POST request
      headers: {
        'Content-Type': 'application/json', // Specify content type as JSON
        'Authorization': `Bearer ${token}` // Include bearer token in the Authorization header
      },
      body: JSON.stringify(data) // Convert data to JSON string
    };

    fetch('https://meow-express.onrender.com/b3/cart/add-to-cart', options)
    .then(response => {
      if (response.ok) {
        
        Swal.fire({
          title: "Success",
          icon: "success",
          text: "Product added to cart successfully!"
        });

        setShowModal(false); // Close the modal
        setQuantity(1);
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
  };


  return (
    <>
      <div className="container d-flex Page-container p-5">
        <h1 className="mt-5 text-center">Product</h1>

        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="/">Home</a></li>
            <li className="breadcrumb-item active" aria-current="page">Products</li>
          </ol>
        </nav>

        <div className="row">
          {products.filter(product => product.isAvailable).map(product => (
            <div className="col-4 p-3" key={product._id}>
              <div className="products-card card">
                <img src={product.src} className="card-img-top" alt={product.name} />
                <div className="mb-auto">
                  <h5 className="card-title mt-auto">{product.name}</h5>
                  <p className="card-text">{product.description}</p>
                </div>
                <div className="products-card-body">
                  <div className="my-3">
                    {user.id !== null ?
                      <a className="btn btn-primary" onClick={() => selectToAddCart(product._id, product.src, product.name, product.description, product.price)}>&#8369; {product.price}</a>
                      :
                      <a href="/login" className="btn btn-primary">&#8369; {product.price}</a>
                    }
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={() => { setShowModal(false); setQuantity(1); }}>
        <Modal.Header closeButton>
          <Modal.Title>Add to Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body className="product-modal-body">
          <img className="mx-auto product-modal-img" src={selectedProduct?.src} alt={selectedProduct?.name} />
          <h5 className="mt-3">{selectedProduct?.name}</h5>
          <p>{selectedProduct?.description}</p>
          <Form.Control className="my-3" type="number" id="quantity" placeholder="quantity" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} required />
          {selectedProduct && (
            <p>
              Price per unit: {selectedProduct.price} <br />
              Total Price: {quantity ? selectedProduct.price * quantity : 0}
            </p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => { setShowModal(false); setQuantity(1); }}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              if (selectedProduct) {
                const totalPrice = quantity ? selectedProduct.price * quantity : 0;
                AddtoCart(selectedProduct.productId, quantity, totalPrice);
              } else {
                console.error("No product selected");
              }
            }}
          >
            Add to Cart
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
