// main.js

// Import the built-in HTTP module and the calculator module
const http = require('http');
const calculator = require('./calculator');

// Create a server and listen for requests
const server = http.createServer((req, res) => {
    // Log the request
    calculator.logEvent('Received a request.');

    // Example usage of the calculator functions
    const x = 10;
    const y = 5;
    
    const sum = calculator.add(x, y);
    const difference = calculator.sub(x, y);
    const product = calculator.multiply(x, y);
    const quotient = calculator.divide(x, y);

    // Write the response head
    res.writeHead(200, { 'Content-Type': 'text/plain' });

    // Write the response body
    res.write(`Sum: ${x} + ${y} = ${sum}\n`);
    res.write(`Difference: ${x} - ${y} = ${difference}\n`);
    res.write(`Product: ${x} * ${y} = ${product}\n`);
    res.write(`Quotient: ${x} / ${y} = ${quotient}\n`);

    // End the response
    res.end();
});

// Set the server to listen on port 3000
server.listen(3000, () => {
    calculator.logEvent('Server is listening on port 3000');
});
