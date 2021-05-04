import { Box, Button, Divider } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import SettingsIcon from "@material-ui/icons/Settings";
import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 300,
    },
    textBox: {
      // marginLeft: 10,
      width: "100%",
    },
  })
);

export const TrendsForYou: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Box display="flex" pl={2} bgcolor="background.paper">
        <Box flexGrow={1}>
          <h3>Trends for you</h3>
        </Box>
        <Box mt={0.5}>
          <IconButton style={{ color: "#14ffec" }} aria-label="delete">
            <SettingsIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>
      <Divider />
      <Box display="flex" pl={2} bgcolor="background.paper">
        <Box flexGrow={1}>
          <p>Trending worldwide</p>
          <h4>#BreakingNews</h4>
        </Box>
      </Box>
      <Divider />
      <Box display="flex" pl={2} bgcolor="background.paper">
        <Box flexGrow={1}>
          <p>Trending worldwide</p>
          <h4>#WorldNews</h4>
        </Box>
      </Box>
      <Divider />
      <Box display="flex" pl={2} bgcolor="background.paper">
        <Box flexGrow={1}>
          <p>Trending worldwide</p>
          <h4>#GreatestOfAllTime</h4>
        </Box>
      </Box>
      <Divider />
      <Box display="flex" pl={2} bgcolor="background.paper">
        <Box pt={1.5} pb={0.5} flexGrow={1}>
          <Button size="small" style={{ color: "#14ffec" }}>Show more</Button>
        </Box>
      </Box>
    </div>
  );
};
