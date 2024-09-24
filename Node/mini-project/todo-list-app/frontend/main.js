
document.addEventListener('DOMContentLoaded',()=>{
    if(localStorage.getItem('authToken')){
        window.location.href='home.html'
    }
    else{

function showModal(message) {
    document.getElementById('modalMessage').innerText = message;
    document.getElementById('messageModal').style.display = 'block';
    document.getElementById('messageModal').style.opacity = '1';
    document.querySelector('.modal-content').style.transform = 'scale(1)';
}


function closeModal() {
    document.getElementById('messageModal').style.opacity = '0';
    document.querySelector('.modal-content').style.transform = 'scale(0.9)';
    setTimeout(() => {
        document.getElementById('messageModal').style.display = 'none';
    }, 300);
}

document.getElementById('closeModal').addEventListener('click', closeModal);
document.getElementById('modalButton').addEventListener('click', closeModal);

window.addEventListener('click', function(event) {
    if (event.target == document.getElementById('messageModal')) {
        closeModal();
    }
});

// Login form submission handler
document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    const formObject = Object.fromEntries(formData);

    try {
        const response = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formObject)
        });

        if (response.ok) {
            const result = await response.json();

            
            if (result.token) {
                localStorage.setItem('authToken', result.token);
                localStorage.setItem('username', result.username);

                showModal('Login successful');
                setTimeout(() => { window.location.href = 'home.html'; }, 1500);  
            } else {
                showModal('Login failed: No token received');
            }
        } else {
            const error = await response.json();
            showModal(error.message || 'Login failed');
        }
    } catch (error) {
        console.error('Error:', error);
        showModal('An unexpected error occurred. Please try again later.');
    }
});
        
    }
})

