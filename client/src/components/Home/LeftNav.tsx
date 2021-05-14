import { Box, Button, Divider } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import ExploreIcon from "@material-ui/icons/Explore";
import NotificationsIcon from "@material-ui/icons/Notifications";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import PersonIcon from "@material-ui/icons/Person";
import EmailIcon from "@material-ui/icons/Email";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Link, NavLink, useLocation } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 300,
    },
    textBox: {
      // marginLeft: 10,
      width: "100%",
    },
    link: {
      textDecoration: "none",
      color: "#fff",
    },
    button: {
      color: "#fff",
      "&:hover": {
        color: "#14ffec",
      },
    },
    activeLink: {
      // backgroundColor: "#14ffec",
      color: "#14ffec",
    },
  })
);

const defaultProps = {
  borderColor: "text.primary",
};

export const LeftNav: React.FC = () => {
  const classes = useStyles();

  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");
  console.log(pathname);
  console.log(splitLocation);

  return (
    <div className={classes.root}>
      <Box ml={5} justifyContent="center" {...defaultProps}>
        <Box ml={3} flexGrow={1}>
          <NavLink
            exact
            activeClassName={classes.activeLink}
            className={classes.link}
            to="/"
          >
            <Button
              style={{ color: splitLocation[1] === "" ? "#14ffec" : "white" }}
              className={classes.button}
              size="large"
              startIcon={<HomeIcon />}
              color="inherit"
            >
              Home
            </Button>
          </NavLink>
        </Box>
        <Box ml={3} flexGrow={1}>
          <NavLink
            exact
            activeClassName={classes.activeLink}
            className={classes.link}
            to="explore"
          >
            <Button
            style={{ color: splitLocation[1] === "explore" ? "#14ffec" : "white", marginTop: "1rem" }}
              className={classes.button}
              size="large"
              startIcon={<ExploreIcon />}
              color="inherit"
            >
              Explore
            </Button>
          </NavLink>
        </Box>
        <Box ml={3} flexGrow={1}>
          <Link className={classes.link} to="notifacations">
            <Button
            style={{ color: splitLocation[1] === "notifacations" ? "#14ffec" : "white", marginTop: "1rem" }}
              className={classes.button}
              size="large"
              startIcon={<NotificationsIcon />}
              color="inherit"
            >
              Notifacations
            </Button>
          </Link>
        </Box>
        <Box ml={3} flexGrow={1}>
          <NavLink
            exact
            activeClassName={classes.activeLink}
            className={classes.link}
            to="messages"
          >
            <Button
            style={{ color: splitLocation[1] === "messages" ? "#14ffec" : "white", marginTop: "1rem" }}
              className={classes.button}
              size="large"
              startIcon={<EmailIcon />}
              color="inherit"
            >
              Messages
            </Button>
          </NavLink>
        </Box>
        <Box ml={3} flexGrow={1}>
          <Link className={classes.link} to="lists">
            <Button
            style={{ color: splitLocation[1] === "lists" ? "#14ffec" : "white", marginTop: "1rem" }}
              className={classes.button}
              size="large"
              startIcon={<FormatListBulletedIcon />}
              color="inherit"
            >
              Lists
            </Button>
          </Link>
        </Box>
        <Box ml={3} flexGrow={1}>
          <NavLink
            exact
            activeClassName={classes.activeLink}
            className={classes.link}
            to="profile"
          >
            <Button
            style={{ color: splitLocation[1] === "profile" ? "#14ffec" : "white", marginTop: "1rem" }}
              className={classes.button}
              size="large"
              startIcon={<PersonIcon />}
              color="inherit"
            >
              Profile
            </Button>
          </NavLink>
        </Box>
        <Box ml={3} pb={3} flexGrow={1}>
          <Link className={classes.link} to="msettings">
            <Button
            style={{ color: splitLocation[1] === "more" ? "#14ffec" : "white", marginTop: "1rem" }}
              className={classes.button}
              size="large"
              startIcon={<MoreHorizIcon />}
              color="inherit"
            >
              More
            </Button>
          </Link>
        </Box>
      </Box>
    </div>
  );
};
