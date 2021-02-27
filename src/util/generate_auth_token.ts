import jwt from 'jsonwebtoken';
import { IUser } from '../models/User';

const generateAuthToken = (user: IUser) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      userName: user.userName,
      picUrl: user.picUrl,
    },
    process.env.JWT_SECRET!,
    { expiresIn: '30d' }
  );
};

export default generateAuthToken;
