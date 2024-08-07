
// Fetch products
async function fetchProducts() {
    try {
        const productURL = 'https://shopping-cart-b3f52-default-rtdb.firebaseio.com/Product-Data.json';
        const response = await fetch(productURL);

        if (!response.ok) {
            throw new Error('Fetching Failed');
        }

        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        alert('Failed to fetch products');
    }
}

// Display products
function displayProducts(products) {
    const AdminContainer = document.getElementById('product-container');
    AdminContainer.innerHTML = '';

    for (const key in products) {
        if (products.hasOwnProperty(key)) {
            const product = products[key];

            const productCard = document.createElement('div');
            productCard.className = 'productCard';
            // productCard.setAttribute('data-key', key); 
            productCard.innerHTML = `
                <img src="${product.url}" alt="${product.Product_Name}" onclick=">
                <div class="des">
                    <h3>${product.Product_Name}</h3>
                    <p>${product.Product_Description}</p>
                    <div class="star">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                    </div>
                    <h4>Rs ${product.Product_Price}</h4>
                    <button onclick="editProduct('${key}')" id="edit">Edit</button>
                    <button onclick="deleteProduct('${key}')" id="delete">Delete</button>
                    
                </div>
            `;

            AdminContainer.appendChild(productCard);
        }
    }
}
