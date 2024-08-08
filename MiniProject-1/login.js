

//conditions for login

// document.getElementById('signup-form').addEventListener('submit', function (event) {
//   event.preventDefault();
//   checklogin();
// });

// async function checklogin() {
//   const email = document.getElementById('email').value;
//   const password = document.getElementById('password').value;

//   try {

//     const url = `https://shopping-cart-b3f52-default-rtdb.firebaseio.com/signup.json`;

//     const response = await fetch(url, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     });


    
//     if (!response.ok) {
//       throw new Error(`Network response was not ok. Status: ${response.status}`);
//     }
//     const users = await response.json();


//     if (!users) {
//       alert('No users found. Please sign up.');
//       return;
//     }
//     const user = Object.values(users).find(user => user.email === email && user.password === password);


//     if (user) {

//       console.log('Login successful for user:', user);
//       localStorage.setItem('userEmail', email);
//       localStorage.setItem('isAdmin', user.admin );
//       localStorage.setItem('isLoggedIn', 'true');

//       if (user.admin === true) {
//         window.location.href = "/MiniProject-1/admin/admin.html";
//       } else {
//         window.location.href = "/MiniProject-1/userdash.html";
//       }
//     } else {
//       alert('user doesnot exist please signup !');
//     }
//   } catch (error) {
//     console.error('Error:', error);

//   }
// }


document.getElementById('signup-form').addEventListener('submit', function(event) {
  event.preventDefault();
  checkLogin();
});

async function checkLogin() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (!email || !password) {
      alert('Please enter a valid email and password.');
      return;
  }

  try {
      const url = `https://shopping-cart-b3f52-default-rtdb.firebaseio.com/signup.json`;

      const response = await fetch(url, {
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
          console.log('Login successful for user:', user);
          loginUser(email, user.admin);
      } else {
          alert('User does not exist. Please sign up!');
      }
  } catch (error) {
      console.error('Error:', error);
      alert('Error logging in. Please try again.');
  }
}

function loginUser(userEmail, isAdmin) {
  localStorage.setItem('userEmail', userEmail);
  localStorage.setItem('isAdmin', isAdmin);
  localStorage.setItem('isLoggedIn', 'true');
  localStorage.setItem('cart', JSON.stringify([])); // Initialize empty cart for new login
  
  if (isAdmin) {
      window.location.href = "/MiniProject-1/admin/admin.html";
  } else {
      window.location.href = "/MiniProject-1/userdash.html";
  }
}
