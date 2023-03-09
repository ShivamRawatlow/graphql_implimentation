import { ApolloServerErrorCode } from '@apollo/server/errors';
import { GraphQLError } from 'graphql';
export const internalServerError = () => {
  return new GraphQLError('Something went wrong', {
    extensions: {
      code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
    },
  });
};

export const badUserInputError = (message: string) => {
  return new GraphQLError(message, {
    extensions: {
      code: ApolloServerErrorCode.BAD_USER_INPUT,
    },
  });
};

export const errorMessages = {
  USER_NOT_FOUND: 'User not found',
  POST_NOT_FOUND: 'Post not found',
  POST_BODY_EMPTY: 'Post body must not be empty',
  ACTION_NOT_ALLOWED: 'Action not allowed',
  WRONG_CREDENTIALS: 'Wrong credentials',
  EMAIL_TAKEN: 'Email already taken',
  EMPTY_URL: 'URL is empty',
  EMPTY_COMMENT: 'Empty Comment',
  USERNAME_EMPTY: 'UserName must not be empty',
  EMAIL_EMPTY: 'Email must not be empty',
  EMAIL_INVALID: 'Email must be a valid email address',
  PASSWORD_EMPTY: 'Password must not be empty',
  PASSWORD_CONFIRM_PASSWORD_NOT_MATCH:
    'Password does not match confirm password',
  INVALID_TOKEN: 'Invalid/Expired token',
  NO_TOKEN: 'Authorization header must be provided',
};
