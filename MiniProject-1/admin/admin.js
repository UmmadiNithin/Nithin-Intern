
//admin page  add item code

document.getElementById('Admin-Form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const Product_Name = document.getElementById('Product-Name').value;
    const Product_Description = document.getElementById('Product-Description').value;
    const Product_Price = document.getElementById('Product-Price').value;
    const Product_Image = document.getElementById('product-image').dataset.url; 
   

    try {
        const productURL = `https://shopping-cart-b3f52-default-rtdb.firebaseio.com/Product-Data.json`;

        const productResponse = await fetch(productURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                url: Product_Image,
                Product_Name,
                Product_Description,
                Product_Price
            })
        });

        if (productResponse.ok) {
            alert('Product successfully saved!');
            fetchProducts();
        } else {
            alert('Error saving product.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error saving product.');
    }
});


// image getfile function for uploading image 

function getFile(event) {
    
    const file = event.target.files[0];
    
    if (file) {
        
        const reader = new FileReader();
        
        reader.onloadend = function() {
            document.getElementById('product-image').dataset.url = reader.result;
        };
        
        reader.readAsDataURL(file);
    }
}




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
//to delete product items 
async function deleteProduct(productKey) {
    try {
        const deleteURL = `https://shopping-cart-b3f52-default-rtdb.firebaseio.com/Product-Data/${productKey}.json`;
        const response = await fetch(deleteURL, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert('Product successfully deleted!');
            fetchProducts(); 
        } else {
            alert('Error deleting product.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error deleting product.');
    }
}

// to edit product details in admin 

async function editProduct(productKey) {
    
    try {
        const productURL = `https://shopping-cart-b3f52-default-rtdb.firebaseio.com/Product-Data/${productKey}.json`;
        const response = await fetch(productURL);
        const product = await response.json();
      
        const newName = prompt('Enter new product name:', product.Product_Name);
        const newDescription = prompt('Enter new product description:', product.Product_Description);
        const newPrice = prompt('Enter new product price:', product.Product_Price);
        const newImage = prompt('Enter new image URL (or leave empty to keep current):', product.url);

        if (!newName || !newDescription || !newPrice) {
            alert('Please provide all product details.');
            return;
        }

        
        try {
            const updateURL = `https://shopping-cart-b3f52-default-rtdb.firebaseio.com/Product-Data/${productKey}.json`;
            const response = await fetch(updateURL, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Product_Name: newName,
                    Product_Description: newDescription,
                    Product_Price: newPrice,
                    url: newImage || product.url // Use new image if provided, otherwise keep current
                })
            });

            if (response.ok) {
                alert('Product successfully updated!');
                fetchProducts(); 
            } else {
                alert('Error updating product.');
            }
        } catch (error) {
            console.error('Error updating product:', error);
            alert('Error updating product.');
        }
    } catch (error) {
        console.error('Error fetching product:', error);
        alert('Error fetching product details.');
    }
}

//  to display product items in admin 

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
                <div class="product-image-container">
                    <img src="${product.url}" alt="${product.Product_Name}" class="product-image"/>
                </div>
                <h3>${product.Product_Name}</h3>
                <p>${product.Product_Description}</p>
                <p>Rs.${product.Product_Price}</p>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            `;

            // Add event listener for delete button
            productCard.querySelector('.delete-btn').addEventListener('click', async () => {
                const productKey = productCard.getAttribute('data-key');
                await deleteProduct(productKey);
            });

            // Add event listener for edit button
            productCard.querySelector('.edit-btn').addEventListener('click', () => {
                const productKey = productCard.getAttribute('data-key');
                editProduct(productKey);
            });

            container.appendChild(productCard);
        }
    }
}



// Call fetchProducts when the page loads
window.onload = fetchProducts();

