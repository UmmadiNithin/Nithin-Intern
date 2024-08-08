
//     window.onload = () => {
//     const cartContainer = document.getElementById('cart-container');
//     let cart = JSON.parse(localStorage.getItem('cart')) || [];

//     const updateCartDisplay = () => {
//         cartContainer.innerHTML = ''; // Clear the current cart display
//         if (cart.length === 0) {
//             cartContainer.innerHTML = '<p>Your cart is empty!</p>';
//         } else {
//             cart.forEach(product => {
//                 cartContainer.innerHTML += `
//                     <div class="row">
//                         <div class="col-md-12">
//                             <div class="cart-item d-flex" data-product-id="${key}">
//                                 <img src="${product.image}" alt="${product.name}">
//                                 <div>
//                                     <h5>${product.name}</h5>
//                                     <p>Rs ${product.price}</p>
//                                     <div class="cart-item-actions">
//                                         <button class="remove-btn" data-product-id="${product.id}">Remove</button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 `;
//             });
//         }
//     };

//     const removeProductFromCart = (productId) => {
//         cart = cart.filter(product => product.id !== productId); // Remove the product from the cart
//         localStorage.setItem('cart', JSON.stringify(cart)); // Update local storage
//         updateCartDisplay(); // Refresh the cart display

//     };

//     cartContainer.addEventListener('click', (event) => {
//         if (event.target.classList.contains('remove-btn')) {
//             const productId = event.target.getAttribute('data-product-id');
//             removeProductFromCart(productId); // Call function to remove product
//         }
//     });

//     updateCartDisplay();
   
// };


window.onload = () => {
    const cartContainer = document.getElementById('cart-container');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const updateCartDisplay = () => {
        cartContainer.innerHTML = ''; // Clear the current cart display
        if (cart.length === 0) {
            cartContainer.innerHTML = '<p>Your cart is empty!</p>';
        } else {
            cart.forEach(product => {
                cartContainer.innerHTML += `
                    <div class="row">
                        <div class="col-md-12">
                            <div class="cart-item d-flex" data-product-id="${product.id}">
                                <img src="${product.image}" alt="${product.name}">
                                <div>
                                    <h5>${product.name}</h5>
                                    <p>Rs ${product.price}</p>
                                    <div class="cart-item-actions">
                                        <button class="remove-btn" data-product-id="${product.id}">Remove</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            });
        }
    };

    const removeProductFromCart = (productId) => {
        cart = cart.filter(product => product.id !== productId); // Remove the product from the cart
        localStorage.setItem('cart', JSON.stringify(cart)); // Update local storage
        updateCartDisplay(); // Refresh the cart display
    };

    cartContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-btn')) {
            const productId = event.target.getAttribute('data-product-id');
            removeProductFromCart(productId); // Call function to remove product
        }
    });

    updateCartDisplay();
    updateHeader(); // Ensure header is updated with user info
};

function updateHeader() {
    const userEmail = localStorage.getItem('userEmail');
    const loginLink = document.getElementById('login-link');
    const signupLink = document.getElementById('signup-link');
    const userEmailDisplay = document.getElementById('user-email');
    const logoutLink = document.getElementById('logout-link');

    if (userEmail) {
        // User is logged in
        loginLink.style.display = 'none';
        signupLink.style.display = 'none';
        userEmailDisplay.textContent = `Welcome, ${userEmail}`;
        userEmailDisplay.style.display = 'block';
        logoutLink.style.display = 'block';
        
        logoutLink.addEventListener('click', function() {
            localStorage.removeItem('userEmail');
            window.location.href = '/MiniProject-1/login.html'; // Redirect to login page
        });
    } else {
        // User is not logged in
        loginLink.style.display = 'block';
        signupLink.style.display = 'block';
        userEmailDisplay.style.display = 'none';
        logoutLink.style.display = 'none';
    }
}



  