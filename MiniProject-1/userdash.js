

async function fetchProducts() {
    try {
        const productURL = `https://shopping-cart-b3f52-default-rtdb.firebaseio.com/Product-Data.json`;
        const response = await fetch(productURL);

        if (!response.ok) {
            throw new Error('Failed to fetch products');
    }

        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        alert('Error fetching products.');
    }
}



function displayProducts(products) {
    const container = document.getElementById('product-container');
    container.innerHTML = '';

    for (const key in products) {
        if (products.hasOwnProperty(key)) {
            const product = products[key];
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.setAttribute('data-key', key); 

            productCard.innerHTML = `
                <img src="${product.url}" alt="${product.Product_Name}" class="product-image"/>
                <h3>${product.Product_Name}</h3>
                <p>Rs.${product.Product_Price}</p>
                <div class="stars">
                <i class="fa fa-star></i>
                <i class="fa fa-star></i>
                <i class="fa fa-star></i>
                <i class="fa fa-star></i>
                </div>
            `;
            productCard.addEventListener('click', () => {
                window.location.href = `/MiniProject-1/order.html?product=${key}`;
            });

            container.appendChild(productCard);
        }
    }
}


window.onload = fetchProducts();
 


function addToCart() {
    alert('you need to login !')
    window.location.href='file:///C:/Intern/Nithin-Intern/MiniProject-1/login.html' 
 }

 function getUserEmail() {
    return localStorage.getItem('userEmail') || 'No email available';
}