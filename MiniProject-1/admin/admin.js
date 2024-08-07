document.getElementById('Admin-Form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const productIdElement = document.getElementById('productId');
    const productId = productIdElement ? productIdElement.value : null;
    const productName = document.getElementById('Product-Name').value;
    const price = document.getElementById('Product-Price').value;
    const productDescription = document.getElementById('Product-Description').value;
    const upload_image = document.getElementById('product-image').dataset.url;

    if (productName === '' || price === '' || productDescription === '') {
      
        alert('Please fill in all fields.');
        return false;
    }

    if (!upload_image) {
        alert('Please upload a file.');
        return;
    }

    try {
        let productURL = 'https://shopping-cart-b3f52-default-rtdb.firebaseio.com/Product-Data.json';
        let method = 'POST';

        if (productId) {
            productURL = `https://shopping-cart-b3f52-default-rtdb.firebaseio.com/Product-Data/${productId}.json`;
            method = 'PUT';
        }
        const response = await fetch(productURL, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                url: upload_image,
                Product_Description: productDescription,
                Product_Name: productName,
                Product_Price: price
            })
        });

        if (response.ok) {
            alert(productId ? 'Product updated successfully' : 'Product added successfully');
            document.getElementById('Admin-Form').reset();
            fetchProducts();
        } else {
            alert('Error occurred while adding/updating the product');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error saving product');
    }
});

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
                <img src="${product.url}" alt="${product.Product_Name}">
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

// Edit product
window.editProduct = function(productId) {
    const productURL = `https://shopping-cart-b3f52-default-rtdb.firebaseio.com/Product-Data/${productId}.json`;

    fetch(productURL)
        .then(response => response.json())
        .then(product => {
            document.getElementById('productId').value = productId;
            document.getElementById('Product-Name').value = product.Product_Name;
            document.getElementById('Product-Description').value = product.Product_Description;
            document.getElementById('Product-Price').value = product.Product_Price;
            document.getElementById('product-image').dataset.url = product.url;
            document.getElementById('Admin-Form').style.display = 'block';
        })
        .catch(error => console.error('Error fetching product:', error));
}

// Delete product
async function deleteProduct(productId) {
    if (confirm('Are you sure you want to delete this product?')) {
        try {
            const productURL = `https://shopping-cart-b3f52-default-rtdb.firebaseio.com/Product-Data/${productId}.json`;
            const response = await fetch(productURL, {
                method: 'DELETE'
            });

            if (response.ok) {
                alert('Product deleted successfully');
                fetchProducts();
            } else {
                alert('Error occurred while deleting the product');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error deleting product');
        }
    }
}

// Load products on page load
window.onload = fetchProducts;
