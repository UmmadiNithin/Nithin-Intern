// calculator.js

// Exporting functions for addition, subtraction, multiplication, and division
exports.add = (x, y) => {
    return x + y;
};

exports.sub = (x, y) => {
    return x - y;
};

exports.multiply = (x, y) => {
    return x * y;
};

exports.divide = (x, y) => {
    if (y === 0) {
        throw new Error("Division by zero is not allowed");
    }
    return x / y;
};

// Exporting a simple logging function
exports.logEvent = (message) => {
    console.log(`Log: ${message}`);
};
