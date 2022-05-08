const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const errorHandler = require('../../utils/errorHandler');

exports.verifyEmail = async (req, res, next) => {
  try {
    const { vCode } = req.body;
    const token = req.headers['authorization'];
    if (!token) {
      return next(errorHandler('Unauthorized', 401));
    }
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ email: payload.email });

    if (user.emailVerified) {
      return next(errorHandler('Email already verified', 409));
    }
    if (user.vCode !== vCode) {
      return next(errorHandler('Invalid Verification Code', 403));
    }

    await User.updateOne(
      { email: user.email },
      { $set: { emailVerified: true } }
    );

    const newToken = jwt.sign(
      {
        id: user._id,
        email: user.email,
        emailVerified: true,
        profileComplete: false,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.status(200).json({
      message: 'Email Verified',
      status: 200,
      token: newToken,
    });
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return next(errorHandler(error.message, 401));
    }
    return next(errorHandler());
  }
};

exports.verifyToken = async (req, res, next) => {
  const { token } = req.body;
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return res.json({
      valid: true,
    });
  } catch (error) {
    return res.status(401).json({
      valid: false,
    });
  }
};
