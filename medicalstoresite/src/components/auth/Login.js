import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from "../../store/authSlice";
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve user information from local storage if it exists
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.id) {
      dispatch(setUser(storedUser));
      navigate('/addmedicine');
    }
  }, [dispatch, navigate]);

  const handleLogin = () => {
    // Mock user ID retrieval, in real case it will be from API response
    const userId = '12345'; 
    const user = { id: userId, email: email, password: password };
    
    // Save user information to local storage
    localStorage.setItem('user', JSON.stringify(user));
    
    // Dispatch the user information to the Redux store
    dispatch(setUser(user));
    navigate('/addmedicine');
  };

  const backgroundImageStyle = {
    backgroundImage: 'url(/images/med2.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
  };

  const cardStyle = {
    maxWidth: '500px', // Adjust the width as needed
    margin: 'auto', // Center the card
    backgroundColor: 'rgba(110, 224, 221, 0.9)', // Semi-transparent white background
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
            <h2 className="card-title">Login Page</h2>
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
              <button className="btn btn-primary" onClick={handleLogin}>
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
