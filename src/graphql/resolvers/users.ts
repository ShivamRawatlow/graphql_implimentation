import bcrypt from 'bcryptjs';
import { UserInputError } from 'apollo-server';
import User from '../../models/User';
import {
  validateLoginInput,
  validateRegisterInput,
} from '../../util/validators';
import { ResolverMap } from '../../types/graphql-utils';
import generateAuthToken from '../../util/generate_auth_token';
import CheckAuth from '../../util/check_auth';

const UserResolver: ResolverMap = {
  Mutation: {
    async login(parent, { email, password }) {
      const { valid, errors } = validateLoginInput(email, password);

      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }
      const user = await User.findOne({ email });

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
      parent,
      { registerInput: { userName, email, password, confirmPassword } }
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

    async updateProfilePic(parent, { picUrl }, context) {
      const user = CheckAuth(context);

      if (picUrl.trim() === '') {
        throw new Error('Url is empty');
      }
      const updatedUser = await User.findByIdAndUpdate(
        user.id,
        { picUrl },
        { new: true }
      );

      if (!updatedUser) {
        throw new UserInputError('User not found');
      }

      const token = generateAuthToken(updatedUser);

      return {
        //@ts-ignore
        ...updatedUser._doc,
        id: updatedUser.id,
        token,
      };
    },
  },

  Query: {
    async getUser(parent, { email }) {
      try {
        const user = await User.findOne({ email });
        if (user) {
          return user;
        } else {
          throw new Error('User not found');
        }
      } catch (err) {
        throw new Error(err);
      }
    },

    async getMe(parent, context) {
      const authUser = CheckAuth(context);
      try {
        const user = await User.findById(authUser.id);
        if (user) {
          return user;
        } else {
          throw new Error('User not found');
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};

export default UserResolver;
