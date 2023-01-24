import React from "react";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Grid, { GridSpacing } from "@material-ui/core/Grid";
import { SearchBar } from "../components/SearchBar";
import { TrendsForYou } from "../components/TrendsForYou";
import { LeftNav } from "../components/Home/LeftNav";
import { ProfileHeader } from "../components/Profile/ProfileHeader";
import { UserPosts } from "../components/Profile/UserPosts";
import { Divider } from "@material-ui/core";
import Head from "next/head";
import { NextPage } from "next";

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
    thirdColumn: {
      marginTop: 25,
      marginLeft: 25
    }
  })
);

const Profile: NextPage = () => {
  const classes = useStyles();
  return (
    <>
      <Head>
        <title>Profile | Socialise</title>
        <meta name="description" content="Socialise" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <Grid container justifyContent="center">
            <Grid item className={classes.grid}>
              <LeftNav />
            </Grid>

            <Grid item className={classes.grid}>
              <ProfileHeader />
              <Divider />
              <UserPosts />
            </Grid>

            <Grid item className={classes.thirdColumn}>
              <SearchBar />
              <br></br>
              <TrendsForYou />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Profile;
