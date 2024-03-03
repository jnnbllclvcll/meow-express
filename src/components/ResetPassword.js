import React, { useState } from 'react';
import Swal from 'sweetalert2';

export default function ResetPassword(){
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [message, setMessage] = useState('');

	const handleResetPassword = async (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			setMessage('Passwords do not match');
			return;
		}

		try {
			const response = await fetch('https://meow-express.onrender.com/b3/users/update-password', {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
				body: JSON.stringify({ newPassword: password }),
			});

			if (response.ok) {
				Swal.fire({
					title: "Password Reset Success",
					icon: "success",
					text: "You have successfully reset your password."
				})
				setPassword('');
				setConfirmPassword('');
			} else {
				const errorData = await response.json();
				Swal.fire({
					title: "Password Reset Error",
					icon: "error",
					text: "Failure in resetting. Please try again."
				})
			}
		} catch (error) {
			Swal.fire({
					title: "Internal Server Error",
					icon: "error",
					text: "An error occurred. Please try again.."
				})
			console.error(error);
		}
	};

  	return (
    	<div className="container">
	      	<h2>Reset Password</h2>
	      	<form onSubmit={handleResetPassword}>
	        	<div className="mb-3">
	          		<label htmlFor="password" className="form-label">
	           	 		New Password
	          		</label>
	          		<input
	            		type="password"
	            		className="form-control"
	            		id="password"
	            		value={password}
	            		onChange={(e) => setPassword(e.target.value)}
	            		required
	          		/>
	        	</div>
	        	<div className="mb-3">
	          		<label htmlFor="confirmPassword" className="form-label">
	            		Confirm Password
	          		</label>
	          		<input
	            		type="password"
	            		className="form-control"
	            		id="confirmPassword"
	            		value={confirmPassword}
	            		onChange={(e) => setConfirmPassword(e.target.value)}
	            		required
	          		/>
	        	</div>
	        	{message && <div className="alert alert-danger">{message}</div>}
	        	<button type="submit" className="btn btn-primary">
	          		Reset Password
	        	</button>
	      	</form>
    	</div>
  	);
};

