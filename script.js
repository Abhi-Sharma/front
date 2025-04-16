const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to authenticate token
const authenticate = async (req, res, next) => {
  const token = req.header('x-auth-token'); // Using x-auth-token header for token

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token using the secret
    req.user = decoded.id; // Add user ID to request object
    next(); // Proceed to the next middleware/route
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Get User Profile
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user).select('-password'); // Exclude password field
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Return user profile data
    res.json({ name: user.username, email: user.email });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { authenticate, getUserProfile };


// Get the JWT token from localStorage (where it was saved during login)
const token = localStorage.getItem('token');

// Fetch user profile with the JWT token in the headers
fetch('/api/user/profile', {
  method: 'GET',
  headers: {
    'x-auth-token': token, // Sending token in the x-auth-token header
  }
})
  .then(response => response.json())
  .then(data => {
    if (data.name && data.email) {
      console.log('User Profile:', data);
      // Populate the profile information on the page
      document.getElementById('username').textContent = data.name;
      document.getElementById('useremail').textContent = data.email;
    } else {
      console.error('Error fetching profile:', data.message);
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });

  const express = require('express');
const { authenticate, getUserProfile } = require('../controllers/userController');
const router = express.Router();

// Protected route to fetch user profile
router.get('/profile', authenticate, getUserProfile);

module.exports = router;

// Assuming you received the token after a successful login
localStorage.setItem('token', response.data.token); // Store the JWT token
// Replace this URL with your deployed backend URL
const backendURL = 'https://winclub-5wvz.onrender.com';

// Assuming you saved the token after login

// Fetch user profile
fetch(`${backendURL}/api/user/profile`, {
  method: 'GET',
  headers: {
    'x-auth-token': token,
  },
})
  .then(response => response.json())
  .then(data => {
    if (data.name && data.email) {
      console.log('User Profile:', data);
      document.getElementById('username').textContent = data.name;
      document.getElementById('useremail').textContent = data.email;
    } else {
      console.error('Error fetching profile:', data.message);
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });

// Example: After successful login
// localStorage.setItem('token', response.data.token);
