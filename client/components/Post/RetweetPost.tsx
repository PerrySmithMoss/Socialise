import { Box, IconButton } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import SwapVertIcon from "@material-ui/icons/SwapVert";
import {
  GetAllPostsDocument,
  PostSnippetFragment,
  useGetCurrentUserQuery,
  useRetweetPostMutation,
} from "../../graphql/generated/graphql";
import gql from "graphql-tag";
import { Menu, MenuItem } from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import PersonPinCircleIcon from "@material-ui/icons/PersonPinCircle";
import Divider from "@material-ui/core/Divider";
import SwapHorizIcon from "@material-ui/icons/SwapHoriz";
import { useRouter } from "next/router";

interface Props {
  post: PostSnippetFragment;
  currentUser: any;
}

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

export const RetweetPost: React.FC<Props> = ({ post, currentUser }) => {
  const [retweetPost, { client }] = useRetweetPostMutation();
  //   const { data, loading } = useGetCurrentUserQuery();
  const [retweet, setRetweet] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { data: user } = useGetCurrentUserQuery({
    fetchPolicy: "cache-first",
  });
  const router = useRouter();

  useEffect(() => {
    const user = client.readQuery({
      query: GET_CURRENT_USER,
    });
    // console.log(user)
    if (user.getCurrentUser === null) {
      setRetweet(false);
    } else if (
      post.retweets.find((retweet) => retweet.userId === user.getCurrentUser.id)
    ) {
      setRetweet(true);
    } else {
      setRetweet(false);
    }
  }, [post, currentUser]);

  const handleRetweetPost = async () => {
    await retweetPost({
      variables: { postId: post.id, value: 1 },
      refetchQueries: [{ query: GetAllPostsDocument }],
    });
    handleClose();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (user?.getCurrentUser) {
      setAnchorEl(event.currentTarget);
    } else {
      router.push("/login");
    }
  };

  return (
    <Box flexGrow={1}>
      <IconButton
        disabled={!currentUser?.getCurrentUser}
        onClick={handleClick}
        aria-label="settings"
      >
        {retweet === true ? (
          <SwapVertIcon style={{ color: "#00ffea" }} />
        ) : (
          <SwapVertIcon />
        )}
      </IconButton>
      <span>{post.retweetsCount}</span>
      <br></br>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {retweet === true ? (
          <MenuItem style={{ color: "red" }} onClick={handleRetweetPost}>
            <SwapHorizIcon style={{ marginRight: "10px" }} />
            <span>Untweet</span>
          </MenuItem>
        ) : (
          <MenuItem onClick={handleRetweetPost}>
            <SwapHorizIcon style={{ marginRight: "10px" }} />
            <span>Retweet</span>
          </MenuItem>
        )}
      </Menu>
    </Box>
  );
};
