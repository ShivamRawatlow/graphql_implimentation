import Post from '../../models/Post';
import { ResolverMap } from '../../types/graphql-utils';
import CheckAuth from '../../util/check_auth';
import {
  badUserInputError,
  errorMessages,
  internalServerError,
} from '../../util/errors';

const PostsResolver: ResolverMap = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find().sort({ createdAt: -1 });
        return posts;
      } catch (err) {
        throw internalServerError();
      }
    },

    async getPost(parent, { postId }) {
      const post = await Post.findById(postId);
      if (post) {
        return post;
      } else {
        throw badUserInputError(errorMessages.POST_NOT_FOUND);
      }
    },

    async getUserPosts(parent, { email }) {
      const posts = await Post.find().sort({ createdAt: -1 });
      const userPosts: any = [];
      posts.forEach((post) => {
        if (post.userEmail === email) userPosts.push(post);
      });
      return userPosts;
    },
  },

  Mutation: {
    async createPost(parent, { description, picUrl }, context) {
      const user = CheckAuth(context);

      if (description.trim() === '') {
        throw badUserInputError(errorMessages.POST_BODY_EMPTY);
      }

      const newPost = new Post({
        description,
        picUrl,
        user: user._id,
        userEmail: user.email,
        createdAt: new Date().toISOString(),
      });

      const post = await newPost.save();
      return post;
    },

    async deletePost(parent, { postId }, context) {
      const user = CheckAuth(context);
      const post = await Post.findById(postId);
      if (user.email === post?.userEmail) {
        await post.delete();
        return 'Post deleted successfully';
      } else {
        throw badUserInputError(errorMessages.ACTION_NOT_ALLOWED);
      }
    },

    async likePost(parent, { postId }, context) {
      const { email } = CheckAuth(context);
      const post = await Post.findById(postId);
      if (post) {
        if (post.likes.find((like) => like.userEmail === email)) {
          //Post already liked, unlike it
          post.likes = post.likes.filter((like) => like.userEmail !== email);
        } else {
          //Not liked, like post
          post.likes.push({
            userEmail: email,
            createdAt: new Date().toISOString(),
          });
        }
        const savedPost = await post.save();
        return savedPost;
      } else throw badUserInputError(errorMessages.USER_NOT_FOUND);
    },
  },
};

export default PostsResolver;
