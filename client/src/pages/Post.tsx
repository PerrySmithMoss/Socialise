import React, { useEffect } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Grid, { GridSpacing } from "@material-ui/core/Grid";
import { SearchBar } from "../components/SearchBar";
import { TrendsForYou } from "../components/TrendsForYou";
import { LeftNav } from "../components/Home/LeftNav";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import SwapVertIcon from "@material-ui/icons/SwapVert";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Box, IconButton, Menu, MenuItem, Typography } from "@material-ui/core";
import ModeCommentIcon from "@material-ui/icons/ModeComment";
import DeleteIcon from "@material-ui/icons/Delete";
import PersonPinCircleIcon from "@material-ui/icons/PersonPinCircle";
import ListIcon from "@material-ui/icons/List";
import moment from "moment";
import { Link } from "react-router-dom";
import { LikeButton } from "../components/Post/LikeButton";
import { useDeletePostMutation, useGetCurrentUserQuery } from "../generated/graphql";
import {useLocation} from "react-router-dom";
import TimelineIcon from '@material-ui/icons/Timeline';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      height: 140,
      width: 300,
    },
    grid: {
      marginTop: 25
    },
    list: {
      width: 500,
      backgroundColor: theme.palette.background.paper,
    },
  })
);

interface Props {
  location : any
}

export const Post: React.FC<Props> = ({ location }) => {
  const [spacing, setSpacing] = React.useState<GridSpacing>(3);
  const classes = useStyles();
  let { state } = useLocation();
  const history = useHistory();
  const { data: currentUser, loading } = useGetCurrentUserQuery({ fetchPolicy: "cache-first" });
  const [deletePost] = useDeletePostMutation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    console.log(state)
  })

  const handleClose = () => {
    setAnchorEl(null);
  };
  // if (!data) {
  //   return <div>Loading...</div>;
  // }
  
  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={spacing}>
          <Grid item className={classes.grid}>
        <LeftNav />
          </Grid>

          <Grid item className={classes.grid}>
          <Box display="flex" pl={2} bgcolor="background.paper">
          <Box mt={1}>
          <IconButton onClick={() => history.goBack()} style={{ color: "#14ffec" }} aria-label="delete">
            <ArrowBackIcon />
          </IconButton>
        </Box>
        <Box flexGrow={1}>
          <h2>Thread</h2>
        </Box>
      </Box>
      <Divider />
          <List className={classes.list}>
          <ListItem
          key={location.state.post.id}
          button
            // component={Link}
            // to={{ pathname: `/post/${location.state.post.id}` }}
            alignItems="flex-start"
          >
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src={location.state.post.user.profile.avatar} />
            </ListItemAvatar>
            <ListItemText style={{textDecoration: "none"}}
              primary={
                <Typography variant="h6" style={{ fontSize: "16px", color: 'white' }}>{`${location.state.post.firstName}${location.state.post.lastName} @${
                  location.state.post.userName
                } 
              - ${moment(location.state.post.datePublished).fromNow()}`}</Typography>
              }
              secondary={<React.Fragment>{`${location.state.post.content}`}</React.Fragment>}
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
              <span>{location.state.post.commentsCount}</span>
            </Box>
            <Box flexGrow={1}>
              <IconButton aria-label="settings">
                <SwapVertIcon />
              </IconButton>
              <span>2</span>
            </Box>
            <LikeButton currentUser={currentUser} post={location.state.post} />
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
                // onClick={async () => {
                //   await deletePost({
                //     variables: { postID: post.postID },
                //     refetchQueries: [{ query: GetAllPostsDocument }],
                //   });
                // }}
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
          <br></br>
          {location.state.post.comments && location.state.post.comments.map(
            (comment: any) => (
              <div>
              <ListItem
              key={location.state.post.id}
              button
                // component={Link}
                // to={{ pathname: `/post/${location.state.post.id}` }}
                alignItems="flex-start"
              >
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src={comment.user.profile.avatar} />
                </ListItemAvatar>
                <ListItemText style={{textDecoration: "none"}}
                  primary={
                    <Typography variant="h6" style={{ fontSize: "16px", color: 'white' }}>{`${comment.user.firstName}${comment.user.lastName} @${
                    comment.user.username
                    } 
                  - ${moment(comment.datePublished).fromNow()}`}</Typography>
                  }
                  secondary={<React.Fragment>{`${comment.comment}`}</React.Fragment>}
                />
      
              </ListItem>
              {/* <Box
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
                  <span>{location.state.post.commentsCount}</span>
                </Box>
                <Box flexGrow={1}>
                  <IconButton aria-label="settings">
                    <SwapVertIcon />
                  </IconButton>
                  <span>2</span>
                </Box>
                <LikeButton post={location.state.post} />
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
                    // onClick={async () => {
                    //   await deletePost({
                    //     variables: { postID: post.postID },
                    //     refetchQueries: [{ query: GetAllPostsDocument }],
                    //   });
                    // }}
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
              </Box> */}
              <br></br>
          <Divider variant="inset" component="li" />

              </div>
            )
          )}
        </List>
          </Grid>

          <Grid item className={classes.grid}>
            <SearchBar />
            <br></br>
            <TrendsForYou />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
