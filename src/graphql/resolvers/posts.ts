import { AuthenticationError, UserInputError } from 'apollo-server';
import Post from '../../models/Post';
import { ResolverMap } from '../../types/graphql-utils';
import CheckAuth from '../../util/check_auth';



const PostsResolver: ResolverMap = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find().sort({ createdAt: -1 });
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },

    async getPost(parent, { postId }) {
      try {
        const post = await Post.findById(postId);
        if (post) {
          return post;
        } else {
          throw new Error('Post not found');
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },

  Mutation: {
    async createPost(parent, { description }, context) {
      const user = CheckAuth(context);

      if (description.trim() === '') {
        throw new Error('Post body must not be empty');
      }

      const newPost = new Post({
        description,
        user: user._id,
        userName: user.userName,
        createdAt: new Date().toISOString(),
      });

      const post = await newPost.save();
      return post;
    },

    async deletePost(parent, { postId }, context) {
      const user = CheckAuth(context);
      try {
        const post = await Post.findById(postId);
        if (user.userName === post?.userName) {
          await post.delete();
          return 'Post deleted successfully';
        } else {
          throw new AuthenticationError('Action not allowed');
        }
      } catch (err) {
        throw new Error(err);
      }
    },

    async likePost(parent, { postId }, context) {
      const { userName } = CheckAuth(context);
      const post = await Post.findById(postId);
      if (post) {
        if (post.likes.find((like) => like.userName === userName)) {
          //Post already liked, unlike it
          post.likes = post.likes.filter((like) => like.userName !== userName);
        } else {
          //Not liked, like post
          post.likes.push({ userName, createdAt: new Date().toISOString() });
        }
        await post.save();
        return post;
      } else throw new UserInputError('Post not found');
    },
  },
};

export default PostsResolver;
