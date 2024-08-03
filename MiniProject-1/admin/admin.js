

document.getElementById('Admin-Form').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const Product_Name = document.getElementById('Product-Name').value;
    const Product_Description = document.getElementById('Product-Description').value;
    const Product_Price = document.getElementById('Product-Price').value;
    const Product_Image = document.getElementById('product-image').dataset.url; // URL of the uploaded image
  
    if (!Product_Image) {
        alert('Please upload an image.');
        return;
    }

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
        } else {
            alert('Error saving product.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error saving product.');
    }
});

function getFile(event) {
    // event triggered to take first file from fileslist
    const file = event.target.files[0];
    
    if (file) {
        // Use FileReader to read the file as a data URL
        const reader = new FileReader();
        // eventhandler on reader
        reader.onloadend = function() {
            // Set the file URL to the dataset of the input
            document.getElementById('product-image').dataset.url = reader.result;
        };
        
        reader.readAsDataURL(file);
    }
}

//  to retrive product data 


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






