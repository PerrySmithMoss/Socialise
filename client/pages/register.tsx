import React, { useState } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { useRegisterMutation } from "../graphql/generated/graphql";
import moment from "moment";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
  })
);

const Register: NextPage = () => {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [dateRegistered, setDateRegistered] = useState(
    moment().format("YYYY-MM-DD hh:mm:ss").toString()
  );

  const [registerUser] = useRegisterMutation();

  const handleRegisterUser = async () => {
    await registerUser({
      variables: {
        email,
        firstName,
        lastName,
        username,
        password,
        dateRegistered,
      },
    });

    router.push("/");
  };

  return (
    <>
      <Head>
        <title>Register | Socialise</title>
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
                setFirstName(event.target.value);
              }}
              id="outlined-basic"
              label="First Name"
              variant="outlined"
            />
          </Box>
          <Box p={1}>
            <TextField
              onChange={(event) => {
                setLastName(event.target.value);
              }}
              id="outlined-basic"
              label="Last Name"
              variant="outlined"
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
                setUsername(event.target.value);
              }}
              id="outlined-basic"
              label="Username"
              variant="outlined"
            />
          </Box>
          <Box p={1}>
            <TextField
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              id="outlined-basic"
              label="Password"
              variant="outlined"
              type="password"
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
            <Button
              onClick={handleRegisterUser}
              variant="contained"
              color="primary"
            >
              Create User
            </Button>
          </Box>
        </Box>
      </div>
    </>
  );
};

export default Register;
