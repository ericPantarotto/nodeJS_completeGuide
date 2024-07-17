import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
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
    error.code = 422;
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

async function login({ email, password }) {
  const user = await User.findOne({ email: email });
  if (!user) {
    const error = new Error('User not found!');
    error.code = 401;
    throw error;
  }
  const doMatch = await bcrypt.compare(password, user.password);
  if (!doMatch) {
    const error = new Error('Wrong password!');
    error.statusCode = 401;
    throw error;
  }

  const token = jwt.sign(
    {
      userId: user._id.toString(),
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  return { token: token, userId: user._id.toString() };
}

async function user(args, req) {
  if (!req.isAuth) {
    const error = new Error('Not authenticated.');
    error.code = 401;
    throw error;
  }

  try {
    const user = await User.findById(req.userId);
    if (!user) {
      const error = new Error("A user with this email couldn't be found");
      error.statusCode = 404;
      throw error;
    }

    return { ...user._doc, _id: user._id.toString() };
  } catch (err) {
    !err.statusCode && (err.statusCode = 500);
    next(err);
  }
}

async function updateStatus({ status }, req) {
  if (!req.isAuth) {
    const error = new Error('Not authenticated.');
    error.code = 401;
    throw error;
  }

  try {
    const user = await User.findById(req.userId);
    if (!user) {
      const error = new Error("A user with this email couldn't be found");
      error.statusCode = 404;
      throw error;
    }
    user.status = status;
    await user.save();
    return { ...user._doc, _id: user._id.toString() };
  } catch (err) {
    !err.statusCode && (err.statusCode = 500);
    next(err);
  }
}

export { createUser, login, user, updateStatus };
