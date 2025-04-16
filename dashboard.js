// Get the JWT token from localStorage
const token = localStorage.getItem('token');

// Fetch User Profile
function getUserProfile() {
    fetch('/api/user/profile', {
        method: 'GET',
        headers: {
            'x-auth-token': token, // Send the token in the header
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.name && data.email) {
            document.getElementById('usernameDisplay').textContent = data.name;
            document.getElementById('userEmail').textContent = data.email;
            document.getElementById('userName').textContent = `Welcome, ${data.name}`; // Update the navbar
        } else {
            console.error('Error fetching profile:', data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Event Listeners for Navigation
document.getElementById('homeTab').addEventListener('click', () => {
    document.getElementById('home').style.display = 'block';
    document.getElementById('account').style.display = 'none';
});

document.getElementById('accountTab').addEventListener('click', () => {
    document.getElementById('home').style.display = 'none';
    document.getElementById('account').style.display = 'block';
});

// Logout functionality
document.getElementById('logoutTab').addEventListener('click', () => {
    localStorage.removeItem('token'); // Remove token on logout
    window.location.href = 'login.html'; // Redirect to login page
});

// Initially load the user profile
getUserProfile();

// Default view is Home
document.getElementById('home').style.display = 'block';
