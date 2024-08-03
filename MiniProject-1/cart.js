

document.addEventListener('DOMContentLoaded', () => {
    const iconCart = document.getElementById('icon-cart');
    const closeBtn = document.querySelector('.cartTab .close');

    const body = document.querySelector('body');

    const myFunction = () => {
        body.classList.toggle('activeTabCart');
        console.log('Cart icon clicked. activeTabCart class toggled.');
    };

    iconCart.addEventListener('click', myFunction);
    closeBtn.addEventListener('click', myFunction);
});
