export interface SignUpForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthUser {
  id: string;
  role: string;
  email: string;
  emailVerified: boolean;
  profileComplete: boolean;
}

export interface LoginForm {
  email: string;
  password: string;
}

export enum Roles {
  OWNER = 'OWNER',
  ADMIN = 'ADMIN',
  USER = 'USER',
}
