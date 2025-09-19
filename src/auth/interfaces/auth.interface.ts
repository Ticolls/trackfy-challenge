import { Request } from 'express';

export interface AuthenticatedUser {
  email: string;
  firstName: string;
  lastName: string;
  photo: string;
}

export interface AuthenticatedRequest extends Request {
  user: AuthenticatedUser;
}
