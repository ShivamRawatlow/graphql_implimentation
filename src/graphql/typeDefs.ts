import { gql } from 'apollo-server';
const typeDefs = gql`
  type Post {
    id: ID!
    description: String!
    createdAt: String!
    userName: String!
    comments: [Comment]!
    likes: [Like]!
    likeCount: Int!
    commentCount: Int!
  }
  type Comment {
    id: ID!
    createdAt: String!
    userName: String!
    description: String!
  }
  type Like {
    id: ID!
    createdAt: String!
    userName: String!
  }
  type User {
    id: ID!
    email: String!
    token: String!
    userName: String!
    createdAt: String!
  }

  input RegisterInput {
    userName: String!
    password: String!
    confirmPassword: String!
    email: String!
  }

  type Query {
    getPosts: [Post]
    getPost(postId: ID!): Post
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(userName: String!, password: String!): User!
    createPost(description: String!): Post!
    deletePost(postId: ID!): String!
    createComment(postId: String!, description: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    likePost(postId: ID!): Post!
  }
`;

export default typeDefs;
