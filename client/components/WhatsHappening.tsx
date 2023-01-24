import React, { useEffect, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Box, Button, Collapse, Divider } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import TimelineIcon from "@material-ui/icons/Timeline";
import ImageSearchIcon from "@material-ui/icons/ImageSearch";
import ImageIcon from "@material-ui/icons/Image";
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";
import SubjectIcon from "@material-ui/icons/Subject";
import {
  GetAllPostsDocument,
  useCreatePostMutation,
  useGetAllPostsQuery,
  useGetCurrentUserQuery,
} from "../graphql/generated/graphql";
import moment from "moment";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 500,
    },
    textBox: {
      marginLeft: 10,
      width: "90%",
    },
    avatar: {
      marginTop: 7,
    },
    icon: {
      marginTop: 5,
      marginLeft: 60,
    },
  })
);

export const WhatsHappening: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [createPost] = useCreatePostMutation();
  const { data: User } = useGetCurrentUserQuery({
    fetchPolicy: "cache-first",
  });
  const [content, setContent] = useState("");
  const [datePublished, setDatePublished] = useState(
    moment().format("YYYY-MM-DD hh:mm:ss").toString()
  );

  const handleCreatePost = async () => {
    if (content.length === 0 || !content.trim()) {
      setOpen(true);
    } else {
      await createPost({
        variables: {
          datePublished: datePublished,
          content: content,
          firstName: User?.getCurrentUser?.firstName!,
          lastName: User?.getCurrentUser?.lastName!,
          userName: User?.getCurrentUser?.username!,
        },
        refetchQueries: [{ query: GetAllPostsDocument }],
      });
      setContent("");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setOpen(false);
    }, 7000);
  }, [open]);

  const classes = useStyles();

  return (
    <>
    {User?.getCurrentUser ? (
    <div className={classes.root}>
      <Box display="flex" alignItems="center" pl={2} bgcolor="background.paper">
        <Box flexGrow={1}>
          <h2 className="text-xl">Home</h2>
        </Box>
        <Box mt={1}>
          <IconButton style={{ color: "#14ffec" }} aria-label="delete">
            <TimelineIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>
      <Divider />
      <Box display="flex" pt={2} pl={2} pr={2} bgcolor="background.paper">
        <Avatar
          className={classes.avatar}
          alt="Remy Sharp"
          src={User?.getCurrentUser?.profile.avatar as string}
        />
        <TextField
          value={content}
          onChange={(event) => {
            setContent(event.target.value);
          }}
          className={classes.textBox}
          id="outlined-basic"
          label="Whats happening?"
          variant="outlined"
        />
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        pt={2}
        pl={2}
        pr={2}
        bgcolor="background.paper"
      >
        <Box flexGrow={1}>
          <Collapse timeout={500} in={open}>
            <Alert severity="error">
              You must provide some form of text to your post.
            </Alert>
          </Collapse>
        </Box>
      </Box>

      <Box display="flex" pl={1} pr={1} pb={1} bgcolor="background.paper">
        <Box p={1} flexGrow={1}>
          <div className={classes.icon}>
            <ImageSearchIcon style={{ color: "#14ffec" }} />
            <ImageIcon style={{ color: "#14ffec" }} />
            <SentimentSatisfiedIcon style={{ color: "#14ffec" }} />
            <SubjectIcon style={{ color: "#14ffec" }} />
          </div>
        </Box>
        <Box p={1}>
          <Button
            onClick={() => handleCreatePost()}
            variant="contained"
            color="primary"
            style={{ backgroundColor: "#009d91", color: "white" }}
          >
            Socialise
          </Button>
        </Box>
      </Box>
    </div>
    ) : null }
    </>
  );
};
