const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const errorHandler = require('./../../utils/errorHandler');
const User = require('../../models/user');

exports.signup = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(errorHandler(errors.array()[0].msg, 422));
    }

    const { firstName, lastName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);

    let username = email.split('@')[0];
    let usernameExists = true;
    do {
      username += Math.floor(Math.random() * 10);
      usernameExists = !!(await User.findOne({ username }));
    } while (usernameExists);

    const user = await User.create({
      firstName,
      lastName,
      email,
      username,
      password: hashedPassword,
      vCode: Math.floor(100000 + Math.random() * 99999),
    });

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        email: user.email,
        emailVerified: user.emailVerified,
        profileComplete: user.profileComplete,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.status(201).json({
      message: 'User signed up successfully',
      status: 201,
      token,
    });
  } catch (error) {
    return next(errorHandler());
  }
};
