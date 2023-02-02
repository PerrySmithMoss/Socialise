import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { Box, Button, Divider } from "@material-ui/core";

import {
  useGetAllUsersQuery,
  useGetCurrentUserQuery,
  useGetUsersTheLoggedInUserMayKnowQuery,
} from "../../graphql/generated/graphql";
import Link from "next/link";

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
  const { data: currentUser } = useGetCurrentUserQuery({
    fetchPolicy: "cache-first",
  });
  const { data } = useGetUsersTheLoggedInUserMayKnowQuery({
    fetchPolicy: "network-only",
    variables: { userId: currentUser?.getCurrentUser?.id as number },
  });

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Box display="flex" pl={1} bgcolor="background.paper">
        <Box p={1} flexGrow={1}>
          <h3 className="text-base">You may know</h3>
        </Box>
      </Box>
      <Divider />
      <List dense className={classes.root}>
        {data.getUsersTheLoggedInUserMayKnow.map((user) => (
          <div key={user.id}>
            <Link href={`/user/${user.id}`}>
              <ListItem key={user.id} button>
                <ListItemAvatar>
                  <Avatar
                    alt="Remy Sharp"
                    src={user?.profile?.avatar as string}
                  />
                </ListItemAvatar>
                <ListItemText
                  id={user?.id.toString()}
                  primary={`${user.firstName} ${user.lastName}`}
                />
                {currentUser?.getCurrentUser ? (
                  <ListItemSecondaryAction>
                    <Button
                      variant="outlined"
                      size="small"
                      color="primary"
                      style={{ color: "#14ffec", border: "1px solid #14ffec" }}
                    >
                      Follow
                    </Button>
                  </ListItemSecondaryAction>
                ) : null}
              </ListItem>
            </Link>
            <Box pt={1} pb={1}>
              <Divider />
            </Box>
          </div>
        ))}
      </List>
    </div>
  );
};
