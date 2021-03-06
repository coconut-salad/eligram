const express = require('express');
const { body } = require('express-validator');
const { completeProfile } = require('../controllers/auth/completeProfile');
const { login, loginWithGoogle } = require('../controllers/auth/login');

const { signup } = require('../controllers/auth/signup');
const { verifyEmail, verifyToken } = require('../controllers/auth/verify');
const User = require('./../models/user');

const router = express.Router();

router.post(
  '/signup',
  [
    body('firstName')
      .isAlpha()
      .withMessage('Please enter a valid first name')
      .isLength({ min: 1 })
      .withMessage('First Name must be at least 1 character long')
      .trim(),
    body('lastName')
      .isAlpha()
      .withMessage('Please enter a valid last name')
      .isLength({ min: 1 })
      .withMessage('last Name must be at least 1 character long')
      .trim(),
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email')
      .normalizeEmail()
      .custom(async (val) => {
        const user = await User.findOne({ email: val });
        if (user) {
          return Promise.reject('Email already exists');
        }
      }),
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long')
      .custom((val, { req }) => {
        if (val !== req.body.confirmPassword) {
          throw new Error('Passwords do not match');
        }
        return true;
      }),
  ],
  signup
);

router.post('/verify-email', verifyEmail);

router.post('/verify-token', verifyToken);

router.post('/complete-profile', completeProfile);

router.post('/login', [body('email').normalizeEmail()], login);

router.post('/google', loginWithGoogle);

module.exports = router;
