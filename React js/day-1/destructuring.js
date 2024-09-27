// atrray Destructuring
const fruits = ['Apple', 'Banana', 'Cherry'];
const [firstFruit, secondFruit, thirdFruit] = fruits;

console.log(firstFruit);  
console.log(secondFruit); 
console.log(thirdFruit); 

// object Destructuring 
const person = {
  Name: 'Nithin',
  age: 22,
  city: 'proddatur'
};

const { Name, age, city } = person;

console.log(Name);
console.log(age);  
console.log(city); 
