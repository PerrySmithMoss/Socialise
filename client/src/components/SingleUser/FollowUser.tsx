import { Box, Button, IconButton } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import FavoriteIcon from "@material-ui/icons/Favorite";
import {
  GetAllPostsDocument,
  GetAllPostsQuery,
  GetCurrentUserDocument,
  PostSnippetFragment,
  useGetCurrentUserQuery,
  useFollowUserMutation,
  GetSpecificUserInfoDocument,
  SpecifcUserSnippetFragment,
} from "../../generated/graphql";
import { useLikePostMutation } from "../../generated/graphql";
import gql from "graphql-tag";
import { userInfo } from "node:os";

interface Props {
  specificUser: SpecifcUserSnippetFragment;
}

export const FollowUser: React.FC<Props> = ({ specificUser }) => {
  const [likePost, { client }] = useLikePostMutation();
  //   const { data, loading } = useGetCurrentUserQuery();
  const [followed, setFollowed] = useState(false);
  const [followUser] = useFollowUserMutation();

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
    // console.log(user)
    if (user.getCurrentUser === null) {
      setFollowed(false);
    } else if (
      specificUser.follower.find(
        (follower) => follower.followerId === user.getCurrentUser.id
      )
    ) {
      setFollowed(true);
    } else {
      setFollowed(false);
    }
  }, [specificUser]);

  return (
    <Box style={{ marginTop: "20px", paddingBottom: "25px" }}>
      {followed === true ? (
        // Unfollow the user
        <Button
          onClick={() =>
            followUser({
              variables: {
                username: specificUser.username,
                followingId: specificUser.id,
                value: 1,
              },
              refetchQueries: [
                {
                  query: GetSpecificUserInfoDocument,
                  variables: { userId: specificUser.id },
                },
                { query: GetCurrentUserDocument },
              ],
            })
          }
          variant="contained"
          size="medium"
          style={{
            backgroundColor: "#009d91",
            borderRadius: 50,
            color: "white",
            borderStyle: "solid",
            borderColor: "#14ffec",
            paddingLeft: "20px",
            paddingRight: "20px",
          }}
        >
          Following
        </Button>
      ) : (
        // Follow the user
        <Button
          onClick={() =>
            followUser({
              variables: {
                username: specificUser.username,
                followingId: specificUser.id,
                value: 1,
              },
              refetchQueries: [
                {
                  query: GetSpecificUserInfoDocument,
                  variables: { userId: specificUser.id },
                },
                { query: GetCurrentUserDocument },
              ],
            })
          }
          variant="contained"
          size="medium"
          style={{
            backgroundColor: "#5c5c5c",
            borderRadius: 50,
            color: "white",
            borderStyle: "solid",
            borderColor: "#14ffec",
            paddingLeft: "20px",
            paddingRight: "20px",
          }}
        >
          Follow
        </Button>
      )}
    </Box>
  );
};
