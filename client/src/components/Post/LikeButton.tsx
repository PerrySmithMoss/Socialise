import { Box, IconButton } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import FavoriteIcon from "@material-ui/icons/Favorite";
import {
  GetAllPostsDocument,
  GetAllPostsQuery,
  GetCurrentUserDocument,
  PostSnippetFragment,
  useGetCurrentUserQuery,
} from "../../generated/graphql";
import { useLikePostMutation } from "../../generated/graphql";
import gql from "graphql-tag";

interface Props {
  post: PostSnippetFragment;
}

export const LikeButton: React.FC<Props> = ({ post }) => {
  const [likePost, { client }] = useLikePostMutation();
  //   const { data, loading } = useGetCurrentUserQuery();
  const [liked, setLiked] = useState(false);

  const GET_CURRENT_USER = gql`
    query GetCurrentUser {
      getCurrentUser {
        id
        firstName
        lastName
        email
        username
      }
    }
  `;

  useEffect(() => {
    const user = client.readQuery({
      query: GET_CURRENT_USER,
    });
    if (user.getCurrentUser === null) {
      return;
    } else if (
      post.likes.find((like) => like.userId === user.getCurrentUser.id)
    ) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [post]);

  const handleLikePost = async () => {
    await likePost({
      variables: { postId: post.id, value: 1 },
      refetchQueries: [{ query: GetAllPostsDocument }],
      //   update: (store, { data }) => {
      //     if (!data) {
      //       return null;
      //     }
      // const allUserPosts = store.readQuery<GetAllPostsQuery>({
      //     query: GetAllPostsDocument
      // })
      //     store.writeQuery<GetAllPostsQuery>({
      //       query: GetAllPostsDocument,
      //       data: {
      //         getAllPosts: [...allUserPosts!.getAllPosts, data!.likePost],
      //       },
      //     });
      //   },
    });
  };

  return (
    <Box flexGrow={1}>
      <IconButton onClick={handleLikePost} aria-label="settings">
        {liked === true ? (
          <FavoriteIcon style={{ color: "red" }} fontSize="small" />
        ) : (
          <FavoriteIcon fontSize="small" />
        )}
      </IconButton>
      <span>{post.points}</span>
    </Box>
  );
};
