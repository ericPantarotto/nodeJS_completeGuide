const person = {
  firstName: 'Max',
  age: 29,
  greet() {
    console.log('Hi, I am ' + this.name);
  },
};

// Option 1
// const printName = (person) => {
//   console.log(person.firstName);
// };

// Option 2
// INFO:  object destructuring
const printName = ({ firstName }) => {
  console.log(firstName);
};

printName(person);

const { firstName, age } = person;
console.log(firstName, age);

const hobbies = ['Sports', 'Cooking', 'crotte1', 'crotte2', 'crotte3'];
const [hobby1, hobby2, ...otherCrottes] = hobbies;
console.log(hobby1, hobby2, otherCrottes);
