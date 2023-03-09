import Post from '../../models/Post';
import { ResolverMap } from '../../types/graphql-utils';
import CheckAuth from '../../util/check_auth';
import { badUserInputError, errorMessages } from '../../util/errors';

const CommentsResolver: ResolverMap = {
  Mutation: {
    async createComment(parent, { postId, description }, context) {
      const { userName, email } = CheckAuth(context);
      if (description.trim() === '') {
        throw badUserInputError(errorMessages.EMPTY_COMMENT);
      }
      const post = await Post.findById(postId);
      if (post) {
        post.comments.unshift({
          description,
          userName,
          userEmail: email,
          createdAt: new Date().toISOString(),
        });
        const savedPost = await post.save();
        return savedPost;
      } else throw badUserInputError(errorMessages.USER_NOT_FOUND);
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
          const savedPost = await post.save();
          return savedPost;
        } else {
          throw badUserInputError(errorMessages.ACTION_NOT_ALLOWED);
        }
      } else throw badUserInputError(errorMessages.POST_NOT_FOUND);
    },
  },
};

export default CommentsResolver;
