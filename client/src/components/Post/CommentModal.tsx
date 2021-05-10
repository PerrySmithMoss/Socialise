import React, { useEffect, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { Box, IconButton, Menu, MenuItem } from "@material-ui/core";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import { Typography } from "@material-ui/core";
import {
  useGetCurrentUserQuery,
  useCommentOnPostMutation,
} from "../../generated/graphql";
import moment from "moment";
import { Link } from "react-router-dom";
import { LikeButton } from "../Post/LikeButton";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";

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
    noBorder: {
      border: "none",
      padding: 0,
    },
    textField: {
      padding: 0,
    },
    dialogTitle: {
      margin: 0,
      padding: theme.spacing(2),
    },
  })
);

interface Props {
  openCommentDialog: boolean;
  handleCommentClickClose: () => void;
  post: any;
}

export const CommentModal: React.FC<Props> = ({
  openCommentDialog,
  handleCommentClickClose,
  post,
}) => {
  const classes = useStyles();

  const { data: User, loading } = useGetCurrentUserQuery({
    fetchPolicy: "cache-first",
  });
  const [commentOnPost] = useCommentOnPostMutation();
  const [comment, setComment] = useState("");

  const handleCommentOnPost = async (postId: number) => {
    if (comment.length === 0 || !comment.trim()) {
      // setOpen(true);
      return;
    } else {
      await commentOnPost({
        variables: {
          postId: postId,
          comment: comment,
        },
        // refetchQueries: [{ query: GetAllPostsDocument }],
      });
      setComment("");
    }
  };
  // console.log(post)

  // useEffect(() => {

  // })

  return (
    <div>
      <Dialog
        open={openCommentDialog}
        onClose={handleCommentClickClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {/* <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle> */}
        <MuiDialogTitle className={classes.dialogTitle} disableTypography>
          <IconButton
            aria-label="close"
            style={{ color: "#14ffec" }}
            onClick={() => handleCommentClickClose}
          >
            <CloseIcon />
          </IconButton>
        </MuiDialogTitle>
        <DialogContent dividers>
          <DialogContentText id="alert-dialog-description">
            <List className={classes.list}>
              <ListItem
                key={post.id}
                alignItems="flex-start"
                style={{ paddingBottom: "0px" }}
              >
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src={post.user.profile.avatar} />
                </ListItemAvatar>
                <ListItemText
                  style={{ textDecoration: "none" }}
                  primary={
                    <Typography
                      variant="h6"
                      style={{ fontSize: "16px", color: "white" }}
                    >{`${post.firstName}${post.lastName} @${post.userName} 
              - ${moment(post.datePublished).fromNow()}`}</Typography>
                  }
                  secondary={
                    <React.Fragment>{`${post.content}`}</React.Fragment>
                  }
                />
              </ListItem>
              <Timeline
                style={{
                  flexDirection: "row",
                  paddingLeft: "0px",
                  paddingRight: "0px",
                  paddingTop: "0px",
                  paddingBottom: "0px",
                }}
                align="alternate"
              >
                <TimelineItem>
                  <TimelineSeparator>
                    <TimelineDot>{/* <FastfoodIcon /> */}</TimelineDot>
                    <TimelineConnector />
                  </TimelineSeparator>
                </TimelineItem>
              </Timeline>
              <ListItem
                key={post.id}
                alignItems="flex-start"
                style={{ paddingBottom: "0px" }}
              >
                <ListItemAvatar>
                  <Avatar
                    alt="Remy Sharp"
                    src={User?.getCurrentUser?.profile.avatar as string}
                  />
                </ListItemAvatar>
                <ListItemText
                  style={{ textDecoration: "none" }}
                  primary={
                    <>
                      <TextField
                        value={comment}
                        onChange={(event) => {
                          setComment(event.target.value);
                        }}
                        multiline={true}
                        fullWidth
                        id="outlined-basic"
                        label="Tweet your reply"
                        variant="outlined"
                        className={`${classes.textField} without-padding`}
                        InputProps={{
                          classes: { notchedOutline: classes.noBorder },
                        }}
                      />
                    </>
                  }
                />
              </ListItem>
            </List>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => handleCommentOnPost(post.id)}
            variant="contained"
            color="primary"
            style={{ backgroundColor: "#009d91", color: "white" }}
          >
            Reply
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
