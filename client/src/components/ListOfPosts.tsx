import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import SwapVertIcon from "@material-ui/icons/SwapVert";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Box, IconButton, Menu, MenuItem } from "@material-ui/core";
import ModeCommentIcon from "@material-ui/icons/ModeComment";
import DeleteIcon from "@material-ui/icons/Delete";
import PersonPinCircleIcon from "@material-ui/icons/PersonPinCircle";
import ListIcon from "@material-ui/icons/List";
import { Typography } from '@material-ui/core';
import {
  GetAllPostsDocument,
  useDeletePostMutation,
  useGetAllPostsQuery,
} from "../generated/graphql";
import moment from "moment";
import { Link } from "react-router-dom";

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
  const [deletePost] = useDeletePostMutation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {data.getAllPosts.map((post: any) => (
        <List className={classes.list}>
          <ListItem
          button
            component={Link}
            to={{ pathname: `/post/${post.postID}` }}
            alignItems="flex-start"
          >
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText style={{textDecoration: "none"}}
              primary={
                <Typography variant="h6" style={{ fontSize: "16px", color: 'white' }}>{`${post.firstName}${post.lastName} @${
                  post.userName
                } 
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
              <IconButton aria-label="settings">
                <ModeCommentIcon fontSize="small" />
              </IconButton>
              <span>3</span>
            </Box>
            <Box flexGrow={1}>
              <IconButton aria-label="settings">
                <SwapVertIcon />
              </IconButton>
              <span>2</span>
            </Box>
            <Box flexGrow={1}>
              <IconButton aria-label="settings">
                <FavoriteIcon fontSize="small" />
              </IconButton>
              <span>12</span>
            </Box>
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
