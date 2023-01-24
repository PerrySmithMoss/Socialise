import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import SwapVertIcon from "@material-ui/icons/SwapVert";
import Link from "next/link";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Box, IconButton, Menu, MenuItem } from "@material-ui/core";
import ModeCommentIcon from "@material-ui/icons/ModeComment";
import DeleteIcon from "@material-ui/icons/Delete";
import moment from "moment";
import { CommentModal } from "../Post/CommentModal";
import {
  useDeletePostMutation,
  GetAllPostsDocument,
  useGetCurrentUserQuery,
  useGetSpecificUserInfoQuery,
  useGetAllSpecificUserPostsQuery,
} from "../../graphql/generated/graphql";
import { LikeButton } from "../Post/LikeButton";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 500,
      backgroundColor: theme.palette.background.paper,
    },
    list: {
      width: 500,

      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: "inline",
    },
  })
);

interface Props {
  userId: number;
}

export const SingleUserPosts: React.FC<Props> = ({ userId }) => {
  const classes = useStyles();
  const { data: singleUser } = useGetSpecificUserInfoQuery({
    fetchPolicy: "network-only",
    variables: { userId },
  });
  const { data } = useGetAllSpecificUserPostsQuery({
    fetchPolicy: "network-only",
    variables: { userId },
  });
  const { data: currentUser, loading } = useGetCurrentUserQuery({
    fetchPolicy: "network-only",
  });
  const [deletePost] = useDeletePostMutation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [openCommentDialog, setOpenCommentDialog] = React.useState(false);
  const [singlePost, setSinglePost] = useState({
    id: undefined,
    firstName: "",
    lastName: "",
    userName: "",
    datePublished: "",
    content: "",
    user: {
      profile: {
        avatar: "",
      },
    },
  });
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  if (!data) {
    return <div>Loading...</div>;
  }

  const handleCommentClickOpen = (post: any) => {
    setSinglePost(post);
    setOpenCommentDialog(true);
  };

  const handleCommentClickClose = () => {
    setOpenCommentDialog(false);
  };

  return (
    <div>
      {data.getAllSpecificUserPosts.map((post: any) => (
        <List className={classes.list}>
          <ListItem button alignItems="flex-start">
            <Link href={`/post/${post.id}`}>
              <div className="flex justify-between w-full">
                <ListItemAvatar>
                  <Avatar alt="User's Avatar" src={post.user.profile.avatar} />
                </ListItemAvatar>
                <ListItemText
                  primary={`${post.user.firstName}${post.user.lastName} @${
                    post.user.username
                  } 
              - ${moment(post.datePublished).fromNow()}`}
                  secondary={
                    <React.Fragment>{`${post.content}`}</React.Fragment>
                  }
                />
              </div>
            </Link>
          </ListItem>
          <Box
            display="flex"
            justifyContent="space-between"
            textAlign="center"
            p={1}
            bgcolor="background.paper"
          >
            <Box flexGrow={1}>
              <IconButton
                onClick={() => handleCommentClickOpen(post)}
                aria-label="Comments"
                disabled={!currentUser?.getCurrentUser}
                
              >
                <ModeCommentIcon fontSize="small" />
              </IconButton>
              <span>{`${post.commentsCount}`}</span>
            </Box>
            <CommentModal
              post={singlePost}
              openCommentDialog={openCommentDialog}
              handleCommentClickClose={handleCommentClickClose}
            />
            <Box flexGrow={1}>
              <IconButton
                disabled={!currentUser?.getCurrentUser}
                aria-label="Retweets"
              >
                <SwapVertIcon />
              </IconButton>
              <span>{post.retweets.length}</span>
            </Box>

            <LikeButton currentUser={currentUser} post={post} />

            {currentUser?.getCurrentUser?.id === post.userId ? (
              <Box flexGrow={1}>
                <IconButton
                  aria-label="Likes"
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem
                    style={{ color: "red" }}
                    onClick={async () => {
                      await deletePost({
                        variables: { postID: post.postID },
                        refetchQueries: [{ query: GetAllPostsDocument }],
                      });
                    }}
                  >
                    Delete post <DeleteIcon />
                  </MenuItem>
                </Menu>
              </Box>
            ) : null}
          </Box>
          <Divider variant="inset" component="li" />
        </List>
      ))}
    </div>
  );
};
