document.getElementById('registerForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const username = document.getElementById('regUsername').value;
  const email = document.getElementById('regEmail').value;
  const phone = document.getElementById('regPhone').value;
  const password = document.getElementById('regPassword').value;

  try {
    const response = await fetch('https://winclub-5wvz.onrender.com/api/user/register', { // Correct endpoint
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, phone, password })
    });

    const data = await response.json();
    console.log('Registration Response:', data);

    if (response.ok) {
      alert('Registration successful!');
      window.location.href = 'login.html';  // Redirect to login page after successful registration
    } else {
      alert(data.message || 'Registration failed.');
    }
  } catch (err) {
    console.error('Error during registration:', err);
    alert('Something went wrong during registration.');
  }
});
