import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { Box, Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

import {
  GetAllUsersDocument,
  useDeleteUserMutation,
  useGetAllUsersQuery,
} from "../generated/graphql";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {

      width: 500,
      backgroundColor: theme.palette.background.paper,
    },
  })
);

export const ListOfUsers: React.FC = () => {
  const classes = useStyles();
  const { data } = useGetAllUsersQuery({ fetchPolicy: "network-only" });
  const [deleteUser] = useDeleteUserMutation();
  if (!data) {
    return <div>Loading...</div>;
  }

  return (
      <List dense className={classes.root}>
        {data.getAllUsers.map((user: any) => (
          <div key={user.id}>
          <ListItem key={user.id} button>
            <ListItemAvatar>
              <Avatar />
            </ListItemAvatar>
            <ListItemText
              id={user.id}
              primary={`${user.firstName} ${user.lastName}`}
            />
            <ListItemSecondaryAction>
              <Button
                variant="contained"
                color="primary"
                onClick={async () => {
                  await deleteUser({
                    variables: { userId: user.id },
                    refetchQueries: [{ query: GetAllUsersDocument }],
                  });
                }}
              >
                Delete User
              </Button>
            </ListItemSecondaryAction>
          </ListItem>
          </div>
        ))}
      </List>
  );
};
