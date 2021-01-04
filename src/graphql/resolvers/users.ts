import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserInputError } from 'apollo-server';
import User, { IUser } from '../../models/User';
import {
  validateLoginInput,
  validateRegisterInput,
} from '../../util/validators';
import { ResolverMap } from '../../types/graphql-utils';

const generateAuthToken = (user: IUser) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      userName: user.userName,
    },
    process.env.JWT_SECRET!,
    { expiresIn: '1h' }
  );
};

const UserResolver: ResolverMap = {
  Mutation: {
    async login(parent, { userName, password }) {
      const { valid, errors } = validateLoginInput(userName, password);
      const user = await User.findOne({ userName });

      if (!user) {
        errors.general = 'User not found';
        throw new UserInputError('User not found', { errors });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = 'Wrong credentials';
        throw new UserInputError('Wrong credentials', { errors });
      }
      const token = generateAuthToken(user);

      return {
        //@ts-ignore
        ...user._doc,
        id: user.id,
        token,
      };
    },

    async register(
      parent: any,
      { registerInput: { userName, email, password, confirmPassword } }: any
    ) {
      const { valid, errors } = validateRegisterInput(
        userName,
        email,
        password,
        confirmPassword
      );
      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }

      const user = await User.findOne({ email });
      if (user) {
        throw new UserInputError('Email is taken', {
          errors: {
            userName: 'This email is taken',
          },
        });
      }

      password = await bcrypt.hash(password, 12);
      const newUser = new User({
        email,
        userName,
        password,
        createdAt: new Date().toISOString(),
      });
      const res = await newUser.save();
      const token = generateAuthToken(res);

      return {
        //@ts-ignore
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};

export default UserResolver;
