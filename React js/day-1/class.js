
class Person {
    
    constructor(name, age) {
      this.name = name;  
      this.age = age;    
    }
  

    greet() {
      console.log(`Hello, my name is ${this.name}.`);
    }
  
 
    isAdult() {
      return this.age >= 18;
    }
  }
  
  const person1 = new Person('Alice', 22);
  
 
  person1.greet(); 
  
 
  if (person1.isAdult()) {
    console.log(`${person1.name} is an adult.`); 
  } else {
    console.log(`${person1.name} is not an adult.`);
  }
  