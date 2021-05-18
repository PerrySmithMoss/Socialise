import React, { useEffect } from "react";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Grid, { GridSpacing } from "@material-ui/core/Grid";
import { SearchBar } from "../components/SearchBar";
import { TrendsForYou } from "../components/TrendsForYou";
import { LeftNav } from "../components/Home/LeftNav";
import { ProfileHeader } from "../components/Profile/ProfileHeader";
import { UserPosts } from "../components/Profile/UserPosts";
import { Divider } from "@material-ui/core";
import { SingleUserHeader } from "../components/SingleUser/SingleUserHeader";
import { SingleUserPosts } from "../components/SingleUser/SingleUserPosts";

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
  })
);

interface Props {
  location: any;
}

export const SingleUser: React.FC<Props> = ({ location }) => {
  const [spacing, setSpacing] = React.useState<GridSpacing>(3);
  const classes = useStyles();
  useEffect(() => {
    console.log(location);
  });
  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={spacing}>
          <Grid item className={classes.grid}>
            <LeftNav />
          </Grid>

          <Grid item className={classes.grid}>
            <SingleUserHeader location={location} />
            <Divider />
            <SingleUserPosts location={location} />
          </Grid>

          <Grid item className={classes.grid}>
            <SearchBar />
            <br></br>
            <TrendsForYou />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
