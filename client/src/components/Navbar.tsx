import React from "react";
import { Link } from "react-router-dom";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { AppBar, Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

import {
  useGetCurrentUserQuery,
  useLogUserOutMutation,
} from "../generated/graphql";
import { setAccessKey } from "../auth/accessKey";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    link: {
      textDecoration: "none",
      color: "#fff",
    },
  })
);

const Navbar = () => {
  const { data, loading } = useGetCurrentUserQuery({
    fetchPolicy: "network-only",
  });
  const [logUserOut, { client }] = useLogUserOutMutation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const classes = useStyles();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box display="flex">
      <AppBar position="static" color="inherit">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Box display="flex" flexGrow={1}>
            <Link to="/" className={classes.link}>
              <Typography variant="h6" className={classes.title}>
                Socialise
              </Typography>
            </Link>
          </Box>
          {loading ? (
            <div>Loading...</div>
          ) : data && data.getCurrentUser ? (
            <div>
              <Box display="flex">
                <Box p={1}>
                  <Link className={classes.link} to="bye">
                    <Button color="inherit">Bye</Button>
                  </Link>
                </Box>
                <Box>
                  <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={open}
                    onClose={handleClose}
                  >
                    <MenuItem
                      component={Link}
                      // the 'to' prop (and any other props not recognized by MenuItem itself)
                      // will be passed down to the Link component
                      to="/profile"
                    >
                      Profile
                    </MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem
                      onClick={async () => {
                        await logUserOut();
                        setAccessKey("");
                        await client.resetStore();
                      }}
                    >
                      Logout
                    </MenuItem>
                  </Menu>
                </Box>
                <Box mt={2}>
                  <div>{`${data.getCurrentUser.firstName} ${data.getCurrentUser.lastName}`}</div>
                </Box>
              </Box>
            </div>
          ) : (
            <Box display="flex">
              <Box p={1}>
                <Link className={classes.link} to="login">
                  <Button color="inherit">Login</Button>
                </Link>
              </Box>
              <Box p={1}>
                <Link className={classes.link} to="register">
                  <Button color="inherit">Register</Button>
                </Link>
              </Box>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
