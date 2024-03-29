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

export type Comment = {
  __typename?: 'Comment';
  comment: Scalars['String'];
  datePublished: Scalars['DateTime'];
  userId: Scalars['Int'];
  user: Users;
  postId: Scalars['Int'];
};


export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Following = {
  __typename?: 'Following';
  id: Scalars['Int'];
  username: Scalars['String'];
  followingId: Scalars['Int'];
  follower: Users;
  followerId: Scalars['Int'];
  following: Users;
};

export type ImageUploadResponse = {
  __typename?: 'ImageUploadResponse';
  url: Scalars['String'];
};

export type LikedPost = {
  __typename?: 'LikedPost';
  userId: Scalars['Int'];
  user: Users;
  postId: Scalars['Int'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken: Scalars['String'];
  user: Users;
};

export type Message = {
  __typename?: 'Message';
  id: Scalars['Int'];
  content: Scalars['String'];
  dateSent: Scalars['DateTime'];
  fromId: Scalars['Int'];
  from: Users;
  toId: Scalars['Int'];
  to: Users;
};

export type Mutation = {
  __typename?: 'Mutation';
  updateProfile: Scalars['Boolean'];
  uploadUserImage: ImageUploadResponse;
  logUserOut: Scalars['Boolean'];
  deleteUser: Scalars['Boolean'];
  revokeRefreshTokensForUser: Scalars['Boolean'];
  loginUser: UserResponse;
  registerUser: UserResponse;
  followUserV2: Scalars['Boolean'];
  followUser: Scalars['Boolean'];
  sendMessage: Message;
  createPost: Scalars['Boolean'];
  deletePost: Scalars['Boolean'];
  likePost: Scalars['Boolean'];
  retweetPost: Scalars['Boolean'];
  commentOnPost: Scalars['Boolean'];
};


export type MutationUpdateProfileArgs = {
  website: Scalars['String'];
  location: Scalars['String'];
  bio: Scalars['String'];
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
  dateRegistered: Scalars['String'];
  email: Scalars['String'];
  username: Scalars['String'];
  lastName: Scalars['String'];
  firstName: Scalars['String'];
};


export type MutationFollowUserV2Args = {
  followingId: Scalars['Int'];
  username: Scalars['String'];
};


export type MutationFollowUserArgs = {
  value: Scalars['Int'];
  followingId: Scalars['Int'];
  username: Scalars['String'];
};


export type MutationSendMessageArgs = {
  content: Scalars['String'];
  dateSent: Scalars['DateTime'];
  toId: Scalars['Int'];
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


export type MutationLikePostArgs = {
  value: Scalars['Int'];
  postId: Scalars['Int'];
};


export type MutationRetweetPostArgs = {
  value: Scalars['Int'];
  postId: Scalars['Int'];
};


export type MutationCommentOnPostArgs = {
  datePublished: Scalars['DateTime'];
  comment: Scalars['String'];
  postId: Scalars['Int'];
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['Int'];
  userId: Scalars['Int'];
  userName: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  content: Scalars['String'];
  datePublished: Scalars['DateTime'];
  points: Scalars['Float'];
  retweetsCount: Scalars['Float'];
  commentsCount: Scalars['Float'];
  voteStatus?: Maybe<Scalars['Int']>;
  likes: Array<LikedPost>;
  retweets: Array<RetweetPost>;
  comments: Array<Comment>;
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

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  bye: Scalars['String'];
  getAllUsers: Array<Users>;
  getUsersTheLoggedInUserMayKnow: Array<Users>;
  getSpecificUserInfo: Users;
  getCurrentUser?: Maybe<Users>;
  searchUsers: Array<Users>;
  getAllUserMessages: Array<Message>;
  getAllMessagesFromUser: Array<Message>;
  getAllPosts: Array<Post>;
  getAllUserPosts: Array<Post>;
  getAllSpecificUserPosts: Array<Post>;
  getPostById: Post;
};


export type QueryGetUsersTheLoggedInUserMayKnowArgs = {
  userId?: Maybe<Scalars['Int']>;
};


export type QueryGetSpecificUserInfoArgs = {
  userId: Scalars['Int'];
};


export type QuerySearchUsersArgs = {
  username: Scalars['String'];
};


export type QueryGetAllMessagesFromUserArgs = {
  fromId: Scalars['Int'];
};


export type QueryGetAllSpecificUserPostsArgs = {
  userId: Scalars['Int'];
};


export type QueryGetPostByIdArgs = {
  postId: Scalars['Int'];
};

export type RetweetPost = {
  __typename?: 'RetweetPost';
  id: Scalars['Int'];
  userId: Scalars['Int'];
  user: Users;
  postId: Scalars['Int'];
};

export type Subscription = {
  __typename?: 'Subscription';
  newMessage: Message;
};


export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  data?: Maybe<LoginResponse>;
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
  followersCount: Scalars['Int'];
  followingCount: Scalars['Int'];
  dateRegistered: Scalars['DateTime'];
  profileId: Scalars['Int'];
  posts: Array<Post>;
  follower: Array<Following>;
  following: Array<Following>;
  profile: Profile;
};

export type PostSnippetFragment = (
  { __typename?: 'Post' }
  & Pick<Post, 'id' | 'userId' | 'firstName' | 'lastName' | 'content' | 'voteStatus' | 'datePublished' | 'userName' | 'points' | 'retweetsCount'>
  & { likes: Array<(
    { __typename?: 'LikedPost' }
    & Pick<LikedPost, 'userId'>
  )>, retweets: Array<(
    { __typename?: 'RetweetPost' }
    & Pick<RetweetPost, 'userId'>
  )> }
);

export type SpecifcUserSnippetFragment = (
  { __typename?: 'Users' }
  & Pick<Users, 'id' | 'followersCount' | 'followingCount' | 'username'>
  & { following: Array<(
    { __typename?: 'Following' }
    & Pick<Following, 'id' | 'username' | 'followerId' | 'followingId'>
  )>, follower: Array<(
    { __typename?: 'Following' }
    & Pick<Following, 'id' | 'username' | 'followerId' | 'followingId'>
  )>, profile: (
    { __typename?: 'Profile' }
    & Pick<Profile, 'avatar' | 'website' | 'location' | 'bio'>
  ) }
);

export type ByeQueryVariables = Exact<{ [key: string]: never; }>;


export type ByeQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'bye'>
);

export type CommentOnPostMutationVariables = Exact<{
  postId: Scalars['Int'];
  comment: Scalars['String'];
  datePublished: Scalars['DateTime'];
}>;


export type CommentOnPostMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'commentOnPost'>
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

export type FollowUserMutationVariables = Exact<{
  username: Scalars['String'];
  followingId: Scalars['Int'];
  value: Scalars['Int'];
}>;


export type FollowUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'followUser'>
);

export type GetAllMessagesFromUserQueryVariables = Exact<{
  fromId: Scalars['Int'];
}>;


export type GetAllMessagesFromUserQuery = (
  { __typename?: 'Query' }
  & { getAllMessagesFromUser: Array<(
    { __typename?: 'Message' }
    & Pick<Message, 'id' | 'content' | 'fromId' | 'toId'>
    & { from: (
      { __typename?: 'Users' }
      & Pick<Users, 'id' | 'firstName' | 'lastName' | 'username'>
      & { profile: (
        { __typename?: 'Profile' }
        & Pick<Profile, 'avatar'>
      ) }
    ), to: (
      { __typename?: 'Users' }
      & Pick<Users, 'id' | 'firstName' | 'lastName' | 'username'>
      & { profile: (
        { __typename?: 'Profile' }
        & Pick<Profile, 'avatar'>
      ) }
    ) }
  )> }
);

export type GetAllPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllPostsQuery = (
  { __typename?: 'Query' }
  & { getAllPosts: Array<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'userId' | 'firstName' | 'lastName' | 'content' | 'voteStatus' | 'datePublished' | 'userName' | 'points' | 'retweetsCount' | 'commentsCount'>
    & { likes: Array<(
      { __typename?: 'LikedPost' }
      & Pick<LikedPost, 'userId'>
    )>, retweets: Array<(
      { __typename?: 'RetweetPost' }
      & Pick<RetweetPost, 'userId'>
    )>, comments: Array<(
      { __typename?: 'Comment' }
      & Pick<Comment, 'comment'>
      & { user: (
        { __typename?: 'Users' }
        & Pick<Users, 'id' | 'firstName' | 'lastName' | 'username'>
        & { profile: (
          { __typename?: 'Profile' }
          & Pick<Profile, 'avatar'>
        ) }
      ) }
    )>, user: (
      { __typename?: 'Users' }
      & Pick<Users, 'id' | 'firstName' | 'lastName' | 'username' | 'email'>
      & { profile: (
        { __typename?: 'Profile' }
        & Pick<Profile, 'id' | 'avatar'>
      ) }
    ) }
  )> }
);

export type GetAllSpecificUserPostsQueryVariables = Exact<{
  userId: Scalars['Int'];
}>;


export type GetAllSpecificUserPostsQuery = (
  { __typename?: 'Query' }
  & { getAllSpecificUserPosts: Array<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'userId' | 'firstName' | 'lastName' | 'content' | 'voteStatus' | 'datePublished' | 'userName' | 'points' | 'commentsCount'>
    & { likes: Array<(
      { __typename?: 'LikedPost' }
      & Pick<LikedPost, 'userId'>
    )>, retweets: Array<(
      { __typename?: 'RetweetPost' }
      & Pick<RetweetPost, 'userId'>
    )>, comments: Array<(
      { __typename?: 'Comment' }
      & Pick<Comment, 'comment'>
      & { user: (
        { __typename?: 'Users' }
        & Pick<Users, 'id' | 'firstName' | 'lastName' | 'username'>
        & { profile: (
          { __typename?: 'Profile' }
          & Pick<Profile, 'avatar'>
        ) }
      ) }
    )>, user: (
      { __typename?: 'Users' }
      & Pick<Users, 'id' | 'firstName' | 'lastName' | 'username' | 'email'>
      & { profile: (
        { __typename?: 'Profile' }
        & Pick<Profile, 'id' | 'avatar'>
      ) }
    ) }
  )> }
);

export type GetAllUserMessagesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllUserMessagesQuery = (
  { __typename?: 'Query' }
  & { getAllUserMessages: Array<(
    { __typename?: 'Message' }
    & Pick<Message, 'id' | 'content' | 'fromId' | 'toId'>
    & { from: (
      { __typename?: 'Users' }
      & Pick<Users, 'id' | 'firstName' | 'lastName' | 'username'>
      & { profile: (
        { __typename?: 'Profile' }
        & Pick<Profile, 'avatar'>
      ) }
    ), to: (
      { __typename?: 'Users' }
      & Pick<Users, 'id' | 'firstName' | 'lastName' | 'username'>
      & { profile: (
        { __typename?: 'Profile' }
        & Pick<Profile, 'avatar'>
      ) }
    ) }
  )> }
);

export type GetAllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllUsersQuery = (
  { __typename?: 'Query' }
  & { getAllUsers: Array<(
    { __typename?: 'Users' }
    & Pick<Users, 'id' | 'firstName' | 'lastName' | 'username' | 'email' | 'followersCount' | 'followingCount'>
    & { profile: (
      { __typename?: 'Profile' }
      & Pick<Profile, 'id' | 'bio' | 'avatar' | 'website' | 'location'>
    ) }
  )> }
);

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = (
  { __typename?: 'Query' }
  & { getCurrentUser?: Maybe<(
    { __typename?: 'Users' }
    & Pick<Users, 'id' | 'firstName' | 'lastName' | 'email' | 'username' | 'dateRegistered' | 'followersCount' | 'followingCount'>
    & { following: Array<(
      { __typename?: 'Following' }
      & Pick<Following, 'id' | 'username' | 'followerId' | 'followingId'>
    )>, follower: Array<(
      { __typename?: 'Following' }
      & Pick<Following, 'id' | 'username' | 'followerId' | 'followingId'>
    )>, profile: (
      { __typename?: 'Profile' }
      & Pick<Profile, 'id' | 'bio' | 'avatar' | 'website' | 'location'>
    ) }
  )> }
);

export type GetPostByIdQueryVariables = Exact<{
  postId: Scalars['Int'];
}>;


export type GetPostByIdQuery = (
  { __typename?: 'Query' }
  & { getPostById: (
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'userId' | 'firstName' | 'lastName' | 'content' | 'voteStatus' | 'retweetsCount' | 'datePublished' | 'userName' | 'points' | 'commentsCount'>
    & { likes: Array<(
      { __typename?: 'LikedPost' }
      & Pick<LikedPost, 'userId'>
    )>, retweets: Array<(
      { __typename?: 'RetweetPost' }
      & Pick<RetweetPost, 'userId'>
    )>, comments: Array<(
      { __typename?: 'Comment' }
      & Pick<Comment, 'comment' | 'datePublished'>
      & { user: (
        { __typename?: 'Users' }
        & Pick<Users, 'id' | 'firstName' | 'lastName' | 'username'>
        & { profile: (
          { __typename?: 'Profile' }
          & Pick<Profile, 'avatar'>
        ) }
      ) }
    )>, user: (
      { __typename?: 'Users' }
      & Pick<Users, 'id' | 'firstName' | 'lastName' | 'username' | 'email'>
      & { profile: (
        { __typename?: 'Profile' }
        & Pick<Profile, 'id' | 'avatar'>
      ) }
    ) }
  ) }
);

export type GetSpecificUserInfoQueryVariables = Exact<{
  userId: Scalars['Int'];
}>;


export type GetSpecificUserInfoQuery = (
  { __typename?: 'Query' }
  & { getSpecificUserInfo: (
    { __typename?: 'Users' }
    & Pick<Users, 'id' | 'firstName' | 'lastName' | 'username' | 'dateRegistered' | 'followingCount' | 'followersCount'>
    & { following: Array<(
      { __typename?: 'Following' }
      & Pick<Following, 'id' | 'username' | 'followerId' | 'followingId'>
    )>, follower: Array<(
      { __typename?: 'Following' }
      & Pick<Following, 'id' | 'username' | 'followerId' | 'followingId'>
    )>, profile: (
      { __typename?: 'Profile' }
      & Pick<Profile, 'avatar' | 'bio' | 'location' | 'website'>
    ) }
  ) }
);

export type GetAllUserPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllUserPostsQuery = (
  { __typename?: 'Query' }
  & { getAllUserPosts: Array<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'userId' | 'firstName' | 'lastName' | 'content' | 'voteStatus' | 'datePublished' | 'userName' | 'points' | 'commentsCount'>
    & { likes: Array<(
      { __typename?: 'LikedPost' }
      & Pick<LikedPost, 'userId'>
    )>, retweets: Array<(
      { __typename?: 'RetweetPost' }
      & Pick<RetweetPost, 'userId'>
    )>, comments: Array<(
      { __typename?: 'Comment' }
      & Pick<Comment, 'comment'>
      & { user: (
        { __typename?: 'Users' }
        & Pick<Users, 'id' | 'firstName' | 'lastName' | 'username'>
        & { profile: (
          { __typename?: 'Profile' }
          & Pick<Profile, 'avatar'>
        ) }
      ) }
    )>, user: (
      { __typename?: 'Users' }
      & Pick<Users, 'id' | 'firstName' | 'lastName' | 'username' | 'email'>
      & { profile: (
        { __typename?: 'Profile' }
        & Pick<Profile, 'id' | 'avatar'>
      ) }
    ) }
  )> }
);

export type GetUsersTheLoggedInUserMayKnowQueryVariables = Exact<{
  userId?: Maybe<Scalars['Int']>;
}>;


export type GetUsersTheLoggedInUserMayKnowQuery = (
  { __typename?: 'Query' }
  & { getUsersTheLoggedInUserMayKnow: Array<(
    { __typename?: 'Users' }
    & Pick<Users, 'id' | 'firstName' | 'lastName' | 'username'>
    & { profile: (
      { __typename?: 'Profile' }
      & Pick<Profile, 'avatar'>
    ) }
  )> }
);

export type HelloQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'hello'>
);

export type LikePostMutationVariables = Exact<{
  value: Scalars['Int'];
  postId: Scalars['Int'];
}>;


export type LikePostMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'likePost'>
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
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, data?: Maybe<(
      { __typename?: 'LoginResponse' }
      & Pick<LoginResponse, 'accessToken'>
      & { user: (
        { __typename?: 'Users' }
        & Pick<Users, 'id' | 'firstName' | 'lastName' | 'email' | 'username'>
      ) }
    )> }
  ) }
);

export type NewMessageSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type NewMessageSubscription = (
  { __typename?: 'Subscription' }
  & { newMessage: (
    { __typename?: 'Message' }
    & Pick<Message, 'id' | 'fromId' | 'toId' | 'content' | 'dateSent'>
  ) }
);

export type RegisterMutationVariables = Exact<{
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
  dateRegistered: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { registerUser: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, data?: Maybe<(
      { __typename?: 'LoginResponse' }
      & Pick<LoginResponse, 'accessToken'>
      & { user: (
        { __typename?: 'Users' }
        & Pick<Users, 'id' | 'firstName' | 'lastName' | 'email' | 'username'>
      ) }
    )> }
  ) }
);

export type RetweetPostMutationVariables = Exact<{
  value: Scalars['Int'];
  postId: Scalars['Int'];
}>;


export type RetweetPostMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'retweetPost'>
);

export type SearchUsersQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type SearchUsersQuery = (
  { __typename?: 'Query' }
  & { searchUsers: Array<(
    { __typename?: 'Users' }
    & Pick<Users, 'id' | 'firstName' | 'lastName' | 'username' | 'followingCount' | 'followersCount'>
    & { following: Array<(
      { __typename?: 'Following' }
      & Pick<Following, 'id' | 'username' | 'followerId' | 'followingId'>
    )>, follower: Array<(
      { __typename?: 'Following' }
      & Pick<Following, 'id' | 'username' | 'followerId' | 'followingId'>
    )>, profile: (
      { __typename?: 'Profile' }
      & Pick<Profile, 'avatar' | 'bio' | 'location' | 'website'>
    ) }
  )> }
);

export type SendMessageMutationVariables = Exact<{
  toId: Scalars['Int'];
  dateSent: Scalars['DateTime'];
  content: Scalars['String'];
}>;


export type SendMessageMutation = (
  { __typename?: 'Mutation' }
  & { sendMessage: (
    { __typename?: 'Message' }
    & Pick<Message, 'id' | 'fromId' | 'toId' | 'dateSent' | 'content'>
  ) }
);

export type UpdateUserProfileMutationVariables = Exact<{
  userId: Scalars['Int'];
  bio: Scalars['String'];
  website: Scalars['String'];
  location: Scalars['String'];
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

export const PostSnippetFragmentDoc = gql`
    fragment PostSnippet on Post {
  id
  userId
  firstName
  lastName
  content
  voteStatus
  likes {
    userId
  }
  retweets {
    userId
  }
  datePublished
  userName
  points
  retweetsCount
}
    `;
export const SpecifcUserSnippetFragmentDoc = gql`
    fragment SpecifcUserSnippet on Users {
  id
  followersCount
  followingCount
  username
  following {
    id
    username
    followerId
    followingId
  }
  follower {
    id
    username
    followerId
    followingId
  }
  profile {
    avatar
    website
    location
    bio
  }
}
    `;
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
export const CommentOnPostDocument = gql`
    mutation CommentOnPost($postId: Int!, $comment: String!, $datePublished: DateTime!) {
  commentOnPost(postId: $postId, comment: $comment, datePublished: $datePublished)
}
    `;
export type CommentOnPostMutationFn = Apollo.MutationFunction<CommentOnPostMutation, CommentOnPostMutationVariables>;

/**
 * __useCommentOnPostMutation__
 *
 * To run a mutation, you first call `useCommentOnPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCommentOnPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [commentOnPostMutation, { data, loading, error }] = useCommentOnPostMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *      comment: // value for 'comment'
 *      datePublished: // value for 'datePublished'
 *   },
 * });
 */
export function useCommentOnPostMutation(baseOptions?: Apollo.MutationHookOptions<CommentOnPostMutation, CommentOnPostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CommentOnPostMutation, CommentOnPostMutationVariables>(CommentOnPostDocument, options);
      }
export type CommentOnPostMutationHookResult = ReturnType<typeof useCommentOnPostMutation>;
export type CommentOnPostMutationResult = Apollo.MutationResult<CommentOnPostMutation>;
export type CommentOnPostMutationOptions = Apollo.BaseMutationOptions<CommentOnPostMutation, CommentOnPostMutationVariables>;
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
export const FollowUserDocument = gql`
    mutation FollowUser($username: String!, $followingId: Int!, $value: Int!) {
  followUser(username: $username, followingId: $followingId, value: $value)
}
    `;
export type FollowUserMutationFn = Apollo.MutationFunction<FollowUserMutation, FollowUserMutationVariables>;

/**
 * __useFollowUserMutation__
 *
 * To run a mutation, you first call `useFollowUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFollowUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [followUserMutation, { data, loading, error }] = useFollowUserMutation({
 *   variables: {
 *      username: // value for 'username'
 *      followingId: // value for 'followingId'
 *      value: // value for 'value'
 *   },
 * });
 */
export function useFollowUserMutation(baseOptions?: Apollo.MutationHookOptions<FollowUserMutation, FollowUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FollowUserMutation, FollowUserMutationVariables>(FollowUserDocument, options);
      }
export type FollowUserMutationHookResult = ReturnType<typeof useFollowUserMutation>;
export type FollowUserMutationResult = Apollo.MutationResult<FollowUserMutation>;
export type FollowUserMutationOptions = Apollo.BaseMutationOptions<FollowUserMutation, FollowUserMutationVariables>;
export const GetAllMessagesFromUserDocument = gql`
    query GetAllMessagesFromUser($fromId: Int!) {
  getAllMessagesFromUser(fromId: $fromId) {
    id
    content
    fromId
    from {
      id
      firstName
      lastName
      username
      profile {
        avatar
      }
    }
    toId
    to {
      id
      firstName
      lastName
      username
      profile {
        avatar
      }
    }
  }
}
    `;

/**
 * __useGetAllMessagesFromUserQuery__
 *
 * To run a query within a React component, call `useGetAllMessagesFromUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllMessagesFromUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllMessagesFromUserQuery({
 *   variables: {
 *      fromId: // value for 'fromId'
 *   },
 * });
 */
export function useGetAllMessagesFromUserQuery(baseOptions: Apollo.QueryHookOptions<GetAllMessagesFromUserQuery, GetAllMessagesFromUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllMessagesFromUserQuery, GetAllMessagesFromUserQueryVariables>(GetAllMessagesFromUserDocument, options);
      }
export function useGetAllMessagesFromUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllMessagesFromUserQuery, GetAllMessagesFromUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllMessagesFromUserQuery, GetAllMessagesFromUserQueryVariables>(GetAllMessagesFromUserDocument, options);
        }
export type GetAllMessagesFromUserQueryHookResult = ReturnType<typeof useGetAllMessagesFromUserQuery>;
export type GetAllMessagesFromUserLazyQueryHookResult = ReturnType<typeof useGetAllMessagesFromUserLazyQuery>;
export type GetAllMessagesFromUserQueryResult = Apollo.QueryResult<GetAllMessagesFromUserQuery, GetAllMessagesFromUserQueryVariables>;
export const GetAllPostsDocument = gql`
    query GetAllPosts {
  getAllPosts {
    id
    userId
    firstName
    lastName
    content
    voteStatus
    likes {
      userId
    }
    retweets {
      userId
    }
    comments {
      comment
      user {
        id
        firstName
        lastName
        username
        profile {
          avatar
        }
      }
    }
    user {
      id
      firstName
      lastName
      username
      email
      profile {
        id
        avatar
      }
    }
    datePublished
    userName
    points
    retweetsCount
    commentsCount
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
export const GetAllSpecificUserPostsDocument = gql`
    query GetAllSpecificUserPosts($userId: Int!) {
  getAllSpecificUserPosts(userId: $userId) {
    id
    userId
    firstName
    lastName
    content
    voteStatus
    likes {
      userId
    }
    retweets {
      userId
    }
    comments {
      comment
      user {
        id
        firstName
        lastName
        username
        profile {
          avatar
        }
      }
    }
    user {
      id
      firstName
      lastName
      username
      email
      profile {
        id
        avatar
      }
    }
    datePublished
    userName
    points
    commentsCount
  }
}
    `;

/**
 * __useGetAllSpecificUserPostsQuery__
 *
 * To run a query within a React component, call `useGetAllSpecificUserPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllSpecificUserPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllSpecificUserPostsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetAllSpecificUserPostsQuery(baseOptions: Apollo.QueryHookOptions<GetAllSpecificUserPostsQuery, GetAllSpecificUserPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllSpecificUserPostsQuery, GetAllSpecificUserPostsQueryVariables>(GetAllSpecificUserPostsDocument, options);
      }
export function useGetAllSpecificUserPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllSpecificUserPostsQuery, GetAllSpecificUserPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllSpecificUserPostsQuery, GetAllSpecificUserPostsQueryVariables>(GetAllSpecificUserPostsDocument, options);
        }
export type GetAllSpecificUserPostsQueryHookResult = ReturnType<typeof useGetAllSpecificUserPostsQuery>;
export type GetAllSpecificUserPostsLazyQueryHookResult = ReturnType<typeof useGetAllSpecificUserPostsLazyQuery>;
export type GetAllSpecificUserPostsQueryResult = Apollo.QueryResult<GetAllSpecificUserPostsQuery, GetAllSpecificUserPostsQueryVariables>;
export const GetAllUserMessagesDocument = gql`
    query GetAllUserMessages {
  getAllUserMessages {
    id
    content
    fromId
    from {
      id
      firstName
      lastName
      username
      profile {
        avatar
      }
    }
    toId
    to {
      id
      firstName
      lastName
      username
      profile {
        avatar
      }
    }
  }
}
    `;

/**
 * __useGetAllUserMessagesQuery__
 *
 * To run a query within a React component, call `useGetAllUserMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllUserMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllUserMessagesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllUserMessagesQuery(baseOptions?: Apollo.QueryHookOptions<GetAllUserMessagesQuery, GetAllUserMessagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllUserMessagesQuery, GetAllUserMessagesQueryVariables>(GetAllUserMessagesDocument, options);
      }
export function useGetAllUserMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllUserMessagesQuery, GetAllUserMessagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllUserMessagesQuery, GetAllUserMessagesQueryVariables>(GetAllUserMessagesDocument, options);
        }
export type GetAllUserMessagesQueryHookResult = ReturnType<typeof useGetAllUserMessagesQuery>;
export type GetAllUserMessagesLazyQueryHookResult = ReturnType<typeof useGetAllUserMessagesLazyQuery>;
export type GetAllUserMessagesQueryResult = Apollo.QueryResult<GetAllUserMessagesQuery, GetAllUserMessagesQueryVariables>;
export const GetAllUsersDocument = gql`
    query getAllUsers {
  getAllUsers {
    id
    firstName
    lastName
    username
    email
    followersCount
    followingCount
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
    dateRegistered
    followersCount
    followingCount
    following {
      id
      username
      followerId
      followingId
    }
    follower {
      id
      username
      followerId
      followingId
    }
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
export const GetPostByIdDocument = gql`
    query GetPostById($postId: Int!) {
  getPostById(postId: $postId) {
    id
    userId
    firstName
    lastName
    content
    voteStatus
    retweetsCount
    likes {
      userId
    }
    retweets {
      userId
    }
    comments {
      comment
      datePublished
      user {
        id
        firstName
        lastName
        username
        profile {
          avatar
        }
      }
    }
    user {
      id
      firstName
      lastName
      username
      email
      profile {
        id
        avatar
      }
    }
    datePublished
    userName
    points
    commentsCount
  }
}
    `;

/**
 * __useGetPostByIdQuery__
 *
 * To run a query within a React component, call `useGetPostByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostByIdQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useGetPostByIdQuery(baseOptions: Apollo.QueryHookOptions<GetPostByIdQuery, GetPostByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostByIdQuery, GetPostByIdQueryVariables>(GetPostByIdDocument, options);
      }
export function useGetPostByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostByIdQuery, GetPostByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostByIdQuery, GetPostByIdQueryVariables>(GetPostByIdDocument, options);
        }
export type GetPostByIdQueryHookResult = ReturnType<typeof useGetPostByIdQuery>;
export type GetPostByIdLazyQueryHookResult = ReturnType<typeof useGetPostByIdLazyQuery>;
export type GetPostByIdQueryResult = Apollo.QueryResult<GetPostByIdQuery, GetPostByIdQueryVariables>;
export const GetSpecificUserInfoDocument = gql`
    query GetSpecificUserInfo($userId: Int!) {
  getSpecificUserInfo(userId: $userId) {
    id
    firstName
    lastName
    username
    dateRegistered
    followingCount
    followersCount
    following {
      id
      username
      followerId
      followingId
    }
    follower {
      id
      username
      followerId
      followingId
    }
    profile {
      avatar
      bio
      location
      website
    }
  }
}
    `;

/**
 * __useGetSpecificUserInfoQuery__
 *
 * To run a query within a React component, call `useGetSpecificUserInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSpecificUserInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSpecificUserInfoQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetSpecificUserInfoQuery(baseOptions: Apollo.QueryHookOptions<GetSpecificUserInfoQuery, GetSpecificUserInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSpecificUserInfoQuery, GetSpecificUserInfoQueryVariables>(GetSpecificUserInfoDocument, options);
      }
export function useGetSpecificUserInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSpecificUserInfoQuery, GetSpecificUserInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSpecificUserInfoQuery, GetSpecificUserInfoQueryVariables>(GetSpecificUserInfoDocument, options);
        }
export type GetSpecificUserInfoQueryHookResult = ReturnType<typeof useGetSpecificUserInfoQuery>;
export type GetSpecificUserInfoLazyQueryHookResult = ReturnType<typeof useGetSpecificUserInfoLazyQuery>;
export type GetSpecificUserInfoQueryResult = Apollo.QueryResult<GetSpecificUserInfoQuery, GetSpecificUserInfoQueryVariables>;
export const GetAllUserPostsDocument = gql`
    query GetAllUserPosts {
  getAllUserPosts {
    id
    userId
    firstName
    lastName
    content
    voteStatus
    likes {
      userId
    }
    retweets {
      userId
    }
    comments {
      comment
      user {
        id
        firstName
        lastName
        username
        profile {
          avatar
        }
      }
    }
    user {
      id
      firstName
      lastName
      username
      email
      profile {
        id
        avatar
      }
    }
    datePublished
    userName
    points
    commentsCount
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
export const GetUsersTheLoggedInUserMayKnowDocument = gql`
    query getUsersTheLoggedInUserMayKnow($userId: Int) {
  getUsersTheLoggedInUserMayKnow(userId: $userId) {
    id
    firstName
    lastName
    username
    profile {
      avatar
    }
  }
}
    `;

/**
 * __useGetUsersTheLoggedInUserMayKnowQuery__
 *
 * To run a query within a React component, call `useGetUsersTheLoggedInUserMayKnowQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersTheLoggedInUserMayKnowQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersTheLoggedInUserMayKnowQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUsersTheLoggedInUserMayKnowQuery(baseOptions?: Apollo.QueryHookOptions<GetUsersTheLoggedInUserMayKnowQuery, GetUsersTheLoggedInUserMayKnowQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersTheLoggedInUserMayKnowQuery, GetUsersTheLoggedInUserMayKnowQueryVariables>(GetUsersTheLoggedInUserMayKnowDocument, options);
      }
export function useGetUsersTheLoggedInUserMayKnowLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersTheLoggedInUserMayKnowQuery, GetUsersTheLoggedInUserMayKnowQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersTheLoggedInUserMayKnowQuery, GetUsersTheLoggedInUserMayKnowQueryVariables>(GetUsersTheLoggedInUserMayKnowDocument, options);
        }
export type GetUsersTheLoggedInUserMayKnowQueryHookResult = ReturnType<typeof useGetUsersTheLoggedInUserMayKnowQuery>;
export type GetUsersTheLoggedInUserMayKnowLazyQueryHookResult = ReturnType<typeof useGetUsersTheLoggedInUserMayKnowLazyQuery>;
export type GetUsersTheLoggedInUserMayKnowQueryResult = Apollo.QueryResult<GetUsersTheLoggedInUserMayKnowQuery, GetUsersTheLoggedInUserMayKnowQueryVariables>;
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
export const LikePostDocument = gql`
    mutation LikePost($value: Int!, $postId: Int!) {
  likePost(value: $value, postId: $postId)
}
    `;
export type LikePostMutationFn = Apollo.MutationFunction<LikePostMutation, LikePostMutationVariables>;

/**
 * __useLikePostMutation__
 *
 * To run a mutation, you first call `useLikePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLikePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [likePostMutation, { data, loading, error }] = useLikePostMutation({
 *   variables: {
 *      value: // value for 'value'
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useLikePostMutation(baseOptions?: Apollo.MutationHookOptions<LikePostMutation, LikePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LikePostMutation, LikePostMutationVariables>(LikePostDocument, options);
      }
export type LikePostMutationHookResult = ReturnType<typeof useLikePostMutation>;
export type LikePostMutationResult = Apollo.MutationResult<LikePostMutation>;
export type LikePostMutationOptions = Apollo.BaseMutationOptions<LikePostMutation, LikePostMutationVariables>;
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
    errors {
      field
      message
    }
    data {
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
export const NewMessageDocument = gql`
    subscription NewMessage {
  newMessage {
    id
    fromId
    toId
    content
    dateSent
  }
}
    `;

/**
 * __useNewMessageSubscription__
 *
 * To run a query within a React component, call `useNewMessageSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewMessageSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewMessageSubscription({
 *   variables: {
 *   },
 * });
 */
export function useNewMessageSubscription(baseOptions?: Apollo.SubscriptionHookOptions<NewMessageSubscription, NewMessageSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<NewMessageSubscription, NewMessageSubscriptionVariables>(NewMessageDocument, options);
      }
export type NewMessageSubscriptionHookResult = ReturnType<typeof useNewMessageSubscription>;
export type NewMessageSubscriptionResult = Apollo.SubscriptionResult<NewMessageSubscription>;
export const RegisterDocument = gql`
    mutation Register($email: String!, $firstName: String!, $lastName: String!, $username: String!, $password: String!, $dateRegistered: String!) {
  registerUser(
    email: $email
    firstName: $firstName
    lastName: $lastName
    username: $username
    password: $password
    dateRegistered: $dateRegistered
  ) {
    errors {
      field
      message
    }
    data {
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
 *      dateRegistered: // value for 'dateRegistered'
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
export const RetweetPostDocument = gql`
    mutation RetweetPost($value: Int!, $postId: Int!) {
  retweetPost(value: $value, postId: $postId)
}
    `;
export type RetweetPostMutationFn = Apollo.MutationFunction<RetweetPostMutation, RetweetPostMutationVariables>;

/**
 * __useRetweetPostMutation__
 *
 * To run a mutation, you first call `useRetweetPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRetweetPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [retweetPostMutation, { data, loading, error }] = useRetweetPostMutation({
 *   variables: {
 *      value: // value for 'value'
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useRetweetPostMutation(baseOptions?: Apollo.MutationHookOptions<RetweetPostMutation, RetweetPostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RetweetPostMutation, RetweetPostMutationVariables>(RetweetPostDocument, options);
      }
export type RetweetPostMutationHookResult = ReturnType<typeof useRetweetPostMutation>;
export type RetweetPostMutationResult = Apollo.MutationResult<RetweetPostMutation>;
export type RetweetPostMutationOptions = Apollo.BaseMutationOptions<RetweetPostMutation, RetweetPostMutationVariables>;
export const SearchUsersDocument = gql`
    query SearchUsers($username: String!) {
  searchUsers(username: $username) {
    id
    firstName
    lastName
    username
    followingCount
    followersCount
    following {
      id
      username
      followerId
      followingId
    }
    follower {
      id
      username
      followerId
      followingId
    }
    profile {
      avatar
      bio
      location
      website
    }
  }
}
    `;

/**
 * __useSearchUsersQuery__
 *
 * To run a query within a React component, call `useSearchUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchUsersQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useSearchUsersQuery(baseOptions: Apollo.QueryHookOptions<SearchUsersQuery, SearchUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchUsersQuery, SearchUsersQueryVariables>(SearchUsersDocument, options);
      }
export function useSearchUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchUsersQuery, SearchUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchUsersQuery, SearchUsersQueryVariables>(SearchUsersDocument, options);
        }
export type SearchUsersQueryHookResult = ReturnType<typeof useSearchUsersQuery>;
export type SearchUsersLazyQueryHookResult = ReturnType<typeof useSearchUsersLazyQuery>;
export type SearchUsersQueryResult = Apollo.QueryResult<SearchUsersQuery, SearchUsersQueryVariables>;
export const SendMessageDocument = gql`
    mutation SendMessage($toId: Int!, $dateSent: DateTime!, $content: String!) {
  sendMessage(toId: $toId, dateSent: $dateSent, content: $content) {
    id
    fromId
    toId
    dateSent
    content
  }
}
    `;
export type SendMessageMutationFn = Apollo.MutationFunction<SendMessageMutation, SendMessageMutationVariables>;

/**
 * __useSendMessageMutation__
 *
 * To run a mutation, you first call `useSendMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendMessageMutation, { data, loading, error }] = useSendMessageMutation({
 *   variables: {
 *      toId: // value for 'toId'
 *      dateSent: // value for 'dateSent'
 *      content: // value for 'content'
 *   },
 * });
 */
export function useSendMessageMutation(baseOptions?: Apollo.MutationHookOptions<SendMessageMutation, SendMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendMessageMutation, SendMessageMutationVariables>(SendMessageDocument, options);
      }
export type SendMessageMutationHookResult = ReturnType<typeof useSendMessageMutation>;
export type SendMessageMutationResult = Apollo.MutationResult<SendMessageMutation>;
export type SendMessageMutationOptions = Apollo.BaseMutationOptions<SendMessageMutation, SendMessageMutationVariables>;
export const UpdateUserProfileDocument = gql`
    mutation UpdateUserProfile($userId: Int!, $bio: String!, $website: String!, $location: String!) {
  updateProfile(
    userId: $userId
    bio: $bio
    website: $website
    location: $location
  )
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
 *      bio: // value for 'bio'
 *      website: // value for 'website'
 *      location: // value for 'location'
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