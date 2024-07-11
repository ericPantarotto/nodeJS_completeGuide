import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
import User from '../models/user.js';

function signup(req, res, next) {
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

  bcrypt
    .hash(password, 12)
    .then(hashedPassword => {
      const user = new User({
        email: email,
        password: hashedPassword,
        name: name,
      });
      return user.save();
    })
    .then(result => {
      return res
        .status(201)
        .json({ message: 'User Created!', userId: result._id });
    })
    .catch(err => {
      !err.statusCode && (err.statusCode = 500);
      next(err);
    });
}

function login(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        const error = new Error("A user with this email couldn't be found");
        error.statusCode = 401;
        throw error;
      }

      return bcrypt.compare(password, user.password);
    })
    .then(doMatch => {
      if (doMatch) {
      }

      const error = new Error('Wrong password!');
      error.statusCode = 401;
      throw error;
    })
    .catch(err => {
      !err.statusCode && (err.statusCode = 500);
      next(err);
    });
}

export default {
  signup,
  login,
};
