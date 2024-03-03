import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

export default function ProfileUpdate({ fetchProfile }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [address, setAddress] = useState('');
    const [formValid, setFormValid] = useState(false);

    useEffect(() => {
        // Fetch user details when component mounts
        const token = localStorage.getItem('token');
        fetch('https://meow-express.onrender.com/b3/users/details', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.user) {
                // Populate state with user data
                setFirstName(data.user.firstName || '');
                setLastName(data.user.lastName || '');
                setEmail(data.user.email || '');
                setMobileNo(data.user.mobileNo || '');
                setAddress(data.user.address || '');
                // Check if all fields are filled to enable/disable the button
                setFormValid(data.user.firstName && data.user.lastName && data.user.email && data.user.mobileNo && data.user.address);
            }
        })
        .catch(error => {
            console.error('Error fetching user details:', error);
        });
    }, []);

    const handleUpdateProfile = () => {
        const token = localStorage.getItem('token');
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ firstName, lastName, email, mobileNo, address })
        };

        fetch('http://localhost:4000/users/update-details', requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to update profile');
            }
            Swal.fire({
                title: 'Success',
                icon: 'success',
                text: 'Profile updated successfully',
            });
            fetchProfile();
        })
        .catch(error => {
            Swal.fire({
                title: 'Error',
                icon: 'error',
                text: error.message || 'Failed to update profile',
            });
        });
    };

    return (
        <div className="container">
            <h2>Update Profile</h2>
            <form>
                <div className="mb-2">
                    <label htmlFor="firstName" className="form-label">First Name</label>
                    <input type="text" className="form-control" id="firstName" value={firstName} onChange={e => setFirstName(e.target.value)} required />
                </div>
                <div className="mb-2">
                    <label htmlFor="lastName" className="form-label">Last Name</label>
                    <input type="text" className="form-control" id="lastName" value={lastName} onChange={e => setLastName(e.target.value)} required />
                </div>
                <div className="mb-2">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="text" className="form-control" id="email" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
                <div className="mb-2">
                    <label htmlFor="mobileNo" className="form-label">Mobile Number</label>
                    <input type="text" className="form-control" id="mobileNo" value={mobileNo} onChange={e => setMobileNo(e.target.value)} required />
                </div>
                <div className="mb-2">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input type="text" className="form-control" id="address" value={address} onChange={e => setAddress(e.target.value)} required />
                </div>
                <button type="button" className="btn btn-primary" onClick={handleUpdateProfile} disabled={!formValid}>
                    Update Profile
                </button>
            </form>
        </div>
    );
};
