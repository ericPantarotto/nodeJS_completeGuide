import bcrypt from 'bcrypt';
import validator from 'validator';
import User from '../models/user.js';

async function createUser({ userInput }, req) {
  const errors = [];
  if (!validator.isEmail(userInput.email)) {
    errors.push({ message: 'Email is invalid.' });
  }
  if (
    validator.isEmpty(userInput.password) ||
    !validator.isLength(userInput.password, { min: 5 })
  ) {
    errors.push({ message: 'Password too short!' });
  }
  if (errors.length > 0) {
    const error = new Error('Invalid input.');
    error.data = errors;
    error.code = 422;
    throw error;
  }

  const existingUser = await User.findOne({ email: userInput.email }); //return User.findOne({ email: userInput.email }).then()
  if (existingUser) {
    const error = new Error('User exists already!');
    throw error;
  }

  const hashedPassword = await bcrypt.hash(userInput.password, 12);
  const user = new User({
    email: userInput.email,
    name: userInput.name,
    password: hashedPassword,
  });
  const createdUser = await user.save();
  return { ...createdUser._doc, _id: createdUser._id.toString() }; //making sure to overwrite _id as string after the spread operator
}

// async function createUser(args, req) {
//   const email = args.userInput.email;
// }

function hello() {
  // return { text: 'Hello World!', views: 1245 };
  return 'Hello World!';
}

export default {
  createUser,
  hello,
};

// function hello() {
//   return { text: 'Hello World!', views: 1245 };
//   //  return 'Hello World!';
// }

// export default {
//   hello,
// };
