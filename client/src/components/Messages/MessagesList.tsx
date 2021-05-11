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
import { SearchBar } from "../../components//Messages/SearchBar";
import { LeftNav } from "../../components/Home/LeftNav";
import { useGetAllUserMessagesQuery } from "../../generated/graphql";
import { Box, Divider } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import SettingsIcon from "@material-ui/icons/Settings";
import AddCommentIcon from "@material-ui/icons/AddComment";
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

export const MessagesList: React.FC<Props> = () => {
  const classes = useStyles();
  const { data } = useGetAllUserMessagesQuery({ fetchPolicy: "network-only" });
  console.log(data)
  return (
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

        {data?.getAllUserMessages.map((message: any) => (
        <List className={classes.root}>
          <ListItem
            //    key={post.id}
            button
            component={Link}
            //  to={{ pathname: `/messages/${message.id}`, state: {message} }}
            to={{ pathname: `/messages/${2}` }}
            alignItems="flex-start"
          >
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src={message.from.profile.avatar} />
            </ListItemAvatar>
            <ListItemText
              primary={`${message.from.firstName} ${message.from.lastName}`}
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                  </Typography>
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
  );
};
