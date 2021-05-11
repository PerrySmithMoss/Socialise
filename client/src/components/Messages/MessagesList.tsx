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

import { Box, Divider } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import SettingsIcon from "@material-ui/icons/Settings";
import AddCommentIcon from "@material-ui/icons/AddComment";
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
    paper: {
      height: 140,
      width: 300,
    },
    grid: {
      marginTop: 25,
    },
    test: {
      width: 400,
    },
  })
);

export const MessagesList: React.FC<Props> = () => {
  const classes = useStyles();
  return (
    <Grid item className={classes.grid}>
      <div className={classes.test}>
        <Box width={300} display="flex" pl={2} bgcolor="background.paper">
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
        <SearchBar />

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
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary="Brunch this weekend?"
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    Ali Connors
                  </Typography>
                  {" — I'll be in your neighborhood doing errands this…"}
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary="Summer BBQ"
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    to Scott, Alex, Jennifer
                  </Typography>
                  {" — Wish I could come, but I'm out of town this…"}
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary="Oui Oui"
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    Sandra Adams
                  </Typography>
                  {" — Do you have Paris recommendations? Have you ever…"}
                </React.Fragment>
              }
            />
          </ListItem>
        </List>
      </div>
    </Grid>
  );
};
