import {
  Box,
  Button,
  createStyles,
  makeStyles,
  TextField,
  Theme,
} from "@material-ui/core";
import { DocumentNode } from "graphql";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { setAccessKey } from "../auth/accessKey";
import {
  GetCurrentUserDocument,
  useLoginMutation,
} from "../graphql/generated/graphql";

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

const Login: NextPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginUser] = useLoginMutation();
  const router = useRouter();

  const handleLoginUser = async () => {
    const res = await loginUser({
      variables: { email, password },
      // refetchQueries: [{ query: GetCurrentUserDocument }]
      update: (
        store: {
          readQuery: (arg0: { query: DocumentNode }) => any;
          writeQuery: (arg0: {
            query: DocumentNode;
            data: { getCurrentUser: any };
          }) => void;
        },
        { data }: any
      ) => {
        if (!data.loginUser.data) {
          // setLoginError(res.data.loginUser.errors[0].message);
          return null;
        }
        store.readQuery({
          query: GetCurrentUserDocument,
        });

        store.writeQuery({
          query: GetCurrentUserDocument,
          data: {
            getCurrentUser: data?.loginUser?.data.user as any,
          },
        });
      },
    });

    if (res && res.data?.loginUser.data) {
      setAccessKey(res.data.loginUser.data?.accessToken);
      router.push("/");
    }

    if (res && res.data?.loginUser.errors) {
      setLoginError(res.data.loginUser.errors[0].message);
    }
  };

  return (
    <>
      <Head>
        <title>Login | Socialise</title>
        <meta name="description" content="Socialise" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div style={{ width: "100%" }}>
        <Box
          display="flex"
          justifyContent="center"
          flexDirection="row"
          p={1}
          m={1}
          mt={6}
        >
          <Box p={1}>
            <TextField
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              style={{ width: 400 }}
              id="outlined-basic"
              fullWidth
              label="Email"
              variant="outlined"
              type="email"
            />
          </Box>
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          flexDirection="row"
          p={1}
          m={1}
        >
          <Box p={1}>
            <TextField
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              style={{ width: 400 }}
              id="outlined-basic"
              label="Password"
              variant="outlined"
              type="password"
            />
          </Box>
        </Box>
        {loginError ? (
          <Box
            display="flex"
            justifyContent="center"
            flexDirection="row"
            p={1}
            m={1}
          >
            <p className="text-red-500">{loginError}</p>
          </Box>
        ) : null}

        <Box
          display="flex"
          justifyContent="center"
          flexDirection="row"
          p={1}
          m={1}
        >
          <Box p={1}>
            <Button
              onClick={handleLoginUser}
              variant="contained"
              color="primary"
            >
              Login
            </Button>
          </Box>
        </Box>
      </div>
    </>
  );
};

export default Login;
