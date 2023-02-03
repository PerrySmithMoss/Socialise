import {
  Box,
  CircularProgress,
  createStyles,
  Grid,
  GridSpacing,
  Hidden,
  makeStyles,
  Theme,
} from "@material-ui/core";
import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { useState, useEffect } from "react";
import { setAccessKey } from "../auth/accessKey";
import { LeftNav } from "../components/Home/LeftNav";
import { YouMayKnow } from "../components/Home/YouMayKnow";
import { ListOfPosts } from "../components/ListOfPosts";
import Navbar from "../components/Navbar";
import { SearchBar } from "../components/SearchBar";
import { WhatsHappening } from "../components/WhatsHappening";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    grid: {
      marginTop: 25,
    },
    columnThree: {
      marginTop: 25,
      marginLeft: 25
    },
  })
);

const Home: NextPage = () => {
  const [spacing, setSpacing] = useState<GridSpacing>(0);
  const classes = useStyles();

  return (
    <>
      <Head>
        <title>Socialise</title>
        <meta name="description" content="Socialise" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" spacing={spacing}>
            <Hidden smDown>
              <Grid item className={classes.grid}>
                <LeftNav />
              </Grid>
            </Hidden>

            <Grid item className={classes.grid}>
              <WhatsHappening />
              <ListOfPosts />
            </Grid>

            <Hidden >
              <Grid item className={classes.columnThree}>
                <SearchBar />
                <br></br>
                <YouMayKnow />
              </Grid>
            </Hidden>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
