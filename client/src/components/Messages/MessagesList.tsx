import React, { useEffect, useState } from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import Grid, { GridSpacing } from "@material-ui/core/Grid";
import { SearchBar } from "../../components//Messages/SearchBar";
import { LeftNav } from "../../components/Home/LeftNav";
import {
  useGetAllUserMessagesQuery,
  useGetAllMessagesFromUserQuery,
  useNewMessageSubscription,
  useGetCurrentUserQuery,
} from "../../generated/graphql";
import { Box, Divider } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import SettingsIcon from "@material-ui/icons/Settings";
import AddCommentIcon from "@material-ui/icons/AddComment";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { Message } from "./Message";
import Button from "@material-ui/core/Button";

interface Props {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 305,
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: "inline",
    },
    paper: {
      height: 140,
      width: 300,
    },
    grid: {
      marginTop: 25,
    },
    test: {
      width: 305,
    },
  })
);

const GET_MESSAGES = gql`
  query GetAllMessagesFromUser($fromId: Int!) {
    getAllMessagesFromUser(fromId: $fromId) {
      id
      content
      dateSent
      fromId
      from {
        id
        firstName
        lastName
        username
        profile {
          avatar
        }
      }
      toId
      to {
        id
        firstName
        lastName
        username
        profile {
          avatar
        }
      }
    }
  }
`;

// const newMessageSubscription = gql`
//   subscription NewMessageSubscription {
//     newMessage {
//       id
//       fromId
//       toId
//       content
//       dateSent
//     }
//   }
// `;

export const MessagesList: React.FC<Props> = () => {
  const classes = useStyles();
  const { data: allMessages } = useGetAllUserMessagesQuery({
    fetchPolicy: "cache-and-network",
  });
  const { data: currentUser, loading } = useGetCurrentUserQuery({
    fetchPolicy: "cache-first",
  });
  // const { data: getMessagesFromUser } = useGetAllMessagesFromUserQuery({ fetchPolicy: "network-only" });

  const [
    getAllMessagesFromUser,
    { loading: messagesLoading, data: messagesData },
  ] = useLazyQuery(GET_MESSAGES);

  // const
  //   { loading, data, subscribeToMore}
  //  = useQuery(GET_MESSAGES);

  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleSelectedUserClick = (fromId: number) => {};

  useEffect(() => {
    console.log(allMessages)
    if (selectedUserId) {
      getAllMessagesFromUser({
        variables: {
          fromId: selectedUserId as any,
        },
      });
      // subscribeToMore({
      //   document: newMessageSubscription,
      //   updateQuery: (prev: any, { subscriptionData }: any) => {
      //     console.log("Prev: ", prev);
      //     console.log("Subscription Data: ", subscriptionData);

      //     if (!subscriptionData) {
      //       return prev;
      //     }

      //     return prev
      //   },
      // });
      if (messagesData) {
        console.log(messagesData);
      }
    }
  }, [selectedUserId]);

  // console.log(allMessages);
  // console.log(messagesData);
  return (
    <>
      <Grid item className={classes.grid}>
        <div className={classes.test}>
          <Box width={305} display="flex" pl={2} bgcolor="background.paper">
            <Box flexGrow={1}>
              <h2>Messages</h2>
            </Box>

            <Box mt={1}>
              <IconButton style={{ color: "#14ffec" }} aria-label="delete">
                <SettingsIcon fontSize="small" />
              </IconButton>
              <IconButton style={{ color: "#14ffec" }} aria-label="delete">
                <AddCommentIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>

          <Divider />
          <Box display="flex" pb={1} bgcolor="background.paper"></Box>
          <SearchBar />
          <Box display="flex" pt={1} bgcolor="background.paper"></Box>
          <Divider />

          {allMessages?.getAllUserMessages.map((message: any) => (
            <List className={classes.root}>
              <ListItem
                //    key={post.id}
                button
                onClick={
                  currentUser?.getCurrentUser?.id === message.to.id
                    ? () => setSelectedUserId(message.from.id)
                    : () => setSelectedUserId(message.to.id)
                }
                // () => setSelectedUserId(message.to.id)}
                // component={Link}
                //  to={{ pathname: `/messages/${message.id}`, state: {message} }}
                // to={{ pathname: `/messages/${2}` }}
                alignItems="flex-start"
              >
                <ListItemAvatar>
                  <Avatar
                    alt="Remy Sharp"
                    src={
                      currentUser?.getCurrentUser?.id === message.to.id
                        ? `${message.from.profile.avatar as string}`
                        : `${message.to.profile.avatar as string}`
                    }
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    currentUser?.getCurrentUser?.id === message.to.id
                      ? `${message.from.firstName} ${message.from.lastName}`
                      : `${message.to.firstName} ${message.to.lastName}`
                  }
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      ></Typography>
                      {` — ${message.content}`}
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </List>
          ))}
        </div>
      </Grid>

      {messagesData && messagesData.getAllMessagesFromUser.length > 0 ? (
        <Message messagesData={messagesData} selectedUserId={selectedUserId} />
      ) : (
        <Grid item className={classes.grid}>
          <div className={classes.test}>
            <Box
              width={430}
              display="flex"
              pl={2}
              pt={10}
              justifyContent="center"
              bgcolor="background.paper"
            >
              <Box>
                <h2>You don't have a message selected</h2>
              </Box>
            </Box>
            <Box
              width={430}
              display="flex"
              pl={2}
              justifyContent="center"
              bgcolor="background.paper"
            >
              <Box>
                <p>
                  Choose one from your existing messages, or start a new one.
                </p>
              </Box>
            </Box>
            <Box
              width={430}
              height={120}
              display="flex"
              pl={2}
              justifyContent="center"
              bgcolor="background.paper"
            >
              <Box>
                <Button
                  // onClick={() => handleCreatePost()}
                  variant="contained"
                  color="primary"
                  style={{ backgroundColor: "#009d91", color: "white" }}
                >
                  Message
                </Button>
              </Box>
            </Box>
          </div>
        </Grid>
      )}
    </>
  );
};
