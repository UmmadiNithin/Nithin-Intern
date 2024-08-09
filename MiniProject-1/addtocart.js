window.onload = () => {
    const cartContainer = document.getElementById('cart-container');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const updateCartDisplay = () => {
        cartContainer.innerHTML = ''; 
        if (cart.length === 0) {
            cartContainer.innerHTML = '<h1>Your cart is empty!</h1>';
        } else {
            let totalAmount = 0;
            cart.forEach(product => {
                console.log(product);
                
                const price = parseFloat(product.price) || 0;
                totalAmount += price;
                cartContainer.innerHTML += `
                    <div class="cart-item d-flex" data-product-id="${product.id}">
                        <img src="${product.image}" alt="${product.name}">
                        <div class="product-details">
                            <h5>${product.name}</h5>
                            <p>Rs ${price.toFixed(2)}</p>
                            <div class="cart-item-actions">
                                <button class="remove-btn" data-product-id="${product.id}">Remove</button>
                            </div>
                        </div>
                    </div>
                `;
            });
            cartContainer.innerHTML += `
                <div class="order-summary">
                    <h4>Order Summary</h4>
                    <p>Total Items: ${cart.length}</p>
                    <p>Total Amount: Rs ${totalAmount.toFixed(2)}</p>
                    <button class="place-order-btn">Place Order</button>
                </div>
            `;
        }
    };

    const removeProductFromCart = (productId) => {
        cart = cart.filter(product => product.id !== productId);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
    };

    cartContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-btn')) {
            const productId = event.target.getAttribute('data-product-id');
            removeProductFromCart(productId);
        }
    });

    updateCartDisplay();
    updateHeader(); 

    function updateHeader() {
        const userEmail = localStorage.getItem('userEmail');
        const loginLink = document.getElementById('login-link');
        const signupLink = document.getElementById('signup-link');
        const userEmailDisplay = document.getElementById('user-email');
        const logoutLink = document.getElementById('logout-link');

        if (userEmail) {
            loginLink.style.display = 'none';
            signupLink.style.display = 'none';
            userEmailDisplay.textContent = ` ${userEmail}`;
            userEmailDisplay.style.display = 'block';
            logoutLink.style.display = 'block';

            logoutLink.addEventListener('click', function() {
                localStorage.removeItem('userEmail');
                window.location.href = '/MiniProject-1/login.html'; 
            });
        } else {
            loginLink.style.display = 'block';
            signupLink.style.display = 'block';
            userEmailDisplay.style.display = 'none';
            logoutLink.style.display = 'none';
        }
    }
};
