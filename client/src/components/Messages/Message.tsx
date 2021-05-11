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
import { SearchBar } from "../../components/Messages/SearchBar";
import { Box, Divider } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import SettingsIcon from "@material-ui/icons/Settings";
import AddCommentIcon from "@material-ui/icons/AddComment";
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

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
      height: 75
    },
    list: {

      backgroundColor: theme.palette.background.paper,
    },
  })
);

export const Message: React.FC<Props> = () => {
  const classes = useStyles();
  return (
    <Grid item className={classes.grid}>
      <div className={classes.test}>
        <Box width={460} height={75} display="flex" pl={2} bgcolor="background.paper">
          <Box flexGrow={1}>
            <List className={classes.list}>
              <ListItem
              style={{ paddingTop: 0, paddingBottom: 0, paddingLeft: 0}}
                //   key={post.id}
                alignItems="flex-start"
              >
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src="" />
                </ListItemAvatar>
                <ListItemText
                  style={{ textDecoration: "none" }}
                  primary={
                    <Typography
                      variant="h6"
                      style={{ fontSize: "16px", color: "white" }}
                    >{`${"Perry Smith-Moss"}`}</Typography>
                  }
                  secondary={
                    <React.Fragment>{`${"@perrymoss"}`}</React.Fragment>
                  }
                />
              </ListItem>
            </List>
          </Box>

          <Box mt={1}>
            <IconButton style={{ color: "#14ffec" }} aria-label="delete">
              <InfoOutlinedIcon  />
            </IconButton>
          </Box>
        </Box>
        <Divider />

        <Box width={460} height={500} display="flex" pl={2} bgcolor="background.paper">
          <Box flexGrow={1}>
        </Box>
        </Box>
      </div>
    </Grid>
  );
};
