import { Box, IconButton } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import FavoriteIcon from "@material-ui/icons/Favorite";
import {
  GetAllPostsDocument,
  useGetCurrentUserQuery,
  useLikePostMutation,
} from "../../graphql/generated/graphql";
import gql from "graphql-tag";
import { useRouter } from "next/router";

interface Props {
  post: any;
  currentUser: any;
}

export const LikeButton: React.FC<Props> = ({ post, currentUser }) => {
  const [likePost, { client }] = useLikePostMutation();
  const { data, loading } = useGetCurrentUserQuery({
    fetchPolicy: "cache-first",
  });
  const [liked, setLiked] = useState(false);
  const router = useRouter();

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
    if (data?.getCurrentUser === null) {
      setLiked(false);
    } else if (
      post.likes.find((like: any) => like.userId === data?.getCurrentUser?.id)
    ) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [post, currentUser]);

  const handleLikePost = async () => {
    if (currentUser?.getCurrentUser) {
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
    } else {
      router.push("/login");
    }
  };

  return (
    <Box flexGrow={1}>
      <IconButton
        disabled={!data?.getCurrentUser}
        onClick={handleLikePost}
        aria-label="settings"
      >
        {liked === true ? (
          <FavoriteIcon style={{ color: "red" }} fontSize="small" />
        ) : (
          <FavoriteIcon fontSize="small" />
        )}
      </IconButton>
      <span>{post.likes.length}</span>
    </Box>
  );
};
