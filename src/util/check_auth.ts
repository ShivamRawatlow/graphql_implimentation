import { AuthenticationError } from 'apollo-server';
import jwt, { Secret } from 'jsonwebtoken';
import { IUser } from '../models/User';

const CheckAuth = (context: any) => {
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split('Bearer ')[1];
    if (token) {
      try {
        const user = jwt.verify(
          token,
          process.env.JWT_SECRET! as Secret
        ) as IUser;
        return user;
      } catch (err) {
        throw new AuthenticationError('Invalid/Expired token');
      }
    }
    throw new Error("Authentication token must be 'Bearer [token]");
  }
  throw new Error('Authorization header must be provided');
};

export default CheckAuth;
