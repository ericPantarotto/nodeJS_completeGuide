const person = {
  name: 'Max',
  age: 29,
  greet() {
    console.log('Hi, I am ' + this.name);
  }
};

const hobbies = ['Sports', 'Cooking'];

hobbies.push('Programming');
console.log(hobbies);

// INFO: despite using const, we can update this array without any error, the reason being that reference type only
// stores an address pointing to the place in memory where that array is stored, and that pointer is not modified by
// adding a new element to that array, only the object at which it is pointing has changed but that doesn't matter