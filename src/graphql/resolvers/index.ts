import CommentsResolver from './comments';
import PostsResolver from './posts';
import UserResolver from './users';

const resolvers = {
  Post: {
    likeCount(parent: any) {
      return parent.likes.length;
    },
    commentCount(parent: any) {
      return parent.comments.length;
    },
  },
  Query: {
    ...PostsResolver.Query,
  },
  Mutation: {
    ...UserResolver.Mutation,
    ...PostsResolver.Mutation,
    ...CommentsResolver.Mutation,
  },
};

export default resolvers;
