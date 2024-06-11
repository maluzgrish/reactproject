import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from "../../store/authSlice";
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';

const Register = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = () => {
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    // Perform signup logic here, like sending a request to your backend
    const newUser = { username, email, password };
    const token = "fakeToken123"; // Simulate token generation

    // Dispatch login action to update Redux store and local storage
    dispatch(setUser({ user: newUser, token }));

    // Redirect to the homepage or dashboard
    navigate('/login');
  };

  const backgroundImageStyle = {
    backgroundImage: 'url(/images/med4.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
  };

  const cardStyle = {
    maxWidth: '500px', // Adjust the width as needed
    margin: 'auto', // Center the card
    backgroundColor: 'rgba(227, 232, 95, 0.9)', // Semi-transparent white background
    padding: '20px', // Padding inside the card
    borderRadius: '10px', // Rounded corners
    marginTop: '50px' // Margin from the top
  };

  return (
    <div style={backgroundImageStyle}>
      <Navbar />
      <div className="container">
        <div className="card" style={cardStyle}>
          <div className="card-body">
            <h2 className="card-title">Signup</h2>
            <div className="form-group">
              <input
                type="text"
                placeholder="Username"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                placeholder="Email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Confirm Password"
                className="form-control"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <button className="btn btn-success" onClick={handleSignup}>
                Signup
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
