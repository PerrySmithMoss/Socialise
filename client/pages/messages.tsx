import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Grid, { GridSpacing } from "@material-ui/core/Grid";
import { LeftNav } from "../components/Home/LeftNav";
import { MessagesList } from "../components/Messages/MessagesList";
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
    test: {
      width: 400,
    },
  })
);

const Messages: NextPage = () => {
  const [spacing, setSpacing] = React.useState<GridSpacing>(3);
  const classes = useStyles();
  return (
    <>
      <Head>
        <title>Messages | Socialise</title>
        <meta name="description" content="Socialise" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" spacing={spacing}>
            <Grid item className={classes.grid}>
              <LeftNav />
            </Grid>

            <MessagesList />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Messages;
