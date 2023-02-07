import React, { useEffect } from "react";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Grid, { GridSpacing } from "@material-ui/core/Grid";
import { SearchBar } from "../../components/SearchBar";
import { LeftNav } from "../../components/Home/LeftNav";
import { Divider } from "@material-ui/core";
import { SingleUserHeader } from "../../components/SingleUser/SingleUserHeader";
import { SingleUserPosts } from "../../components/SingleUser/SingleUserPosts";
import Head from "next/head";
import { NextPage } from "next";
import {
  useGetCurrentUserQuery,
  useGetSpecificUserInfoLazyQuery,
} from "../../graphql/generated/graphql";
import { useRouter } from "next/router";
import { YouMayKnow } from "../../components/Home/YouMayKnow";
import Navbar from "../../components/Navbar";

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

const IndividualUser: NextPage = () => {
  const classes = useStyles();
  const router = useRouter();
  const userId = router.query.id;
  const parsedUserId = userId as string;
  const [
    getSpecificUserInfo,
    { loading: loadingSpecificUser, data: specificUser },
  ] = useGetSpecificUserInfoLazyQuery({
    fetchPolicy: "network-only",
    variables: { userId: parseInt(parsedUserId) },
  });

  useEffect(() => {
    if (router.query.id) {
      getSpecificUserInfo({ variables: { userId: parseInt(parsedUserId) } });
    }
  }, [router.query.id]);

  if (loadingSpecificUser) {
    return <div>Loading...</div>;
  } else if (specificUser?.getSpecificUserInfo) {
    return (
      <>
        <Head>
          <title>
            @{specificUser.getSpecificUserInfo.username} | Socialise
          </title>
          <meta name="description" content="Socialise" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Navbar />
        <Grid container className={classes.root}>
          <Grid item xs={12}>
            <Grid container justifyContent="center">
              <Grid item className={classes.grid}>
                <LeftNav />
              </Grid>

              <Grid item className={classes.grid}>
                <SingleUserHeader
                  userId={specificUser.getSpecificUserInfo.id}
                />
                <Divider />
                <SingleUserPosts userId={specificUser.getSpecificUserInfo.id} />
              </Grid>

              <Grid item className={classes.thirdColumn}>
                <SearchBar />
                <br></br>
                <YouMayKnow />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </>
    );
  } else {
    return null;
  }
};

export default IndividualUser;
