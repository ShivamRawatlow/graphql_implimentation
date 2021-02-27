import { AuthenticationError, UserInputError } from 'apollo-server';
import Post from '../../models/Post';
import { ResolverMap } from '../../types/graphql-utils';
import CheckAuth from '../../util/check_auth';

const CommentsResolver: ResolverMap = {
  Mutation: {
    async createComment(parent, { postId, description }, context) {
      const { userName, email } = CheckAuth(context);
      if (description.trim() === '') {
        throw new UserInputError('Empty comment', {
          errors: {
            body: 'Comment body must not be empty',
          },
        });
      }

      const post = await Post.findById(postId);
      if (post) {
        post.comments.unshift({
          description,
          userName,
          userEmail: email,
          createdAt: new Date().toISOString(),
        });
        await post.save();
        return post;
      } else throw new UserInputError('Post not found');
    },

    async deleteComment(parent, { postId, commentId }, context) {
      const { email } = CheckAuth(context);
      const post = await Post.findById(postId);
      if (post) {
        const commentIndex = post.comments.findIndex(
          (c: any) => c.id === commentId
        );
        if (post.comments[commentIndex].userEmail === email) {
          post.comments.splice(commentIndex, 1);
          await post.save();
          return post;
        } else {
          throw new AuthenticationError('Action not allowed');
        }
      } else throw new UserInputError('Post not found');
    },
  },
};

export default CommentsResolver;
