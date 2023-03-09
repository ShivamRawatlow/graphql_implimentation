import jwt, { Secret } from 'jsonwebtoken';
import { IUser } from '../models/User';
import { badUserInputError, errorMessages } from './errors';

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
        throw badUserInputError(errorMessages.INVALID_TOKEN);
      }
    }
    throw badUserInputError(errorMessages.INVALID_TOKEN);
  }
  throw badUserInputError(errorMessages.NO_TOKEN);
};

export default CheckAuth;
