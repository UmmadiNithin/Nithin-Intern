// var
var Name = "Alice";
console.log("Name (var):", Name);

Name = "Bob";
console.log("Updated Name (var):", Name);

// let 
let age = 25;
console.log("Age (let):", age);

age = 30;
console.log("Updated Age (let):", age);

// const 
const country = "USA";
console.log("Country (const):", country);

// country = "Canada"; 


if (true) {
  const blockScoped = "I am inside the block";
  console.log(blockScoped);
  blockScoped="changed "
  console.log(blockScoped);
  
}

// console.log(blockScoped); 


