import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';

async function signup(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Signup validation failed.');
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;

  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      email: email,
      password: hashedPassword,
      name: name,
    });
    const result = await user.save();
    return res
      .status(201)
      .json({ message: 'User Created!', userId: result._id });
  } catch (err) {
    !err.statusCode && (err.statusCode = 500);
    next(err);
  }
}

async function login(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const loadedUser = await User.findOne({ email: email });
    if (!loadedUser) {
      const error = new Error("A user with this email couldn't be found");
      error.statusCode = 401;
      throw error;
    }

    const doMatch = await bcrypt.compare(password, loadedUser.password);
    if (!doMatch) {
      const error = new Error('Wrong password!');
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      {
        email: loadedUser.email,
        userId: loadedUser._id.toString(),
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    return res
      .status(200)
      .json({ token: token, userId: loadedUser._id.toString() });
  } catch (err) {
    !err.statusCode && (err.statusCode = 500);
    next(err);
    return err
  }
}

async function getUserStatus(req, res, next) {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      const error = new Error("A user with this email couldn't be found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ status: user.status });
  } catch (err) {
    !err.statusCode && (err.statusCode = 500);
    next(err);
  }
}

async function updateUserStatus(req, res, next) {
  const newStatus = req.body.status;

  try {
    const user = await User.findById(req.userId);
    if (!user) {
      const error = new Error("A user with this email couldn't be found");
      error.statusCode = 404;
      throw error;
    }
    user.status = newStatus;
    await user.save();
    res.status(200).json({ mesage: 'User updated' });
  } catch (err) {
    !err.statusCode && (err.statusCode = 500);
    next(err);
  }
}

export default {
  signup,
  login,
  getUserStatus,
  updateUserStatus,
};
