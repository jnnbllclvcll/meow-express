import '../Style.css';
import { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import UserContext from '../UserContext';
import { Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Swal from 'sweetalert2';

export default function Login() {

    // Allows us to consume the User context object and it's properties to use for user validation
    const {user, setUser} = useContext(UserContext);
    // State hooks to store the values of the input fields
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // State to determine whether submit button is enabled or not
    const [isActive, setIsActive] = useState(true);

    function authenticate(e) {

        // Prevents page redirection via form submission
        e.preventDefault();
        fetch('https://meow-express.onrender.com/b3/users/login',{

        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            
            email: email,
            password: password
            
        })
    })
    .then(res => res.json())
    .then(data => {

        if(typeof data.access !== "undefined"){
            // Set the email of the authenticated user in the local storage
            // Syntax
            // localStorage.setItem('propertyName', value);
            // the "localStorage.setItem" allows us to manipulate the browser's localStorage property to store information indefinitely to help demonstrate conditional rendering and the login and logout features
            // Storing information in the localStorage will make the data persistent even as the page is refreshed unlike with the use of states where the information is reset when refreshin the page.
            localStorage.setItem('token', data.access);
            retrieveUserDetails(data.access)

            Swal.fire({
                title: "Login Successful",
                icon: "success",
                text: "Welcome to MeowExpress!"
            })
                        
        } else if (data.error === "No Email Found") {

            Swal.fire({
                title: "Email not found.",
                icon: "error",
                text: "Check the email you provided."
            })

        } else {

            Swal.fire({
                title: "Authentication failed",
                icon: "error",
                text: "Check your login details and try again."
            })
        }
    })
    
    // Clear input fields after submission
    setEmail('');
    setPassword('');

    }

    const retrieveUserDetails = (token) => {
        fetch('https://meow-express.onrender.com/b3/users/details', {
            headers: {
                Authorization: `Bearer ${ token }`
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);

            // Changes the global "user" state to store the "id" and the "isAdmin" property of the user which will be used for validation accross the whole application
            setUser({
                id: data.user._id,
                isAdmin: data.user.isAdmin
            })
        })
    };

    useEffect(() => {
        // Validation to enable submit button when all fields are populated and both passwords match
        if(email !== '' && password !== ''){
            setIsActive(true);
        }else{
            setIsActive(false);
        }

    }, [email, password]);

    // console.log("User Access:", user.access);

return (
    <>
      {user.id !== null ? (
        <Navigate to="/products" />
      ) : (
        <>
          <Helmet>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
            <link href="https://fonts.googleapis.com/css2?family=Karla:wght@200;300;400;500&display=swap" rel="stylesheet" />
          </Helmet>
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-6 col-md-7 intro-section">
                <div className="intro-content-wrapper">
                  <h1 className="intro-title">Welcome to MeowExpress!</h1>
                  <p className="intro-text">This is where you can get all the necessary things for your cats!</p>
                </div>
              </div>
              <div className="col-sm-6 col-md-5 form-section">
                <div className="login-wrapper">
                  <h2 className="login-title">Login</h2>
                  <Form onSubmit={(e) => authenticate(e)}>
                    <div className="form-group">
                      <label htmlFor="userEmail" className="sr-only">Email address</label>
                      <Form.Control
                        type="email"
                        id="userEmail"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label htmlFor="password" className="sr-only">Password</label>
                      <Form.Control
                        type="password"
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-5">
                      {isActive ? (
                        <Button variant="primary" type="submit" id="submitBtn">
                          Submit
                        </Button>
                      ) : (
                        <Button variant="primary" type="submit" id="submitBtn" disabled>
                          Submit
                        </Button>
                      )}
                    </div>
                  </Form>
                  <p className="login-wrapper-footer-text">Need an account? <a href="/register" className="text-reset">Register here</a></p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};