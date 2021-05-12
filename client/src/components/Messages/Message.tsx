import React, { useState } from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import Grid, { GridSpacing } from "@material-ui/core/Grid";
import { Box, Divider, TextField } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import {
  GetAllMessagesFromUserDocument,
  GetAllUserMessagesDocument,
  useGetSpecificUserInfoQuery,
  useSendMessageMutation,
} from "../../generated/graphql";
import gql from "graphql-tag";
import { SearchBar } from "../../components//Messages/SearchBar";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import VideoLibraryOutlinedIcon from "@material-ui/icons/VideoLibraryOutlined";
import EmojiEmotionsOutlinedIcon from "@material-ui/icons/EmojiEmotionsOutlined";
import SendIcon from "@material-ui/icons/Send";
import moment from "moment";

interface Props {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 300,
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: "inline",
    },
    grid: {
      marginTop: 25,
    },
    test: {
      width: 400,
      height: 75,
    },
    list: {
      backgroundColor: theme.palette.background.paper,
    },
    newMessage: {
      width: 275,
    },
    textBox: {
      marginLeft: 10,
      // marginRight: 10,
      width: "100%",
    },
    textField: {
      borderRadius: "20px",
    },
  })
);

interface MessageProps {
  messagesData: any;
  selectedUserId: any;
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

export const Message: React.FC<MessageProps> = ({
  messagesData,
  selectedUserId,
}) => {
  const { data: specifiedUserInfo, client } = useGetSpecificUserInfoQuery({
    fetchPolicy: "network-only",
    variables: { userId: selectedUserId },
  });

  const [sendMessage] = useSendMessageMutation();

  const [message, setMessage] = useState("");

  const currentUser = client.readQuery({
    query: GET_CURRENT_USER,
  });

  if (currentUser.getCurrentUser === null) {
    console.log("You're not logged in...");
  } else {
    console.log(currentUser);
  }

  // console.log(specifiedUserInfo);
  const [dateSent, setdateSent] = useState(
    moment().format("YYYY-MM-DD hh:mm:ss").toString()
  );

  const handleSendMessage = async (toId: number) => {
    if (message.length === 0 || !message.trim()) {
      // setMessage(true);
    } else {
      await sendMessage({
        variables: {
          toId: toId,
          content: message,
          dateSent: dateSent,
        },
        refetchQueries: [
          {
            query: GetAllMessagesFromUserDocument,
            variables: { fromId: selectedUserId },
          },
          { query: GetAllUserMessagesDocument },
        ],
      });
      setMessage("");
    }
  };

  const classes = useStyles();

  return (
    <Grid item className={classes.grid}>
      <div className={classes.test}>
        <Box
          width={460}
          height={75}
          display="flex"
          pl={2}
          bgcolor="background.paper"
        >
          <Box flexGrow={1}>
            <List className={classes.list}>
              <ListItem
                style={{ paddingTop: 0, paddingBottom: 0, paddingLeft: 0 }}
                //   key={post.id}
                alignItems="flex-start"
              >
                <ListItemAvatar>
                  <Avatar
                    alt="Remy Sharp"
                    src={
                      specifiedUserInfo?.getSpecificUserInfo.profile
                        .avatar as string
                    }
                  />
                </ListItemAvatar>
                <ListItemText
                  style={{ textDecoration: "none" }}
                  primary={
                    <Typography
                      variant="h6"
                      style={{ fontSize: "16px", color: "white" }}
                    >{`${
                      specifiedUserInfo?.getSpecificUserInfo.firstName
                    } ${" "} ${
                      specifiedUserInfo?.getSpecificUserInfo.lastName
                    }`}</Typography>
                  }
                  secondary={
                    <React.Fragment>{`${specifiedUserInfo?.getSpecificUserInfo.username}`}</React.Fragment>
                  }
                />
              </ListItem>
            </List>
          </Box>

          <Box mt={1}>
            <IconButton style={{ color: "#14ffec" }} aria-label="delete">
              <InfoOutlinedIcon />
            </IconButton>
          </Box>
        </Box>
        <Divider />

        <Box
          width={460}
          height={600}
          display="flex"
          pl={2}
          bgcolor="background.paper"
        >
          <Box>
            {messagesData.getAllMessagesFromUser.map((message: any) => (
              <Box pt={2}>
                {message.from.id === currentUser.getCurrentUser.id ? (
                  <Box width={430} display="flex" justifyContent="flex-end">
                    <Box>
                      <ListItem
                        key={message.to.id}
                        style={{
                          paddingTop: 0,
                          paddingBottom: 0,
                          paddingLeft: 0,
                        }}
                        alignItems="flex-start"
                      >
                        <ListItemText
                          style={{ textDecoration: "none" }}
                          secondary={
                            <React.Fragment>
                              <Box
                                borderRadius={12}
                                p={1.5}
                                bgcolor="#1da0f2"
                                mt={0.3}
                              >
                                <Box>
                                  {" "}
                                  <Typography
                                    component="span"
                                    variant="body2"
                                    className={classes.inline}
                                    style={{ color: "white" }}
                                  >
                                    {message.content}
                                  </Typography>
                                </Box>
                              </Box>
                            </React.Fragment>
                          }
                        />
                      </ListItem>
                    </Box>
                  </Box>
                ) : (
                  <Box width={430} display="flex" justifyContent="flex-start">
                    <Box>
                      <ListItem
                        style={{
                          paddingTop: 0,
                          paddingBottom: 0,
                          paddingLeft: 0,
                        }}
                        key={message.from.id}
                        alignItems="flex-start"
                      >
                        <ListItemAvatar>
                          <Avatar
                            alt="Remy Sharp"
                            src={message.from.profile.avatar}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          style={{ textDecoration: "none" }}
                          secondary={
                            <React.Fragment>
                              <Box
                                borderRadius={12}
                                p={1.5}
                                bgcolor="grey.700"
                                mt={0.3}
                              >
                                <Box>
                                  {" "}
                                  <Typography
                                    component="span"
                                    variant="body2"
                                    className={classes.inline}
                                    style={{ color: "white" }}
                                  >
                                    {message.content}
                                  </Typography>
                                </Box>
                              </Box>
                            </React.Fragment>
                          }
                        />
                      </ListItem>
                    </Box>
                  </Box>
                )}
              </Box>
            ))}
            <Box pt={10}>
              <Divider />
              <Box display="flex" pt={2} pb={1} bgcolor="background.paper">
                <Box>
                  <IconButton style={{ color: "#14ffec" }} aria-label="delete">
                    <ImageOutlinedIcon fontSize="small" />
                  </IconButton>
                </Box>

                <Box>
                  <IconButton style={{ color: "#14ffec" }} aria-label="delete">
                    <VideoLibraryOutlinedIcon fontSize="small" />
                  </IconButton>
                </Box>

                <Box>
                  <div className={classes.newMessage}>
                    <TextField
                      value={message}
                      onChange={(event) => {
                        // console.log(event.target.value)
                        setMessage(event.target.value);
                      }}
                      className={classes.textBox}
                      InputProps={{
                        classes: {
                          root: classes.textField,
                        },
                      }}
                      id="outlined-size-small"
                      variant="outlined"
                      size="small"
                      label="New message"
                    />
                  </div>
                </Box>

                <Box>
                  <IconButton
                    onClick={() => handleSendMessage(selectedUserId)}
                    style={{ color: "#14ffec", marginLeft: "15px" }}
                    aria-label="delete"
                  >
                    <SendIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
              <Box display="flex" pt={1} bgcolor="background.paper"></Box>
              <Divider />
            </Box>
          </Box>
        </Box>
      </div>
    </Grid>
  );
};
