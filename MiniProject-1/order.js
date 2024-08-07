// Fetch product details
async function fetchProductDetails(productId) {
    try {
        const productURL = `https://shopping-cart-b3f52-default-rtdb.firebaseio.com/Product-Data/${productId}.json`;
        const response = await fetch(productURL);

        if (!response.ok) {
            throw new Error('Fetching Failed');
        }

        const product = await response.json();
        displayProduct(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        alert('Failed to fetch product details');
    }
}



function displayProduct(product) {
    const AdminContainer = document.getElementById('product-container');
    AdminContainer.innerHTML = `
        <div class="productCard">
            <div class="productImage">
                <img src="${product.url}" alt="${product.Product_Name}" />
            </div>
            <div class="productDetails">
                <h3>${product.Product_Name}</h3>
                <h4>The Details:</h4>
                <p>${product.Product_Description}</p>
                <div class="stars">
                    <!-- Example of 4 filled stars and 1 empty star; Adjust based on the product rating -->
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="far fa-star"></i>
                </div>
                <h4>Rs. ${product.Product_Price}</h4>
                <div class="buttons">
                    <button onclick="addToCart('${product.id}')" id="add-to-cart">Add to Cart</button>
                    <button onclick="buyNow('${product.id}')" id="buy-now">Buy Now</button>
                </div>
            </div>
        </div>
    `;
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
};



