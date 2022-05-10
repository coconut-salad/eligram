const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true, select: false },
  username: { type: String, required: true, unique: true },
  emailVerified: { type: Boolean, required: true, default: false },
  profileComplete: { type: Boolean, required: true, default: false },
  vCode: { type: Number },
  dateOfBirth: { type: Date, required: true, default: Date.now() },
  gender: { type: String, required: true, default: 'M', enum: ['M', 'F'] },
  provider: {
    type: String,
    required: true,
    default: 'CUSTOM',
    enum: ['CUSTOM', 'GOOGLE'],
  },
  role: {
    type: String,
    required: true,
    default: 'USER',
    enum: ['OWNER', 'ADMIN', 'USER'],
  },
  lastSeen: { type: Number, default: Date.now() },
  profileImg: {
    type: String,
    required: true,
    default: '/assets/images/user-deafult.png',
  },
});

module.exports = mongoose.model('User', userSchema);
