import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import Grid, { GridSpacing } from "@material-ui/core/Grid";
import { Box, Divider } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { useGetSpecificUserInfoQuery } from "../../generated/graphql";
import gql from "graphql-tag";

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
  })
);

interface MessageProps {
  messagesData: any;
  selectedUserId: any;
}

export const Message: React.FC<MessageProps> = ({
  messagesData,
  selectedUserId,
}) => {
  const { data: specifiedUserInfo, client } = useGetSpecificUserInfoQuery({
    fetchPolicy: "network-only",
    variables: { userId: selectedUserId },
  });

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

  const currentUser = client.readQuery({
    query: GET_CURRENT_USER,
  });

  if (currentUser.getCurrentUser === null) {
    console.log("You're not logged in...");
  } else {
    console.log(currentUser);
  }

  // console.log(specifiedUserInfo);

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
          height={500}
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
          </Box>
        </Box>
      </div>
    </Grid>
  );
};
