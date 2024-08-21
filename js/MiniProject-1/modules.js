

// Upload image
 function getFile(event) {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onloadend = function () {
            document.getElementById('product-image').dataset.url = reader.result;
        };

        reader.readAsDataURL(file);
    }
}
document.getElementById('product-image').addEventListener('change', getFile);







// Fetch products
export async function fetchProducts() {
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




