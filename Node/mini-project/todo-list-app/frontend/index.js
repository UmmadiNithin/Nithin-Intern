document.addEventListener('DOMContentLoaded',()=>{
    if(localStorage.getItem('authToken')){
        window.location.href='home.html'
    }else{
        document.getElementById('login-button').addEventListener('click',()=>{
            window.location.href='login.html'
        })
    }
})