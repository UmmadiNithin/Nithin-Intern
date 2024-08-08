

// async function fetchProducts() {
//     try {
//         const productURL = `https://shopping-cart-b3f52-default-rtdb.firebaseio.com/Product-Data.json`;
//         const response = await fetch(productURL);

//         if (!response.ok) {
//             throw new Error('Failed to fetch products');
//     }

//         const products = await response.json();
//         displayProducts(products);
//     } catch (error) {
//         console.error('Error fetching products:', error);
//         alert('Error fetching products.');
//     }
// }



// function displayProducts(products) {
//     const container = document.getElementById('product-container');
//     container.innerHTML = '';

//     for (const key in products) {
//         if (products.hasOwnProperty(key)) {
//             const product = products[key];
//             const productCard = document.createElement('div');
//             productCard.className = 'product-card';
//             productCard.setAttribute('data-key', key); 

//             productCard.innerHTML = `
//                 <img src="${product.url}" alt="${product.Product_Name}" class="product-image"/>
//                 <h3>${product.Product_Name}</h3>
//                 <p>Rs.${product.Product_Price}</p>
//                 <div class="stars">
//                 <i class="fa fa-star></i>
//                 <i class="fa fa-star></i>
//                 <i class="fa fa-star></i>
//                 <i class="fa fa-star></i>
//                 </div>
//             `;
//             productCard.addEventListener('click', () => {
//                 window.location.href = `/MiniProject-1/order.html?product=${key}`;
//             });

//             container.appendChild(productCard);
//         }
//     }
// }


// window.onload = fetchProducts();
 


// function addToCart() {
//     alert('you need to login !')
//     window.location.href='/MiniProject-1/login.html' 
//  }

//  function getUserEmail() {
//     return localStorage.getItem('userEmail') || 'No email available';
// }



// // image sliding (banners)
// const slides = document.querySelector('.slides');
// const slideCount = document.querySelectorAll('.slide').length;
// let currentIndex = 0;

// function moveToNextSlide() {
//     currentIndex = (currentIndex + 1) % slideCount;
//     slides.style.transform = `translateX(-${currentIndex * 100}%)`;
// }

// setInterval(moveToNextSlide, 3000); // Change slide every 3 seconds


window.onload = function() {
    updateHeader();
    fetchProducts();
};

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
        userEmailDisplay.textContent = `Welcome, ${userEmail}`;
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
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                </div>
            `;
            productCard.addEventListener('click', () => {
                window.location.href = `/MiniProject-1/order.html?product=${key}`;
            });

            container.appendChild(productCard);
        }
    }
}

function addToCart() {
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
        alert('Product added to cart!');
        // Handle adding to cart logic here
    } else {
        alert('You need to login!');
        window.location.href = '/MiniProject-1/login.html';
    }
}

// Image sliding (banners)
const slides = document.querySelector('.slides');
const slideCount = document.querySelectorAll('.slide').length;
let currentIndex = 0;

function moveToNextSlide() {
    currentIndex = (currentIndex + 1) % slideCount;
    slides.style.transform = `translateX(-${currentIndex * 100}%)`;
}

setInterval(moveToNextSlide, 3000); // Change slide every 3 seconds
