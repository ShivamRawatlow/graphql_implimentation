import { gql } from 'apollo-server';
const typeDefs = gql`
  type Post {
    id: ID!
    description: String!
    picUrl: String
    createdAt: String!
    userEmail: String!
    comments: [Comment]!
    likes: [Like]!
    likeCount: Int!
    commentCount: Int!
  }
  type Comment {
    id: ID!
    createdAt: String!
    userEmail: String!
    userName: String!
    description: String!
  }
  type Like {
    id: ID!
    createdAt: String!
    userEmail: String!
  }
  type User {
    id: ID!
    email: String!
    token: String
    picUrl: String!
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
    getPost(postId: ID!): Post!
    getUser(email: String): User!
    getMe: User!
  }
  type Mutation {
    updateProfilePic(picUrl: String!): User!
    register(registerInput: RegisterInput): User!
    login(email: String!, password: String!): User!
    createPost(description: String!, picUrl: String): Post!
    deletePost(postId: ID!): String!
    createComment(postId: ID!, description: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    likePost(postId: ID!): Post!
  }
`;

export default typeDefs;
