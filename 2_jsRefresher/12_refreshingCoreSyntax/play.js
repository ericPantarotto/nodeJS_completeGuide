const firstName = 'Max';
const  age = 29;
const hasHobbies = true;

function summarizeUser(userName, userAge, userHasHobby) {
  return (
    'Name is ' +
    userName +
    ', age is ' +
    userAge +
    ' and the user has hobbies: ' +
    userHasHobby
  );
}

console.log(summarizeUser(firstName, age, hasHobbies));
