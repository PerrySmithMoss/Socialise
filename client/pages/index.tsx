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
  const [loading, setLoading] = useState(true);
  const [spacing, setSpacing] = useState<GridSpacing>(0);
  const classes = useStyles();
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/refresh_token`, {
      method: "POST",
      credentials: "include",
    }).then(async (x) => {
      const { accessToken } = await x.json();
      // console.log(accessToken);
      setAccessKey(accessToken);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <>
        <Head>
          <title>Socialise</title>
          <meta name="description" content="Socialise" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div style={{ width: "100%" }}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            m={1}
            p={1}
          >
            <Box p={1}>
              <CircularProgress size={125} />
            </Box>
          </Box>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Socialise</title>
        <meta name="description" content="Socialise" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
