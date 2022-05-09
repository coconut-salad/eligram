const jwt = require('jsonwebtoken');
const errorHandler = require('../../utils/errorHandler');
const User = require('./../../models/user');

exports.completeProfile = async (req, res, next) => {
  try {
    const { dateOfBirth, gender } = req.body;
    const token = req.headers['authorization'];
    if (!token) {
      return next(errorHandler('Unauthorized', 401));
    }
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ email: payload.email });

    if (user.profileComplete) {
      return next(errorHandler('Profile already complete', 403));
    }

    await User.updateOne(
      { email: user.email },
      {
        $set: {
          dateOfBirth,
          gender,
          profileComplete: true,
        },
      }
    );

    const newToken = jwt.sign(
      {
        id: user._id,
        role: user.role,
        email: user.email,
        emailVerified: true,
        profileComplete: true,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.status(200).json({
      message: 'Profile Completed',
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
