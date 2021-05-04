import React, { useState } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import {
  GetCurrentUserDocument,
  GetCurrentUserQuery,
  useLoginMutation,
} from "../generated/graphql";
import { RouteComponentProps } from "react-router-dom";
import { setAccessKey } from "../auth/accessKey";

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

export const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginUser] = useLoginMutation();

  const handleLoginUser = async () => {
    const res = await loginUser({
      variables: { email, password },
      update: (store, { data }) => {
        if (!data) {
          return null;
        }
        // store.writeQuery<GetCurrentUserQuery>({
        //   query: GetCurrentUserDocument,
        //   data: {
        //     getCurrentUser: data.loginUser.user,
        //   },
        // });
      },
    });

    console.log(res);

    if (res && res.data) {
      setAccessKey(res.data.loginUser.accessToken);
    }

    history.push("/");
  };

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
      <Box
        display="flex"
        justifyContent="center"
        flexDirection="row"
        p={1}
        m={1}
      >
        <Box p={1}>
          <Button onClick={handleLoginUser} variant="contained" color="primary">
            Login
          </Button>
        </Box>
      </Box>
    </div>
  );
};
