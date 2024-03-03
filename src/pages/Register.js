import {Form, Button} from 'react-bootstrap';
import {useState, useEffect, useContext} from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from '../UserContext';

export default function Register(){
	const {user} = useContext(UserContext);
	// State hooks to store the values of the input fields
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [mobileNo, setMobileNo] = useState("");
	const [address, setAddress] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	// State to determine whether submit button is enabled or not
	const [isActive, setIsActive] = useState(false);

	// Check if the values are successfully binded
	console.log(firstName);
	console.log(lastName);
	console.log(email);
	console.log(mobileNo);
	console.log(address);
	console.log(password);
	console.log(confirmPassword);

	function registerUser(e) {

	        		// Prevents page redirection via form submission
		e.preventDefault();

		fetch('https://meow-express.onrender.com/b3/users/',{

			method: 'POST',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({

				firstName: firstName,
				lastName: lastName,
				email: email,
				mobileNo: mobileNo,
				address: address,
				password: password

			})
		})
		.then(res => res.json())
		.then(data => {

	        		//data is the response of the api/server after it's been process as JS object through our res.json() method.
			console.log(data);
	        		//data will only contain an email property if we can properly save our user.
			if(data.message === "You have registered successfully!"){

				setFirstName('');
				setLastName('');
				setEmail('');
				setMobileNo('');
				setPassword('');
				setConfirmPassword('');

				alert("Registration successful")

			} else if (data.error === "Email invalid") {

				alert("Email is invalid");

			} else if (data.error === "Mobile number invalid") {

				alert("Mobile number is invalid");

			} else if (data.error === "Please enter your address") {

				alert("Mobile number is invalid");

			} else if (data.error === "Password must be atleast 8 characters") {

				alert("Password must be at least 8 characters");

			} else {

				alert("Something went wrong.");

			}
		})
	}


	// useEffect() has two arguments, function and dependency
		// function - represents the side effect you want to perform. This will be executed when the component renders.
		// dependency - optional array. The effect will run when there are changes in the component's dependencies. When there is no provided array, the effect will run on every render of the component.
	useEffect(() => {
		if((firstName !== "" && lastName !== "" && email !== "" && mobileNo !== "" && address !== "" && password !== "" && confirmPassword !== "") && (password === confirmPassword)){

			setIsActive(true)	

		} else {
			setIsActive(false)
		}
	}, [firstName, lastName, email, mobileNo, address, password, confirmPassword]);

	return(
		(user.id !== null) ?
			<Navigate to="/courses" />
		:
			<Form onSubmit={(e) => registerUser(e)}>
			<h1 className="my-5 text-center">Register</h1>
				<Form.Group>
					<Form.Label>First Name:</Form.Label>
					<Form.Control 
					type="text" 
					placeholder="Enter First Name" 
					required
					value={firstName}
					onChange={e => {setFirstName(e.target.value)}}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label>Last Name:</Form.Label>
					<Form.Control 
					type="text" 
					placeholder="Enter Last Name" 
					required
					value={lastName}
					onChange={e => {setLastName(e.target.value)}}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label>Email:</Form.Label>
					<Form.Control 
					type="text" 
					placeholder="Enter Email" 
					required
					value={email}
					onChange={e => {setEmail(e.target.value)}}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label>Mobile No:</Form.Label>
					<Form.Control 
					type="number" 
					placeholder="Enter 11 Digit No." 
					required
					value={mobileNo}
					onChange={e => {setMobileNo(e.target.value)}}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label>Address:</Form.Label>
					<Form.Control 
					type="text" 
					placeholder="Enter Address" 
					required
					value={address}
					onChange={e => {setAddress(e.target.value)}}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label>Password:</Form.Label>
					<Form.Control 
					type="password" 
					placeholder="Enter Password" 
					required
					value={password}
					onChange={e => {setPassword(e.target.value)}}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label>Confirm Password:</Form.Label>
					<Form.Control 
					type="password" 
					placeholder="Confirm Password" 
					required
					value={confirmPassword}
					onChange={e => {setConfirmPassword(e.target.value)}}
					/>
				</Form.Group>
				{/*conditionally render submit button based on isActive state, the current state of the isActive is false*/}
				{ isActive ?
				<Button variant="primary" type="submit">Submit</Button>
				:
				<Button variant="primary" type="submit" disabled>Submit</Button>
				}
			</Form>
	)
}