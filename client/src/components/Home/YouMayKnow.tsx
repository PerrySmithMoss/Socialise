import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { Box, Button, Divider } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import SettingsIcon from "@material-ui/icons/Settings";

import {
  GetAllUsersDocument,
  useDeleteUserMutation,
  useGetAllUsersQuery,
} from "../../generated/graphql";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 300,
      backgroundColor: theme.palette.background.paper,
    },
  })
);

export const YouMayKnow: React.FC = () => {
  const classes = useStyles();
  const { data } = useGetAllUsersQuery({ fetchPolicy: "network-only" });
  const [deleteUser] = useDeleteUserMutation();
  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Box display="flex" pl={2} bgcolor="background.paper">
        <Box flexGrow={1}>
          <h3>You may know</h3>
        </Box>
      </Box>
      <Divider />
      <List dense className={classes.root}>
        {data.getAllUsers.map((user: any) => (
          <div key={user.id}>
            <ListItem key={user.id} button>
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src={user.profile.avatar} />
              </ListItemAvatar>
              <ListItemText
                id={user.id}
                primary={`${user.firstName} ${user.lastName}`}
              />
              <ListItemSecondaryAction>
                <Button
                  variant="outlined"
                  size="small"
                  color="primary"
                  style={{ color: "#14ffec", border: "1px solid #14ffec" }}

                  // onClick={async () => {
                  //   await deleteUser({
                  //     variables: { userId: user.id },
                  //     refetchQueries: [{ query: GetAllUsersDocument }],
                  //   });
                  // }}
                >
                  Follow
                </Button>
              </ListItemSecondaryAction>
            </ListItem>
            <Box pt={1} pb={1}>
            <Divider />
            </Box>
          </div>
        ))}
      </List>
    </div>
  );
};
