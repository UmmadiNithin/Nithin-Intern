   //signup conditions

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





//conditions for login

document.getElementById('signup-form').addEventListener('submit', function(event) {
  event.preventDefault(); 
  checklogin();
});

async function checklogin() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
  
    const url = `https://shopping-cart-b3f52-default-rtdb.firebaseio.com/signup.json`;

    const response = await fetch(url,{
       method: 'GET',
       headers: { 
        'Content-Type': 'application/json'
       } 
      });
     
     
      if (!response.ok) {
        throw new Error(`Network response was not ok. Status: ${response.status}`);
      }
    const users = await response.json();

   
    if (!users) {
      alert('No users found. Please sign up.');
      return;
    }
    const user = Object.values(users).find(user => user.email === email && user.password === password);

   
    if (user) {
      if (user.admin === true) {
        window.location.href = "file:///C:/Intern/Nithin-Intern/MiniProject-1/admin/admin.html"; 
      } else {
        window.location.href = "file:///C:/Intern/Nithin-Intern/MiniProject-1/userdash.html"; 
      }
    } else {
      alert('user doesnot exist please signup !');
    }
  } catch (error) {
    console.error('Error:', error);
   
  }
}


