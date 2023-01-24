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
import PersonPinCircleIcon from "@material-ui/icons/PersonPinCircle";
import ListIcon from "@material-ui/icons/List";
import moment from "moment";
import { CommentModal } from "../Post/CommentModal";
import {
  useGetAllUserPostsQuery,
  useDeletePostMutation,
  GetAllPostsDocument,
  GetAllUserPostsDocument,
  useGetCurrentUserQuery,
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

export const UserPosts: React.FC = () => {
  const classes = useStyles();
  const { data } = useGetAllUserPostsQuery({ fetchPolicy: "cache-first" });
  const { data: currentUser, loading } = useGetCurrentUserQuery({
    fetchPolicy: "cache-first",
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
    // console.log(post)
    setSinglePost(post);
    setOpenCommentDialog(true);
  };

  const handleCommentClickClose = () => {
    setOpenCommentDialog(false);
  };

  return (
    <div>
      {data.getAllUserPosts.map((post: any) => (
        <List className={classes.list}>
          <Link href={`${`/post/${post.id}`}`}>
            <ListItem button alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src={post.user.profile.avatar} />
              </ListItemAvatar>
              <ListItemText
                primary={`${post.user.firstName}${post.user.lastName} @${
                  post.user.username
                } 
              - ${moment(post.datePublished).fromNow()}`}
                secondary={<React.Fragment>{`${post.content}`}</React.Fragment>}
              />
              <IconButton
                aria-label="settings"
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
                      refetchQueries: [{ query: GetAllUserPostsDocument }],
                    });
                  }}
                >
                  Delete post <DeleteIcon />
                </MenuItem>
                <Divider></Divider>
                <MenuItem onClick={handleClose}>
                  Pin to your timeline <PersonPinCircleIcon />
                </MenuItem>
                <Divider></Divider>
                <MenuItem onClick={handleClose}>
                  Add/remove from your list <ListIcon />
                </MenuItem>
              </Menu>
            </ListItem>
          </Link>
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
                aria-label="settings"
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
              <IconButton aria-label="settings">
                <SwapVertIcon />
              </IconButton>
              <span>2</span>
            </Box>
            <LikeButton currentUser={currentUser} post={post} />
            <Box flexGrow={1}>
              <IconButton
                aria-label="settings"
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
                <Divider></Divider>
                <MenuItem onClick={handleClose}>
                  Pin to your timeline <PersonPinCircleIcon />
                </MenuItem>
                <Divider></Divider>
                <MenuItem onClick={handleClose}>
                  Add/remove from your list <ListIcon />
                </MenuItem>
              </Menu>
            </Box>
          </Box>
          <Divider variant="inset" component="li" />
        </List>
      ))}
    </div>
  );
};
