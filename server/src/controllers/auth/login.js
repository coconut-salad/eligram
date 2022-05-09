const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('./../../models/user');
const errorHandler = require('./../../utils/errorHandler');

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return next(errorHandler('Invalid Email or Password', 401));
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return next(errorHandler('Invalid Email or Password', 401));
  }
  if (!user.emailVerified) {
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        emailVerified: user.emailVerified,
        profileComplete: user.profileComplete,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    return res.json({
      message: 'Email not verified',
      status: 403,
      token,
    });
  }
  if (!user.profileComplete) {
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        emailVerified: user.emailVerified,
        profileComplete: user.profileComplete,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    return res.json({
      message: 'Profile not completed',
      status: 403,
      token,
    });
  }
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      emailVerified: user.emailVerified,
      profileComplete: user.profileComplete,
    },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
  return res.json({
    message: 'Login Successful',
    status: 200,
    token,
  });
};
