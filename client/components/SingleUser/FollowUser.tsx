import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import {
  GetCurrentUserDocument,
  useFollowUserMutation,
  GetSpecificUserInfoDocument,
  SpecifcUserSnippetFragment,
  useLikePostMutation,
  useGetCurrentUserQuery,
} from "../../graphql/generated/graphql";
import gql from "graphql-tag";
import router from "next/router";

interface Props {
  specificUser: SpecifcUserSnippetFragment;
}

export const FollowUser: React.FC<Props> = ({ specificUser }) => {
  const [likePost, { client }] = useLikePostMutation();
  const { data: currentUser } = useGetCurrentUserQuery({
    fetchPolicy: "cache-first",
  });
  const [followed, setFollowed] = useState(false);
  const [followUser] = useFollowUserMutation();
  const [open, setOpen] = useState(false);

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

  const handleCloseLoginPopover = () => {
    setOpen(false);
  };

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
            currentUser?.getCurrentUser
              ? followUser({
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
              : setOpen(true)
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
            currentUser?.getCurrentUser
              ? followUser({
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
              : setOpen(true)
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
      <Dialog
        open={open}
        onClose={handleCloseLoginPopover}
        aria-labelledby="login-popover"
      >
        <DialogContent>
          <DialogContentText color="inherit">
            Follow {specificUser.username} to see what they share on Twitter.
          </DialogContentText>
          <DialogContentText>
            Sign up so you never miss their Tweets.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            style={{
              color: "white",
              backgroundColor: "#0099FF",
              padding: "8px 20px",
            }}
            onClick={() => router.push("/login")}
            color="primary"
          >
            Log in
          </Button>
          <Button
            style={{ color: "white", padding: "8px 20px" }}
            onClick={() => router.push("/register")}
            color="primary"
          >
            Register
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
