const person = {
  name: "Max",
  age: 29,
  greet() {
    console.log("Hi, I am " + this.name);
  },
};

// INFO: spread operator with object
const copiedPerson = { ...person };
console.log(copiedPerson);

const hobbies = ["Sports", "Cooking"];

// HACK: const copiedArray = [hobbies];
// that would create a nested array => a new array, with the old array inside it, the exact same object, not a copy of it

//Option1:
// const copiedArray = hobbies.slice();
//Option2:
// INFO: spread operator with array, ... pulls out all elements within an array
const copiedArray = [...hobbies]; 
console.log(copiedArray);

// Option1
// const toArray = (arg1, arg2, arg3) => {
//   return [arg1, arg2, arg3];
// };
// INFO: rest operator, takes n arguments and bundle them up in an array
const toArray = (...args) => {
  return args;
};

console.log(toArray(1, 2, 3, 4));

/* NOTE:
Let's say we want to implement the pattern where when we add a new hobby, we don't edit the original array, 
but we create a new array with all the old values and the new value.

This is actually a pretty common pattern called immutability, where we never added existing values,
but where we always replace them with copies plus the changes.

spread and rest operators is the same => ..., it's the place that you use it that defines which one it is,
are you using it with an array, where you then pull elements , hence spread operator 
are you using it to merge multiple elements into an array, hence rest operators
*/
