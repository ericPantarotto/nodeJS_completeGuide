import express from 'express';
import { body } from 'express-validator';
import authController from '../controllers/auth.js';
import User from '../models/user.js';

const router = express.Router();

router.put(
  '/signup',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email address.')
      .custom(async (value, { req }) => {
        const userDoc = await User.findOne({ email: value });
        if (userDoc) {
          return Promise.reject('Email exists already ...');
        }
      }),
    body(
      'password',
      'Please enter a password with only numbers and text and at least 5 characters.'
    )
      .trim()
      .isLength({ min: 5 })
      .isAlphanumeric(),
    body('name').trim().not().isEmpty(),
  ],
  authController.signup
);

router.post('/login');

export const expRouter = router;
