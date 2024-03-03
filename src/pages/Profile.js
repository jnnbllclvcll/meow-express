import React, { useContext, useState, useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';
import ResetPassword from '../components/ResetPassword';
import UpdateProfile from '../components/UpdateProfile';

export default function Profile() {
  const { user } = useContext(UserContext);
  const [details, setDetails] = useState({});
  const [showUpdateProfile, setShowUpdateProfile] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);

  const fetchProfile = () => {
    fetch(`https://meow-express.onrender.com/b3/users/details`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.user !== 'undefined') {
          setDetails(data.user);
        } else if (data.error === 'User not found') {
          Swal.fire({
            title: 'User not found',
            icon: 'error',
            text: 'Something went wrong, kindly contact us for assistance.',
          });
        } else {
          Swal.fire({
            title: 'Something went wrong',
            icon: 'error',
            text: 'Something went wrong, kindly contact us for assistance.',
          });
        }
      });
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleUpdateProfileClick = () => {
    setShowUpdateProfile(!showUpdateProfile);
    setShowResetPassword(false); // Hide ResetPassword when UpdateProfile is clicked
  };

  const handleResetPasswordClick = () => {
    setShowResetPassword(!showResetPassword);
    setShowUpdateProfile(false); // Hide UpdateProfile when ResetPassword is clicked
  };

  return (
    user.id === null ? (
      <Navigate to="/products" />
    ) : (
      <>
        <Row>
          <Col className="p-5 bg-primary text-white">
            <h1 className="my-5">Profile</h1>
            <h2 className="mt-3">{`${details.firstName} ${details.lastName}`}</h2>
            <hr />
            <h4>Contacts</h4>
            <ul>
              <li>Email: {details.email}</li>
              <li>Mobile No: {details.mobileNo}</li>
              <li>Address: {details.address}</li>
            </ul>
          </Col>
        </Row>
        <Row>
        	<div className="mt-4 d-flex justify-content-center">
            <Button onClick={handleUpdateProfileClick} variant="primary" className="mr-2 m-2">
              {showUpdateProfile ? 'Hide Update Profile' : 'Show Update Profile'}
            </Button>
            <Button onClick={handleResetPasswordClick} variant="primary" className="m-2">
              {showResetPassword ? 'Hide Reset Password' : 'Show Reset Password'}
            </Button>
           </div>
        </Row>
        {showUpdateProfile && (
          <>
            <Row className="pt-4 mt-4 mb-5">
              <Col>
                <UpdateProfile fetchProfile={fetchProfile} />
              </Col>
            </Row>
          </>
        )}
        {showResetPassword && (
          <Row className="pt-4 mt-4 mb-5">
            <Col>
              <ResetPassword />
            </Col>
          </Row>
        )}
      </>
    )
  );
}
