import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useMutation, useQuery, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables extends { [key: string]: any }>(client: GraphQLClient, query: string, variables?: TVariables, requestHeaders?: RequestInit['headers']) {
  return async (): Promise<TData> => client.request({
    document: query,
    variables,
    requestHeaders
  });
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Comment = {
  __typename?: 'Comment';
  createdAt: Scalars['String'];
  description: Scalars['String'];
  id: Scalars['ID'];
  userEmail: Scalars['String'];
  userName: Scalars['String'];
};

export type Like = {
  __typename?: 'Like';
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  userEmail: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createComment: Post;
  createPost: Post;
  deleteComment: Post;
  deletePost: Scalars['String'];
  likePost: Post;
  login: User;
  register: User;
  updateProfilePic: User;
};


export type MutationCreateCommentArgs = {
  description: Scalars['String'];
  postId: Scalars['ID'];
};


export type MutationCreatePostArgs = {
  description: Scalars['String'];
  picUrl?: InputMaybe<Scalars['String']>;
};


export type MutationDeleteCommentArgs = {
  commentId: Scalars['ID'];
  postId: Scalars['ID'];
};


export type MutationDeletePostArgs = {
  postId: Scalars['ID'];
};


export type MutationLikePostArgs = {
  postId: Scalars['ID'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRegisterArgs = {
  registerInput?: InputMaybe<RegisterInput>;
};


export type MutationUpdateProfilePicArgs = {
  picUrl: Scalars['String'];
};

export type Post = {
  __typename?: 'Post';
  commentCount: Scalars['Int'];
  comments: Array<Maybe<Comment>>;
  createdAt: Scalars['String'];
  description: Scalars['String'];
  id: Scalars['ID'];
  likeCount: Scalars['Int'];
  likes: Array<Maybe<Like>>;
  picUrl?: Maybe<Scalars['String']>;
  userEmail: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getMe: User;
  getPost: Post;
  getPosts?: Maybe<Array<Maybe<Post>>>;
  getUser: User;
  getUserPosts?: Maybe<Array<Maybe<Post>>>;
};


export type QueryGetPostArgs = {
  postId: Scalars['ID'];
};


export type QueryGetUserArgs = {
  email?: InputMaybe<Scalars['String']>;
};


export type QueryGetUserPostsArgs = {
  email?: InputMaybe<Scalars['String']>;
};

export type RegisterInput = {
  confirmPassword: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  userName: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['ID'];
  picUrl: Scalars['String'];
  token?: Maybe<Scalars['String']>;
  userName: Scalars['String'];
};

export type CreateCommentMutationVariables = Exact<{
  postId: Scalars['ID'];
  description: Scalars['String'];
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment: { __typename?: 'Post', id: string, comments: Array<{ __typename?: 'Comment', id: string, userEmail: string, userName: string, description: string, createdAt: string } | null> } };

export type CreatePostMutationVariables = Exact<{
  description: Scalars['String'];
  picUrl?: InputMaybe<Scalars['String']>;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'Post', id: string, description: string, picUrl?: string | null, createdAt: string, userEmail: string } };

export type DeleteCommentMutationVariables = Exact<{
  postId: Scalars['ID'];
  commentId: Scalars['ID'];
}>;


export type DeleteCommentMutation = { __typename?: 'Mutation', deleteComment: { __typename?: 'Post', id: string, commentCount: number, comments: Array<{ __typename?: 'Comment', id: string } | null> } };

export type DeletePostMutationVariables = Exact<{
  postId: Scalars['ID'];
}>;


export type DeletePostMutation = { __typename?: 'Mutation', deletePost: string };

export type GetPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPostsQuery = { __typename?: 'Query', getPosts?: Array<{ __typename?: 'Post', id: string, description: string, picUrl?: string | null, createdAt: string, userEmail: string, likeCount: number, commentCount: number, likes: Array<{ __typename?: 'Like', id: string, userEmail: string } | null>, comments: Array<{ __typename?: 'Comment', id: string, userName: string, userEmail: string, createdAt: string, description: string } | null> } | null> | null };

export type GetUserQueryVariables = Exact<{
  email: Scalars['String'];
}>;


export type GetUserQuery = { __typename?: 'Query', getUser: { __typename?: 'User', id: string, userName: string, email: string, picUrl: string } };

export type GetUserPostsQueryVariables = Exact<{
  email: Scalars['String'];
}>;


export type GetUserPostsQuery = { __typename?: 'Query', getUserPosts?: Array<{ __typename?: 'Post', id: string, description: string, picUrl?: string | null } | null> | null };

export type LikePostMutationVariables = Exact<{
  postId: Scalars['ID'];
}>;


export type LikePostMutation = { __typename?: 'Mutation', likePost: { __typename?: 'Post', id: string, likeCount: number, likes: Array<{ __typename?: 'Like', id: string, userEmail: string } | null> } };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'User', id: string, email: string, userName: string, createdAt: string, picUrl: string, token?: string | null } };

export type RegisterMutationVariables = Exact<{
  userName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  confirmPassword: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'User', id: string, email: string, userName: string, createdAt: string, picUrl: string, token?: string | null } };

export type UpdateProfilePicMutationVariables = Exact<{
  picUrl: Scalars['String'];
}>;


export type UpdateProfilePicMutation = { __typename?: 'Mutation', updateProfilePic: { __typename?: 'User', id: string, picUrl: string, token?: string | null } };


export const CreateCommentDocument = `
    mutation createComment($postId: ID!, $description: String!) {
  createComment(postId: $postId, description: $description) {
    id
    comments {
      id
      userEmail
      userName
      description
      createdAt
    }
  }
}
    `;
export const useCreateCommentMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateCommentMutation, TError, CreateCommentMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateCommentMutation, TError, CreateCommentMutationVariables, TContext>(
      ['createComment'],
      (variables?: CreateCommentMutationVariables) => fetcher<CreateCommentMutation, CreateCommentMutationVariables>(client, CreateCommentDocument, variables, headers)(),
      options
    );
export const CreatePostDocument = `
    mutation createPost($description: String!, $picUrl: String) {
  createPost(description: $description, picUrl: $picUrl) {
    id
    description
    picUrl
    createdAt
    userEmail
  }
}
    `;
export const useCreatePostMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreatePostMutation, TError, CreatePostMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreatePostMutation, TError, CreatePostMutationVariables, TContext>(
      ['createPost'],
      (variables?: CreatePostMutationVariables) => fetcher<CreatePostMutation, CreatePostMutationVariables>(client, CreatePostDocument, variables, headers)(),
      options
    );
export const DeleteCommentDocument = `
    mutation deleteComment($postId: ID!, $commentId: ID!) {
  deleteComment(postId: $postId, commentId: $commentId) {
    id
    comments {
      id
    }
    commentCount
  }
}
    `;
export const useDeleteCommentMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<DeleteCommentMutation, TError, DeleteCommentMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<DeleteCommentMutation, TError, DeleteCommentMutationVariables, TContext>(
      ['deleteComment'],
      (variables?: DeleteCommentMutationVariables) => fetcher<DeleteCommentMutation, DeleteCommentMutationVariables>(client, DeleteCommentDocument, variables, headers)(),
      options
    );
export const DeletePostDocument = `
    mutation deletePost($postId: ID!) {
  deletePost(postId: $postId)
}
    `;
export const useDeletePostMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<DeletePostMutation, TError, DeletePostMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<DeletePostMutation, TError, DeletePostMutationVariables, TContext>(
      ['deletePost'],
      (variables?: DeletePostMutationVariables) => fetcher<DeletePostMutation, DeletePostMutationVariables>(client, DeletePostDocument, variables, headers)(),
      options
    );
export const GetPostsDocument = `
    query getPosts {
  getPosts {
    id
    description
    picUrl
    createdAt
    userEmail
    likeCount
    likes {
      id
      userEmail
    }
    commentCount
    comments {
      id
      userName
      userEmail
      createdAt
      description
    }
  }
}
    `;
export const useGetPostsQuery = <
      TData = GetPostsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: GetPostsQueryVariables,
      options?: UseQueryOptions<GetPostsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetPostsQuery, TError, TData>(
      variables === undefined ? ['getPosts'] : ['getPosts', variables],
      fetcher<GetPostsQuery, GetPostsQueryVariables>(client, GetPostsDocument, variables, headers),
      options
    );
export const GetUserDocument = `
    query getUser($email: String!) {
  getUser(email: $email) {
    id
    userName
    email
    picUrl
  }
}
    `;
export const useGetUserQuery = <
      TData = GetUserQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetUserQueryVariables,
      options?: UseQueryOptions<GetUserQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetUserQuery, TError, TData>(
      ['getUser', variables],
      fetcher<GetUserQuery, GetUserQueryVariables>(client, GetUserDocument, variables, headers),
      options
    );
export const GetUserPostsDocument = `
    query getUserPosts($email: String!) {
  getUserPosts(email: $email) {
    id
    description
    picUrl
  }
}
    `;
export const useGetUserPostsQuery = <
      TData = GetUserPostsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetUserPostsQueryVariables,
      options?: UseQueryOptions<GetUserPostsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetUserPostsQuery, TError, TData>(
      ['getUserPosts', variables],
      fetcher<GetUserPostsQuery, GetUserPostsQueryVariables>(client, GetUserPostsDocument, variables, headers),
      options
    );
export const LikePostDocument = `
    mutation likePost($postId: ID!) {
  likePost(postId: $postId) {
    id
    likeCount
    likes {
      id
      userEmail
    }
  }
}
    `;
export const useLikePostMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<LikePostMutation, TError, LikePostMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<LikePostMutation, TError, LikePostMutationVariables, TContext>(
      ['likePost'],
      (variables?: LikePostMutationVariables) => fetcher<LikePostMutation, LikePostMutationVariables>(client, LikePostDocument, variables, headers)(),
      options
    );
export const LoginDocument = `
    mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    id
    email
    userName
    createdAt
    picUrl
    token
  }
}
    `;
export const useLoginMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<LoginMutation, TError, LoginMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<LoginMutation, TError, LoginMutationVariables, TContext>(
      ['login'],
      (variables?: LoginMutationVariables) => fetcher<LoginMutation, LoginMutationVariables>(client, LoginDocument, variables, headers)(),
      options
    );
export const RegisterDocument = `
    mutation register($userName: String!, $email: String!, $password: String!, $confirmPassword: String!) {
  register(
    registerInput: {userName: $userName, email: $email, password: $password, confirmPassword: $confirmPassword}
  ) {
    id
    email
    userName
    createdAt
    picUrl
    token
  }
}
    `;
export const useRegisterMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<RegisterMutation, TError, RegisterMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<RegisterMutation, TError, RegisterMutationVariables, TContext>(
      ['register'],
      (variables?: RegisterMutationVariables) => fetcher<RegisterMutation, RegisterMutationVariables>(client, RegisterDocument, variables, headers)(),
      options
    );
export const UpdateProfilePicDocument = `
    mutation updateProfilePic($picUrl: String!) {
  updateProfilePic(picUrl: $picUrl) {
    id
    picUrl
    token
  }
}
    `;
export const useUpdateProfilePicMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdateProfilePicMutation, TError, UpdateProfilePicMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdateProfilePicMutation, TError, UpdateProfilePicMutationVariables, TContext>(
      ['updateProfilePic'],
      (variables?: UpdateProfilePicMutationVariables) => fetcher<UpdateProfilePicMutation, UpdateProfilePicMutationVariables>(client, UpdateProfilePicDocument, variables, headers)(),
      options
    );