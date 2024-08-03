document.getElementById('signup-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
   
    const signUpUrl = `https://shopping-cart-b3f52-default-rtdb.firebaseio.com/signup.json`;


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

    //  Status Code: 200 is OK 
    if (signUpResponse.status == 200) {
      alert('User signed up successfully!');
      window.location.href = 'file:///C:/Intern/Nithin-Intern/MiniProject-1/userdash.html';

      
    }
    else {
      alert("An error occured in the process of signup !")
    }



  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred during signup.');
  }
});

// condition for login page 

async function checklogin() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    // URL to get all users
    const signUpUrl = `https://shopping-cart-b3f52-default-rtdb.firebaseio.com/signup.json`;
    
    // Fetch all users from Firebase
    const response = await fetch(signUpUrl);
    const users = await response.json();

    let loginSuccessful = false;

    // Loop through the users to find a match
    for (let key in users) {
      if (users[key].email === email && users[key].password === password) {
        loginSuccessful = true;
        break;
      }
    }

    if (loginSuccessful) {
      window.location.href = 'file:///C:/Intern/Nithin-Intern/MiniProject-1/userdash.html#';
        } else {
      alert("You are not signed up. Please sign up first!");
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred during login.');
  }
}




// login page to user page 




