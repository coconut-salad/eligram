const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');

const User = require('./../../models/user');
const errorHandler = require('./../../utils/errorHandler');
const randomString = require('./../../utils/randomString');

const clientID =
  '239251759381-h1lh7kvnjv1f2ao4640a2rgsgfgk72dm.apps.googleusercontent.com';
const client = new OAuth2Client(clientID);

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
        role: user.role,
        email: user.email,
        username: user.username,
        profileImg: user.profileImg,
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
        role: user.role,
        email: user.email,
        username: user.username,
        profileImg: user.profileImg,
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
      role: user.role,
      email: user.email,
      username: user.username,
      profileImg: user.profileImg,
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

exports.loginWithGoogle = async (req, res, next) => {
  try {
    const { user } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: user.idToken,
      audience: clientID,
    });
    const payload = ticket.getPayload();
    const existingUser = await User.findOne({ email: payload.email });
    if (!existingUser) {
      // create new user
      const { given_name, family_name, email, picture } = payload;

      const password = randomString(10);
      const hashedPassword = await bcrypt.hash(password, 12);

      let username = email.split('@')[0];
      let usernameExists = true;
      do {
        username += Math.floor(Math.random() * 10);
        usernameExists = !!(await User.findOne({ username }));
      } while (usernameExists);

      const newuser = await User.create({
        firstName: given_name,
        lastName: family_name,
        email,
        username,
        emailVerified: true,
        password: hashedPassword,
        profileImg: picture,
        provider: 'GOOGLE',
        vCode: Math.floor(100000 + Math.random() * 99999),
      });

      const token = jwt.sign(
        {
          id: newuser._id,
          role: newuser.role,
          email: newuser.email,
          username: newuser.username,
          profileImg: newuser.profileImg,
          emailVerified: newuser.emailVerified,
          profileComplete: newuser.profileComplete,
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      return res.status(201).json({
        message: 'Logged In Successfully',
        status: 201,
        token,
      });
    }
    if (!existingUser.profileComplete) {
      const token = jwt.sign(
        {
          id: existingUser._id,
          role: existingUser.role,
          email: existingUser.email,
          username: existingUser.username,
          profileImg: existingUser.profileImg,
          emailVerified: existingUser.emailVerified,
          profileComplete: existingUser.profileComplete,
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
        id: existingUser._id,
        role: existingUser.role,
        email: existingUser.email,
        username: existingUser.username,
        profileImg: existingUser.profileImg,
        emailVerified: existingUser.emailVerified,
        profileComplete: existingUser.profileComplete,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    return res.json({
      message: 'Login Successful',
      status: 200,
      token,
    });
  } catch (error) {
    return next(errorHandler(error.message, 400));
  }
};
