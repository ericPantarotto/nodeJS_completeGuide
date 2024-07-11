import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
import User from '../models/user.js';

function signup(req, res, next) {
  console.log('in');
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Signup validation failed.');
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  console.log('in after check');
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
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
}

export default {
  signup,
};
