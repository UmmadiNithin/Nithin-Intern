import {getFile} from '/MiniProject-1/modules.js'


document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
    updateHeader();
});

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
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <img src="${product.url}" alt="${product.Product_Name}">
                <h3>${product.Product_Name}</h3>
                <h4>Rs ${product.Product_Price}</h4>
                <p>${product.Product_Description}</p>
                <div class="card-buttons">
                    <button onclick="editProduct('${key}')" class="edit-btn">Edit</button>
                    <button onclick="deleteProduct('${key}')" class="delete-btn">Delete</button>
                </div>
            `;
            AdminContainer.appendChild(productCard);
        }
    }
}

// // Edit product
// window.editProduct = function(productId) {
//     const productURL = `https://shopping-cart-b3f52-default-rtdb.firebaseio.com/Product-Data/${productId}.json`;
//     fetch(productURL)
//         .then(response => response.json())
//         .then(product => {
//             document.getElementById('productId').value = productId;
//             document.getElementById('Product-Name').value = product.Product_Name;
//             document.getElementById('Product-Description').value = product.Product_Description;
//             document.getElementById('Product-Price').value = product.Product_Price;
//             document.getElementById('product-image').dataset.url = product.url;
//             document.getElementById('Admin-Form').scrollIntoView({ behavior: 'smooth' });
//             document.querySelector('AddItem [type="submit"]').textContent='edit item';

//         })
//         .catch(error => console.error('Error fetching product:', error));
// }


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
            document.getElementById('Admin-Form').scrollIntoView({ behavior: 'smooth' });
            
            // Change button text and ID
            const addButton = document.getElementById('AddItem');
            addButton.textContent = 'Update Item';
            addButton.setAttribute('id', 'UpdateItem');
        })
        .catch(error => console.error('Error fetching product:', error));
}

// Handle form submission
document.getElementById('Admin-Form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const button = document.getElementById('AddItem') || document.getElementById('UpdateItem');
    const isEditing = button && button.id === 'UpdateItem';
    
    const productId = document.getElementById('productId').value;
    const productName = document.getElementById('Product-Name').value;
    const productDescription = document.getElementById('Product-Description').value;
    const productPrice = document.getElementById('Product-Price').value;
    const productImageURL = document.getElementById('product-image').dataset.url;
    
    const productData = {
        Product_Name: productName,
        Product_Description: productDescription,
        Product_Price: productPrice,
        url: productImageURL
    };
    
    let url;
    let method;
    
    if (isEditing) {
        url = `https://shopping-cart-b3f52-default-rtdb.firebaseio.com/Product-Data/${productId}.json`;
        method = 'PUT'; 
    } else {
        url = 'https://shopping-cart-b3f52-default-rtdb.firebaseio.com/Product-Data/.json';
        method = 'POST'; 
    }
    
    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(productData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Product saved:', data);
        document.getElementById('Admin-Form').reset();
        const addButton = document.getElementById('UpdateItem');
        if (addButton) {
            addButton.textContent = 'Add Item';
            addButton.setAttribute('id', 'AddItem');
        }
    })
    .catch(error => console.error('Error saving product:', error));
});


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

// Update header based on user status
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
        userEmailDisplay.textContent = ` ${userEmail}`; 
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
