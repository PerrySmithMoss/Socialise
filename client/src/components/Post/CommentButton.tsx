import { Box, IconButton } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ModeCommentIcon from "@material-ui/icons/ModeComment";
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

export const CommentButton: React.FC<Props> = ({ post }) => {
  const [retweetPost, { client }] = useLikePostMutation();
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

  const handleRetweetPost = async () => {
    await retweetPost({
      variables: { postId: post.id, value: 1 },
      refetchQueries: [{ query: GetAllPostsDocument }],
    });
  };

  return (
    <Box flexGrow={1}>
      <IconButton onClick={handleRetweetPost} aria-label="settings">
        {liked === true ? (
          <ModeCommentIcon style={{ color: "red" }} fontSize="small" />
        ) : (
          <ModeCommentIcon fontSize="small" />
        )}
      </IconButton>
      <span>{post.points}</span>
    </Box>
  );
};
