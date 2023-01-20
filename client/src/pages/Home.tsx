import React from "react";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Grid, { GridSpacing } from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { ListOfPosts } from "../components/ListOfPosts";
import { WhatsHappening } from "../components/WhatsHappening";
import { SearchBar } from "../components/SearchBar";
import { TrendsForYou } from "../components/TrendsForYou";
import { LeftNav } from "../components/Home/LeftNav";
import { YouMayKnow } from "../components/Home/YouMayKnow";
import { ListOfUsers } from "../components/ListOfUsers";
import { Hidden } from "@material-ui/core";

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
    columnThree: {
      marginTop: 25,
    },
  })
);

interface Props {}

export const Home: React.FC<Props> = () => {
  const [spacing, setSpacing] = React.useState<GridSpacing>(3);
  const classes = useStyles();
  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={spacing}>
          <Hidden smDown>
            <Grid item className={classes.grid}>
              <LeftNav />
            </Grid>
          </Hidden>

          <Grid item className={classes.grid}>
            <WhatsHappening />
            <br></br>
            <ListOfPosts />
          </Grid>

          <Hidden mdDown>
            <Grid item className={classes.columnThree}>
              <SearchBar />
              <br></br>
              <TrendsForYou />
              <br></br>
              <YouMayKnow />
            </Grid>
          </Hidden>
        </Grid>
      </Grid>
    </Grid>
  );
};
