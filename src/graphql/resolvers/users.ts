import bcrypt from 'bcryptjs';
import User from '../../models/User';
import {
  validateLoginInput,
  validateRegisterInput,
} from '../../util/validators';
import { ResolverMap } from '../../types/graphql-utils';
import generateAuthToken from '../../util/generate_auth_token';
import CheckAuth from '../../util/check_auth';
import { badUserInputError, errorMessages } from '../../util/errors';

const UserResolver: ResolverMap = {
  Mutation: {
    async login(parent, { email, password }, context) {
      const { valid, error } = validateLoginInput(email, password);

      if (!valid) {
        throw badUserInputError(error);
      }
      const user = await User.findOne({ email });

      if (!user) {
        throw badUserInputError(errorMessages.USER_NOT_FOUND);
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        throw badUserInputError(errorMessages.WRONG_CREDENTIALS);
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
      { registerInput: { userName, email, password, confirmPassword }, context }
    ) {
      const { valid, error } = validateRegisterInput(
        userName,
        email,
        password,
        confirmPassword
      );
      if (!valid) {
        throw badUserInputError(error);
      }

      const user = await User.findOne({ email });
      if (user) {
        throw badUserInputError(errorMessages.EMAIL_TAKEN);
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
        throw badUserInputError(errorMessages.EMPTY_URL);
      }
      const updatedUser = await User.findByIdAndUpdate(
        user.id,
        { picUrl },
        { new: true }
      );

      if (!updatedUser) {
        throw badUserInputError(errorMessages.USER_NOT_FOUND);
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
      const user = await User.findOne({ email });
      if (user) {
        return user;
      } else {
        throw badUserInputError(errorMessages.USER_NOT_FOUND);
      }
    },

    async getMe(parent, context) {
      const authUser = CheckAuth(context);
      const user = await User.findById(authUser.id);
      if (user) {
        console.log('getMe executed user:', user);
        return user;
      } else {
        throw badUserInputError(errorMessages.USER_NOT_FOUND);
      }
    },
  },
};

export default UserResolver;
