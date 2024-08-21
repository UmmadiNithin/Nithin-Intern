document.addEventListener('DOMContentLoaded', () => {
    const output = document.getElementById("display");
    const button = document.querySelector('.display');

    button.addEventListener('click', () => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts');
        xhr.responseType = 'json';
        
        xhr.onload = function() {
            const res = xhr.response;
           
            output.innerHTML = '';

            for (const post of res) {
                const postElement = document.createElement('div');
                postElement.innerHTML = `
                    <h1>${post.id}</h1>
                    <h2>${post.title}</h2>
                    <p>${post.body}</p>
                `;
                output.appendChild(postElement);
            }
        }

        xhr.send();
    });
});
