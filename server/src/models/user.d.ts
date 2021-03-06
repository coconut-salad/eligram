import { Document, Model } from 'mongoose';

interface User extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  username: string;
  emailVerified: boolean;
  profileComplete: boolean;
  provider: string;
  vCode?: number;
  role: string;
  dateOfBirth: string;
  gender: string;
  lastSeen: number;
  profileImg: string;
}

let user: Model<User>;

export = user;
