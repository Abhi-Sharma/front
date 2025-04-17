const backendURL = "https://winclub-5wvz.onrender.com/api/auth"; // Update to your actual backend URL

const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();  // Prevent form from reloading the page

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    // Client-side validation
    if (!email || !password) {
      alert("Please fill in both fields.");
      return;
    }

    // Basic email format validation
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    try {
      const res = await fetch(`${backendURL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Login successful!");
        
        // Assuming the backend sends the username as part of the response data (e.g., data.username)
        localStorage.setItem("username", data.username); // Save the username to localStorage
      
        // Optionally, you can also save the JWT token if you're using authentication with tokens
        localStorage.setItem("token", data.token); 
      
        // Redirect to the dashboard after successful login
        window.location.href = "dashboard.html";
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      alert("Error logging in. Please try again later.");
    }
  });
}



