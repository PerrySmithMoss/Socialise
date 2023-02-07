import React, { useEffect } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Grid, { GridSpacing } from "@material-ui/core/Grid";
import { SearchBar } from "../../components/SearchBar";
import { LeftNav } from "../../components/Home/LeftNav";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import SwapVertIcon from "@material-ui/icons/SwapVert";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import {
  Box,
  Hidden,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
import ModeCommentIcon from "@material-ui/icons/ModeComment";
import DeleteIcon from "@material-ui/icons/Delete";
import PersonPinCircleIcon from "@material-ui/icons/PersonPinCircle";
import ListIcon from "@material-ui/icons/List";
import moment from "moment";
import { LikeButton } from "../../components/Post/LikeButton";
import {
  useDeletePostMutation,
  useGetCurrentUserQuery,
  useGetPostByIdLazyQuery,
} from "../../graphql/generated/graphql";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { NextPage } from "next";
import { YouMayKnow } from "../../components/Home/YouMayKnow";
import Navbar from "../../components/Navbar";

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
      marginTop: 25,
    },
    thirdColumn: {
      marginTop: 25,
      marginLeft: 25,
    },
    list: {
      width: 500,
      backgroundColor: theme.palette.background.paper,
    },
    link: {
      textDecoration: "none",
      "&:hover": {
        color: "#14ffec",
      },
    },
  })
);

const IndividualPost: NextPage = () => {
  const [spacing, setSpacing] = React.useState<GridSpacing>(3);
  const router = useRouter();
  const postId = router.query.id;
  const parsedPostId = postId as string;
  const classes = useStyles();
  const { data: currentUser, loading } = useGetCurrentUserQuery({
    fetchPolicy: "cache-first",
  });
  const [getPost, { loading: loadingPost, data: post }] =
    useGetPostByIdLazyQuery({
      fetchPolicy: "cache-first",
      variables: { postId: parseInt(parsedPostId) },
    });
  const [deletePost] = useDeletePostMutation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (router.query.id) {
      getPost({ variables: { postId: parseInt(parsedPostId) } });
    }
  }, [router.query.id]);

  if (loading && loadingPost) {
    return <div>Loading...</div>;
  } else if (post) {
    return (
      <>
        <Head>
          <title>Post {post.getPostById.id} | Socialise</title>
          <meta name="description" content="Socialise" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Navbar />
        <Grid container className={classes.root}>
          <Grid item xs={12}>
            <Grid container justifyContent="center">
              <Hidden smDown>
                <Grid item className={classes.grid}>
                  <LeftNav />
                </Grid>
              </Hidden>

              <Grid item className={classes.grid}>
                <Box
                  alignItems="center"
                  display="flex"
                  pl={2}
                  bgcolor="background.paper"
                >
                  <Box>
                    <IconButton
                      onClick={() => router.back()}
                      style={{ color: "#14ffec" }}
                      aria-label="delete"
                    >
                      <ArrowBackIcon />
                    </IconButton>
                  </Box>
                  <Box flexGrow={1}>
                    <h2 className="text-xl">Thread</h2>
                  </Box>
                </Box>
                <Divider />
                <List className={classes.list}>
                 <Link href={`/user/${post.getPostById.userId}`}>
                  <ListItem
                    button
                    key={post?.getPostById.id}
                    alignItems="flex-start"
                  >
                      <ListItemAvatar>
                        <Avatar
                          alt="User's Avatar"
                          src={post?.getPostById.user.profile.avatar as string}
                        />
                      </ListItemAvatar>
                    <ListItemText
                      style={{ textDecoration: "none" }}
                      primary={
                          <Typography
                            variant="h6"
                            style={{ fontSize: "16px", color: "white" }}
                          >{`${post?.getPostById.firstName}${
                            post?.getPostById.lastName
                          } @${post?.getPostById.user.username} 
              - ${moment(
                post?.getPostById.datePublished
              ).fromNow()}`}</Typography>
                      }
                      secondary={
                        <React.Fragment>{`${post?.getPostById.content}`}</React.Fragment>
                      }
                    />
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
                        disabled={!currentUser?.getCurrentUser}
                        aria-label="Comments"
                      >
                        <ModeCommentIcon fontSize="small" />
                      </IconButton>
                      <span>{post?.getPostById.commentsCount}</span>
                    </Box>
                    <Box flexGrow={1}>
                      <IconButton
                        disabled={!currentUser?.getCurrentUser}
                        aria-label="Retweets"
                      >
                        <SwapVertIcon />
                      </IconButton>
                      <span>{post?.getPostById.retweetsCount}</span>
                    </Box>
                    <LikeButton
                      currentUser={currentUser?.getCurrentUser}
                      post={post?.getPostById}
                    />
                    {currentUser?.getCurrentUser?.id === post.getPostById.userId ? (
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
                        </Menu>
                      </Box>
                    ) : null}
                  </Box>
                  <Divider variant="inset" component="li" />
                  <br></br>
                  {post?.getPostById.comments &&
                    post?.getPostById.comments.map((comment) => (
                      <div>
                        <ListItem
                          button
                          key={post.getPostById.id}
                          alignItems="flex-start"
                        >
                          <Link
                            href={`/user/${comment.user.id}`}
                            style={{ textDecoration: "none" }}
                          >
                            <ListItemAvatar>
                              <Avatar
                                alt="Remy Sharp"
                                src={comment.user.profile.avatar as string}
                              />
                            </ListItemAvatar>
                          </Link>
                          <Link
                            href={`/user/${comment.user.id}`}
                            style={{ textDecoration: "none" }}
                          >
                            <ListItemText
                              style={{ textDecoration: "none" }}
                              primary={
                                <Typography
                                  variant="h6"
                                  style={{ fontSize: "16px", color: "white" }}
                                >{`${comment.user.firstName}${
                                  comment.user.lastName
                                } @${comment.user.username} 
                  - ${moment(comment.datePublished).fromNow()}`}</Typography>
                              }
                              secondary={
                                <React.Fragment>{`${comment.comment}`}</React.Fragment>
                              }
                            />
                          </Link>
                        </ListItem>
                        <br></br>
                        <Divider variant="inset" component="li" />
                      </div>
                    ))}
                </List>
              </Grid>

              <Hidden>
                <Grid item className={classes.thirdColumn}>
                  <SearchBar />
                  <br></br>
                  <YouMayKnow />
                </Grid>
              </Hidden>
            </Grid>
          </Grid>
        </Grid>
      </>
    );
  } else {
    return null;
  }
};

export default IndividualPost;
