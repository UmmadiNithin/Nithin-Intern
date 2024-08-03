

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

            productCard.innerHTML = `
                <img src="${product.url}" alt="${product.Product_Name}" class="product-image"/>
                <h3>${product.Product_Name}</h3>
                <p>${product.Product_Description}</p>
                <p>$${product.Product_Price}</p>
                
            `;

            container.appendChild(productCard);
        }
    }
}


// Call fetchProducts when the page loads
window.onload = fetchProducts;



