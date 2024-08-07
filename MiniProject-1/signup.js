//signup conditions

document.getElementById('signup-form').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
  
    // Check email format using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Invalid email format.');
      retur;
    }
  
    // Check password length
    if (password.length < 6) {
      alert('Password must be at least 6 characters long.');
      return;
    }
    // Check if password and confirm password match
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
  
  
    try {
  
      const signUpUrl = `https://shopping-cart-b3f52-default-rtdb.firebaseio.com/signup.json`;
      const response = await fetch(signUpUrl);
  
      if (!response.ok) {
        throw new Error('Failed to fetch existing users.');
      }
  
      const existingUsers = await response.json();
      const user = Object.values(existingUsers).find(user => user.email === email);
  
      if (user) {
        // User exists, check password
        if (user.password === password) {
          alert('User already exists with the same email.');
          return;
        } else {
          alert('Wrong password or invalid email.');
          return;
        }
      }
      const signUpResponse = await fetch(signUpUrl, {
  
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          email,
          password,
          admin: false
        })
      });
  
  
      if (signUpResponse.ok) {
        alert('User signed up successfully!');
        window.location.href = '/MiniProject-1/userdash.html';
  
      }
      else {
        alert("An error occured in the process of signup !")
      }
  
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred during signup.');
    }
  });
  