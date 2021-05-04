import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};


export type ImageUploadResponse = {
  __typename?: 'ImageUploadResponse';
  url: Scalars['String'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken: Scalars['String'];
  user: Users;
};

export type Mutation = {
  __typename?: 'Mutation';
  updateProfile: Scalars['Boolean'];
  uploadUserImage: ImageUploadResponse;
  logUserOut: Scalars['Boolean'];
  deleteUser: Scalars['Boolean'];
  revokeRefreshTokensForUser: Scalars['Boolean'];
  loginUser: LoginResponse;
  registerUser: Scalars['Boolean'];
  createPost: Scalars['Boolean'];
  deletePost: Scalars['Boolean'];
};


export type MutationUpdateProfileArgs = {
  input: ProfileUpdateInput;
  userId: Scalars['Int'];
};


export type MutationUploadUserImageArgs = {
  file: Scalars['Upload'];
  userId: Scalars['Int'];
};


export type MutationDeleteUserArgs = {
  userId: Scalars['Int'];
};


export type MutationRevokeRefreshTokensForUserArgs = {
  userId: Scalars['Int'];
};


export type MutationLoginUserArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationRegisterUserArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
  username: Scalars['String'];
  lastName: Scalars['String'];
  firstName: Scalars['String'];
};


export type MutationCreatePostArgs = {
  datePublished: Scalars['DateTime'];
  userName: Scalars['String'];
  lastName: Scalars['String'];
  firstName: Scalars['String'];
  content: Scalars['String'];
};


export type MutationDeletePostArgs = {
  postID: Scalars['Int'];
};

export type Post = {
  __typename?: 'Post';
  postID: Scalars['Int'];
  userId: Scalars['Int'];
  userName: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  content: Scalars['String'];
  datePublished: Scalars['DateTime'];
  likes: Scalars['Int'];
  user: Users;
};

export type Profile = {
  __typename?: 'Profile';
  id: Scalars['Int'];
  bio?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
  user: Users;
};

export type ProfileUpdateInput = {
  bio?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  bye: Scalars['String'];
  getAllUsers: Array<Users>;
  getCurrentUser?: Maybe<Users>;
  getAllPosts: Array<Post>;
  getAllUserPosts: Array<Post>;
};


export type Users = {
  __typename?: 'Users';
  id: Scalars['Int'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
  tokenVersion: Scalars['Int'];
  followers: Scalars['Int'];
  following: Scalars['Int'];
  profileId: Scalars['Int'];
  posts: Array<Post>;
  profile: Profile;
};

export type ByeQueryVariables = Exact<{ [key: string]: never; }>;


export type ByeQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'bye'>
);

export type CreatePostMutationVariables = Exact<{
  content: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  userName: Scalars['String'];
  datePublished: Scalars['DateTime'];
}>;


export type CreatePostMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createPost'>
);

export type DeletePostMutationVariables = Exact<{
  postID: Scalars['Int'];
}>;


export type DeletePostMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deletePost'>
);

export type DeleteUserMutationVariables = Exact<{
  userId: Scalars['Int'];
}>;


export type DeleteUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteUser'>
);

export type GetAllPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllPostsQuery = (
  { __typename?: 'Query' }
  & { getAllPosts: Array<(
    { __typename?: 'Post' }
    & Pick<Post, 'postID' | 'userId' | 'firstName' | 'lastName' | 'content' | 'datePublished' | 'userName' | 'likes'>
  )> }
);

export type GetAllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllUsersQuery = (
  { __typename?: 'Query' }
  & { getAllUsers: Array<(
    { __typename?: 'Users' }
    & Pick<Users, 'id' | 'firstName' | 'lastName' | 'username' | 'email' | 'followers' | 'following'>
  )> }
);

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = (
  { __typename?: 'Query' }
  & { getCurrentUser?: Maybe<(
    { __typename?: 'Users' }
    & Pick<Users, 'id' | 'firstName' | 'lastName' | 'email' | 'username' | 'followers' | 'following'>
    & { profile: (
      { __typename?: 'Profile' }
      & Pick<Profile, 'id' | 'bio' | 'avatar' | 'website' | 'location'>
    ) }
  )> }
);

export type GetAllUserPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllUserPostsQuery = (
  { __typename?: 'Query' }
  & { getAllUserPosts: Array<(
    { __typename?: 'Post' }
    & Pick<Post, 'postID' | 'content' | 'likes' | 'datePublished'>
    & { user: (
      { __typename?: 'Users' }
      & Pick<Users, 'id' | 'firstName' | 'lastName' | 'email' | 'username' | 'followers' | 'following'>
    ) }
  )> }
);

export type HelloQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'hello'>
);

export type LogUserOutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogUserOutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logUserOut'>
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { loginUser: (
    { __typename?: 'LoginResponse' }
    & Pick<LoginResponse, 'accessToken'>
    & { user: (
      { __typename?: 'Users' }
      & Pick<Users, 'id' | 'firstName' | 'lastName' | 'email' | 'username'>
    ) }
  ) }
);

export type RegisterMutationVariables = Exact<{
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'registerUser'>
);

export type UpdateUserProfileMutationVariables = Exact<{
  userId: Scalars['Int'];
  input: ProfileUpdateInput;
}>;


export type UpdateUserProfileMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateProfile'>
);

export type UploadUserImageMutationVariables = Exact<{
  userId: Scalars['Int'];
  file: Scalars['Upload'];
}>;


export type UploadUserImageMutation = (
  { __typename?: 'Mutation' }
  & { uploadUserImage: (
    { __typename?: 'ImageUploadResponse' }
    & Pick<ImageUploadResponse, 'url'>
  ) }
);


export const ByeDocument = gql`
    query Bye {
  bye
}
    `;

/**
 * __useByeQuery__
 *
 * To run a query within a React component, call `useByeQuery` and pass it any options that fit your needs.
 * When your component renders, `useByeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useByeQuery({
 *   variables: {
 *   },
 * });
 */
export function useByeQuery(baseOptions?: Apollo.QueryHookOptions<ByeQuery, ByeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ByeQuery, ByeQueryVariables>(ByeDocument, options);
      }
export function useByeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ByeQuery, ByeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ByeQuery, ByeQueryVariables>(ByeDocument, options);
        }
export type ByeQueryHookResult = ReturnType<typeof useByeQuery>;
export type ByeLazyQueryHookResult = ReturnType<typeof useByeLazyQuery>;
export type ByeQueryResult = Apollo.QueryResult<ByeQuery, ByeQueryVariables>;
export const CreatePostDocument = gql`
    mutation CreatePost($content: String!, $firstName: String!, $lastName: String!, $userName: String!, $datePublished: DateTime!) {
  createPost(
    content: $content
    firstName: $firstName
    lastName: $lastName
    userName: $userName
    datePublished: $datePublished
  )
}
    `;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      content: // value for 'content'
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *      userName: // value for 'userName'
 *      datePublished: // value for 'datePublished'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, options);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const DeletePostDocument = gql`
    mutation DeletePost($postID: Int!) {
  deletePost(postID: $postID)
}
    `;
export type DeletePostMutationFn = Apollo.MutationFunction<DeletePostMutation, DeletePostMutationVariables>;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      postID: // value for 'postID'
 *   },
 * });
 */
export function useDeletePostMutation(baseOptions?: Apollo.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, options);
      }
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export type DeletePostMutationResult = Apollo.MutationResult<DeletePostMutation>;
export type DeletePostMutationOptions = Apollo.BaseMutationOptions<DeletePostMutation, DeletePostMutationVariables>;
export const DeleteUserDocument = gql`
    mutation DeleteUser($userId: Int!) {
  deleteUser(userId: $userId)
}
    `;
export type DeleteUserMutationFn = Apollo.MutationFunction<DeleteUserMutation, DeleteUserMutationVariables>;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useDeleteUserMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserMutation, DeleteUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, options);
      }
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>;
export type DeleteUserMutationResult = Apollo.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<DeleteUserMutation, DeleteUserMutationVariables>;
export const GetAllPostsDocument = gql`
    query GetAllPosts {
  getAllPosts {
    postID
    userId
    firstName
    lastName
    content
    datePublished
    userName
    likes
  }
}
    `;

/**
 * __useGetAllPostsQuery__
 *
 * To run a query within a React component, call `useGetAllPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllPostsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllPostsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllPostsQuery, GetAllPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllPostsQuery, GetAllPostsQueryVariables>(GetAllPostsDocument, options);
      }
export function useGetAllPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllPostsQuery, GetAllPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllPostsQuery, GetAllPostsQueryVariables>(GetAllPostsDocument, options);
        }
export type GetAllPostsQueryHookResult = ReturnType<typeof useGetAllPostsQuery>;
export type GetAllPostsLazyQueryHookResult = ReturnType<typeof useGetAllPostsLazyQuery>;
export type GetAllPostsQueryResult = Apollo.QueryResult<GetAllPostsQuery, GetAllPostsQueryVariables>;
export const GetAllUsersDocument = gql`
    query getAllUsers {
  getAllUsers {
    id
    firstName
    lastName
    username
    email
    followers
    following
  }
}
    `;

/**
 * __useGetAllUsersQuery__
 *
 * To run a query within a React component, call `useGetAllUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, options);
      }
export function useGetAllUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, options);
        }
export type GetAllUsersQueryHookResult = ReturnType<typeof useGetAllUsersQuery>;
export type GetAllUsersLazyQueryHookResult = ReturnType<typeof useGetAllUsersLazyQuery>;
export type GetAllUsersQueryResult = Apollo.QueryResult<GetAllUsersQuery, GetAllUsersQueryVariables>;
export const GetCurrentUserDocument = gql`
    query GetCurrentUser {
  getCurrentUser {
    id
    firstName
    lastName
    email
    username
    followers
    following
    profile {
      id
      bio
      avatar
      website
      location
    }
  }
}
    `;

/**
 * __useGetCurrentUserQuery__
 *
 * To run a query within a React component, call `useGetCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
      }
export function useGetCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
        }
export type GetCurrentUserQueryHookResult = ReturnType<typeof useGetCurrentUserQuery>;
export type GetCurrentUserLazyQueryHookResult = ReturnType<typeof useGetCurrentUserLazyQuery>;
export type GetCurrentUserQueryResult = Apollo.QueryResult<GetCurrentUserQuery, GetCurrentUserQueryVariables>;
export const GetAllUserPostsDocument = gql`
    query GetAllUserPosts {
  getAllUserPosts {
    postID
    content
    likes
    datePublished
    user {
      id
      firstName
      lastName
      email
      username
      followers
      following
    }
  }
}
    `;

/**
 * __useGetAllUserPostsQuery__
 *
 * To run a query within a React component, call `useGetAllUserPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllUserPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllUserPostsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllUserPostsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllUserPostsQuery, GetAllUserPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllUserPostsQuery, GetAllUserPostsQueryVariables>(GetAllUserPostsDocument, options);
      }
export function useGetAllUserPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllUserPostsQuery, GetAllUserPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllUserPostsQuery, GetAllUserPostsQueryVariables>(GetAllUserPostsDocument, options);
        }
export type GetAllUserPostsQueryHookResult = ReturnType<typeof useGetAllUserPostsQuery>;
export type GetAllUserPostsLazyQueryHookResult = ReturnType<typeof useGetAllUserPostsLazyQuery>;
export type GetAllUserPostsQueryResult = Apollo.QueryResult<GetAllUserPostsQuery, GetAllUserPostsQueryVariables>;
export const HelloDocument = gql`
    query Hello {
  hello
}
    `;

/**
 * __useHelloQuery__
 *
 * To run a query within a React component, call `useHelloQuery` and pass it any options that fit your needs.
 * When your component renders, `useHelloQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHelloQuery({
 *   variables: {
 *   },
 * });
 */
export function useHelloQuery(baseOptions?: Apollo.QueryHookOptions<HelloQuery, HelloQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HelloQuery, HelloQueryVariables>(HelloDocument, options);
      }
export function useHelloLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HelloQuery, HelloQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HelloQuery, HelloQueryVariables>(HelloDocument, options);
        }
export type HelloQueryHookResult = ReturnType<typeof useHelloQuery>;
export type HelloLazyQueryHookResult = ReturnType<typeof useHelloLazyQuery>;
export type HelloQueryResult = Apollo.QueryResult<HelloQuery, HelloQueryVariables>;
export const LogUserOutDocument = gql`
    mutation LogUserOut {
  logUserOut
}
    `;
export type LogUserOutMutationFn = Apollo.MutationFunction<LogUserOutMutation, LogUserOutMutationVariables>;

/**
 * __useLogUserOutMutation__
 *
 * To run a mutation, you first call `useLogUserOutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogUserOutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logUserOutMutation, { data, loading, error }] = useLogUserOutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogUserOutMutation(baseOptions?: Apollo.MutationHookOptions<LogUserOutMutation, LogUserOutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogUserOutMutation, LogUserOutMutationVariables>(LogUserOutDocument, options);
      }
export type LogUserOutMutationHookResult = ReturnType<typeof useLogUserOutMutation>;
export type LogUserOutMutationResult = Apollo.MutationResult<LogUserOutMutation>;
export type LogUserOutMutationOptions = Apollo.BaseMutationOptions<LogUserOutMutation, LogUserOutMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  loginUser(email: $email, password: $password) {
    accessToken
    user {
      id
      firstName
      lastName
      email
      username
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($email: String!, $firstName: String!, $lastName: String!, $username: String!, $password: String!) {
  registerUser(
    email: $email
    firstName: $firstName
    lastName: $lastName
    username: $username
    password: $password
  )
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      email: // value for 'email'
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const UpdateUserProfileDocument = gql`
    mutation UpdateUserProfile($userId: Int!, $input: ProfileUpdateInput!) {
  updateProfile(userId: $userId, input: $input)
}
    `;
export type UpdateUserProfileMutationFn = Apollo.MutationFunction<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>;

/**
 * __useUpdateUserProfileMutation__
 *
 * To run a mutation, you first call `useUpdateUserProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserProfileMutation, { data, loading, error }] = useUpdateUserProfileMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserProfileMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>(UpdateUserProfileDocument, options);
      }
export type UpdateUserProfileMutationHookResult = ReturnType<typeof useUpdateUserProfileMutation>;
export type UpdateUserProfileMutationResult = Apollo.MutationResult<UpdateUserProfileMutation>;
export type UpdateUserProfileMutationOptions = Apollo.BaseMutationOptions<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>;
export const UploadUserImageDocument = gql`
    mutation UploadUserImage($userId: Int!, $file: Upload!) {
  uploadUserImage(userId: $userId, file: $file) {
    url
  }
}
    `;
export type UploadUserImageMutationFn = Apollo.MutationFunction<UploadUserImageMutation, UploadUserImageMutationVariables>;

/**
 * __useUploadUserImageMutation__
 *
 * To run a mutation, you first call `useUploadUserImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadUserImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadUserImageMutation, { data, loading, error }] = useUploadUserImageMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      file: // value for 'file'
 *   },
 * });
 */
export function useUploadUserImageMutation(baseOptions?: Apollo.MutationHookOptions<UploadUserImageMutation, UploadUserImageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadUserImageMutation, UploadUserImageMutationVariables>(UploadUserImageDocument, options);
      }
export type UploadUserImageMutationHookResult = ReturnType<typeof useUploadUserImageMutation>;
export type UploadUserImageMutationResult = Apollo.MutationResult<UploadUserImageMutation>;
export type UploadUserImageMutationOptions = Apollo.BaseMutationOptions<UploadUserImageMutation, UploadUserImageMutationVariables>;