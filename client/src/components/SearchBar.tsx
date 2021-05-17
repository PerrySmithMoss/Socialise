import { Box } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import React, { useEffect, useState } from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { useSearchUsersLazyQuery } from "../generated/graphql";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 300,
    },
    textBox: {
      // marginLeft: 10,
      width: "100%",
    },
    textField: {
      borderRadius: "40px",
    },
    usersList: {
      width: "100%",
      maxWidth: 300,
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: "inline",
    },
  })
);

export const SearchBar: React.FC = () => {
  const classes = useStyles();
  const [searchInput, setSearchInput] = useState("");
  const [executeSearch, { data }] = useSearchUsersLazyQuery();

  useEffect(() => {
    console.log(data);
  }, [data]);

  const handleKeyPress = (ev: React.KeyboardEvent): any => {
    if (ev.key === "Enter") {
      if (searchInput === "") {
        console.log("Please enter a username");
      } else {
        executeSearch({ variables: { username: searchInput } });
      }
    }
  };
  return (
    <div className={classes.root}>
      <Box display="flex" bgcolor="background.paper">
        <TextField
          value={searchInput}
          onChange={(event) => {
            setSearchInput(event.target.value);
            executeSearch({ variables: { username: searchInput } });
          }}
          onKeyPress={handleKeyPress}
          className={classes.textBox}
          id="outlined-size-small"
          variant="outlined"
          size="small"
          label="Search Users"
        />
      </Box>
      {data &&
        data.searchUsers.map((user) => (
          <List className={classes.usersList}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src={user.profile.avatar as string} />
              </ListItemAvatar>
              <ListItemText
                primary={`${user.firstName} ${user.lastName}`}
                secondary={`@${user.username}`}
              />
            </ListItem>
          </List>
        ))}
    </div>
  );
};
