import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Grid, { GridSpacing } from "@material-ui/core/Grid";
import { SearchBar } from "../components/Messages/SearchBar";
import { LeftNav } from "../components/Home/LeftNav";
import { MessagesList } from "../components/Messages/MessagesList";
import {
    Box, Divider,
  } from "@material-ui/core";
  import IconButton from "@material-ui/core/IconButton";
  import SettingsIcon from '@material-ui/icons/Settings';
  import AddCommentIcon from '@material-ui/icons/AddComment';
import { Message } from "../components/Messages/Message";
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
    test: {
        width: 400
    }
  })
);

interface Props {}

export const Messages: React.FC<Props> = () => {
  const [spacing, setSpacing] = React.useState<GridSpacing>(3);
  const classes = useStyles();
  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={spacing}>
          <Grid item className={classes.grid}>
        <LeftNav />
          </Grid>
          
              <MessagesList />

        </Grid>
      </Grid>
    </Grid>
  );
};
