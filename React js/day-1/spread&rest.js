function findMax(...numbers) {
    return Math.max(...numbers);
  }
  
  console.log(findMax(10, 20, 30)); 
  console.log(findMax(1, -2, 0, 3, -10));
  


const numbers = [1, 2, 3];
const newNumbers = [...numbers, 4, 5, 6];
console.log(newNumbers); 