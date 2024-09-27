const now = new Date();
console.log(`Current Date and Time: ${now}`);

// dateDifference.js
const date1 = new Date('2024-08-01T00:00:00Z');

const date2 = new Date('2024-08-05T00:00:00Z');

const differenceInMilliseconds = date2 - date1;

console.log(`Difference in milliseconds: ${differenceInMilliseconds}`);


// timeTillDiwali.js
const diwaliDate = new Date('2024-11-01T00:00:00Z');
const Current = new Date();

const timeDifference = diwaliDate - Current;
const secondsUntilDiwali = Math.floor(timeDifference / 1000);

console.log(`Seconds until Diwali: ${secondsUntilDiwali}`);
