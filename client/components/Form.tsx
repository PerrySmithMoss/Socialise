import React, { useState } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { CREATE_USER } from "../graphql/Mutations";
import {
  useMutation,
} from "@apollo/client";

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

export const Form: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [createUser, { error }] = useMutation(CREATE_USER);

  const classes = useStyles();

  return (
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
          onClick={() =>
            createUser({
              variables: { firstName, lastName, email, username, password },
            })
          }
          variant="contained"
          color="primary"
        >
          Create User
        </Button>
        </Box>
        </Box>
    </div>
  );
};
