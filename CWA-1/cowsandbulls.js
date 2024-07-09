function generateSecretNumber() {
    let digits = [];
    
    while (digits.length < 4) {
        let digit = Math.floor(Math.random() * 10);
        if (!digits.includes(digit)) {
            digits.push(digit);
        }
    }
    console.log(digits)
    return digits.join('');
}

function getCowsAndBulls(secret, guess) {
    let cows = 0;
    let bulls = 0;
    
    for (let i = 0; i < 4; i++) {
        if (secret[i] === guess[i]) {
            bulls++;
        } else if (secret.includes(guess[i])) {
            cows++;
        }
    }
    return { cows: cows, bulls: bulls };
}


let secretNumber = generateSecretNumber();
let attempts = 0;
let maxAttempts = 4;

document.getElementById('guessForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    let guessInput = document.getElementById('guessInput');
    let guess = guessInput.value;
    guessInput.value = "";

    if (guess.length !== 4 || isNaN(guess) || new Set(guess).size !== 4) {
        alert("Please enter a different valid 4-digit number.");
        return;
    }

    attempts++;
    let result = getCowsAndBulls(secretNumber, guess);


    let resultDiv = document.getElementById('results');
    let resultMessage = document.createElement('p');
    resultMessage.textContent = `Attempt ${attempts}: ${guess} - ${result.bulls} Bulls, ${result.cows} Cows`;
    resultDiv.appendChild(resultMessage);

    if (guess === secretNumber) {
        alert(`Congratulations! You've guessed the secret number ${secretNumber} in ${attempts} attempts.`);
        document.getElementById('guessForm').reset();
    } else if (attempts >= maxAttempts) {
        alert(`Sorry, you've used all ${maxAttempts} attempts. The secret number was ${secretNumber}.`);
        document.getElementById('guessForm').reset();
    } 
});

