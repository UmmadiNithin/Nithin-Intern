// Fetch product details
async function fetchProductDetails(productId) {
    try {
        const productURL = `https://shopping-cart-b3f52-default-rtdb.firebaseio.com/Product-Data/${productId}.json`;
        const response = await fetch(productURL);

        if (!response.ok) {
            throw new Error('Fetching Failed'); 
        }

        const product = await response.json();
        displayProduct(product, productId);
    } catch (error) {
        console.error('Error fetching product:', error);
        alert('Failed to fetch product details');
    }
}

function displayProduct(product, key) {
    const AdminContainer = document.getElementById('product-container');
    AdminContainer.innerHTML = `
        <div class="productCard" data-product-id="${key}">
            <div class="productImage">
                <img src="${product.url}" alt="${product.Product_Name}" />
            </div>
            <div class="productDetails">
                <h3>${product.Product_Name}</h3>
                <h4>The Details:</h4>
                <p>${product.Product_Description}</p>
                <div class="stars">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="far fa-star"></i>
                </div>
                <h4>Rs. ${product.Product_Price}</h4>
                <div class="buttons">
                    <button id="add-to-cart" data-product-id="${key}">Add to Cart</button>
                    <button onclick="buyNow('${key}')" id="buy-now">Buy Now</button>
                </div>
            </div>
        </div>
    `;

    // Add event listener for the Add to Cart button
    document.getElementById('add-to-cart').addEventListener('click', () => addToCart(key));
}

// On page load, fetch the product details based on the URL parameter
window.onload = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('product');

    if (productId) {
        fetchProductDetails(productId);
    } else {
        console.error('Product ID not found in URL');
        alert('Product ID not found.');
    }

    updateHeader(); // Update header on page load
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

function addToCart(productId) {
    const isLoggedIn = localStorage.getItem('userEmail') !== null;

    if (isLoggedIn) {
        const product = {
            id: productId,
            name: document.querySelector(`.productCard .productDetails h3`).innerText,
            price: document.querySelector(`.productCard .productDetails h4`).innerText.replace('Rs. ', ''),
            image: document.querySelector(`.productCard .productImage img`).src,
        };

        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));

        alert('Product added to cart!');
    } else {
        alert('You must be logged in to add products to the cart.');
        window.location.href = '/MiniProject-1/login.html'; 
    }
}

function buyNow(productId) {
    // Add functionality for "Buy Now" button
}
