import express from 'express';
import authController from '../controllers/auth.js';
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
    body('name ').trim().not().isEmpty(),
  ],
  authController.signup
);

export const expRouter = router;
