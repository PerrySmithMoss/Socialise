import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Box, IconButton, Menu, MenuItem } from "@material-ui/core";
import ModeCommentIcon from "@material-ui/icons/ModeComment";
import DeleteIcon from "@material-ui/icons/Delete";
import PersonPinCircleIcon from "@material-ui/icons/PersonPinCircle";
import ListIcon from "@material-ui/icons/List";
import { Typography } from "@material-ui/core";
import {
  GetAllPostsDocument,
  useDeletePostMutation,
  useGetAllPostsQuery,
  useGetCurrentUserQuery,
  useLikePostMutation,
} from "../generated/graphql";
import moment from "moment";
import { Link } from "react-router-dom";
import { LikeButton } from "./Post/LikeButton";
import { CommentModal } from "./Post/CommentModal";
import CircularProgress from "@material-ui/core/CircularProgress";
import { RetweetPost } from "./Post/RetweetPost";

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

export const ListOfPosts: React.FC = () => {
  const classes = useStyles();
  const { data } = useGetAllPostsQuery({ fetchPolicy: "network-only" });
  const { data: currentUser, loading } = useGetCurrentUserQuery({
    fetchPolicy: "cache-first",
  });
  const [likePost] = useLikePostMutation();
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
    return (
      <div style={{ width: "100%" }}>
        <Box
          display="flex"
          justifyContent="center"
          minHeight="100vh"
          m={1}
          p={1}
        >
          <Box p={1}>
            <CircularProgress size={125} />
          </Box>
        </Box>
      </div>
    );
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
      {data.getAllPosts.map((post: any) => (
        <div key={post.id}>
          <List className={classes.list}>
            <ListItem
              key={post.id}
              button
              component={Link}
              to={{ pathname: `/post/${post.id}`, state: { post } }}
              alignItems="flex-start"
            >
              {post.user.id === currentUser?.getCurrentUser?.id ? (
                <Link to={{ pathname: `/profile` }}>
                  <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src={post.user.profile.avatar} />
                  </ListItemAvatar>
                </Link>
              ) : (
                <Link
                  to={{
                    pathname: `/user/${post.user.id}`,
                    state: { user: post.user },
                  }}
                >
                  <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src={post.user.profile.avatar} />
                  </ListItemAvatar>
                </Link>
              )}

              <ListItemText
                style={{ textDecoration: "none" }}
                primary={
                  <Typography
                    variant="h6"
                    style={{ fontSize: "16px", color: "white" }}
                  >{`${post.firstName}${post.lastName} @${post.userName} 
              - ${moment(post.datePublished).fromNow()}`}</Typography>
                }
                secondary={<React.Fragment>{`${post.content}`}</React.Fragment>}
              />
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
              <RetweetPost currentUser={currentUser} post={post} />

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
        </div>
      ))}
    </div>
  );
};
